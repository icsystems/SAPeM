$.validator.addMethod("validHour", function(value, element) {
	if(value.length == 5){
		var splittime = value.split(":");
		var retcode = parseInt(splittime[0], 10) <= 23 && parseInt(splittime[1], 10) <= 59;
		return retcode;
	}
	return true;
}, "Preencha com uma hora válida.");

$.validator.addMethod("warningAge", function(value, element) {
			var retcode = parseInt(value) >= 1  && parseInt(value) <= 95;
			var options = {idTest: 'warningAge'};
			var msg = '';
			if (parseInt(value)> 95)
				msg = "A idade é maior que 95 anos. Confirma? "
			else if (parseInt(value) < 1)
				msg = "A idade é 0 anos. Confirma?"
			retcode = $(element).ConfirmUI(msg, function(element){
				return retcode;
			},options);
			return retcode;
		}, 'Por favor, confira a data de nascimento');

