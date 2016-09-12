import mechanize
import databaseConnector
from BeautifulSoup import BeautifulSoup as bs

def get_sr_news():

	b = mechanize.Browser()

	response = b.open('http://sverigesradio.se/sida/gruppsida.aspx?programid=83&grupp=11079').read()

	soup = bs(str(response))

	articles = soup.findAll('article')

	for article in articles:

		title = article.abbr.text
		descr = article.findAll('div', {'class': 'preamble-text puff-preamble text-editor-content'})
		descr = descr[0].p.text
		title = article.abbr.text
		img = article.img.get('src')
		img = 'http://sverigesradio.se'+img
		# print descr

		descr = str(bs(descr, convertEntities=bs.HTML_ENTITIES))
		title = str(bs(title, convertEntities=bs.HTML_ENTITIES))
		#
		descr = unicode(descr, 'utf-8')
		title = unicode(title, 'utf-8')
		domain = 'sr.se'


		link = article.a.get('href')
		link = 'http://sverigesradio.se'+link

		print title
		print descr
		print link
		print img

		databaseConnector.insert_news(descr, title, link, domain, img)

def get_svt_news():

	b = mechanize.Browser()

	response = b.open('http://www.svt.se/opinion/').read()

	soup = bs(str(response))

	articles = soup.findAll('article', {'class':'nyh_teaser nyh_teaser--opinion nyh_teaser--no-border-top nyh_teaser--large'})

	for article in articles:

		title = article.a.get('title')
		link = article.a.get('href')

		title = str(bs(title, convertEntities=bs.HTML_ENTITIES))

		title = unicode(title, 'utf-8')

		domain = 'svt.se'

		link = 'http://svt.se'+link

		articleresponse = b.open(link).read()

		articlesoup = bs(str(articleresponse))

		descr = articlesoup.findAll('meta', {'property':'og:description'})

		descr = descr[0].get('content')

		descr = str(bs(descr, convertEntities=bs.HTML_ENTITIES))
		descr = unicode(descr, 'utf-8')

		img = articlesoup.findAll('div', {'class':'nyh_picture-wrapper lp_track_noident'})
		img = img[0].img.get('srcset').split(" ", 3)[2]


		print title
		print descr
		print link
		print img

		databaseConnector.insert_news(descr, title, link, domain, img)





def get_reddit_news():

	url = 'https://www.reddit.com/r/svenskpolitik/top/?sort=top&t=hour'

	b = mechanize.Browser()

	b.addheaders = [('User-agent', 'SvenskPolitikReaderBot 1.0')]

   	response = b.open(url).read()


   	soup = bs(str(response))


   	entries = soup.findAll("div", {"class" : "entry unvoted"})


	for entry in entries:


 		title = entry.a.text
		link = entry.a.get('href')
		domain = entry.span.text

		print title
		print link
		print domain


		if (domain != '(self.svenskpolitik)'):
			databaseConnector.insert_news(title, link)
		else:
			print 'Avoided self post!'


get_sr_news()
get_svt_news()
