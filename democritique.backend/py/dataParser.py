from BeautifulSoup import BeautifulSoup
import mechanize
import getVotations
import databaseConnector
import urllib2

def percentage(link,links):

	i = links.index(link)
	length = len(links)
	print (str(i)+"/"+str(length))
	print str(int((i+1)/float(length)*100))+"%"


def getPropsURLs():


	props = getVotations.get_riksdata(True, "&doktyp=prop", "&sort=datum", "&sortorder=asc")

	soup = BeautifulSoup(str(props))

	dok_url = soup.findAll('h3')
	soup = BeautifulSoup(str(dok_url))

	links = []

	for link in soup.findAll('a'):

	    links.append(link.get('href'))
	    print 'Reading:' + link


	return links


def getPropsData(links):

	data = []

	b = mechanize.Browser()

	for link in links:

		link = 'http:'+str(link)

		response = b.open(link).read()

		soup = BeautifulSoup(str(response))

		items = []

		dok_id = str(soup.dok_id.string)

		rm = str(soup.rm.string)

		organ = str(soup.organ.string)

		datum = str(soup.datum.string[0:-9])

		titel = str(soup.titel.string)

		try:
			pdf = str(soup.fil_url.string)
		except AttributeError:
			print 'PDF URL not found'
			pdf = 'none'

		items.append(dok_id)
		items.append(rm)
		items.append(organ)
		items.append(datum)
		items.append(titel)
		items.append(pdf)

		for item in items:
			print item

		print "-------"

		data.append(items)

	return data

def getURLs(doctype):


	urls = getVotations.get_riksdata(True, "&doktyp="+doctype, "&sort=datum", "&sortorder=desc")

	soup = BeautifulSoup(str(urls))

	dok_url = soup.findAll('h3')
	soup = BeautifulSoup(str(dok_url))

	links = []

	for link in soup.findAll('a'):

	    links.append(link.get('href'))
	    print 'Reading: ' + link.get('href')


	return links

def getBetData(links):

	data = []
	errors = []
	b = mechanize.Browser()

	for link in links:

		try:
			link = 'http:'+link.encode('utf-8')
		except UnicodeEncodeError:
			print link
			continue

		try:
			response = b.open(link).read()
			print "Opening link: " + link
		except mechanize.HTTPError as e:
			print 'Cannot open'+link
			continue
		except urllib2.URLError as e:
			print 'Cannot open '+link
			continue

		soup = BeautifulSoup(str(response))

		items = []

		try:
			dok_id = str(soup.dok_id.string)
			dok_id_votes = str(soup.dok_id.string)[4:]
		except AttributeError:
			errors.append(link)
			continue

		rm = str(soup.rm.string)

		decisionDescription = ''
		description = ''

		try:
			i = len(soup.findAll('uppgift'))-1
			while (i>=0):

				if (soup.findAll('uppgift')[i].kod):

					if (soup.findAll('uppgift')[i].kod.string == 'notis'):
						decisionDescription = soup.findAll('uppgift')[i].findAll('text')[0].string
						decisionDescription = str(BeautifulSoup(decisionDescription, convertEntities=BeautifulSoup.HTML_ENTITIES))
					elif (soup.findAll('uppgift')[i].kod.string == 'utsknotis'):
						description = soup.findAll('uppgift')[i].findAll('text')[0].string
						description = str(BeautifulSoup(description, convertEntities=BeautifulSoup.HTML_ENTITIES))

				i = i-1

		except IndexError:
			print 'wtf';

		except AttributeError:
			print 'wtf';

		datum = str(soup.datum.string[0:-9])

		titel = str(soup.titel.string)

		if soup.aktivitet:
			try:
				beslut = str(soup.findAll('aktivitet')[-1].status.string)
				beslutsdatum = str(soup.findAll('aktivitet')[-1].datum.string)
			except IndexError:
				beslut = str(soup.aktivitet.status.string)
				beslutsdatum = str(soup.aktivitet.datum.string)
		else:
			beslut = 'none'
			beslutsdatum = 'none'


		try:
			pdf = str(soup.findAll('fil_url')[-1].string)
		except AttributeError:
			print 'PDF URL not found'
			pdf = 'none'
		except IndexError:
			try:
				pdf = str(soup.fil_url.string)
			except AttributeError:
				pdf = 'none'
				print 'No PDF found'


		items.append(unicode(dok_id, 'utf-8'))
		items.append(unicode(dok_id_votes, 'utf-8'))
		items.append(unicode(rm, 'utf-8'))
		items.append(unicode(description, 'utf-8'))
		items.append(unicode(datum, 'utf-8'))
		items.append(unicode(titel, 'utf-8'))
		items.append(unicode(pdf, 'utf-8'))
		items.append(unicode(beslut, 'utf-8'))
		items.append(unicode(beslutsdatum, 'utf-8'))
		items.append(unicode(decisionDescription, 'utf-8'))

		for item in items:
			print item

		print "-------"

		data.append(items)

	return data

def getVotationData(links):

	errors = []
	b = mechanize.Browser()

	for link in links:

		try:
			link = 'http:'+link.encode('utf-8')
		except UnicodeEncodeError:
			print link
			continue

		try:
			response = b.open(link).read()
			print "Opening link: " + link
		except mechanize.HTTPError as e:
			print 'Cannot open'+link
			continue
		except urllib2.URLError as e:
			print 'Cannot open'+link
			continue

		soup = BeautifulSoup(str(response))

		for vote in soup.findAll('votering'):

			try:
				dok_id = str(vote.beteckning.string)
			except AttributeError:
				errors.append(link)
				continue

			person_id = str(vote.intressent_id.string)
			name = str(vote.namn.string)
			party = str(vote.parti.string)
			vote = str(vote.rost.string)


			print(unicode(dok_id, 'utf-8'))
			print(unicode(person_id, 'utf-8'))
			print(unicode(name, 'utf-8'))
			print(unicode(party, 'utf-8'))
			print(unicode(vote, 'utf-8'))

			print "-------"

			databaseConnector.insert_votes(unicode(dok_id, 'utf-8'),unicode(person_id, 'utf-8'),unicode(name, 'utf-8'),unicode(party, 'utf-8'),unicode(vote, 'utf-8'))



def getRefs(links):

	data = []

	b = mechanize.Browser()

	for link in links:

		try:
			link = 'http:'+link.encode('utf-8')
		except UnicodeEncodeError:
			print link
			continue

		try:
			response = b.open(link).read()
			print "Opening link: " + link
		except mechanize.HTTPError as e:
			print 'Cannot open'+link
			continue
		except urllib2.URLError as e:
			print 'Cannot open'+link
			continue

		soup = BeautifulSoup(str(response))

		try:
			docrefs = soup.dokreferens.findAll('referens')
		except AttributeError:
			print 'Attribute error'
			print link

		for docref in docrefs:

			refs = []

			try:
				reftype = docref.referenstyp.string
				title = docref.ref_dok_titel.string
				doktype = docref.ref_dok_typ.string
				dok_id = docref.ref_dok_id.string
				parent = soup.dok_id.string
			except AttributeError:
				reftype = ''
				title = ''
				doktype = ''
				dok_id = ''
				parent = ''

			refs.append(dok_id)
			refs.append(title)
			refs.append(doktype)
			refs.append(reftype)
			refs.append(parent)

			data.append(refs)



	return data


def getMotData(links):

	data = []

	b = mechanize.Browser()

	for link in links:

		try:
			link = 'http:'+link.unicode('utf-8')
		except UnicodeEncodeError:
			print link
			continue
		except AttributeError:
			try:
				link = 'http:'+link.encode('utf-8')
			except UnicodeEncodeError:
				print link
				continue

		try:
			response = b.open(link).read()
			print "Opening link: " + link
		except mechanize.HTTPError as e:
			print 'Cannot open'+link
			continue
		except urllib2.URLError as e:
			print 'Cannot open'+link
			continue

		soup = BeautifulSoup(str(response))

		items = []

		try:

			dok_id = str(soup.dok_id.string)

			rm = str(soup.rm.string)

			party = str(soup.dokintressent.partibet.string)

			datum = str(soup.datum.string[0:-9])

			titel = str(soup.titel.string)

		except AttributeError:
				print "ERROR! Couldn't read tags reference tag of document"+soup.dok_id.string
				continue
		try:
			pdf = str(soup.findAll('fil_url')[-1].string)
		except AttributeError:
			print 'PDF URL not found'
			pdf = 'none'
		except IndexError:
			try:
				pdf = str(soup.fil_url.string)
			except AttributeError:
				pdf = 'none'
				print 'No PDF found'


		items.append(dok_id)
		items.append(rm)
		items.append(party)
		items.append(datum)
		items.append(titel)
		items.append(pdf)

		for item in items:
			print item

		print "-------"

		data.append(items)

	return data

def getMotIntressents(links):

	data = []

	print "lol"

	b = mechanize.Browser()

	for link in links:

		link = 'http:'+str(link)

		response = b.open(link).read()

		soup = BeautifulSoup(str(response))

		items = []

		soupy = BeautifulSoup(str(soup.dokintressent))

		for intressent in soupy.findAll('intressent'):



			person = intressent.namn.string

			intressent_id = intressent.intressent_id.string

			party = intressent.partibet.string

			role = intressent.roll.string

			order = intressent.ordning.string

			dok_id = soup.dok_id.string



			items.append(person)
			items.append(intressent_id)
			items.append(party)
			items.append(role)
			items.append(order)
			items.append(dok_id)

			for item in items:
				print item

			print "-------"

			data.append(items)

	return data

def getDocRefers(links):

	b = mechanize.Browser()

	print "Starting to fetch document references..."
	print "----------------------------------------"

	for link in links:

		try:
			link = 'http:'+link.encode('utf-8')
		except UnicodeEncodeError:
			print "Error!!! "+link+" could not be opened!"
			continue

		try:
			response = b.open(link).read()
			print "Opening link: " + link
		except mechanize.HTTPError as e:
			print 'Cannot open'+link
			continue
		except urllib2.URLError as e:
			print 'Cannot open'+link
			continue

		soup = BeautifulSoup(str(response))



		soupy = BeautifulSoup(str(soup.dokreferens))

		for docref in soupy.findAll('referens'):

			try:
				reftype = docref.referenstyp.string
				title = docref.ref_dok_titel.string
				doktype = docref.ref_dok_typ.string
				dok_id = docref.ref_dok_id.string
				parent = soup.dok_id.string

				print(reftype)
				print(title)
				print(doktype)
				print(dok_id)
				print(parent)

				databaseConnector.insert_refs(str(dok_id),str(title),str(doktype),str(reftype),str(parent))

			except AttributeError:
				print "ERROR! Couldn't read tags reference tag of document"+soup.dok_id.string
				continue



			print "-------"

def updateReports():

	dokidslist = databaseConnector.check_reports()

	print len(dokidslist)

	links = []

	for dokid in dokidslist:

		urls = getVotations.get_riksdata(False, dokid[0])

		soup = BeautifulSoup(str(urls))

		dok_url = soup.findAll('h3')
		soup = BeautifulSoup(str(dok_url))

		for link in soup.findAll('a'):

		    links.append(link.get('href'))
		    print 'Reading: ' + link.get('href')

	data = getBetData(links)

	for item in data:
		databaseConnector.insert_bet(*item)

def getMissingDocRefers():

	dokidslist = databaseConnector.check_refless_reports()

	print len(dokidslist)

	links = []

	for dokid in dokidslist:

		urls = getVotations.get_riksdata(False, dokid[0])

		soup = BeautifulSoup(str(urls))

		dok_url = soup.findAll('h3')
		soup = BeautifulSoup(str(dok_url))

		for link in soup.findAll('a'):

		    links.append(link.get('href'))
		    print 'Reading: ' + link.get('href')

	data = getDocRefers(links)


def updateMotions():

	dokidslist = databaseConnector.check_motions()

	print len(dokidslist)

	links = []

	for dokid in dokidslist:

		percentage(dokid,dokidslist)

		urls = getVotations.get_riksdata(False, dokid[0])

		soup = BeautifulSoup(str(urls))

		dok_url = soup.findAll('h3')
		soup = BeautifulSoup(str(dok_url))

		for link in soup.findAll('a'):

		    links.append(link.get('href'))
		    print 'Reading: ' + link.get('href')

	data = getMotData(links)

	for item in data:
		databaseConnector.insert_mot(*item)

def updatePropositions():

	dokidslist = databaseConnector.check_propositions()

	print len(dokidslist)

	links = []

	for dokid in dokidslist:

		urls = getVotations.get_riksdata(False, dokid[0])

		soup = BeautifulSoup(str(urls))

		dok_url = soup.findAll('h3')
		soup = BeautifulSoup(str(dok_url))

		for link in soup.findAll('a'):

		    links.append(link.get('href'))
		    print 'Reading: ' + link.get('href')

	data = getPropsData(links)

	for item in data:
		databaseConnector.insert_prop(*item)

def fixMissingDocRefs():

	dokidslist = databaseConnector.check_refless_reports()

	print len(dokidslist)

	links = []

	for dokid in dokidslist:

		urls = getVotations.get_riksdata(False, dokid[0])

		soup = BeautifulSoup(str(urls))

		dok_url = soup.findAll('h3')
		soup = BeautifulSoup(str(dok_url))

		for link in soup.findAll('a'):

		    links.append(link.get('href'))
		    print 'Reading: ' + link.get('href')

	data = getDocRefers(links)

def fixMissingVotes():

	dokidslist = databaseConnector.check_voteless_reports()

	print len(dokidslist)

	links = []

	for dokid in dokidslist:

		print dokid[0]

		links.append("//data.riksdagen.se/voteringlista/?bet=" + dokid[0] + "&sz=349&utformat=xml")

	data = getVotationData(links)





#
# links = []
# links.append("//data.riksdagen.se/voteringlista/?bet=KU20&punkt=&valkrets=&rost=&iid=&sz=500&utformat=xml&gruppering=")
#
# getVotationData(links)


# updateReports()
#
# links = getURLs('bet')
# data = getBetData(links)
#
# for item in data:
# 	databaseConnector.insert_bet(*item)


getMissingDocRefers()
updatePropositions()
updateMotions()
fixMissingVotes()



############################--><---#################

# links = getURLs('bet')


# for item in data:


# 	print item
# 	print 'Inserted into database'


# links = getMotsURLs()
# data = getMotData(links)
# #intressents = getMotIntressents(links)

# for item in data:
# 	databaseConnector.insert_mot(*item)




# Getting Props

# links = getPropsURLs()
# data = getPropsData(links)

# for item in data:

# 	databaseConnector.insert_prop(*item)
