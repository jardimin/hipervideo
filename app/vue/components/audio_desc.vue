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
        mp3: ""
      }
    },
    created: function() {
      this.mp3 = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/AUDIO_DESC/audio_desc_"+this.$parent.id+".mp3";
      this.wav = "http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/ACES/AUDIO_DESC/audio_desc_"+this.$parent.id+".wav";
    },
    attached: function() {
      
      var self = this;

      var audio_desc = document.getElementById("audio_desc");
      var vid = document.getElementById("hipVid-"+this.$parent.id);
      audio_desc.volume = 0;
      
      audio_desc.currentTime = this.$parent.video.time;

      this.$on('libras-update', function (time) {
        if (audio_desc.currentTime !== time + 0.5 || audio_desc.currentTime !== time - 0.5) {
          audio_desc.currentTime = time;
        }
      })

      this.$parent.$watch('audio_desc', function (val) {
        if (val === true) {
          audio_desc.volume = 1;
          vid.volume = 0;
        } else {
          audio_desc.volume = 0;
          vid.volume = 1;
        }
      })

      vid.addEventListener("play" , function() {
        audio_desc.play();
      })

      vid.addEventListener("pause" , function() {
        audio_desc.pause();
      })
      
    },
    methods: {
      
    }
  }
</script>