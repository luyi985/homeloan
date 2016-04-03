var homeloan= new homeLoanCalMod({
	total	: 	$("#total"),
	rate	: 	$("#rate"),
	repay	: 	$("#repay"),
	saving	:  	$("#saving"),
	toBank 	: 	$("#payToBank"),
	root 	: 	$('#root')
});


//homeloan.cal();
//homeloan.dis();
$("#update").click(function(){
	homeloan.cal();
	homeloan.dis();
});