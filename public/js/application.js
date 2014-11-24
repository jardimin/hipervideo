$(document).ready(function() {
  $('input[type="range"]').rangeslider({
    polyfill: false,
    rangeClass: 'rangeslider',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle'
  });

  (function() {
    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      event = event || window.event; // IE-ism
      // event.clientX and event.clientY contain the mouse position
      if (event.clientY < 80) {
        $('#video-controls').removeClass('hover');
      } else {
        $('#video-controls').addClass('hover');
      }
    }
  })();
})