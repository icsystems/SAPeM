from django.conf.urls.defaults import *
from django.conf import settings
from django.contrib import admin

#Custom
from tbForms.admin_views import edit_formulario, add_formulario
from tbForms.views import correct_address
from tbForms.views import list_forms_by_health_unit
from tbForms.views import edit_form
from tbForms.views import handle_form
from tbForms.views import show_patients
from tbForms.views import list_patients
from tbForms.views import sapem_login
from tbForms.views import sapem_logout
from tbForms.views import showPatientLastRegister
from tbForms.views import showPatientRegisters
from tbForms.views import homepage_view
from tbForms.views import showFichaConteudo
from tbForms.views import retrieveTriagemName
from tbForms.views import retrieveUS
from tbForms.views import retrieveLastReportByType
from tbForms.views import db2file

admin.autodiscover()

urlpatterns = patterns('',
	(r'^custom-media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
	(r'^admin/forms/formulario/add/$', add_formulario),
	(r'^admin/forms/formulario/(\d)/$', edit_formulario),
	(r'^admin/', include(admin.site.urls)),
	(r'^addressService/cep/(\d{5}-\d{3})/$', correct_address),
	(r'^showForms/(?P<healthUnit>\d)/$', list_forms_by_health_unit),
	(r'^form/(?P<formId>\d+)/(?P<patientId>\d+)/(?P<f>.*)$', handle_form),
	(r'^form/edit/(?P<fichaId>\d+)/(?P<f>.*)$', edit_form),
	(r'^ficha/(?P<fichaId>\d+)/$', showFichaConteudo),
	(r'^patientLastRegister/(?P<formId>\d+)/(?P<patientId>\d+)/$', showPatientLastRegister),
	(r'^registers/(?P<formId>\d+)/(?P<patientId>\d+)/$', showPatientRegisters),
	(r'^triagemName/(?P<patientId>\d+)/$', retrieveTriagemName),
	(r'^healthCenter/(?P<opt>\w+?)/$', retrieveUS),
	(r'^patientLastRegisterByType/(?P<patientId>\d+)/(?P<type>\w+)/$', retrieveLastReportByType),
	(r'^patients/$', show_patients),
	(r'^listPatients/$', list_patients),
	(r'^$', homepage_view),
	(r'^download/(?P<format>\w+)/$', db2file),
	(r'^login/$', sapem_login),
	(r'^logout/$', sapem_logout),
)

