document.addEventListener( "DOMContentLoaded", function() {

  var $pop = Popcorn( "#hipVid0" );

  $pop.on( "timeupdate", function() {
    var time = this.currentTime();
    $('#time').html( time );
  });

}, false );

function hipVidPlay() {
	$('#hipVid0').get(0).play();
	$('#hipVid0').css('opacity', '1');
  $('#play').css('display', 'none');
  $('#pause').css('display', 'block');
}

function hipVidPause() {
	$('#hipVid0').get(0).pause();
	$('#hipVid0').css('opacity', '0.4');
  $('#play').css('display', 'block');
  $('#pause').css('display', 'none');
}

function hipVidReplay() {
  $('#hipVid0').get(0).load();
  $('#hipVid0').get(0).play();
  $('#hipVid0').css('opacity', '1');
  $('#play').css('display', 'none');
  $('#pause').css('display', 'block');
}

function hipVidFim() {
  $('#hipVid0').get(0).currentTime = 216;
}

function hipVidFull() {
  $('#hipVid0').css('width', '100%');
}

function hipVidHalf() {
  $('#hipVid0').css('width', '50%');
}

(function() {
    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        // event.clientX and event.clientY contain the mouse position
        if (event.clientY < 80) {
        	$('header').css('top', '0%');
        } else {
        	$('header').css('top', '-12%');
        }
    }
})();
