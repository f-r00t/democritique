import mechanize
import databaseConnector
from BeautifulSoup import BeautifulSoup as bs

def processGlobalVotes():

	b = mechanize.Browser()

	response = b.open('http://localhost/sites/riksdagen/php/fetchGlobalVotes.php').read()

	soup = bs(str(response))

	partyvotes = soup.findAll('span')

	for vote in partyvotes:

		party = vote.party.text
		votes = vote.partyvote.text

		print party
		print votes

		databaseConnector.insert_globalvote(str(party), str(votes))

processGlobalVotes()
