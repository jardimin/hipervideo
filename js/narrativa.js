$(document).ready(function(){
	var ev1 = Popcorn( "#hipVid0" );
  
	ev1.code({
	    start: 3,
	    end: 8,
	    onStart: function() {
	      $( "#evEsq" ).css('left', '-2%');
	    },
	    onEnd: function() {
	     $( "#evEsq" ).css('left', '-25%');
	   }
	});
});