#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, sys

# Work around made due the fact production version has an outdated version of
# tempfile module
import tempfile2 as tempfile
import tarfile

from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.core.files.uploadedfile import SimpleUploadedFile
from django import forms
from django.forms import ModelForm
from django.contrib.admin.util import model_ngettext
from django.utils.translation import ugettext_lazy, ugettext as _

from django.contrib.admin.views.decorators import staff_member_required

from forms.models import Formulario, tipoFormulario, UnidadeSaude

import settings


class FormularioForm(forms.Form):
	tipo         = forms.ChoiceField()
	arquivo      = forms.FileField(max_length=300)
	descricao    = forms.CharField(widget=forms.Textarea())
	unidadesaude = forms.ModelMultipleChoiceField(queryset=UnidadeSaude.objects.all())
	def __init__(self, *args, **kwargs):
		super(FormularioForm,self).__init__(*args,**kwargs)
		self.fields['tipo'].choices = self.get_type_options()
	def get_type_options(self):
		import_forms = 'from forms.models import *'
		exec import_forms
		tp_list = tipoFormulario.objects.all()
		types = [[type.nome, type.nome] for type in tp_list]
		types.reverse()
		types.append(['', '--------'])
		types.reverse()
		return types

class FormularioEditForm(ModelForm):
	class Meta:
		model = Formulario
		exclude = ('nome', 'version','path', 'data_insercao')

class UploadError(Exception):
	def __init__(self, value):
		self.value = value
	def __str__(self):
		return self.value

def handle_uploaded_file(f):
	destination = tempfile.NamedTemporaryFile(suffix='.tar.gz', delete=False)
	for chunk in f.chunks():
		destination.write(chunk)
	destination.seek(0)
	destination.close()
	tar = tarfile.open(destination.name)
	final_path = "%s/%s"%( os.path.join(os.path.dirname(os.path.realpath(__file__)), 'modules'), '.'.join(f.name.split('.')[0:-2]))
	dirname, filename = os.path.split(final_path)
	prefix, suffix = os.path.splitext(filename)
	final_path = tempfile.mkdtemp(suffix, prefix+'_', dirname)
	tar.extractall(path=final_path)
	tar.close()
	os.remove(destination.name)
	return final_path

class meta_data:
	def __init__(self, v, v_plural=None):
		self.verbose_name = v
		if not v_plural:
			v_plural = v + 's'
		self.verbose_name_plural = v_plural

def add_formulario(request, app_label='Forms' ):
	if not request.user.is_authenticated():
		return HttpResponseRedirect('/admin/')
	opts = meta_data(u'Formulário')
	if request.method == 'POST':
		form = FormularioForm(request.POST, request.FILES)
		if form.is_valid():
			path = handle_uploaded_file(request.FILES['arquivo'])
			pathname, moduleFormName = os.path.split(path)
			pathname ='%s/'%(pathname,)
			if not pathname in sys.path:
				sys.path.append(pathname)
			moduleForm = __import__(moduleFormName)
			#try:
			#	moduleForm = __import__(moduleFormName)
			#except ImportError:
			#	return HttpResponseRedirect(settings.SITE_ROOT + '/admin/forms/formulario/')
			tipoForm = tipoFormulario.objects.get(nome=form.cleaned_data['tipo'])
			newForm = Formulario(
				nome=moduleForm.name,
				version=moduleForm.version,
				path=path,
				tipo_id=tipoForm.id,
				descricao=form.cleaned_data['descricao']
			)
			newForm.save()
			for us_nome in form.cleaned_data['unidadesaude']:
				us = UnidadeSaude.objects.filter(nome=us_nome)[0]
				newForm.unidadesaude.add(us)
			return HttpResponseRedirect(settings.SITE_ROOT + 'admin/forms/formulario/')
	else:
		form = FormularioForm(auto_id=True)
	add = True
	return render_to_response('change_form.html',
			locals(), RequestContext(request, {}))

def edit_formulario(request, f_id, app_label='Forms'):
	if not request.user.is_authenticated():
		return HttpResponseRedirect('/admin/')
	f = Formulario.objects.get(id=int(f_id))
	if request.method == 'POST':
		form = FormularioEditForm(request.POST, instance=f)
		if form.is_valid():
			tipoForm = tipoFormulario.objects.filter(nome=form.cleaned_data['tipo'])
			f.tipo = tipoForm[0]
			f.descricao = form.cleaned_data['descricao']
			f.save()
			return HttpResponseRedirect('/admin/forms/formulario/')
	else:
		form = FormularioEditForm(instance=f)
	opts = meta_data(u'Formulário')
	original = form.Meta().model().__str__()
	return render_to_response('change_form.html',
			locals(), RequestContext(request, {}))


add_formulario = staff_member_required(add_formulario)
edit_formulario = staff_member_required(edit_formulario)
