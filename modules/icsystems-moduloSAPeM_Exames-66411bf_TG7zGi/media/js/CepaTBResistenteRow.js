//Declaracao das variaveis
var medicines = ['R','H','E','S','Et','O','L','T','M','Z', 'C'];
var not_tested_tbresistente = new Array();
not_tested_tbresistente[0]  = medicines.sort();
var	resistence_tbresistente = new Array();
var	sensibility_tbresistente = new Array();

function CEPATBResistenteRow(numCepa){
	if(numCepa % 2 == 0) var cRow = 'even';
	else var cRow = 'odd';
	var content = ($('<tr>')
		.addClass(cRow)
		.append($('<td />')
			.append($('<select /> ')
				.attr('name', 'origem_tbresistente_' + numCepa)
				.attr(  'id', 'origem_tbresistente_' + numCepa)
				.css('width','350px')
				.addClass('origem_tbresistente')
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
			.attr('rowspan', '4')
		)
		.append($('<td />')
			.append('Número')
			.addClass('description')
			)
		.append($('<td/>')
				.append($('<input/>')
					.attr('disabled', true)
					.attr('name', 'numero_cepa_tbresistente_cultura_' + numCepa)
					.attr(  'id', 'numero_cepa_tbresistente_cultura_' + numCepa)
					.attr('size', '5')
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
				.attr('name', 'metodo_tbresistente_cepa_' + numCepa)
				.attr(  'id', 'metodo_tbresistente_cepa_' + numCepa)
				.addClass('metodo_tbresistente_cepa')
				.append($('<option> ---- </option>'))
					.attr('value','')
				.append($('<option>Genexpert</option>')
					.attr('value', 'genexpert')
				)
				.append($('<option>MGIT960</option>')
					.attr('value', 'mgit960')
				)
				.append($('<option>REMA</option>')
					.attr('value', 'rema')
				)
				.append($('<option>Proporções</option>')
					.attr('value', 'proporcoes')
				)
			)
		)
		.append($('<td />')
			.append('Sensibilidade')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<fieldset />')
				.addClass('fs_sensibilidade')
				.attr('id', 'sensibilidade_' + numCepa )
				.append($('<table />')
					.addClass('table_sensibilidade')
					.append($('<tr />')
						.append(addMedicine('sensibilidade_tbresistente', 'R', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'H', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'E', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'S', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'Z', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'C', numCepa))
					)
					.append($('<tr />')
						.append(addMedicine('sensibilidade_tbresistente', 'Et', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'O', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'L', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'T', numCepa))
						.append(addMedicine('sensibilidade_tbresistente', 'M', numCepa))
					)
				)
			)
		)
		.append($('<td />')
			.append($("<input type='hidden'/>")
				.attr('name', 'valores_tbresistente_sensibilidade_' + numCepa)
				.attr(  'id', 'valores_tbresistente_sensibilidade_' + numCepa)
				.attr('readonly', 'readonly')
			)
		)
	);
	content = $.merge($.merge([], content), $('<tr />')
		.addClass(cRow)
		.append($('<td />')
			.append('Data do Recebimento')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'data_recebimento_tbresistente_cepa_' + numCepa)
				.attr(  'id', 'data_recebimento_tbresistente_cepa_' + numCepa)
				.addClass('data')
				.attr('size', '11')
				.attr('readonly', 'readonly')
			)
			.append($('<div />')
				.appendText('hora: ')
				.append($('<input/>')
					.attr('disabled', true)
					.attr('name', 'hora_recebimento_tbresistente_cepa_' + numCepa)
					.attr(  'id', 'hora_recebimento_tbresistente_cepa_' + numCepa)
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
					.attr('name', 'data_processamento_tbresistente_cultura_' + numCepa)
					.attr(  'id', 'data_processamento_tbresistente_cultura_' + numCepa)
					.addClass('data')
					.attr('size', '11')
					.attr('readonly', 'readonly')
				)
				.append($('<div />')
					.appendText('hora: ')
					.append($('<input/>')
						.attr('disabled', true)
						.attr('name', 'hora_processamento_tbresistente_cultura_' + numCepa)
						.attr(  'id', 'hora_processamento_tbresistente_cultura_' + numCepa)
						.addClass('hour')
						.attr('maxlength', '5')
						.attr('size', '5')
					)
				)
		)
		.append($('<td />')
			.append('Resistência')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<fieldset />')
				.addClass('fs_resistente')
				.attr('id', 'resistente_' + numCepa )
				.append($('<table />')
					.addClass('table_resistente')
					.append($('<tr />')
						.append(addMedicine('resistente_tbresistente', 'R', numCepa))
						.append(addMedicine('resistente_tbresistente', 'H', numCepa))
						.append(addMedicine('resistente_tbresistente', 'E', numCepa))
						.append(addMedicine('resistente_tbresistente', 'S', numCepa))
						.append(addMedicine('resistente_tbresistente', 'Z', numCepa))
						.append(addMedicine('resistente_tbresistente', 'C', numCepa))
					)
					.append($('<tr />')
						.append(addMedicine('resistente_tbresistente', 'Et', numCepa))
						.append(addMedicine('resistente_tbresistente', 'O', numCepa))
						.append(addMedicine('resistente_tbresistente', 'L', numCepa))
						.append(addMedicine('resistente_tbresistente', 'T', numCepa))
						.append(addMedicine('resistente_tbresistente', 'M', numCepa))
					)
				)
			)
		)
		.append($('<td />')
			.append($("<input type='hidden'/>")
				.attr('name', 'valores_tbresistente_resistencia_' + numCepa)
				.attr(  'id', 'valores_tbresistente_resistencia_' + numCepa)
				.attr('readonly', 'readonly')
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
			.append('Data do resultado')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'data_resultado_tbresistente_cultura_' + numCepa)
				.attr(  'id', 'data_resultado_tbresistente_cultura_' + numCepa)
				.addClass('data')
				.attr('size', '11')
				.attr('readonly', 'readonly')
			)
			.append($('<div />')
				.appendText('hora: ')
				.append($('<input/>')
					.attr('disabled', true)
					.attr('name', 'hora_resultado_tbresistente_cultura_' + numCepa)
					.attr(  'id', 'hora_resultado_tbresistente_cultura_' + numCepa)
					.addClass('hour')
					.attr('maxlength', '5')
					.attr('size', '5')
				)
			)
		)
		.append($('<td />')
			.append('Não Testado ')
			.addClass('description')
		)
		.append($('<td />')
			.attr('id','nao_testado_tbresistente_' + numCepa)
			.html(medicines.toString())
		)
		.append($('<td />')
			.append($("<input type='hidden'>")
				.attr('name', 'valores_tbresistente_nao_testado_' + numCepa)
				.attr(  'id', 'valores_tbresistente_nao_testado_' + numCepa)
				.attr('readonly', 'readonly')
			)
		)
		/*.append($('<td />')
			.append('Número de Dias')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<input/>')
				.attr('disabled', true)
				.attr('name', 'dias_tbresistente_cepa_' + numCepa)
				.attr(  'id', 'dias_tbresistente_cepa_' + numCepa)
				.attr(  'size', 2)
				.addClass('dias_tbresistente_cepa')
				.addClass('number')
			)
		)*/
	);
	content = $.merge($.merge([], content) , $('<tr />')
		.addClass(cRow)
		.append($('<td colspan="2"/>')
			.append($('<input type="text"/> ')
				.attr('disabled', true)
				.attr('name', 'cultura_coleta_tbresistente_responsavel_' + numCepa)
				.attr(  'id', 'cultura_coleta_tbresistente_responsavel_' + numCepa)
				.attr('size', '20')
				.addClass('text')
				.addClass('cultura_coleta_responsavel')
			)
		)
		.append($('<td colspan="2"/>')
			.append('')
		)
		.append($('<td />')
			.append('Resultado')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<select /> ')
				.css(  'width', '100px')
				.attr('disabled', true)
				.attr('name', 'resultado_tbresistente_cepa_' + numCepa)
				.attr(  'id', 'resultado_tbresistente_cepa_' + numCepa)
				.addClass('resultado_tbresistente_cepa')
				.append($('<option> ---- </option>')
					.attr('value', '')
				)
				.append($('<option> Sensível </option>')
					.attr('value', 'sensivel')
				)
				.append($('<option> Resistente </option>')
					.attr('value', 'resistente')
				)
			)
		)
		/*.append($('<td />')
			.append('Identificação')
			.addClass('description')
		)
		.append($('<td />')
			.append($('<select /> ')
				.attr('disabled', true)
				.css(  'width', '100px')
				.attr('name', 'identificacao_tbresistente_cepa_' + numCepa)
				.attr(  'id', 'identificacao_tbresistente_cepa_' + numCepa)
				.addClass('identificacao_tbresistente_cepa')
				.append($('<option> ---- </option>'))
				.append($('<option> Micobacterium Tuberculosis (MTB)</option>')
					.attr('value', 'mtb')
				)
				.append($('<option> Micobacterium N&atilde;o Tuberculosis (MNT)</option>')
					.attr('value', 'mnt')
				)
				.append($('<option> N&atilde;o se aplica </option>')
					.attr('value', 'nao_se_aplica')
				)
				.append($('<option> Ignorado </option>')
					.attr('value', 'ignorado')
				)
			)
		)*/
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
	var cepaTBResistenteNum = 1;
	var content = CEPATBResistenteRow(cepaTBResistenteNum);
	$('table.cepaTBResistente').append(content);
	not_tested_tbresistente[cepaTBResistenteNum] = new Array();
	not_tested_tbresistente[cepaTBResistenteNum] = medicines;
	$('#nao_testado_tbresistente_'+cepaTBResistenteNum).html(not_tested_tbresistente[cepaTBResistenteNum].toString());
	resistence_tbresistente[cepaTBResistenteNum] = new Array();
	sensibility_tbresistente[cepaTBResistenteNum] = new Array();
	// add row button
	$('#testeSensibilidade').change(function(){
		if ($(this).val() == 'naoRealizado')
			$('select.origem_tbresistente').each(function(){
				$(this).val('');
				$(this).change();
				$(this).attr('disabled',true);
			});
		else
			$('select.origem_tbresistente').removeAttr('disabled');
	});
	$("#addlineTBResistente_button").click(function(){
		var origemStr = $('#origem_tbresistente_'+ cepaTBResistenteNum).val();
		if(origemStr.replace(/-/g,'')){
			cepaTBResistenteNum++;
			var content = CEPATBResistenteRow(cepaTBResistenteNum);
			$('table.cepaTBResistente').append(content);
			not_tested_tbresistente[cepaTBResistenteNum] = new Array();
			not_tested_tbresistente[cepaTBResistenteNum] = medicines;
			$('#nao_testado_tbresistente_'+cepaTBResistenteNum).html(not_tested_tbresistente[cepaTBResistenteNum].toString());
			resistence_tbresistente[cepaTBResistenteNum] = new Array();
			sensibility_tbresistente[cepaTBResistenteNum] = new Array();
		}
	});
	$('select.origem_tbresistente').livequery('change', function(){
		var origemStr = $(this).val();
		l = medicines;
		num = parseInt($(this).attr('id').split('_')[2]);
		if(origemStr.replace(/-/g,'')){
			$('#numero_cepa_tbresistente_cultura_' + num).removeAttr('disabled');
			$('#cultura_coleta_tbresistente_responsavel_' + num).removeAttr('disabled');
			$('#data_recebimento_tbresistente_cepa_' + num).removeAttr('disabled');
			$('#hora_recebimento_tbresistente_cepa_' + num).removeAttr('disabled');
			$('#hora_processamento_tbresistente_cultura_' + num).removeAttr('disabled');
			$('#hora_resultado_tbresistente_cultura_' + num).removeAttr('disabled');
			$('#data_processamento_tbresistente_cultura_' + num).removeAttr('disabled');
			$('#data_resultado_tbresistente_cultura_' + num).removeAttr('disabled');
			$('#metodo_tbresistente_cepa_' + num).removeAttr('disabled');
			$('#dias_tbresistente_cepa_' + num).removeAttr('disabled');
			$('#identificacao_tbresistente_cepa_' + num).removeAttr('disabled');
			for(var i= 0; i<l.length; i++){
				$('#sensibilidade_tbresistente_'+num+'_'+l[i]).removeAttr('disabled');
				$('#resistente_tbresistente_'+num+'_'+l[i]).removeAttr('disabled');
				$('#sensibilidade_tbresistente_'+num+'_'+l[i]).parent().removeClass('disabledField');
				$('#resistente_tbresistente_'+num+'_'+l[i]).parent().removeClass('disabledField');
			}
			$('.input_sensibilidade_tbresistente').livequery('change',function(){
				var allChecked = true;
				for(var i= 0; i<l.length; i++){
					if (!$('#sensibilidade_tbresistente_'+num+'_'+l[i]).is(':checked'))
						allChecked = false;
				}
				if (allChecked)
					$('#resultado_tbresistente_cepa_' + num).val('sensivel');
				else
					$('#resultado_tbresistente_cepa_' + num).val('');
			});
			$('.input_resistente_tbresistente').livequery('change',function(){
				var oneChecked = false;
				for(var i= 0; i<l.length; i++)
					if ($('#resistente_tbresistente_'+num+'_'+l[i]).is(':checked'))
						oneChecked = true;
				if (oneChecked)
					$('#resultado_tbresistente_cepa_' + num).val('resistente');
				else
					$('#resultado_tbresistente_cepa_' + num).val('');
			});
			$('#data_processamento_tbresistente_cultura_' + num).livequery('change', function(){
				if ($(this).val())
					$('#hora_processamento_tbresistente_cultura_'+num).addClass('required');
				else
					$('#hora_processamento_tbresistente_cultura_'+num).removeClass('required');
				if ($($('#data_processamento_tbresistente_cultura_' + num)).compareDate($('#data_resultado_tbresistente_cultura_' + num)) == 1)
				{
					alert('A Data do Processamento deve ser anterior à Data do Resultado');
					$('#data_processamento_tbresistente_cultura_' + num).val('');
					$('#data_resultado_tbresistente_cultura_' + num).val('');
				}
				if ($($('#data_processamento_tbresistente_cultura_' + num)).compareDate($('#data_recebimento_tbresistente_cepa_' + num)) == -1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Processamento');
					$('#data_processamento_tbresistente_cultura_' + num).val('');
					$('#data_recebimento_tbresistente_cepa_' + num).val('');
				}
			});
			$('#data_recebimento_tbresistente_cepa_' + num).livequery('change', function(){
				if ($(this).val())
					$('#hora_recebimento_tbresistente_cepa_' + num).addClass('required');
				else
					$('#hora_recebimento_tbresistente_cepa_' + num).removeClass('required');
				if ($($('#data_recebimento_tbresistente_cepa_' + num)).compareDate($('#data_resultado_tbresistente_cultura_' + num)) == 1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Resultado');
					$('#data_recebimento_tbresistente_cepa_' + num).val('');
					$('#data_resultado_tbresistente_cultura_' + num).val('');
				}
				if ($($('#data_recebimento_tbresistente_cepa_' + num)).compareDate($('#data_processamento_tbresistente_cultura_' + num)) == 1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Processamento');
					$('#data_recebimento_tbresistente_cepa_' + num).val('');
					$('#data_processamento_tbresistente_cultura_' + num).val('');
				}
			});
			$('#data_resultado_tbresistente_cultura_' + num).livequery('change', function(){
				if ($(this).val())
					$('#hora_resultado_tbresistente_cultura_' + num).addClass('required');
				else
					$('#hora_resultado_tbresistente_cultura_' + num).removeClass('required');
				if ($($('#data_processamento_tbresistente_cultura_' + num)).compareDate($('#data_resultado_tbresistente_cultura_' + num)) == 1)
				{
					alert('A Data do Processamento deve ser anterior à Data do Resultado');
					$('#data_processamento_tbresistente_cultura_' + num).val('');
					$('#data_resultado_tbresistente_cultura_' + num).val('');
				}
				if ($($('#data_resultado_tbresistente_cultura_' + num)).compareDate($('#data_recebimento_tbresistente_cepa_' + num)) == -1)
				{
					alert('A Data do Recebimento deve ser anterior à Data do Resultado');
					$('#data_recebimento_tbresistente_cepa_' + num).val('');
					$('#data_resultado_tbresistente_cultura_' + num).val('');
				}
			});
		} else {
			$('#hora_recebimento_tbresistente_cepa_' + num).removeClass('required');
			$('#hora_processamento_tbresistente_cultura_' + num).removeClass('required');
			$('#hora_resultado_tbresistente_cultura_' + num).removeClass('required');
			$('#numero_cepa_tbresistente_cultura_' + num).attr('disabled',true);
			$('#numero_cepa_tbresistente_cultura_' + num).val('');
			$('#data_recebimento_tbresistente_cepa_' + num).attr('disabled',true);
			$('#data_recebimento_tbresistente_cepa_' + num).val('');
			$('#hora_recebimento_tbresistente_cepa_' + num).attr('disabled',true);
			$('#hora_recebimento_tbresistente_cepa_' + num).val('');
			$('#cultura_coleta_tbresistente_responsavel_' + num).attr('disabled',true);
			$('#cultura_coleta_tbresistente_responsavel_' + num).val('');
			$('#numero_cepa_cultura_' + num).attr('disabled', true);
			$('#cultura_coleta_responsavel_' + num).attr('disabled', true);
			$('#cultura_coleta_responsavel_' + num).val('');
			$('#data_cultura_cepa_' + num).attr('disabled', true);
			$('#data_cultura_cepa_' + num).val('');
			$('#data_processamento_tbresistente_cultura_' + num).attr('disabled', true);
			$('#data_processamento_tbresistente_cultura_' + num).val('');
			$('#data_resultado_tbresistente_cultura_' + num).attr('disabled', true);
			$('#data_resultado_tbresistente_cultura_' + num).val('');
			$('#hora_cultura_cepa_' + num).attr('disabled', true);
			$('#hora_cultura_cepa_' + num).val('');
			$('#hora_processamento_tbresistente_cultura_' + num).attr('disabled', true);
			$('#hora_processamento_tbresistente_cultura_' + num).val('');
			$('#hora_resultado_tbresistente_cultura_' + num).attr('disabled', true);
			$('#hora_resultado_tbresistente_cultura_' + num).val('');
			$('#numero_cepa_cultura_' + num).val('');
			$('#metodo_tbresistente_cepa_' + num).attr('disabled', true);
			$('#metodo_tbresistente_cepa_' + num).val('');
			$('#resultado_tbresistente_cepa_' + num).attr('disabled', true);
			$('#resultado_tbresistente_cepa_' + num).val('');
			$('#identificacao_tbresistente_cepa_' + num).attr('disabled', true);
			$('#dias_tbresistente_cepa_' + num).val('');
			$('#dias_tbresistente_cepa_' + num).attr('disabled', true);
			for(var i= 0; i<l.length; i++){
				$('#sensibilidade_tbresistente_'+num+'_'+l[i]).attr('disabled', true);
				$('#sensibilidade_tbresistente_'+num+'_'+l[i]).attr('checked', false);
				$('#resistente_tbresistente_'   +num+'_'+l[i]).attr('disabled', true);
				$('#resistente_tbresistente_'   +num+'_'+l[i]).attr('checked', false);
				$('#sensibilidade_tbresistente_'+num+'_'+l[i]).parent().addClass('disabledField');
				$('#resistente_tbresistente_'+num+'_'+l[i]).parent().addClass('disabledField');
			}
			$('#data_recebimento_tbresistente_cepa_'+num).livequery('change', function(){
				if (Date.parse($('#data_recebimento_tbresistente_cepa_'+num).val()) > Date.parse($('#data_processamento_tbresistente_cultura_'+num).val()))
				{
					alert('A Data do Recebimento deve ser anterior à Data do Processamento');
					$('#data_recebimento_tbresistente_cepa_'+num).val('');
					$('#data_processamento_tbresistente_cultura_'+num).val('');
				}
				if (Date.parse($('#data_recebimento_tbresistente_cepa_'+num).val()) > Date.parse($('#data_resultado_tbresistente_cultura_'+num).val()))
				{
					alert('A Data do Recebimento deve ser anterior à Data do Resultado');
					$('#data_recebimento_tbresistente_cepa_'+num).val('');
					$('#data_resultado_tbresistente_cultura_'+num).val('');
				}
			});
			$('#data_processamento_tbresistente_cultura_'+num).livequery('change', function(){
				if (Date.parse($('#data_recebimento_tbresistente_cepa_'+num).val()) > Date.parse($('#data_processamento_tbresistente_cultura_'+num).val()))
				{
					alert('A Data do Recebimento deve ser anterior à Data do Processamento');
					$('#data_recebimento_tbresistente_cepa_'+num).val('');
					$('#data_processamento_tbresistente_cultura_'+num).val('');
				}
			});
			$('#data_resultado_tbresistente_cultura_'+num).livequery('change', function(){
				if (Date.parse($('#data_recebimento_tbresistente_cepa_'+num).val()) > Date.parse($('#data_resultado_tbresistente_cultura_'+num).val()))
				{
					alert('A Data do Recebimento deve ser anterior à Data do Resultado');
					$('#data_recebimento_tbresistente_cepa_'+num).val('');
					$('#data_resultado_tbresistente_cultura_'+num).val('');
				}
			});
		}
	});
	$('input.input_resistente_tbresistente').livequery('click', function(){
		params = $(this).attr('id').split('_');
		id_sensivel = 'sensibilidade_tbresistente_' + params[2] + '_' + params[3];
		id_resistente = 'resistente_tbresistente_'  + params[2] + '_' + params[3];
		numCepaTBResistente = params[2];
		if($(this)[0].checked){
			$('#' + id_sensivel).attr('disabled', true);
			$('#' + id_sensivel).parent().addClass('disabledField');
			not_tested_tbresistente[numCepaTBResistente] = $.grep(not_tested_tbresistente[numCepaTBResistente], function(value){
				return value != $('#' + id_resistente).val();
			});
			$('#nao_testado_tbresistente_'+numCepaTBResistente).html(not_tested_tbresistente[numCepaTBResistente].toString());
			$('#valores_tbresistente_nao_testado_'+numCepaTBResistente).val(not_tested_tbresistente[numCepaTBResistente].toString());
			if($.inArray($(this).val(),resistence_tbresistente[numCepaTBResistente]) < 0)
				resistence_tbresistente[numCepaTBResistente].push($(this).val());
			resistence_tbresistente[numCepaTBResistente].sort();
			$('#valores_tbresistente_resistencia_'+numCepaTBResistente).val(resistence_tbresistente[numCepaTBResistente].toString());
		}else {
			$('#' + id_sensivel).removeAttr('disabled');
			$('#' + id_sensivel).parent().removeClass('disabledField');
			not_tested_tbresistente[numCepaTBResistente].push($(this).val());
			not_tested_tbresistente[numCepaTBResistente].sort();
			$('#valores_tbresistente_nao_testado_'+numCepaTBResistente).val(not_tested_tbresistente[numCepaTBResistente].toString());
			$('#nao_testado_tbresistente_'+numCepaTBResistente).html(not_tested_tbresistente[numCepaTBResistente].toString());
			resistence_tbresistente[numCepaTBResistente] = $.grep(resistence_tbresistente[numCepaTBResistente], function(value){
				return value != $('#' + id_resistente).val();
			});
			$('#valores_tbresistente_resistencia_'+numCepaTBResistente).val(resistence_tbresistente[numCepaTBResistente].toString());
		}
	});

	$('input.input_sensibilidade_tbresistente').livequery('click', function(){
		params = $(this).attr('id').split('_');
		id_sensivel = 'sensibilidade_tbresistente_' + params[2] + '_' + params[3];
		id_resistente = 'resistente_tbresistente_'  + params[2] + '_' + params[3];
		numCepaTBResistente = params[2];
		if($(this)[0].checked){
			$('#' + id_resistente).attr('disabled', true);
			$('#' + id_resistente).parent().addClass('disabledField');
			not_tested_tbresistente[numCepaTBResistente] = $.grep(not_tested_tbresistente[numCepaTBResistente], function(value){
				return value != $('#' + id_sensivel).val();
			});
			$('#valores_tbresistente_nao_testado_'+numCepaTBResistente).val(not_tested_tbresistente[numCepaTBResistente].toString());
			$('#nao_testado_tbresistente_'+numCepaTBResistente).html(not_tested_tbresistente[numCepaTBResistente].toString());
			if($.inArray($(this).val(),sensibility_tbresistente[numCepaTBResistente]) < 0)
				sensibility_tbresistente[numCepaTBResistente].push($(this).val());
			sensibility_tbresistente[numCepaTBResistente].sort();
			$('#valores_tbresistente_sensibilidade_'+numCepaTBResistente).val(sensibility_tbresistente[numCepaTBResistente].toString());
		} else {
			$('#' + id_resistente).removeAttr('disabled');
			$('#' + id_resistente).parent().removeClass('disabledField');
			not_tested_tbresistente[numCepaTBResistente].push($(this).val());
			not_tested_tbresistente[numCepaTBResistente].sort();
			$('#valores_tbresistente_nao_testado_'+numCepaTBResistente).val(not_tested_tbresistente[numCepaTBResistente].toString());
			$('#nao_testado_tbresistente_'+numCepaTBResistente).html(not_tested_tbresistente[numCepaTBResistente].toString());
			sensibility_tbresistente[numCepaTBResistente] = $.grep(sensibility_tbresistente[numCepaTBResistente], function(value){
				return value != $('#' + id_sensivel).val();
			});
			$('#valores_tbresistente_sensibilidade_'+numCepaTBResistente).val(sensibility_tbresistente[numCepaTBResistente].toString());
		}
	});
});
