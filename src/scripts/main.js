var homeloan= new homeLoanCalMod({
	total	: 	$("#total"),
	rate	: 	$("#rate"),
	repay	: 	$("#repay"),
	saving	:  	$("#saving"),
	toBank 	: 	$("#payToBank"),
	root 	: 	$('#root')
});


homeloan.cal();
homeloan.dis();
/*
$('input').change(function(){
	homeloan.cal();

$("#update").click(function(){
	homeloan.dis();
});*/