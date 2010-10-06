from django.conf.urls.defaults import *
from django.conf import settings
from django.contrib import admin

#Custom
from tbForms.admin_views import edit_formulario, add_formulario
from tbForms.views import correct_address
from tbForms.views import list_forms_by_health_unit
from tbForms.views import handle_form
from tbForms.views import show_patients
from tbForms.views import list_patients
from tbForms.views import sapem_login
from tbForms.views import sapem_logout
from tbForms.views import showPatientLastRegister
from tbForms.views import showPatientRegisters
from tbForms.views import homepage_view

admin.autodiscover()

urlpatterns = patterns('',
	# Example:
	# (r'^mysite/', include('mysite.foo.urls')),
	# Uncomment the admin/doc line below and add 'django.contrib.admindocs'
	# to INSTALLED_APPS to enable admin documentation:
	# (r'^admin/doc/', include('django.contrib.admindocs.urls')),
	(r'^custom-media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
	# Uncomment the next line to enable the admin:
	(r'^admin/forms/formulario/add/$', add_formulario),
	(r'^admin/forms/formulario/(\d)/$', edit_formulario),
	(r'^admin/', include(admin.site.urls)),
	(r'^addressService/cep/(\d{5}-\d{3})/$', correct_address),
	(r'^showForms/(?P<healthUnit>\d)/$', list_forms_by_health_unit),
	(r'^form/(?P<formId>\d+)/(?P<patientId>\d+)/(?P<f>.*)$', handle_form),
	(r'^patientLastRegister/(?P<formId>\d+)/(?P<patientId>\d+)/$', showPatientLastRegister),
	(r'^registers/(?P<formId>\d+)/(?P<patientId>\d+)/$', showPatientRegisters),
	(r'^patients/$', show_patients),
	(r'^listPatients/$', list_patients),
	(r'^$', homepage_view),
	(r'^login/$', sapem_login),
	(r'^logout/$', sapem_logout),
)

