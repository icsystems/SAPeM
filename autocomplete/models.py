#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.db import models

class bairrosbrasil(models.Model):
	UF            = models.CharField(max_length=2)
	Localidade    = models.CharField(max_length=4)
	Nome          = models.CharField(max_length=255)
	NomeSemAcento = models.CharField(max_length=255)
class cidadesbr(models.Model):
	Nome          = models.CharField(max_length=255)
	NomeSemAcento = models.CharField(max_length=255)
	CEP           = models.CharField(max_length=9)
	UF            = models.CharField(max_length=2)
class ruasac(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasal(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasam(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasap(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasba(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasce(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasdf(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruases(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasgo(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasma(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasmg(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasms(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasmt(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruaspa(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruaspb(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruaspe(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruaspi(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruaspr(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasrj(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasrn(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasro(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasrs(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruassc(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasse(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruassp(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)
class ruasto(models.Model):
	Localidade    = models.CharField(max_length=10)
	Nome          = models.CharField(max_length=20)
	CEP           = models.CharField(max_length=9)
	Logradouro    = models.CharField(max_length=8)
	RuaSemAcento  = models.CharField(max_length=20)

