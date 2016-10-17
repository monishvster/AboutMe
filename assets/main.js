// Javascript for calculation

var magazine;
$(document).ready(function(){
	
	$('#sci, #esp, #fac, #kid').click(function () {
    if (this.id == 'sci') {
        
		magazine = $(this).val();
		$('#esp').prop("disabled",true);
		$('#fac').prop("disabled",true);
		$('#kid').prop("disabled",true);
		$('#magname').html("&nbsp;- Science");
    }
    else if (this.id == 'esp') {
        magazine = $(this).val();
		$('#sci').prop("disabled",true);
		$('#fac').prop("disabled",true);
		$('#kid').prop("disabled",true);
		$('#magname').html("&nbsp;- ESPN");
    }
	else if (this.id == 'fac') {
        magazine = $(this).val();
		$('#esp').prop("disabled",true);
		$('#sci').prop("disabled",true);
		$('#kid').prop("disabled",true);
		$('#magname').html("&nbsp;- Fashion");
    }
	else if (this.id == 'kid') {
        magazine = $(this).val();
		$('#esp').prop("disabled",true);
		$('#fac').prop("disabled",true);
		$('#sci').prop("disabled",true);
		$('#magname').html("&nbsp;- Kids");
    }
});
	
	
	
	
});

var App = {
	launch : function() {
		App.getName();
		App.getEmail();
		App.getSubscription();
		App.getCopies();
		App.showTotal();
	},

	
	getName : function() {
		let name = document.getElementById("name").value;

	},

	getEmail : function() {
		let email = document.getElementById("email").value;
		if(email!=null){
			$('#emailId').html(email);
		}
	},

	getSubscription : function() {
		let sub = $('#sub :selected').val();
		let totalSub;
		if(magazine=='sci'){
			totalSub = 15*sub;
			$('#subs').html(totalSub);
		}
		else if(magazine=='esp'){
			totalSub = 10*sub;
			$('#subs').html(totalSub);
		}
		else if(magazine=='fac'){
			totalSub = 25*sub;
			$('#subs').html(totalSub);
		}
		else if(magazine=='kid'){
			totalSub = 5*sub;
			$('#subs').html(totalSub);
		}
	},
	
	getCopies : function() {
		let copies = $('#copy').val();
		if(copies != null){
			$('#copies').html(copies);
		}
	},
	
	showTotal : function() {
		let subscription = parseFloat($('#subs').html());
		let copies = parseFloat($('#copies').html());
		
		let result = App.calculateTotal(subscription,copies,magazine);
		
		$('#total').html(result);
		$(".displayText").css('display', 'inline-block');
	},
	
	calculateTotal: function (givenSub, givenCopy, givenMagazine) {
    if (typeof givenSub !== 'number' || typeof givenCopy !== 'number') {
      throw Error('The given argument is not a number');
    }

    const minSub = 1;
    const minCopy = 1;
    const maxSub = 100;
    const maxCopy = 100;

    
    let sub  // undefined
    if (givenSub < minSub) {
      sub = minSub;
    }
    else if (givenSub > maxSub) {
      sub = maxSub;
    }
    else {
      sub = givenSub;
    }

    
    if (givenCopy < minCopy) {
      copy = minCopy;
    }
    else if (givenCopy > maxCopy) {
      copy = maxCopy;
    }
    else {
      copy = givenCopy;
    }

    // calculate the total and store in a local variable so we can watch the value
    let total = sub * copy;
    // return the result of calculation to the calling function
    return total;
  },

};

 