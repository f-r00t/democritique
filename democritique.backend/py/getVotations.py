import mechanize
import time
import datetime
from BeautifulSoup import BeautifulSoup
import re

def get_riksdata(fetchLast24h, searchword, *searchargs):
# searchWord, doktyp, rm, from, tom, ts, bet, tempbet, nr, org, iid, parti, webbtv, talare, exakt, planering, sort, sortorder, rapport, utformat
	y = int(time.strftime('%Y'))
	m = int(time.strftime('%m'))
	d = int(time.strftime('%d'))

	day = datetime.timedelta(days=1)
	tday = datetime.date(y, m, d)
	yday = tday-day

	today = str(tday)
	yesterday = str(yday)

	# REMEMBER TO REMOVE

	# yesterday = '2016-09-12'
	# today = '2016-09-18'



	# -----

	url = 'http://data.riksdagen.se/dokumentlista/?sok='+searchword

	for arg in searchargs:
		url = url+arg

	if fetchLast24h == True:
		url = url+'&from='+today+'&tom='+today


	url = url+'&utformat=html&a=s'
	print url

	b = mechanize.Browser()
	# url = 'http://data.riksdagen.se/dokumentlista/?sok=&doktyp=votering&rm=&from='+yesterday+'&tom='+today+'&ts=&bet=&tempbet=&nr=&org=&iid=&avd=alla&webbtv=&talare=&exakt=&planering=&sort=datum&sortorder=desc&rapport=&utformat=html&a=s'
   	response = b.open(url).read()

   	soup = BeautifulSoup(str(response))

   	nbrOfHits = soup.findAll('b')[23::2]

   	nbrOfHits = BeautifulSoup(str(nbrOfHits))

   	try:
   		nbrOfHits = nbrOfHits.b.string
   	except Exception as e:
   		return


   	print str(nbrOfHits)

   	try:
		nbrOfHits = int(str(nbrOfHits))
	except ValueError:
		print "Only one page"
		nbrOfHits = 1;

   	nbrOfPages = nbrOfHits/20

   	if ( (nbrOfHits % 20)  > 0 ):
   		nbrOfPages += 1

   	print nbrOfPages

   	searchHits = ''

   	while (nbrOfPages > 0):


   		# REMEMBER TO REMOVE

		# yesterday = '2016-09-12'
		# today = '2016-09-18'

		# -----


   		url = 'http://data.riksdagen.se/dokumentlista/?sok='+searchword


		for arg in searchargs:
			url = url+arg

		if fetchLast24h == True:
			url = url+'&from='+today+'&tom='+today

		url = url+'&utformat=html&a=s&start='+str(nbrOfPages)
   		resp = b.open(url).read()
   		soupy = BeautifulSoup(str(resp))
   		newHits = soupy.findAll("div", { "class" : "searchHit" })
   		searchHits = searchHits+str(newHits)
   		nbrOfPages -= 1

   	# all_votations = soup.find('div', class="searchHit")

    # print all_votations
	return searchHits



# 	response = getVotations.get_riksdata(True, '', "&doktyp=prop", "&sort=datum", "&sortorder=asc")
