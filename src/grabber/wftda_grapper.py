import requests
import re
import calendar

from lxml import html
from lxml import etree

from datetime import datetime
from datetime import date
from datetime import timedelta
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['drby']

def retrieve_page_tree(url, xpath):
	headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
	page = requests.get(url, headers=headers)
	tree = html.fromstring(page.content)
	return tree.xpath(xpath)

def import_rankings(raking_date):
	url = base_url + calendar.month_name[ranking_date.month].lower() + '-' + str(ranking_date.day) + '-' + str(ranking_date.year) + '/'
	print(url)

	rows = retrieve_page_tree(url, '//tbody/tr')

	is_valid_ranking = len(rows) > 0
	ranking_exists = db.rankings.find({"date": {
			'$eq': raking_date
    	}}).count() > 0

	if is_valid_ranking and not ranking_exists:

		db.rankings.insert_one({
			"date" : raking_date
		})

		for row in rows:
			is_valid_row = len(row) == 7
			if is_valid_row:

				# WFTDA website behaved kind of strange - rankings hava a different format?!
				if (len(row[3])):
					wins = int(row[3][0].text)
					losses = int(row[4][0].text)
					weight = float(row[5][0].text)
				else:
					wins = int(row[3].text)
					losses = int(row[4].text)
					weight = float(row[5].text)
				league_name = row[2].text

				score = float(row[6].text.replace(",", ""))

				db.rankings.update({"date" : raking_date}, {'$push' : {
						'team': {
							'name' : league_name,
							'wins' : wins,
							'losses' : losses,
							'weight' : weight,
							'score' : score
						}
					}})

	

def previous_ranking(current_date):
	month = current_date.month - 1
	year = current_date.year
	if (month == 0):
		month = 12
		year = year - 1

	return datetime(year, month, calendar.monthrange(year, month)[1])

base_url = 'https://wftda.com/rankings-'
ranking_date = date.today()

for i in range(15):
	ranking_date = previous_ranking(ranking_date)
	import_rankings(ranking_date)

print("done.")
