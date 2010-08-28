#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os,sys
import tempfile
import tarfile
from datetime import datetime, date, time

from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.simple import direct_to_template
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.core.files.uploadedfile import SimpleUploadedFile
from django import forms
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login,logout

from forms.models import UnidadeSaude

def getState(cep):
	state =''
	prefixo = int(cep[0:5])
	if int(cep[0]) < 2:
		state = 'sp'
	elif prefixo >= 20000 and prefixo < 29000:
		state = 'rj'
	elif prefixo >= 29000 and prefixo < 30000:
		state = 'es'
	elif int(cep[0]) ==3:
		state = 'mg'
	elif prefixo >= 40000 and prefixo < 49000:
		state = 'ba'
	elif prefixo >= 49000 and prefixo <= 49999:
		state = 'se'
	elif prefixo >= 50000 and prefixo <= 56999:
		state = 'pe'
	elif prefixo >= 57000 and prefixo <= 57999:
		state = 'al'
	elif prefixo >= 58000 and prefixo <= 58999:
		state = 'pb'
	elif prefixo >= 59000 and prefixo <= 59999:
		state = 'rn'
	elif prefixo >= 60000 and prefixo <= 63999:
		state = 'ce'
	elif prefixo >= 64000 and prefixo <= 64999:
		state = 'pi'
	elif prefixo >= 65000 and prefixo <= 65999:
		state = 'ma'
	elif prefixo >= 66000 and prefixo <= 68899:
		state = 'pa'
	elif prefixo >= 68900 and prefixo <= 68999:
		state = 'ap'
	elif prefixo >= 69000 and prefixo <= 69299:
		state = 'am'
	elif prefixo >= 69400 and prefixo <= 69899:
		state = 'am'
	elif prefixo >= 69300 and prefixo <= 69399:
		state = 'ro'
	elif prefixo >= 69900 and prefixo <= 69999:
		state = 'ac'
	elif prefixo >= 70000 and prefixo <= 73699:
		state = 'df'
	elif prefixo >= 73700 and prefixo <= 76799:
		state = 'go'
	elif prefixo >= 76800 and prefixo <= 76999:
		state = 'rn'
	elif prefixo >= 77000 and prefixo <= 77999:
		state = 'to'
	elif int(cep[0]) ==9:
		state = 'rs'
	elif prefixo >= 78000 and prefixo <= 78899:
		state = 'mt'
	elif prefixo >= 79000 and prefixo <= 79999:
		state = 'ms'
	elif prefixo >= 80000 and prefixo <= 86999:
		state = 'pr'
	elif prefixo >= 87000 and prefixo <= 89999:
		state = 'sc'
	return state


def correct_address(request, cep):
	state = getState(cep)
	import_autocomplete = "from autocomplete.models import ruas%s as acTool"%(state,)
	exec import_autocomplete
	r = acTool.objects.filter(CEP=cep)
	if not r:
		json = "{}"
	else:
		r = r[0]
		json = """
		{
			"street"  : "%s",
			"city": "%s",
			"state": "%s"
		}
		"""%(r.Logradouro + ' ' + r.Nome , r.Localidade, state.upper())
	return HttpResponse(json)

def list_forms_by_health_unit(request, healthUnit):
	import_str = 'from forms.models import UnidadeSaude, Formulario'
	exec import_str
	us = UnidadeSaude.objects.get(id=int(healthUnit))
	form_list = Formulario.objects.filter(unidadesaude=us)
	return  render_to_response('showForms.html',
			locals(), RequestContext(request, {}))

def show_form(request, formId, f=''):
	import_str = 'from forms.models import Formulario'
	exec import_str
	form = Formulario.objects.get(id=int(formId))
	pathname, moduleFormName = os.path.split(form.path)
	pathname ='%s/'%(pathname,)
	if not pathname in sys.path:
		sys.path.append(pathname)
	try:
		moduleForm = __import__(moduleFormName)
	except ImportError:
		return HttpResponse('FAILED')
	return moduleForm.handle_request(request, f)


class PatientForm(forms.Form):
	nome    = forms.CharField(widget=forms.TextInput(attrs={'class':'textInput'}))
	data_nascimento= forms.DateTimeField(  ('%d/%m/%Y',),
										label='Data de Nascimento',
										widget=forms.DateTimeInput(format='%d/%m/%Y',
											attrs={
												'class':'input date',
												'readonly':'readonly',
												'size':'15'
												})
									)
	nome_mae    = forms.CharField(label=u'Nome da Mãe',
								widget=forms.TextInput(attrs={'class':'textInput'}))
	unidadesaude = forms.ModelChoiceField(queryset=UnidadeSaude.objects.all(),
									label=u'Unidade de Saúde')

	class Media:
		# Plug in the javascript we will need:
		css = {'all':("/custom-media/css/jquery-ui.css",)}
		js =  ( "/custom-media/js/jquery/jquery.min.js",
				"/custom-media/js/jquery/jquery.ui.js")

	def __init__(self, *args, **kwargs):
		super(PatientForm,self).__init__(*args,**kwargs)

def show_patients(request):
	import_str = 'from forms.models import Paciente, UnidadeSaude,Ficha, Formulario'
	exec import_str
	MEDIA = '/custom-media/'
	us_list = UnidadeSaude.objects.all()
	if request.method == 'POST':
		form = PatientForm(request.POST)
		if form.is_valid():
			data_nascimento=request.POST['data_nascimento']
			newPatient = Paciente ( nome= request.POST['nome'],
									data_nascimento=data_nascimento,
									nome_mae= request.POST['nome_mae'])
			newPatient.save()
			us_id = request.POST['unidadesaude']
			us = UnidadeSaude.objects.get(id=us_id)
			newPatient.unidadesaude.add(us)
	form = PatientForm(auto_id=True)
	patient_list = Paciente.objects.all()
	forms_list   = Formulario.objects.all()
	return render_to_response('show.Patients.html',
			locals(), RequestContext(request, {}))

def sapem_login(request):
	if request.method == 'POST':
		user = authenticate(username=request.POST['username'], password=request.POST['password'])
		if user is not None:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect('/')
			return direct_to_template(request, 'inactive_account.html')
		return direct_to_template(request, 'invalid_login.html')

def sapem_logout(request):
	logout(request)
	return HttpResponseRedirect('/')


