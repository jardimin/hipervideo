$(document).ready(function(){
	var ev1 = Popcorn( "#hipVid0" );
  
	ev1.code({
	    start: 4,
	    end: 18,
	    onStart: function() {
	      $( "#evEsq" ).css('left', '-2%');
	    },
	    onEnd: function() {
	      $( "#evEsq" ).css('left', '-50%');
	   }
	});
});