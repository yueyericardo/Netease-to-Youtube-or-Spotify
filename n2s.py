#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, render_template
import json
import sys
import urllib.request

app = Flask(__name__)

@app.route('/n2s', methods=['GET'])
def n2s_show():
    return render_template('n2s.html')

@app.route('/n2s', methods=['POST'])
def n2s():
	errRetrive = "No data retrived. \nPlease check the playlist id again."
	playlistId = request.form['playlistId']
	postContent = {"TransCode":"020111","OpenId":"123456789","Body":{"SongListId":playlistId}}
	encodedContent = json.dumps(postContent).encode('utf-8')

	reqUrl = "https://api.hibai.cn/api/index/index"

	req = urllib.request.Request(reqUrl)
	req.add_header('Content-Type', 'application/json; charset=utf-8')
	req.add_header('Accept', 'application/json')

	response = urllib.request.urlopen(req, encodedContent).read()
	data = json.loads(response)

	output = []

	if data["ErrCode"] != "OK":
		print(data["ErrCode"])
		print(errRetrive)
		print(help)

	body = data["Body"]
	playlistName = body["name"]
	tracks = body["songs"]

	for track in tracks:
		trackName = track["title"]
		artist = track["author"]
		output.append(trackName + " - " + artist)  

	return render_template('n2s.html', output=output)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=True)
