"use strict";
class homeLoanCalMod{
	constructor(o){
		this.o=o;
		this.rootEle= o.root;
		this.updateVal();
	}
	updatePaid(p){this.paid+=p;}
	getIntrThisMonth(currentSaving){
		var intr 	= 	(this.totalMog-this.paid-currentSaving)*this.rate*4.34524/52.1429;
		return intr>0?intr:0;
	}

	updateVal(){
		this.totalMog 		=		parseInt(this.o.total.val())||0;
		this.rate 			=		parseFloat(this.o.rate.val()*.01)||0;
		this.repay 			=		parseInt(this.o.repay.val())||0;
		this.toBank 		=		parseInt(this.o.toBank.val())||0;
		this.saving 		=		parseInt(this.o.saving.val())||0;
		this.paid=0;
		this.result=[];
		this.result.length=0;
		this.totalInterst=0;
	}
	cal(){
		var month=0;
		var currentSaving,thisMonthPay,currentRemaining,thisMonthInterest,currentPaid;
		this.updateVal();
		currentSaving		=		this.saving;
		while( this.paid<this.totalMog ){
			month++;
			thisMonthInterest	= 	this.getIntrThisMonth(currentSaving);
			this.totalInterst 	+= 	thisMonthInterest;
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
	summary(){
		var st2=document.getElementsByClassName("st2")[0].innerHTML;
		document.getElementsByClassName("clearTime")[0].innerHTML=Math.floor(Math.floor(st2/12))+ " YEARS "+ st2%12 + " MONTHS ";
		document.getElementsByClassName("interestPaid")[0].innerHTML="$ "+Math.round(this.totalInterst*100)/100;
	}
	dis(){
		var content="<tr>"+this.result.map(v=>{
			return "<td class="+(v[2]>0?'st1':'st2')+">"+v.join("</td><td class="+(v[2]>0?'st1':'st2')+">")+"</td>";
		}).join("</tr><tr>")+"</tr>";
		this.rootEle.html("");
		this.rootEle.html(content);
		this.summary();
	}
}