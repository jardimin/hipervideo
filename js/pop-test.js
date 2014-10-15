document.addEventListener( "DOMContentLoaded", function() {

  var $pop = Popcorn( "#hipVid0" );

  $pop.on( "timeupdate", function() {
    var time = this.currentTime();
    $('#time').html( time );
    console.log( this.currentTime() );
  });

  $pop.play();

}, false );
