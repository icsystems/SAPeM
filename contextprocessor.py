#!/usr/bin/env python


import settings

def siteroot(request):
	return {'SITE_ROOT': settings.SITE_ROOT}
