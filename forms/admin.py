from django.contrib import admin

from tbForms.forms.models import Paciente, Ficha, tipoFormulario
from tbForms.forms.models import Formulario, UnidadeSaude
from django import template
from django.core.exceptions import PermissionDenied
from django.contrib.admin import helpers
from django.contrib.admin.util import get_deleted_objects, model_ngettext
from django.shortcuts import render_to_response
from django.utils.encoding import force_unicode
from django.utils.html import escape
from django.utils.safestring import mark_safe
from django.utils.text import capfirst
from django.utils.translation import ugettext_lazy, ugettext as _

class UnidadeSaudeAdmin(admin.ModelAdmin):
	list_display  = ('nome', 'cidade', 'UF')
	list_filter   = ('cidade', 'UF')
	class Media:
		js= ('/custom-media/js/jquery/admin_formulario.js',)
admin.site.register(UnidadeSaude, UnidadeSaudeAdmin)

class FormularioAdmin(admin.ModelAdmin):
	list_display  = ('nome','version', 'tipo', 'descricao', 'data_insercao', 'listUnidadeSaude' )
	list_filter   = ('nome', 'tipo', 'data_insercao')
	actions       = ['uninstall_form']
	def get_actions(self, request):
		actions = super(FormularioAdmin, self).get_actions(request)
		del actions['delete_selected']
		return actions

	def uninstall_form(self, request, queryset):
		"""
			The delete view for this model.
		"""
		opts = self.model._meta
		app_label = opts.app_label

		# Check that the user has delete permission for the actual model
		if not self.has_delete_permission(request):
			raise PermissionDenied

		# Populate deletable_objects, a data structure of all related objects that
		# will also be deleted.
		deletable_objects, perms_needed = get_deleted_objects(queryset, opts, request.user, self.admin_site, levels_to_root=2)
		# The user has already confirmed the deletion.
		# Do the deletion and return a None to display the change list view again.
		if request.method == 'POST':
			if perms_needed:
				raise PermissionDenied
			n = queryset.count()
			if n:
				for obj in queryset:
					obj_display = force_unicode(obj)
					self.log_deletion(request, obj, obj_display)
					obj.delete()
				self.message_user(request, _("Desinstalados com sucesso: %(count)d %(items)s.") % {
					"count": n, "items": model_ngettext(self.opts, n)
				})
		return None
	uninstall_form.short_description = ugettext_lazy(u"Desinstalar %(verbose_name_plural)s selecionados")
admin.site.register(Formulario, FormularioAdmin)




