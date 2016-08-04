import mysql.connector
from datetime import date, datetime, timedelta

def insert_prop(dok_id, rm, organ, datum, titel, pdf):

	cnx = mysql.connector.connect(user='riksdata', password='secret',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	add_proposition = ("INSERT INTO propositions "
	               "(dok_id, rm, organ, datum, titel, pdf) "
	               "VALUES (%s, %s, %s, %s, %s, %s)")

	data_proposition = (dok_id, rm, organ, datum, titel, pdf)

	cursor.execute(add_proposition, data_proposition)

	cnx.commit()

	cnx.close()

def insert_mot(dok_id, rm, party, datum, titel, pdf):

	cnx = mysql.connector.connect(user='riksdata', password='secret',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	operation = ("INSERT INTO motions "
	               "(dok_id, rm, party, datum, titel, pdf) "
	               "VALUES (%s, %s, %s, %s, %s, %s)")

	data = (dok_id, rm, party, datum, titel, pdf)

	cursor.execute(operation, data)

	cnx.commit()

	cnx.close()

def insert_bet(dok_id, rm, description, datum, titel, pdf, beslut, beslutsdatum, decisionDescription):

	cnx = mysql.connector.connect(user='riksdata', password='secret',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	add_proposition = ("INSERT INTO reports "
	               "(dok_id, rm, description, datum, titel, pdf, beslut, beslutsdatum, decisionDescription) "
	               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")

	data_proposition = (dok_id, rm, description, datum, titel, pdf, beslut, beslutsdatum, decisionDescription)

	cursor.execute(add_proposition, data_proposition)

	cnx.commit()

	cnx.close()

def insert_refs(dok_id, title, doktype, reftype, parent):

	cnx = mysql.connector.connect(user='riksdata', password='secret',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	operation = ("INSERT INTO docrefs "
	               "(dok_id, title, doktype, reftype, parent) "
	               "VALUES (%s, %s, %s, %s, %s)")

	data = (dok_id, title, doktype, reftype, parent)

	cursor.execute(operation, data)

	cnx.commit()

	cnx.close()

# insert_prop('H203139','2014/15','Justitiedepartementet','2016-06-25','Europeisk skyddsorder')
