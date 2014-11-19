$(document).ready(function(){
	var ev1 = Popcorn( "#hipVid0" );
	var comeco = 4;
	var fim = 18;
	var fr = 0;

	ev1.code({
    start: comeco,
    end: fim,
    onStart: function() {
      $( "#evEsq" ).css('left', '-2%');
    },
    onEnd: function() {
      $( "#evEsq" ).css('left', '-53%');
    }
	});
});