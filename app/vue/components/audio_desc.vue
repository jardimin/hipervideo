<style lang="scss">
  
</style>

<template>
  <audio id="audio_desc" crossOrigin="anonymous" style="display: none;" preload="auto">
    <source src="{{wav}}" type="audio/wav" id="wav">
    <source src="{{mp3}}" type="audio/mpeg" id="mp3">
  </audio>
</template>

<script>

  var Vue = require('vue')

  module.exports = {
    replace: true,
    data: function(){
      return {
        wav: "",
        mp3: "",
        audio_desc: null,
        vid: null
      }
    },
    created: function() {
      this.mp3 = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/AUDIO_DESC/audio_desc_"+this.$parent.id+".mp3";
      this.wav = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/AUDIO_DESC/audio_desc_"+this.$parent.id+".wav";
    },
    attached: function() {
      
      var self = this;

      this.audio_desc = document.getElementById("audio_desc");
      this.vid = document.getElementById("hipVid-"+this.$parent.id);
      audio_desc.volume = 0;

      this.$on('audio-update', function (time) {
        if (audio_desc.currentTime !== time + 0.5 || audio_desc.currentTime !== time - 0.5) {
          self.audio_desc.currentTime = time;
        }
      })

      this.$on('mudou-audio_desc', function (val) {
        if (val === true) {
          self.audio_desc.volume = 1;
          self.vid.volume = 0;
        } else {
          self.audio_desc.volume = 0;
          self.vid.volume = 1;
        }
      })

      this.vid.addEventListener("play" , function() {
        self.audio_desc.play();
      })

      this.vid.addEventListener("pause" , function() {
        self.audio_desc.pause();
      })
      
    },
    beforeDestroy: function(){
      this.$off('audio-update')
      this.$off('mudou-audio_desc')
      this.vid.removeEventListener("play" , function() {
        self.audio_desc.play();
      })

      this.vid.removeEventListener("pause" , function() {
        self.audio_desc.pause();
      })
      
    }
  }
</script>