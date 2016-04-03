"use strict";
class homeLoanCalMod{
	constructor(o){
		this.o=o;
		this.totalMog=0;
		this.rate=0;
		this.repay=0;
		this.toBank=0;
		this.saving=0;
		this.rootEle= o.root;
		this.paid=0;
		this.result=[];
	}
	updatePaid(p){this.paid+=p;}
	getIntrThisMonth(currentSaving){
		var intr 	= 	(this.totalMog-this.paid-currentSaving)*this.rate*4.34524/52.1429;
		return intr>0?intr:0;
	}
	cal(){
		this.totalMog=parseInt(this.o.total.val())||0;
		this.rate=parseFloat(this.o.rate.val()*.01)||0;
		this.repay=parseInt(this.o.repay.val())||0;
		this.toBank=parseInt(this.o.toBank.val())||0;
		this.saving=parseInt(this.o.saving.val())||0;
		var month=0;
		var currentSaving,thisMonthPay,currentRemaining,thisMonthInterest,currentPaid;
		currentSaving		=		this.saving;
		while( this.paid<this.totalMog ){
			month++;
			thisMonthInterest	= 	this.getIntrThisMonth(currentSaving);
			thisMonthPay 		= 	this.toBank - thisMonthInterest;
			this.updatePaid( thisMonthPay );
			currentPaid			=	this.paid;
			currentSaving 		+=	this.repay - this.toBank;
			currentRemaining 	=	this.totalMog - currentPaid;
			this.result.push([
				month,
				Math.round(currentSaving*100)/100,
				Math.round(thisMonthInterest*100)/100,
				Math.round(currentPaid*100)/100,
				Math.round(currentRemaining*100)/100,
			]);
		}
	}


	dis(){
		var content="<tr>"+this.result.map(v=>{
			return "<td>"+v.join("</td><td>")+"</td>";
		}).join("</tr><tr>")+"</tr>";
		this.rootEle.html(content);
	}
}