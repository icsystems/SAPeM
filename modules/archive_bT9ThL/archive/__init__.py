#!/usr/bin/env python
# encoding: utf-8

import os.path
from django.http import HttpResponse
import django.views.static as static
import autocomplete as ac

name = 'Triagem Score'
version = 'v1.0.0'

def handle_request(request, fileName):
	curr_dir = os.path.realpath(os.path.dirname(__file__))
	media_dir = os.path.join(curr_dir, 'media')
	if fileName == '': fileName = "index.html"
	if fileName == 'cgi-bin/autocomplete.py':
		service = request.REQUEST['service']
		city = ''
		if 'city' in request.REQUEST:
			city = request.REQUEST['city']
		state = ''
		if 'state' in request.REQUEST:
			state = request.REQUEST['state']
		q = ''
		if 'query' in request.REQUEST:
			q = request.REQUEST['query']
		return HttpResponse(ac.autocomplete(service, q=q, city=city, state=state))
	return static.serve(request, fileName, document_root=media_dir, show_indexes=True)

__all__ = ['name', 'version', 'handle_request']

