
var $ = django.jQuery;
$(document).ready(function(){
	$('#id_CEP').keyup(function() {
		var cepForm = $(this).val();
		var format = '#####-###';
		var i = cepForm.length;
		var output = format.substring(0,1);
		var text   = format.substring(i)
		if (text.substring(0,1) != output) $(this).val(cepForm + text.substring(0,1))
		if (cepForm.length == 9){
			$.getJSON('addressService/cep/' + cepForm + '/', function(json){
				$('#id_UF').val(json.state);
				$('#id_cidade').val(json.city);
				$('#id_rua').val(json.street);
			});
		}
	});
});
