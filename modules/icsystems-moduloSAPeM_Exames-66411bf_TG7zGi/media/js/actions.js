/**
 * Actions.js
 *
 * Author: Fernando.Ferreira@icsystems.com.br
 * Date:   March 15th, 2010
 */

if(typeof(String.prototype.trim) === "undefined")
{
	String.prototype.trim = function()
	{
		return String(this).replace(/^\s+|\s+$/g, '');
	};
}

var not_tested = new Array();
not_tested[0]  = medicines.sort();

var sensivel  = new Array();
var resistent = new Array();

//Document is ready, let's play
$(document).ready(function(){

/*------------------------------Edition and Relation-----------------------------*/
	//Relation between forms
	//Unidade - Exames e Triagem
	var urlString = $(location).attr('href');
	var urlbase = 'https://gruyere.lps.ufrj.br/~fferreira/sapem/';
	var urlArray = urlString.split('/');
	if (urlString.search("edit") != -1){
		var fichaId = urlArray[urlArray.length-2];
		var url = urlbase + 'ficha/' + fichaId + '/';
	}else{
		var fichaId = urlArray[urlArray.length-2];
		var url = urlbase + 'patientLastRegisterByType/' + fichaId + '/Triagem/';
	}
	//Variables created for edition
	var soroColetado = new Array();
	var indexSoroColetado = 1;
	var numeroSoro = new Array();
	var indexNumeroSoro = 1;
	var sangueColetado = new Array();
	var indexSangueColetado = 1;
	var numeroSangue = new Array();
	var indexNumeroSangue = 1;
	var cepaRow = new Array();
	var indexCepaRow = 1;
	var cepaCulturaRow = new Array();
	var indexCepaCulturaRow = 1;
	var tbResistente = new Array();
	var indexTbResistente = 1;

	$.ajax({
		type: 'POST',
		url: url,
		dataType: "html",
		success: function(text){
			if (window.DOMParser)
			{
				parser=new DOMParser();
				xml=parser.parseFromString(text,"text/xml");
			}else{ // Internet Explorer
				xml=new ActiveXObject("Microsoft.XMLDOM");
				xml.async="false";
				xml.loadXML(text);
			}
			//Soro Table
			while(xml.getElementsByTagName('soroColetado_'+indexSoroColetado.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('soroColetado_' + indexSoroColetado.toString())[0].childNodes[0].nodeValue;
				soroColetado[indexSoroColetado] = value;
				indexSoroColetado++;
			}
			while(xml.getElementsByTagName('numeroSoro_'+indexNumeroSoro.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('numeroSoro_' + indexNumeroSoro.toString())[0].childNodes[0].nodeValue;
				numeroSoro[indexNumeroSoro] = value;
				indexNumeroSoro++;
			}
			//Sangue Table
			while(xml.getElementsByTagName('sangueColetado_'+indexSangueColetado.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('sangueColetado_' + indexSangueColetado.toString())[0].childNodes[0].nodeValue;
				sangueColetado[indexSangueColetado] = value;
				indexSangueColetado++;
			}
			while(xml.getElementsByTagName('numeroSangue_'+indexNumeroSangue.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('numeroSangue_' + indexNumeroSangue.toString())[0].childNodes[0].nodeValue;
				numeroSangue[indexNumeroSangue] = value;
				indexNumeroSangue++;
			}
			//CepaRow
			while(xml.getElementsByTagName('origem_cepa_' + indexCepaRow.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('origem_cepa_' + indexCepaRow.toString())[0].childNodes[0].nodeValue;
				cepaRow[indexCepaRow] = value;
				indexCepaRow++;
			}
			for (var j=1;j< cepaRow.length;j++)
			{
				$('#addline_button').click();
				$('table').find('#origem_cepa_' + j);
				$('#origem_cepa_' + j).val(cepaRow[j]);
				$('#baciloscopia_metodo_' + j).removeAttr('disabled');
				$('#baciloscopia_coleta_responsavel_' + j).removeAttr('disabled');
				$('#baciloscopia_data_' + j).removeAttr('disabled');
				$('#baciloscopia_hora_cepa_' + j).removeAttr('disabled');
				$('#baciloscopia_material_cepa_' + j).removeAttr('disabled');
				$('#numero_cepa_' + j).removeAttr('disabled');
				$('#data_cepa_' + j).removeAttr('disabled');
				$('#hora_cepa_' + j).removeAttr('disabled');
				$('#baciloscopia_resultado_cepa_' + j).removeAttr('disabled');
				$('#data_recebimento_cepa_' + j).removeAttr('disabled');
				$('#hora_recebimento_cepa_' + j).removeAttr('disabled');
				$('#material_cepa_' + j).removeAttr('disabled');
				$('#analise_responsavel_' + j).removeAttr('disabled');
				$('#aspecto_escarro_' + j).removeAttr('disabled');
			}
			//CepaCulturaRow
			while(xml.getElementsByTagName('origem_cultura_' + indexCepaCulturaRow.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('origem_cultura_' + indexCepaCulturaRow.toString())[0].childNodes[0].nodeValue;
				cepaCulturaRow[indexCepaCulturaRow] = value;
				indexCepaCulturaRow++;
			}
			for (var j=1;j< cepaCulturaRow.length;j++)
			{
				$('#addlineCultura_button').click();
				$('table').find('#origem_cultura_' + j);
				$('#origem_cultura_' + j).val(cepaCulturaRow[j]);
				$('#numero_cepa_cultura_' + j).removeAttr('disabled');
				$('#cultura_coleta_responsavel_' + j).removeAttr('disabled');
				$('#data_cultura_cepa_' + j).removeAttr('disabled');
				$('#hora_cultura_cepa_' + j).removeAttr('disabled');
				$('#data_processamento_cultura_' + j).removeAttr('disabled');
				$('#hora_processamento_cultura_' + j).removeAttr('disabled');
				$('#data_resultado_cultura_' + j).removeAttr('disabled');
				$('#hora_resultado_cultura_' + j).removeAttr('disabled');
				$('#metodo_cultura_cepa_' + j).removeAttr('disabled');
				$('#resultado_cultura_cepa_' + j).removeAttr('disabled');
				$('#dias_cultura_cepa_' + j).removeAttr('disabled');
				$('#identificacao_cultura_cepa_' + j).removeAttr('disabled');
			}
			//TBResistente
			while(xml.getElementsByTagName('origem_tbresistente_' + indexTbResistente.toString())[0] != undefined)
			{
				var value = xml.getElementsByTagName('origem_tbresistente_' + indexTbResistente.toString())[0].childNodes[0].nodeValue;
				tbResistente[indexTbResistente] = value;
				indexTbResistente++;
			}
			for (var j=1;j< tbResistente.length;j++)
			{
				$('#addlineTBResistente_button').click();
				$('table').find('#origem_tbresistente_' + j);
				$('#origem_tbresistente_' + j).val(tbResistente[j]);
				$('#numero_cepa_tbresistente_cultura_' + j).removeAttr('disabled');
				$('#cultura_coleta_tbresistente_responsavel_' + j).removeAttr('disabled');
				$('#data_cultura_tbresistente_cepa_' + j).removeAttr('disabled');
				$('#hora_cultura_tbresistente_cepa_' + j).removeAttr('disabled');
				$('#hora_processamento_tbresistente_cultura_' + j).removeAttr('disabled');
				$('#hora_resultado_tbresistente_cultura_' + j).removeAttr('disabled');
				$('#data_processamento_tbresistente_cultura_' + j).removeAttr('disabled');
				$('#data_resultado_tbresistente_cultura_' + j).removeAttr('disabled');
				$('#metodo_tbresistente_cepa_' + j).removeAttr('disabled');
				$('#resultado_tbresistente_cepa_' + j).removeAttr('disabled');
				$('#dias_tbresistente_cepa_' + j).removeAttr('disabled');
				$('#identificacao_tbresistente_cepa_' + j).removeAttr('disabled');
				$('#data_tsa_tbresistente_cultura_' + j).removeAttr('disabled');
				$('.input_sensibilidade_tbresistente').each(function(){
					$(this).removeAttr('disabled');
				});
				$('.input_resistente_tbresistente').each(function(){
					$(this).removeAttr('disabled');
				});
			}
			if (xml.getElementsByTagName('error')[0] == undefined){
				if (urlString.search("edit") != -1){
					//Edit
					$('#form_exams').append("<input type='hidden' name='edit' id='edit' value='" + fichaId  + "'/>");
					var elements = xml.getElementsByTagName('documento')[0].childNodes;
					$(elements).each(function(){
						var el = $(this).get(0);
						if($(el)[0].nodeType == xml.ELEMENT_NODE){
							var tagname = $(el)[0].tagName;
							//console.log(tagname + ' : ' + $(el).text());
							var hlcolor = '#FFF8C6';
							//Radio
							if (tagname == 'amostra')
								$('input[name=amostra]').each(function(){
									if ($(el).text().search($(this).val()) != -1)
										$(this).attr('checked',true);
								});
							//Checkbox
							if (tagname == 'fitaHain')
								$('input[name=fitaHain]').each(function(){
									if ($(el).text().search($(this).val()) != -1)
										$(this).attr('checked',true);
								});
							if (tagname == 'isoniazida')
								$('input[name=isoniazida]').each(function(){
									if ($(el).text().search($(this).val()) != -1)
										$(this).attr('checked',true);
								});
							if (tagname == 'rifampicina')
								$('input[name=rifampicina]').each(function(){
									if ($(el).text().search($(this).val()) != -1)
										$(this).attr('checked',true);
								});
							//Tables
							if (tagname.search('valores_tbresistente_sensibilidade') != -1)
							{
								var num = tagname[tagname.length - 1];
								var values = $(el).text().split(',');
								var i;
								for (i=0;i<values.length;i++){
									$('#sensibilidade_tbresistente_' + num + '_' + values[i]).attr('checked',true);
									$('#sensibilidade_tbresistente_' + num + '_' + values[i]).removeAttr('disabled');
									$('#resistente_tbresistente_' + num + '_' + values[i]).attr('checked',false);
									$('#resistente_tbresistente_' + num + '_' + values[i]).attr('disabled',true);
								}
							}
							if (tagname.search('valores_tbresistente_resistencia') != -1)
							{
								var num = tagname[tagname.length - 1];
								var values = $(el).text().split(',');
								var i;
								for (i=0;i<values.length;i++){
									$('#resistente_tbresistente_' + num + '_' + values[i]).attr('checked',true);
									$('#resistente_tbresistente_' + num + '_' + values[i]).removeAttr('disabled');
									$('#sensibilidade_tbresistente_' + num + '_' + values[i]).attr('checked',false);
									$('#sensibilidade_tbresistente_' + num + '_' + values[i]).attr('disabled',true);
								}
							}
							if (tagname.search('valores_tbresistente_nao_testado') != -1)
								$('#nao_testado_tbresistente_' + tagname[tagname.length-1]).html($(el).text());
							//console.log(tagname + ' : '  + $(el).text());
							if ($(el).text())
								$('#'+tagname).removeAttr('disabled');
							$('#'+tagname).val($(el).text());
							$('#'+tagname).change();
						}
					});
				}else{
				//Relation
					var elements = xml.getElementsByTagName('documento')[0].childNodes;
					$(elements).each(function(){
						var el = $(this).get(0);
						if($(el)[0].nodeType == xml.ELEMENT_NODE){
							var tagname = $(el)[0].tagName;
							idDiv = $('#'+tagname).parent().attr('id');
							//console.log(tagname + ' : ' + $(el).text());
							var hlcolor = '#FFF8C6';
							if (tagname == 'numeroPaciente')
								$('#' + tagname).val($(el).text());
							if (tagname == 'unidade')
								$('#' + tagname).val($(el).text());
						}
					});
				}
			}
		},
		complete: function(){
			//When edition is complete, complete the tables
			//Complete soro table
			var j;
			for (j=1;j<soroColetado.length;j++)
			{
				$('table').find('#soroColetado_' + j);
				$('table').find('#numeroSoro_' + j);
				$('#addSoro_button').click();
				if (soroColetado[j] == 'sim')
					$('#numeroSoro_' + j).removeAttr('disabled');
				$('table').find('#soroColetado_' + j ).val(soroColetado[j]);
				$('table').find('#numeroSoro_' + j ).val(numeroSoro[j]);
			}
			//Complete sangue table
			for (j=1;j<sangueColetado.length;j++)
			{
				$('table').find('#sangueColetado_' + j);
				$('table').find('#numeroSangue_' + j);
				$('#addSangue_button').click();
				if (sangueColetado[j] == 'sim')
					$('#numeroSangue_' + j).removeAttr('disabled');
				$('table').find('#sangueColetado_' + j ).val(sangueColetado[j]);
				$('table').find('#numeroSangue_' + j ).val(numeroSangue[j]);
			}
		}
	});
/*-------------------------------------------------------------------------------*/
	$("#form_exams").keypress(function(e) {
		if (e.which == 13) {
			return false;
		}
	});

	$('.text').livequery('keypress', function(e){
		if((e.which > 32 && e.which < 65)||
			(e.which > 90 && e.which < 97)||
			(e.which > 122 && e.which < 127)||
			(e.which > 127 && e.which < 192)){
			return false;
		}
	});

	$('.number').livequery('keypress', function(e){
		if((e.which > 31 && e.which < 48)||(e.which > 57)){
			return false;
		}
	});

	$('.hour').livequery('keypress', function(e){
		if((e.which > 31 && e.which < 48)||(e.which > 57))
			return false;
		$('.hour').timeEntry({show24Hours: true});
	});

	/*$('.hour').livequery('keyup', function() {
		$('.hour').timeEntry({show24Hours: true});
	});*/

	$(function(){
		$('.data').livequery('click', function() {
			$(this).datepicker({
						dateFormat: 'dd/mm/yy',
						monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
						monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Aug','Set','Out','Nov','Dez'],
						maxDate: '+0d',
						changeMonth: true,
						changeYear: true,
						maxDate   : '+0y',
						minDate   : '-130y',
						yearRange : '-130:+130',
						dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
						showOn:'focus'}
								).focus();
		});
	});

	var hlcolor = '#FFF8C6';

	var d = new Date();
	var cYear = d.getFullYear();
	years = new Array();

	for (i=cYear-100; i <=cYear; i++)
		years.push(i.toString());

	$('#data_sida').autocomplete({
		lookup: years
	});

	//Toggle options
	// Soro
	$('#soroColetado').change(function(){
		var dep = new Array();
		dep[0] = '#divNSoro';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		if($(this).val()=='nao' || $(this).val() == 'ignorado'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	$('#sangueColetado').change(function(){
		var dep = new Array();
		dep[0] = '#divNSangue';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		if($(this).val()=='nao' || $(this).val() == 'ignorado'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	//IGRA
	$('#IGRA').change(function(){
		var dep = new Array();
		dep[0] = '#divIGRAMetodo';
		dep[1] = '#divIGRAResultado'
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	//Prova Realizada?
	$('#provaRealizada').change(function(){
		var dep = new Array();
		dep[0] = '#divDataAplicacao';
		dep[1] = '#divLeituraRealizada';
		var ped = new Array();
		ped[0] = '#divResultadoLeitura';
		ped[1] = '#divDataLeitura';
		ped[2] = '#divPt';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
			for(div in ped){
				var elems = $('*', ped[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(ped[div]).css('display') != 'none')
					$(ped[div]).toggle();
			}
		}
	});
	$('#leituraRealizada').change(function(){
		var dep = new Array();
		dep[0] = '#divResultadoLeitura';
		dep[1] = '#divDataLeitura';
		dep[2] = '#divPt';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	//testesMoleculares
	$('#testesMoleculares').change(function(){
		var dep = new Array();
		dep[0] = '#divPCRMetodo';
		dep[1] = '#divPCRResultado';
		dep[2] = '#divDataColetaPCR';
		dep[3] = '#divDataRecebimentoLaboratorioPCR';
		dep[4] = '#divDataResultadoPCR';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	$('#data_coleta_pcr').change(function(){
		if (Date.parse($('#data_coleta_pcr').val()) > Date.parse($('#data_recebimento_laboratorio_pcr').val()))
		{
			alert('A Data da Coleta deve ser anterior à Data do Recebimento');
			$('#data_coleta_pcr').val('');
			$('#data_recebimento_laboratorio_pcr').val('');
		}
		if (Date.parse($('#data_coleta_pcr').val()) > Date.parse($('#data_resultado_pcr').val()))
		{
			alert('A Data da Coleta deve ser anterior à Data do Resultado');
			$('#data_coleta_pcr').val('');
			$('#data_resultado_pcr').val('');
		}
	});
	$('#data_recebimento_laboratorio_pcr').change(function(){
		if (Date.parse($('#data_coleta_pcr').val()) > Date.parse($('#data_recebimento_laboratorio_pcr').val()))
		{
			alert('A Data da Coleta deve ser anterior à Data do Recebimento');
			$('#data_coleta_pcr').val('');
			$('#data_recebimento_laboratorio_pcr').val('');
		}
		if (Date.parse($('#data_recebimento_laboratorio_pcr').val()) > Date.parse($('#data_resultado_pcr').val()))
		{
			alert('A Data do Recebimento deve ser anterior à Data do Resultado');
			$('#data_resultado_pcr').val('');
			$('#data_recebimento_laboratorio_pcr').val('');
		}
	});
	$('#data_resultado_pcr').change(function(){
		if (Date.parse($('#data_coleta_pcr').val()) > Date.parse($('#data_resultado_pcr').val()))
		{
			alert('A Data da Coleta deve ser anterior à Data do Resultado');
			$('#data_coleta_pcr').val('');
			$('#data_resultado_pcr').val('');
		}
		if (Date.parse($('#data_recebimento_laboratorio_pcr').val()) > Date.parse($('#data_resultado_pcr').val()))
		{
			alert('A Data do Recebimento deve ser anterior à Data do Resultado');
			$('#data_resultado_pcr').val('');
			$('#data_recebimento_laboratorio_pcr').val('');
		}
	});
	$('#pcrMetodo').change(function(){
		var dep = new Array();
		dep[0] = '#divOutroMetodoPCR';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='outro'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	//Detecão TB Resistente
	$('#detecao_tb_resistente').change(function(){
		var dep = new Array();
		dep[0] = '#divTbResistenteMetodo';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	//HIV
	$('#exameSida').change(function(){
		var dep = new Array();
		dep[0] = '#divSIDA';
		dep[1] = '#divDataSida';
		var ped = new Array();
		ped[0] = '#divSidaContagemLinfocitos60dias';
		ped[1] = '#divSIDAUsoAntiRetroviral';
		ped[2] = '#divDataInicioUsoRetroviral';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
			for(div in ped){
				var elems = $('*', ped[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(ped[div]).css('display') != 'none')
					$(ped[div]).toggle();
			}
		}
	});
	$('#genXpert').change(function(){
		var dep = new Array();
		dep[0] = '#divGenXpertPositivo';
		if($(this).val()=='positivo'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	$('#testesMolecularesResistencia').change(function(){
		var dep = new Array();
		dep[0] = '#divGenXpert';
		dep[1] = '#divFitaHain';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	$('#sidaUsoAntiRetroviral').change(function(){
		var dep = new Array();
		dep[0] = '#divDataInicioUsoRetroviral';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='sim'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		} else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
		}
	});
	$('#sida').change(function(){
		var dep = new Array();
		dep[0] = '#divSIDAUsoAntiRetroviral';
		dep[1] = '#divSidaContagemLinfocitos60dias';
		var ped = new Array();
		ped[0] = '#divDataInicioUsoRetroviral';
		// Se sim, disponibilizar colunas listadas a cima
		if($(this).val()=='positivo'){
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).addClass('required');
				});
				if($(dep[div]).css('display') != 'block')
					$(dep[div]).toggle(function() {
						$(this).css('background-color', hlcolor);
						$(this).animate({backgroundColor : "white"}, 4000);
					});
			}
		}
		// Se nao, ocultar colunas listadas a cima
		else {
			for(div in dep){
				var elems = $('*', dep[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(dep[div]).css('display') != 'none')
					$(dep[div]).toggle();
			}
			for(div in ped){
				var elems = $('*', ped[div]);
				$(elems).each(function(){
					var element = $(this);
					if (   element[0].nodeName != 'FIELDSET'
					    && element[0].nodeName != 'SMALL'
					    && element[0].nodeName != 'OPTION')
						$(this).removeClass('required');
				});
				if($(ped[div]).css('display') != 'none')
					$(ped[div]).toggle();
			}
		}
	});

	$('div.secondary').css('display', 'none');
	//Toggle Options
	//Soro
	var soroNum = 1;
	var content = soroRow(soroNum);
	$('table.soro').append(content);
	// add row button
	$("#addSoro_button").click(function(){
		if($('#soroColetado_'+soroNum).val() == 'sim'){
			if($('#numeroSoro_'+soroNum).valid()){
				$('#numeroSoro_'+ soroNum).attr('readonly', 'true');
				$('#soroColetado_'+ soroNum).attr('readonly', 'true');
				soroNum++;
				var content = soroRow(soroNum);
				$('table.soro').append(content);
			}
		}
	});
	$('select.soro').live('change', function(){
		params = $(this).attr('id').split('_');
		numSoro = params[1];
		if($(this).val() == 'sim'){
			$('#numeroSoro_'+ numSoro).removeAttr('disabled');
			$('#numeroSoro_'+ numSoro).addClass('required');
		} else {
			$('#numeroSoro_'+ numSoro).attr('disabled', 'disabled');
			$('#numeroSoro_'+ numSoro).val('');
			$('#numeroSoro_'+ numSoro).removeClass('required');
			$('#numeroSoro_'+ numSoro).valid();
		}
	});
	//Sangue
	var sangueNum = 1;
	var content = sangueRow(sangueNum);
	$('table.sangue').append(content);
	// add row button
	$("#addSangue_button").click(function(){
		if($('#sangueColetado_'+sangueNum).val() == 'sim'){
			if($('#numeroSangue_'+sangueNum).valid()){
				$('#numeroSangue_'+ numSangue).attr('readonly', 'true');
				$('#sangueColetado_'+ numSangue).attr('readonly', 'true');
				sangueNum++;
				var content = sangueRow(sangueNum);
				$('table.sangue').append(content);
			}
		}
	});
	$('select.sangue').live('change', function(){
		params = $(this).attr('id').split('_');
		numSangue = params[1];
		if($(this).val() == 'sim'){
			$('#numeroSangue_'+ numSangue).removeAttr('disabled');
			$('#numeroSangue_'+ numSangue).addClass('required');
		} else {
			$('#numeroSangue_'+ numSangue).attr('disabled', 'disabled');
			$('#numeroSangue_'+ numSangue).val('');
			$('#numeroSangue_'+ numSangue).removeClass('required');
			$('#numeroSangue_'+ numSangue).valid();
		}
	});

	//Display help tipbox
	$('#helpicon').css('cursor', 'pointer');
	$('#helpicon').css('*cursor', 'hand');
	$("#layer1").hide();
	$('.helpicon').click(function(){
		if($(this).parent().attr('id').split('_')[2] == 'cultura')
			$('#layer1').css('top', '1800px');
		if($(this).parent().attr('id').split('_')[2] == 'tbresistente')
			$('#layer1').css('top', '2200px');
		$('#layer1').show();
	});
	$('#layer1').draggable();

	$('#close').click(function(){
		$("#layer1").hide();
	});
	///////////////

	$('#form_exams').validate({
		rules: {
			soroColetado: {
				required: true
			},
			sangueColetado: {
				required: true
			},
			HIVteste:{
				required: true
			},
			probabilidadeTBAtiva: {
				required: true
			},
			data_rx: {
				date: true,
				required: true
			}
		}
	});
});
