<style lang="scss">
	.hipVid {
	  background-size: cover;
	  top: -60px;
	  height: auto;
	  width: 100%;
	  position: fixed;
	  left: 0;
	  transition: all 0.5s ease 0s;
	  z-index: -100;
	  opacity: 0;
	  #app.marco-fechado & {
			top: 0;
		}
	}
</style>

<template>
	<video v-with="db: db" poster="http://jardim.in/hipervideo/img/splash.jpg" preload="auto" class="hipVid" id="hipVid-{{db.id}}" v-el="hipervideo">
		<source v-attr="src: db.url + '.mp4'" type="video/mp4" id="mp4">
		<source v-attr="src: db.url + '.webm'" type="video/webm" id="webm">
	</video>
</template>

<script>

	var Vue = require('vue')
	var $$$ = require('jquery')

	module.exports = {
		replace: true,
		attached: function() {
			
			var self = this;

			var hipervideo = this.$$.hipervideo;
			var seekBar = $$$('#seek-bar-'+this.db.id).get(0);
			var selector = $$$('.rangeslider').get(0);
			
			this.play();

			var tempoCorrido = function(array) {
				var min = array[0];
				var sec = array[1];
				$$$('#tp-cr-min').text(min);
				$$$('#tp-cr-sec').text(sec);
			};

			function toFormat(time) {
			  var secT  = Math.floor(time),
			      sec   = (secT % 60).toFixed(),
			      min   = Math.floor(secT / 60),
			      sec_  = toDigits(sec),
			      min_  = toDigits(min);

			  function toDigits(n) {
			    return n > 9 ? "" + n: "0" + n;
			  }

			  return [min_.toString(), sec_.toString()]
			}

			hipervideo.addEventListener("loadedmetadata" , function() {
				var duracao = toFormat(hipervideo.duration);
				var tempoTotal = function(array) {
					var min = array[0];
					var sec = array[1];
					$$$('#tp-tt-min').text(min);
					$$$('#tp-tt-sec').text(sec);
				};

				tempoTotal(duracao);
			})
		  
			// Update the seek bar as the video plays
			hipervideo.addEventListener("timeupdate", function() {
				// Calculate the slider value
				var value = (1000 / hipervideo.duration) * hipervideo.currentTime;
				var fillWidth = seekBar.value / 10;
				var tempo = toFormat(hipervideo.currentTime);
				tempoCorrido(tempo);

				// Update the slider value
				seekBar.value = value;
				$$$('.rangeslider__fill').css('width', fillWidth+"%")
				$$$('.rangeslider__handle').css('left', fillWidth+"%")

				// Dispatch timeupdate to parent
				self.$dispatch('video-timeupdate', hipervideo.currentTime, hipervideo.duration, hipervideo.currentTime/hipervideo.duration);
			});
		},
		methods: {
			play: function(){
				this.$$.hipervideo.play()
			},
			pause: function(){
				this.$$.hipervideo.pause()
			}
		}
	}
</script>