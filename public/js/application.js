var hipervideo = $('#hipVid0').get(0);
var selector = $('.rangeslider').get(0);
var seekBar = $('#seek-bar').get(0);

var playVideo = function(argument) {
  $('body').addClass("tocando");
  $('#mp4').prop("src", argument + ".mp4");
  $('#webm').prop("src", argument + ".webm");
  hipervideo.load();
  hipervideo.play();
}

var seekCap = function(perc) {
  var timecode = (hipervideo.duration * perc) / 100
  hipervideo.currentTime = timecode;
}

$(document).ready(function() {

  seekBar.addEventListener("change", function() {
    // Calculate the new time
    var time = hipervideo.duration * (seekBar.value / 1000);
    console.log(seekBar.value);

    // Update the video time
    hipervideo.currentTime = time;
  });

  
  // Update the seek bar as the video plays
  hipervideo.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (1000 / hipervideo.duration) * hipervideo.currentTime;
    var fillWidth = seekBar.value / 10

    // Update the slider value
    seekBar.value = value;
    $('.rangeslider__fill').css('width', fillWidth+"%")
    $('.rangeslider__handle').css('left', fillWidth+"%")
  });

  var bol = false;
  var seekTime = function(e) {
    var janela   = window.innerWidth,
        pos      = e.pageX,
        relativo = hipervideo.duration * (pos / janela);

    hipervideo.currentTime = relativo;
  };

  selector.addEventListener("mousemove", function(e) {
    var janela   = window.innerWidth,
        pos      = e.pageX,
        relativo = hipervideo.duration * (pos / janela);

    if (bol===true) {
      seekTime(e);
    }

  });

  selector.addEventListener("mouseup", function(e) {
    hipervideo.play();
    bol = false;
  });

  selector.addEventListener("mousedown", function(e) {
    hipervideo.pause();
    bol = true;
    seekTime(e);
  });


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
})