var hipervideo = $('#hipVid0').get(0);
var selector = '[data-rangeslider]';

var playVideo = function(argument) {
  $('body').addClass("tocando");
  $('#mp4').prop("src", argument + ".mp4");
  $('#webm').prop("src", argument + ".webm");
  hipervideo.load();
  hipervideo.play();
}

$(document).ready(function() {
  // hipervideo.addEventListener("timeupdate", function(e) {
  //   // Calculate the slider value
  //   var value = (100 / hipervideo.duration) * hipervideo.currentTime;

  //   var $inputRange = $('input[type="range"]', e.target.parentNode), e.target.parentNode)[0].value; 
  //   // Update the slider value
  //   $inputRange.val(value).change();
  // })

  (function() {
    window.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      event = event || window.event; // IE-ism
      // event.clientX and event.clientY contain the mouse position
      if (event.clientY < 50) {
        $('#video-controls').removeClass('hover');
      } else {
        $('#video-controls').addClass('hover');
      }
    }
  })();

  // (function() {
  //   function valueOutput(element) {
  //     var value = element.value,
  //     var time = hipervideo.duration * (value / 100);

  //     hipervideo.currentTime = time;
  //   } 

  //   $(document).on('change', selector, function(e) {
  //     valueOutput(e.target);
  //   }); 
  // })();

  $('input[type="range"]').rangeslider({
    polyfill: false,
    rangeClass: 'rangeslider',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle'
  });
})