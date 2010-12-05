from django import template
from django.template.defaultfilters import register

register = template.Library()

@register.filter(name='hash')
def hash(h, key):
	return h[key]

@register.filter(name='getId')
def getId(obj):
	return obj.id
