<style lang="scss">
  .libras {
    background-color: rgba(50,50,50,0);
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
  <div class="libras" v-transition>
    <canvas id="libras" height="300" width="400"></canvas>
    <video id="libras_vid" crossOrigin="anonymous" style="display: none;">
      <source src="{{mp4}}" type="video/mp4" id="libras_mp4">
    </video>
  </div>
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
        webm: "",
        vid: null,
        libras_vid: null,
        canvas: null,
        _timeout: null
      }
    },
    created: function() {
      this.mp4 = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/LIBRAS/libras_"+this.$parent.id+".mp4";
    },
    attached: function() {
      
      var self = this;
      
      this.libras_vid = document.getElementById("libras_vid");
      this.vid = document.getElementById("hipVid-"+this.$parent.id);
      this.canvas = document.getElementById("libras");

      this.$on('libras-update', function (time) {
        if (self.libras_vid.currentTime > time + 0.5 || self.libras_vid.currentTime < time - 0.5) {
          self.libras_vid.currentTime = time;
        }
      })

      this.vid.addEventListener("play" , function() {
        self.libras_vid.play();
      })

      this.vid.addEventListener("pause" , function() {
        self.libras_vid.pause();
      })

      this.$on('libras-load', function() {
        if (!self._timeout) {
          self._timeout = setInterval(self.DrawVideoOnCanvas, 50);
        }
        
      })
      
    },
    beforeDestroy: function(){
      var self = this
      clearInterval(this._timeout)

      this.vid.removeEventListener("play" , function() {
        self.libras_vid.play();
      })

      this.vid.removeEventListener("pause" , function() {
        self.libras_vid.pause();
      })

      this.$off('libras-update')
      this.$off('libras-load')
    },
    methods: {
      DrawVideoOnCanvas: function() {
        var context = this.canvas.getContext('2d');
        context.drawImage(this.libras_vid, 0, 0);

        var imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var data = imageData.data;
        var start = {
          red: data[0],
          green: data[1],
          blue: data[2]
        };

        var tolerance = 10;
        for(var i = 0, n = data.length; i < n; i += 4) {
          var diff = Math.abs(data[i] - data[0]) + Math.abs(data[i+1] - data[1]) + Math.abs(data[i+2] - data[2]);
          data[i + 3] = (diff*diff)/tolerance;
        }
        context.putImageData(imageData, 0, 0);
      }
    }
  }
</script>