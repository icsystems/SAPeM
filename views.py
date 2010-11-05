#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os,sys
import tempfile
import tarfile
from unicodedata import normalize
from datetime import datetime, date, time

from django import forms

from django.http import HttpResponse,HttpResponseNotFound, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext

from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login,logout
from django.views.generic.simple import direct_to_template

import settings
from forms.models import UnidadeSaude

class customError(Exception):
	def __init__(self, value):
		self.value = value
	def __str__(self):
		return repr(self.value)

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
	if not request.user.is_authenticated():
		return HttpResponseRedirect(settings.SITE_ROOT)
	import_str = 'from forms.models import UnidadeSaude, Formulario'
	exec import_str
	us = UnidadeSaude.objects.get(id=int(healthUnit))
	form_list = Formulario.objects.filter(unidadesaude=us)
	return  render_to_response('showForms.html',
			locals(), RequestContext(request, {}))

def normalizeString(txt, codif='utf-8'):
	txt = normalize('NFKD', txt.decode(codif)).encode('ASCII','ignore')
	return txt.lower()

def createXML(keys, dictValues):
	xmlStr = u'<?xml version="1.0" encoding="utf-8"?>'
	xmlStr += u'<documento>'
	for k in keys:
		xmlStr += u'<%s>%s</%s>'%(k,dictValues[k],k)
	xmlStr += u'</documento>'
	return xmlStr

def handle_form(request, formId, patientId, f=''):
	if not request.user.is_authenticated():
		return HttpResponseRedirect(settings.SITE_ROOT)
	import_str = 'from forms.models import Paciente, UnidadeSaude,Ficha, Formulario'
	exec import_str
	if request.method == 'POST':
		form = request.POST
		if int(patientId) == 0: # new patient
			nome = form['nome']
			nome_mae = form['nome_mae']
			data_nascimento = form['data_nascimento']
			new_patient = Paciente(
				nome=nome,
				nome_mae = nome_mae,
				data_nascimento=data_nascimento
			)
			# TODO treat duplicated entries
			new_patient.save()
			p = new_patient
		else:
			p = Paciente.objects.get(id=int(patientId))
		keys = [k for k in form]
		xmlStr = createXML(keys, form)
		us = request.user.get_profile().unidadesaude_favorita
		f = Formulario.objects.get(id=int(formId))
		newFicha = Ficha(
			paciente   = p,
			formulario = f,
			unidadesaude = us,
			conteudo   = xmlStr
		)
		newFicha.save()
		return HttpResponseRedirect(settings.SITE_ROOT)
	# else
	form = Formulario.objects.get(id=int(formId))
	pathname, moduleFormName = os.path.split(form.path)
	pathname ='%s/'%(pathname,)
	if not pathname in sys.path:
		sys.path.append(pathname)
	try:
		moduleForm = __import__(moduleFormName)
	except ImportError:
		msg = 'Módulo não encontrado'
		url = settings.SITE_ROOT
		return render_to_response('error.html',
			locals(), RequestContext(request, {}))
	return moduleForm.handle_request(request, f)


def homepage_view(request):
	import_str = "from forms.models import tipoFormulario, Formulario, Grupo, Grupo_Formulario, UserProfile"
	exec import_str
	if request.user.is_authenticated():
		us_favorite = None
		groups = Grupo.objects.filter(membros=request.user)
		try:
			us_favorite = request.user.get_profile().unidadesaude_favorita
			if not us_favorite: #User did not belong to a group
				# Check whether now he belongs to one and set a favorite US
				groups = Grupo.objects.filter(membros=request.user)
				if groups.count():
					us_favorite= groups[0].unidadesaude
					profile = request.user.get_profile()
					profile.unidadesaude_favorita = us_favorite
					profile.save()
		except UserProfile.DoesNotExist: #Profile was not created yet
			if groups.count():
				us_favorite= groups[0].unidadesaude
			if us_favorite:
				profile = UserProfile(unidadesaude_favorita= us_favorite, user=request.user)
			else:
				profile = UserProfile(user=request.user)
			profile.save()
		ft = tipoFormulario.objects.get(nome='Triagem')
		triagem_form_list = Formulario.objects.filter(tipo=ft)
		# Remove forms that the user does not have permission
		for f in triagem_form_list:
			if groups.count():
				for gr in groups:
					gf = Grupo_Formulario.objects.filter(formulario=f).filter(grupo=gr)
					if gf.count():
						if gf[0].permissao != 'T':
							del f
			else: #User does not belong to any group, so do not access any form
				triagem_form_list = Formulario.objects.none()
	url = settings.SITE_ROOT
	return render_to_response('homepage_template.html',
			locals(), RequestContext(request, {}))

def getPatientList(us):
	import_str = 'from forms.models import Paciente, Ficha, Formulario, Grupo, Grupo_Formulario'
	exec import_str
	patient_list = []
	fichas = Ficha.objects.filter(formulario__tipo__nome='Triagem').filter(unidadesaude__in = us)
	if fichas:
		for f in fichas:
			patient_list.append(f.paciente)
	return patient_list

def getFilledFormsId(patient):
	import_str = 'from forms.models import Paciente, Ficha, Formulario'
	exec import_str
	retList = []
	fichas = Ficha.objects.select_related().filter(paciente=patient)
	retList = [ f.formulario.id for f in fichas]
	return retList

def show_patients(request):
	if not request.user.is_authenticated():
		return HttpResponseRedirect(settings.SITE_ROOT)
	import_str = 'from forms.models import Paciente, UnidadeSaude,Ficha, Formulario, Grupo, Grupo_Formulario'
	exec import_str
	MEDIA = 'custom-media/'
	groups       = Grupo.objects.filter(membros=request.user)
	us_list = []
	for gr in groups:
		#Get "Unidade de Saudes" that the user's groups belong to.
		us_list.append(gr.unidadesaude)
	#Get "Unidade de Saude" related to the user's defined
	for us in us_list:
		for us2 in us.relacionamento.all():
			if us2 not in us_list:
				us_list.append(us2)
	forms_list = [ gf.formulario for gf in Grupo_Formulario.objects.filter(grupo__in = groups)]
	patient_list = getPatientList(us_list)
	patient_fichas = {}
	for p in patient_list:
		patient_fichas[p.id] = getFilledFormsId(p)
	url = settings.SITE_ROOT
	return render_to_response('show.Patients.html',
			locals(), RequestContext(request, {}))

def list_patients(request):
	if not request.user.is_authenticated():
		return HttpResponseRedirect(settings.SITE_ROOT)
	import_str = 'from forms.models import Paciente, UnidadeSaude, Grupo'
	exec import_str
	groups       = Grupo.objects.filter(membros=request.user)
	us_list = []
	for gr in groups:
		us_list.append(gr.unidadesaude)
	patient_list = getPatientList(us_list)
	return render_to_response('list.Patients.html',
			locals(), RequestContext(request, {}))

def sapem_login(request):
	url = settings.SITE_ROOT
	if request.method == 'POST':
		user = authenticate(username=request.POST['username'], password=request.POST['password'])
		if user is not None:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect(url)
			msg = u'Conta Inativa. Contate o administrador do sistema.'
			return render_to_response('error.html',
				locals(), RequestContext(request, {}))
		msg = u'Usuário e/ou senha inválida'
		return render_to_response('homepage_template.html',
			locals(), RequestContext(request, {}))

def sapem_logout(request):
	logout(request)
	return HttpResponseRedirect(settings.SITE_ROOT)

def retrieveFichas(patientId, formType='' ,lastInserted=True):
	import_str = 'from forms.models import Paciente, UnidadeSaude,Ficha, Formulario, tipoFormulario'
	exec import_str
	register_list =[]
	try:
		patient = Paciente.objects.get(id=patientId)
	except Paciente.DoesNotExist:
		register_list.append("<?xml version='1.0' encoding='UTF-8' ?><error>Paciente não achado</error>")
		return register_list
	register_qs = Ficha.objects.filter(paciente=patient)
	if formType != '':
		t = tipoFormulario.objects.get(nome=formType)
		register_qs = register_qs.filter(formulario__tipo=t)
	if not register_qs:
		raise customError('A busca não retornou resultados')
	for r in register_qs.order_by('data_insercao'):
		register_list.append(r)
		if lastInserted:
			break
	return register_list

def showPatientLastRegister(request,patientId, formId):
	if not request.user.is_authenticated():
		return HttpResponseRedirect(settings.SITE_ROOT)
	import_str = 'from forms.models import Paciente, UnidadeSaude,Ficha, Formulario'
	exec import_str
	try:
		form = Formulario.objects.get(id=formId)
		try:
			xml = retrieveFichas(int(patientId), form.tipo)[0].conteudo
		except customError, e:
			msg = e.value
			if request.method == 'GET':
				url = settings.SITE_ROOT
				return render_to_response('error.html',
					locals(), RequestContext(request, {}))
			return HttpResponseNotFound('A busca não retornou resultados')
	except Formulario.DoesNotExist:
		xml = "<?xml version='1.0' encoding='UTF-8' ?><error>Formulario não achado</error>"
	return HttpResponse(xml)

def showPatientRegisters(request,patientId, formId):
	if not request.user.is_authenticated():
		return HttpResponseRedirect(settings.SITE_ROOT)
	import_str = 'from forms.models import Paciente, UnidadeSaude,Ficha, Formulario'
	exec import_str
	form = Formulario.objects.get(id=formId)
	try:
		register_list = retrieveFichas(int(patientId), form.tipo, False)
	except customError, e:
		msg = e.value
		if request.method == 'GET':
			url = settings.SITE_ROOT
			return render_to_response('error.html',
				locals(), RequestContext(request, {}))
		return HttpResponseNotFound('A busca não retornou resultados')
	registers = {}
	patient = Paciente.objects.get(id=int(patientId))
	for r in register_list:
		registers[r.data_insercao] = r.conteudo
	return render_to_response('show.registers.html',
		locals(), RequestContext(request, {}))


