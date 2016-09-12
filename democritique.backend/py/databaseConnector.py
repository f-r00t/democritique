#!/usr/bin/env python
# -*- coding: utf-8 -*-

import mysql.connector
from datetime import date, datetime, timedelta

def delete_old_items():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("DELETE FROM reports WHERE beslut = 'planerat' AND beslutsdatum <= CURDATE()")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()


def check_reports():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("SELECT dok_id FROM reports WHERE beslut = 'planerat' AND beslutsdatum <= CURDATE()")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()

	return data


def check_voteless_reports():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("SELECT dok_id_votes FROM reports WHERE beslut = 'inträffat' AND NOT EXISTS (SELECT * FROM polvotes WHERE polvotes.dok_id = reports.dok_id_votes)")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()

	return data

def get_partyVotes():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("SELECT dok_id FROM reports WHERE NOT EXISTS (SELECT * FROM polvotes WHERE polvotes.dok_id = reports.dok_id_votes AND polvotes.name = 'theparty')")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()

	return data



def check_refless_reports():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("SELECT dok_id FROM reports WHERE NOT EXISTS (SELECT * FROM docrefs WHERE docrefs.parent = reports.dok_id)")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()

	return data



def check_motions():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("SELECT dok_id FROM docrefs WHERE doktype = 'mot' AND NOT EXISTS (SELECT * FROM motions WHERE docrefs.dok_id = motions.dok_id)")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()

	return data

def check_propositions():

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	query = ("SELECT dok_id FROM docrefs WHERE doktype = 'prop' AND NOT EXISTS (SELECT * FROM propositions WHERE docrefs.dok_id = propositions.dok_id)")

	cursor.execute(query)

	data = cursor.fetchall()

	cnx.close()

	return data




def insert_prop(dok_id, rm, organ, datum, titel, pdf):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
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

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
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

def insert_bet(dok_id, dok_id_votes, rm, description, datum, titel, pdf, beslut, beslutsdatum, decisionDescription):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	add_proposition = ("INSERT INTO reports "
	               "(dok_id, dok_id_votes, rm, description, datum, titel, pdf, beslut, beslutsdatum, decisionDescription) "
	               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")

	data_proposition = (dok_id, dok_id_votes, rm, description, datum, titel, pdf, beslut, beslutsdatum, decisionDescription)

	cursor.execute(add_proposition, data_proposition)

	cnx.commit()

	cnx.close()

def insert_refs(dok_id, title, doktype, reftype, parent):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
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


def insert_votes(dok_id, person_id, name, party, vote):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	operation = ("INSERT INTO polvotes "
	               "(dok_id, person_id, name, party, vote) "
	               "VALUES (%s, %s, %s, %s, %s)")

	data = (dok_id, person_id, name, party, vote)

	cursor.execute(operation, data)

	cnx.commit()

	cnx.close()

def insert_news(descr, title, link, domain, img):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	operation = ("INSERT IGNORE INTO news "
	               "(description, title, link, domain, img) "
	               "VALUES (%s, %s, %s, %s, %s)")


	data = (descr, title, link, domain, img)

	cursor.execute(operation, data)

	cnx.commit()

	cnx.close()

def insert_globalvote(party, votes):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	operation = ("INSERT INTO globalvotes "
	               "(party, votes) "
	               "VALUES (%s, %s)")


	data = (party, votes)

	cursor.execute(operation, data)

	cnx.commit()

	cnx.close()

def insert_globalvote2(party, votes, date):

	cnx = mysql.connector.connect(user='riksdata', password='pY5yjCsRsKFZqSS5',
	                              host='127.0.0.1',
	                              database='riksdata')

	cursor = cnx.cursor()

	operation = ("INSERT INTO globalvotes "
	               "(party, votes, date) "
	               "VALUES (%s, %s, %s)")


	data = (party, votes, date)

	cursor.execute(operation, data)

	cnx.commit()

	cnx.close()

# insert_prop('H203139','2014/15','Justitiedepartementet','2016-06-25','Europeisk skyddsorder')
