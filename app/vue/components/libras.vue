<style lang="scss">
  .libras {
    background-color: rgba(50,50,50,0.8);
    bottom: 60px;
    width: 400px;
    height: 300px;
    position: fixed;
    right: 0;
    transition: all 0.5s ease 0s;
    z-index: 9;
    &.v-enter, &.v-leave {
      bottom: -3000px !important;
    }
    #app.marco-fechado & {
      bottom: 0;
    }
  }
</style>

<template>
  <canvas id="libras" height="300" width="400"></canvas>
  <video id="libras_vid" crossOrigin="anonymous" style="display: none;" preload="auto">
    <source src="{{mp4}}" type="video/mp4" id="mp4">
  </video>
</template>

<script>

  var Vue = require('vue')

  module.exports = {
    replace: true,
    data: function(){
      return {
        isPlaying: false,
        videoExt: "",
        isBackgroundVideo: true,
        mp4: "",
        webm: ""
      }
    },
    created: function() {
      this.mp4 = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/LIBRAS/libras_"+this.$parent.id+".mp4";
    },
    attached: function() {
      
      var self = this;

      var libras_vid = document.getElementById("libras_vid");
      var vid = document.getElementById("hipVid-"+this.$parent.id);
      
      libras_vid.currentTime = this.$parent.video.time;

      this.$on('libras-update', function (time) {
        if (libras_vid.currentTime !== time + 0.5 || libras_vid.currentTime !== time - 0.5) {
          libras_vid.currentTime = time;
        }
      })

      vid.addEventListener("play" , function() {
        libras_vid.play();
      })

      vid.addEventListener("pause" , function() {
        libras_vid.pause();
      })

      this.draw();
      
    },
    methods: {
      draw: function() {
        if (window.requestAnimationFrame) window.requestAnimationFrame(this.draw);
        // IE implementation
        else if (window.msRequestAnimationFrame) window.msRequestAnimationFrame(this.draw);
        // Firefox implementation
        else if (window.mozRequestAnimationFrame) window.mozRequestAnimationFrame(this.draw);
        // Chrome implementation
        else if (window.webkitRequestAnimationFrame) window.webkitRequestAnimationFrame(this.draw);
        // Other browsers that do not yet support feature
        else setTimeout(this.draw, 16.7);
        this.DrawVideoOnCanvas();
      },
      DrawVideoOnCanvas: function() {
        var object = document.getElementById("libras_vid");

        var canvas = document.getElementById("libras");
        var context = canvas.getContext('2d');
        context.drawImage(object, 0, 0);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var start = {
          red: data[0],
          green: data[1],
          blue: data[2]
        };

        var tolerance = 400;
        for(var i = 0, n = data.length; i < n; i += 4) {
          var diff = Math.abs(data[i] - data[0]) + Math.abs(data[i+1] - data[1]) + Math.abs(data[i+2] - data[2]);
          data[i + 3] = (diff*diff)/tolerance;
        }
        context.putImageData(imageData, 0, 0);
      }
    }
  }
</script>