from lxml import html
from lxml import etree

import time
from datetime import datetime
from datetime import date
from datetime import timedelta

import requests
import re

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['drby']

league_name_cache = dict()
min_date = date.today() - timedelta(days=30*15)

def retrieve_page_tree(url, xpath):
	# print url
	page = requests.get(url)
	tree = html.fromstring(page.content)
	return tree.xpath(xpath)

def retrieve_leage_name(id):
	if (id in league_name_cache):
		return league_name_cache[id]

	league_name = retrieve_page_tree('http://flattrackstats.com/teams/' + id, '//div[@class="leaguename"]')[0].text
	league_name_cache[id] = league_name
	return league_name

def import_bouts(page):

	imported_bout = False
	bouts = retrieve_page_tree('http://flattrackstats.com/bouts/wftda?page=' + str(page), '//div[@class="view-content"]//tbody/tr')

	if len(bouts) == 0:
		raise Exception("Could not find any bouts")

	for bout in bouts:

		def parse(regex, index):
			return re.search(regex, etree.tostring(bout[index]).decode("utf-8"))

		date_regex = '(\d+)/(\d+)/(\d+)'
		team_regex = '<a.*href="[^\d]*(\d+)[^\d]*".*>(<span[^>]*>)?([^<]+)(</a>|</?span).*'
		score_regex = '(\d+)'
		bout_id_regex = '<a.*href="[^\d]*(\d+)[^\d]*".*>'

		month, day, year  	= parse(date_regex, 0).group(1,2,3)
		home_id, home_name 	= parse(team_regex, 2).group(1,3)
		home_score 			= parse(score_regex, 3).group(1)
		away_id, away_name 	= parse(team_regex, 4).group(1,3)
		away_score 			= parse(score_regex, 5).group(1)
		bout_id				= parse(bout_id_regex, 8).group(1)

		bout_date = date(2000 + int(year), int(month), int(day))

		bout_imported = db.bouts.find({"ftsBoutId": int(bout_id)}).count() > 0
		bout_too_old = bout_date <= min_date
		import_bout = not bout_imported and not bout_too_old

		if import_bout:
			long_home_name = retrieve_leage_name(home_id)
			long_away_name = retrieve_leage_name(away_id)

			print(month + '/' + day + '/' + year + ' - ' + long_home_name + ' vs ' + long_away_name + ' - ' + home_score + ' : ' + away_score)
			# print month + '/' + day + '/' + year + ' - ' + home_name + ' vs ' + away_name + ' - ' + home_score + ' : ' + away_score
			
			db.bouts.insert_one(
				{
					"date" : datetime(2000 + int(year), int(month), int(day)),
					"homeTeam" : long_home_name,
					"homeScore" : int(home_score),
					"awayTeam" : long_away_name,
					"awayScore" : int(away_score),
					"ftsBoutId" : int(bout_id)
				}
			)
			imported_bout = True

	return imported_bout

print("import bouts to earliest", min_date)

page = 0
while import_bouts(page):
	page += 1

print("done.")