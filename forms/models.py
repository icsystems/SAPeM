#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import shutil
from django.db import models
from django.contrib.auth.models import User, UserManager


class UnidadeSaude(models.Model):
	nome            = models.CharField(max_length=300,   blank=False)
	CEP             = models.CharField(max_length=9,     blank=False)
	rua             = models.CharField(max_length=300,   blank=False)
	numero          = models.CharField(max_length=10,    blank=True, verbose_name=u'Número')
	complemento     = models.CharField(max_length=30,    blank=True)
	cidade          = models.CharField(max_length=300,   blank=False)
	UF              = models.CharField(max_length=2,     blank=False)
	def __str__(self):
		return self.nome.encode('utf-8')
	class Meta():
		verbose_name_plural = u'unidades de saúde'
		verbose_name        = u'unidade de saúde'

class Paciente(models.Model):
	nome            = models.CharField(max_length=300)
	nome_mae        = models.CharField(max_length=300)
	data_nascimento = models.CharField(max_length=10)
	unidadesaude    = models.ManyToManyField(UnidadeSaude)

class tipoFormulario(models.Model):
	nome            = models.CharField(max_length=300)
	def __str__(self):
		return self.nome.encode('utf-8')

class Formulario(models.Model):
	nome            = models.CharField(max_length=300)
	version         = models.CharField(max_length=300)
	tipo            = models.ForeignKey(tipoFormulario)
	permitir_insercao_multipla = models.BooleanField(u"Permitir a inserção de múltiplas entradas desse formulário")
	path            = models.CharField(max_length=300)
	descricao       = models.TextField()
	data_insercao   = models.DateTimeField(auto_now_add=True)
	unidadesaude    = models.ManyToManyField(UnidadeSaude)
	data_insercao.short_description = u'Data de Inserção do Formulário'
	def __str__(self):
		return self.nome.encode('utf-8')
	#Custom delete action
	def delete(self, *args, **kwargs):
		try:
			shutil.rmtree(self.path)
		except OSError:
			pass
		super(Formulario, self).delete(*args, **kwargs)

	def listUnidadeSaude(self):
		retstring = r"""
			<ul>
				%s
			</ul>
		"""%(' '.join([r'<li>%s</li>'%(us) for us in self.unidadesaude.all()]))
		return retstring
	listUnidadeSaude.allow_tags = True
	listUnidadeSaude.short_description = u'Unidades de Saúde'
	class Meta:
		verbose_name_plural = u'formulários'
		verbose_name        = u'formulário'

class UserProfile(User):
	unidadesaude    = models.ManyToManyField(UnidadeSaude)
	objects         = UserManager()

class Ficha(models.Model):
	paciente                  = models.ForeignKey(Paciente)
	formulario                = models.ForeignKey(Formulario)
	conteudo                  = models.XMLField()
	data_insercao             = models.DateTimeField(auto_now_add=True)
	data_ultima_modificacao   = models.DateTimeField(auto_now=True)

