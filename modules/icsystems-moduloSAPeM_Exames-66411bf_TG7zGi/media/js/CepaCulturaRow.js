function CEPACulturaRow(numCepa){
	if(numCepa % 2 == 0) var cRow = 'even';
	else var cRow = 'odd';
	var content = ($('<tr>')
		.addClass(cRow)
		.append($('<td />')
			.append($('<select /> ')
				.attr('name', 'origem_cultura_' + numCepa)
				.attr(  'id', 'origem_cultura_' + numCepa)
				.addClass('origem_cultura')
				.append($('<option> ---- </option>'))
				.append($('<option> Hospital Getulio Vargas- SES/RJ </option>')
					.attr('value', 'hospitalGetulioVargas')
				)
				.append($('<option> IPEC (Hosp HIV+) – RJ </option>')
					.attr('value', 'ipecRJ')
				)
				.append($('<option> PAM 13 de Maio (CMS) - (RJ) </option>')
					.attr('value', 'pam13DeMaio')
				)
				.append($('<option> HUCFF (Hosp) – RJ </option>')
					.attr('value', 'hucff')
				)
				.append($('<option> Guadalupe (CMS) – RJ </option>')
					.attr('value', 'guadalupe')
				)
				.append($('<option> Instituto Ary Parreiras (Hosp) - RJ </option>')
					.attr('value', 'institutoAryParreiras')
				)
				.append($('<option> Centro Ref Prof Helio Fraga Filho Fiocruz-RJ </option>')
					.attr('value', 'centroRefProfHelioFragaFilho')
				)
				.append($('<option> Hospital Raphael de Paula Sozua SMS-RJ </option>')
					.attr('value', 'hospitalRaphaelDePaulaSozua')
				)
				.append($('<option> Macae (CMS) – RJ </option>')
					.attr('value', 'macae')
				)
				.append($('<option> Hospital Otávio Mangabeira- BA </option>')
					.attr('value', 'hospitalOtavioMangabeira')
				)
				.append($('<option> Fundação José Silveira- BA- </option>')
					.attr('value', 'fundacaoJoseSilveira')
				)
				.append($('<option> Pelotas / RS </option>')
					.attr('value', 'pelotas')
				)
				.append($('<option> Hosp Conceição – RS </option>')
					.attr('value', 'hospConceicao')
				)
				.append($('<option> Hosp Clínicas da UFMG </option>')
					.attr('value', 'hospClínicasUFMG')
				)
				.append($('<option> CMS – Belo Horizonte - MG </option>')
					.attr('value', 'CMSBeloHorizonte')
				)
				.append($('<option> Hospital São Jose – Fortaleza - CE </option>')
					.attr('value', 'hospitalSaoJose')
				)
				.append($('<option> Unidade Básica de Saúde CECAP - SP </option>')
					.attr('value', 'unidadeBasicaSaudeCECAP')
				)
				.append($('<option> CRT Aids – SP </option>')
					.attr('value', 'CRTAids')
				)
				.append($('<option> Hospital Messjana- CE </option>')
					.attr('value', 'hospitalMessjana')
				)
				.append($('<option> Unidade Básica de saúde de Paranaguá- PR </option>')
					.attr('value', 'unidadeBasicaSaudeParanagua')
				)
				.append($('<option> Centro de Saúde Murialdo-PoA/RS </option>')
					.attr('value', 'centroSaudeMurialdo')
				)
				.append($('<option> Instituto Clemente Ferreira-SP </option>')
					.attr('value', 'institutoClementeFerreira')
				)
				.append($('<option> Fundação Estadual de Produção e Pesquisa em Saúde-PoA- RS </option>')
					.attr('value', 'fundacaoEstadualProducaoPesquisaSaude')
				)
			)
			.attr('rowspan', '5')
		)
		.append($('<td />')
			.append('Número')
			.addClass('description')
		)
		.append($('<td/>')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'numero_cepa_cultura_' + numCepa)
				.attr(  'id', 'numero_cepa_cultura_' + numCepa)
				.attr('size', '5')
				.addClass('number')
			)
		)
		.append($('<td />')
			.append('Método')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<select /> ')
				.attr('disabled', true)
				.css(  'width', '100px')
				.attr('name', 'metodo_cultura_cepa_' + numCepa)
				.attr(  'id', 'metodo_cultura_cepa_' + numCepa)
				.addClass('metodo_cultura_cepa')
				.append($('<option> ---- </option>'))
				.append($('<option> LJ </option>')
					.attr('value', 'lj')
				)
				.append($('<option> MGIT 960 </option>')
					.attr('value', 'mgit960')
				)
				.append($('<option> Ogawa </option>')
					.attr('value', 'ogawa')
				)
				.append($('<option> Outro </option>')
					.attr('value', 'outro')
				)
			)
		.append($('<div />')
			.appendText('outro: ')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'outro_metodo_cultura_' + numCepa)
				.attr(  'id', 'outro_metodo_cultura_' + numCepa)
				.addClass('text')
				.attr('size', '10')
			)
		)
		)
	);
	content = $.merge($.merge([], content), $('<tr />')
		.addClass(cRow)
		.append($('<td />')
			.append('Data do recebimento')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'data_cultura_cepa_' + numCepa)
				.attr(  'id', 'data_cultura_cepa_' + numCepa)
				.addClass('data')
				.attr('size', '11')
				.attr('readonly', 'readonly')
			)
			.append($('<div />')
				.appendText('hora: ')
				.append($('<input/>')
					.attr('disabled', true)
					.attr('name', 'hora_cultura_cepa_' + numCepa)
					.attr(  'id', 'hora_cultura_cepa_' + numCepa)
					.addClass('hour')
					.attr('maxlength', '5')
					.attr('size', '5')
				)
			)
		)
		.append($('<td />')
			.append('Data do Processamento')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'data_processamento_cultura_' + numCepa)
				.attr(  'id', 'data_processamento_cultura_' + numCepa)
				.addClass('data')
				.attr('size', '11')
				.attr('readonly', 'readonly')
			)
			.append($('<div />')
				.appendText('hora: ')
				.append($('<input/>')
					.attr('disabled', true)
					.attr('name', 'hora_processamento_cultura_' + numCepa)
					.attr(  'id', 'hora_processamento_cultura_' + numCepa)
					.addClass('hour')
					.attr('maxlength', '5')
					.attr('size', '5')
				)
			)
		)
	);
	content = $.merge($.merge([], content) , $('<tr />')
		.addClass(cRow)
		.append($('<td colspan= "2"/>')
			.append('Responsável')
			.addClass('description')
		)
		.append($('<td />')
			.append('Resultado')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<select /> ')
				.css(  'width', '100px')
				.attr('disabled', true)
				.attr('name', 'resultado_cultura_cepa_' + numCepa)
				.attr(  'id', 'resultado_cultura_cepa_' + numCepa)
				.addClass('resultado_cultura_cepa')
				.append($('<option> ---- </option>'))
				.append($('<option> + </option>')
					.attr('value', '+')
				)
				.append($('<option> ++ </option>')
					.attr('value', '++')
				)
				.append($('<option> +++ </option>')
					.attr('value', '+++')
				)
				.append($('<option> Negativo </option>')
					.attr('value', 'negativo')
				)
				.append($('<option> Negativo (1 a 19 colônias)</option>')
					.attr('value', 'negativo1a19')
				)
				.append($('<option> Ignorado </option>')
					.attr('value', 'ignorado')
				)
			)
			.append($('<div />')
				.append($('<input />')
					.attr('id','colonia_contaminada_' + numCepa)
					.attr('name','colonia_contaminada_' + numCepa)
					.attr('disabled','true')
					.attr('type','checkbox')
				)
				.appendText(' contaminada')
			)
		)
	);
	content = $.merge($.merge([], content) , $('<tr />')
		.addClass(cRow)
		.append($('<td colspan="2"/>')
			.append($('<input type="text"/> ')
				.attr('disabled', true)
				.attr('name', 'cultura_coleta_responsavel_' + numCepa)
				.attr(  'id', 'cultura_coleta_responsavel_' + numCepa)
				.attr('size', '20')
				.addClass('text')
				.addClass('cultura_coleta_responsavel')
			)
		)
		.append($('<td />')
			.append('Data do resultado')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'data_resultado_cultura_' + numCepa)
				.attr(  'id', 'data_resultado_cultura_' + numCepa)
				.addClass('data')
				.attr('size', '11')
				.attr('readonly', 'readonly')
			)
			.append($('<div />')
				.appendText('hora: ')
				.append($('<input/>')
					.attr('disabled', true)
					.attr('name', 'hora_resultado_cultura_' + numCepa)
					.attr(  'id', 'hora_resultado_cultura_' + numCepa)
					.addClass('hour')
					.attr('maxlength', '5')
					.attr('size', '5')
				)
			)
		)
	);
	content = $.merge($.merge([], content) , $('<tr />')
		.addClass(cRow)
		.append($('<td colspan="2"/>'))
		.append($('<td />')
			.append('Identificação')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<select /> ')
				.attr('disabled', true)
				.css(  'width', '100px')
				.attr('name', 'identificacao_cultura_cepa_' + numCepa)
				.attr(  'id', 'identificacao_cultura_cepa_' + numCepa)
				.addClass('identificacao_cultura_cepa')
				.append($('<option> ---- </option>'))
				.append($('<option> MTB</option>')
					.attr('value', 'mtb')
				)
				.append($('<option> MNT</option>')
					.attr('value', 'mnt')
				)
				.append($('<option> N&atilde;o se aplica </option>')
					.attr('value', 'nao_se_aplica')
				)
				.append($('<option> Ignorado </option>')
					.attr('value', 'ignorado')
				)
			)
		)
		.append($('<td colspan="2"/>'))
	);
	return content;
}

$(document).ready(function(){
	/*---------------------------Auxiliar function-------------------------------*/
	$.fn.compareDate = function(argumento){
		//Essa funcao eh utilizada para comprar a ordem
		//cronologica entre duas datas.
		//Caso a data do argumento seja menor, e retornado o numero 1
		//caso contrario, e retornado -1

		//Caso uma delas nao foi preenchida, a funcao retorna 0
		if ($(this).val().length == 0 || $(argumento).val().length == 0)
			return 0;
		//Criacao de um array contendo dia, mes e ano
		var arrayData1 = $(this).val().split('/');
		var arrayData2 = $(argumento).val().split('/');
		var ano1 = parseInt(arrayData1[2],10);
		var ano2 = parseInt(arrayData2[2],10);
		var mes1 = parseInt(arrayData1[1],10);
		var mes2 = parseInt(arrayData2[1],10);
		var dia1 = parseInt(arrayData1[0],10);
		var dia2 = parseInt(arrayData2[0],10);
		//Compara anos
		if (ano1 > ano2)
			return 1;
		else if (ano1 < ano2)
			return -1;
		else
		{
			//Compara mes
			if (mes1 > mes2)
				return 1;
			else if (mes1 < mes2)
				return -1;
			else
			{
				//Compara dia
				if (dia1 > dia2)
					return 1;
				else if (dia1 < dia2)
					return -1;
				else return 0;
			}
		}

	}
	/*---------------------------------------------------------------------------*/
	var cepaCulturaNum = 1;
	var content = CEPACulturaRow(cepaCulturaNum);
	$('table.cepaCultura').append(content);
	not_tested[cepaCulturaNum] = new Array();
	not_tested[cepaCulturaNum] = not_tested[0];
	$('#nao_testado_'+cepaCulturaNum).html(not_tested[cepaCulturaNum].toString());
	// add row button
	$("#addlineCultura_button").click(function(){
		var origemStr = $('#origem_cultura_'+ cepaCulturaNum).val();
		if(origemStr.replace(/-/g,'')){
			cepaCulturaNum++;
			var content = CEPACulturaRow(cepaCulturaNum);
			$('table.cepaCultura').append(CEPACulturaRow(cepaCulturaNum));
			not_tested[cepaCulturaNum] = new Array();
			not_tested[cepaCulturaNum] = not_tested[0];
			$('#nao_testado_'+cepaCulturaNum).html(not_tested[cepaCulturaNum].toString());
		}
	});
	$('select.origem_cultura').livequery('change', function(){
		var origemStr = $(this).val();
		l = medicines;
		num = parseInt($(this).attr('id').split('_')[2]);
		if(origemStr.replace(/-/g,'')){
			$('#numero_cepa_cultura_' + num).removeAttr('disabled');
			$('#numero_colonias_' + num).removeAttr('disabled');
			$('#colonia_contaminada_' + num).removeAttr('disabled');
			$('#cultura_coleta_responsavel_' + num).removeAttr('disabled');
			$('#data_cultura_cepa_' + num).removeAttr('disabled');
			$('#hora_cultura_cepa_' + num).removeAttr('disabled');
			$('#data_processamento_cultura_' + num).removeAttr('disabled');
			$('#hora_processamento_cultura_' + num).removeAttr('disabled');
			$('#data_resultado_cultura_' + num).removeAttr('disabled');
			$('#hora_resultado_cultura_' + num).removeAttr('disabled');
			$('#metodo_cultura_cepa_' + num).removeAttr('disabled');
			$('#resultado_cultura_cepa_' + num).removeAttr('disabled');
			$('#dias_cultura_cepa_' + num).removeAttr('disabled');
			$('#identificacao_cultura_cepa_' + num).removeAttr('disabled');
			$('#data_processamento_cultura_' + num).livequery('change', function(){
				if ($(this).val())
					$('#hora_processamento_cultura_'+num).addClass('required');
				else
					$('#hora_processamento_cultura_'+num).removeClass('required');
				if ($($('#data_processamento_cultura_' + num)).compareDate($('#data_resultado_cultura_' + num)) == 1)
				{
					alert('A Data do Processamento deve ser anterior à Data do Resultado');
					$('#data_processamento_cultura_' + num).val('');
					$('#data_resultado_cultura_' + num).val('');
				}
				if ($($('#data_processamento_cultura_' + num)).compareDate($('#data_cultura_cepa_' + num)) == -1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Processamento');
					$('#data_processamento_cultura_' + num).val('');
					$('#data_cultura_cepa_' + num).val('');
				}
			});
			$('#data_cultura_cepa_' + num).livequery('change', function(){
				if ($(this).val())
					$('#hora_cultura_cepa_' + num).addClass('required');
				else
					$('#hora_cultura_cepa_' + num).removeClass('required');
				if ($($('#data_cultura_cepa_' + num)).compareDate($('#data_resultado_cultura_' + num)) == 1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Resultado');
					$('#data_cultura_cepa_' + num).val('');
					$('#data_resultado_cultura_' + num).val('');
				}
				if ($($('#data_cultura_cepa_' + num)).compareDate($('#data_processamento_cultura_' + num)) == 1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Processamento');
					$('#data_cultura_cepa_' + num).val('');
					$('#data_processamento_cultura_' + num).val('');
				}
			});
			$('#data_resultado_cultura_' + num).livequery('change', function(){
				if ($(this).val())
					$('#hora_resultado_cultura_' + num).addClass('required');
				else
					$('#hora_resultado_cultura_' + num).removeClass('required');
				if ($($('#data_processamento_cultura_' + num)).compareDate($('#data_resultado_cultura_' + num)) == 1)
				{
					alert('A Data do Processamento deve ser anterior à Data do Resultado');
					$('#data_processamento_cultura_' + num).val('');
					$('#data_resultado_cultura_' + num).val('');
				}
				if ($($('#data_resultado_cultura_' + num)).compareDate($('#data_cultura_cepa_' + num)) == -1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Resultado');
					$('#data_cultura_cepa_' + num).val('');
					$('#data_resultado_cultura_' + num).val('');
				}
			});
		} else {
			$('#hora_cultura_cepa_' + num).removeClass('required');
			$('#hora_processamento_cultura_' + num).removeClass('required');
			$('#hora_resultado_cultura_' + num).removeClass('required');
			$('#numero_cepa_cultura_' + num).attr('disabled', true);
			$('#numero_colonias_' + num).attr('disabled',true);
			$('#numero_colonias_' + num).val('');
			$('#colonia_contaminada_' + num).attr('disabled',true);
			$('#colonia_contaminada_' + num).attr('checked',false);
			$('#numero_cepa_cultura_' + num).val('');
			$('#cultura_coleta_responsavel_' + num).attr('disabled', true);
			$('#cultura_coleta_responsavel_' + num).val('');
			$('#data_cultura_cepa_' + num).attr('disabled', true);
			$('#data_cultura_cepa_' + num).val('');
			$('#hora_cultura_cepa_' + num).attr('disabled', true);
			$('#hora_cultura_cepa_' + num).val('');
			$('#data_processamento_cultura_' + num).attr('disabled', true);
			$('#data_processamento_cultura_' + num).val('');
			$('#hora_processamento_cultura_' + num).attr('disabled', true);
			$('#hora_processamento_cultura_' + num).val('');
			$('#data_resultado_cultura_' + num).attr('disabled', true);
			$('#data_resultado_cultura_' + num).val('');
			$('#hora_resultado_cultura_' + num).attr('disabled', true);
			$('#hora_resultado_cultura_' + num).val('');
			$('#metodo_cultura_cepa_' + num).attr('disabled', true);
			$('#metodo_cultura_cepa_' + num).val('');
			$('#resultado_cultura_cepa_' + num).attr('disabled', true);
			$('#resultado_cultura_cepa_' + num).val('');
			$('#identificacao_cultura_cepa_' + num).attr('disabled', true);
			$('#dias_cultura_cepa_' + num).val('');
			$('#dias_cultura_cepa_' + num).attr('disabled', true);
		}
	});
	$('select.metodo_cultura_cepa').livequery('change', function(){
		var origemStr = $('select.origem_cultura').val();
		l = medicines;
		num = parseInt($('select.origem_cultura').attr('id').split('_')[2]);
		if ($(this).val() == 'outro')
		{
			$('#outro_metodo_cultura_' + num).removeAttr('disabled');
		}else{
			$('#outro_metodo_cultura_' + num).attr('disabled', true);
			$('#outro_metodo_cultura_' + num).val('');
		}
	});
});
