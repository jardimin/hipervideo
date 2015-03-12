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
	  #full:-webkit-full-screen & {
		  z-index: 0;
		}
	  #app.marco-fechado & {
			top: 0;
		}
	}
</style>

<template>
	<video poster="http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/home.png" class="hipVid" id="hipVid-{{db.id}}" v-el="hipervideo">
		<source src="{{db.url}}_{{qual}}.mp4" type="video/mp4" id="mp4">
	</video>
</template>

<script>

	var Vue = require('vue')
	var $$$ = require('jquery')

	module.exports = {
		inherit: true,
		data: function(){
			return {
				qual: 'alta',
				timecodeAntigo: 0,
				hipervideo: null,
				timecode: 0
			}
		},
		created: function() {
			this.qual = this.$parent.$parent.qualidade;
		},
		attached: function() {
			
			var self = this;

			this.hipervideo = this.$$.hipervideo;
			this.hipervideo.load()
			var seekBar = $$$('#seek-bar-'+this.db.id).get(0);
			var selector = $$$('.rangeslider').get(0);

			this.$on('mudou-qualidade', function (qualidade) {
				self.timecode = self.video.time;
				self.qual = qualidade;
				self.hipervideo.load();
				self.continuarTemp();
			})

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

			this.hipervideo.addEventListener("loadstart" , function() {
				$$$('#loading').addClass('loading')
			})

			this.hipervideo.addEventListener("canplay" , function() {
				$$$('#loading').removeClass('loading')
				self.$dispatch('hipervideo-canplay')
			})

			this.hipervideo.addEventListener("loadedmetadata" , function() {
				var duracao = toFormat(self.hipervideo.duration);
				this.play();
				var tempoTotal = function(array) {
					var min = array[0];
					var sec = array[1];
					$$$('#tp-tt-min').text(min);
					$$$('#tp-tt-sec').text(sec);
				};

				tempoTotal(duracao);
			})
		  
			// Update the seek bar as the video plays
			this.hipervideo.addEventListener("timeupdate", function() {
				// Calculate the slider value
				var value = (1000 / self.hipervideo.duration) * self.hipervideo.currentTime;
				var fillWidth = seekBar.value / 10;
				var tempo = toFormat(self.hipervideo.currentTime);
				var t = self.hipervideo.currentTime;
				tempoCorrido(tempo);
				if (self.timecode !== self.timecodeAntigo) {
					self.hipervideo.currentTime = self.timecode;
					self.timecodeAntigo = self.timecode;
				}

				// Update the slider value
				seekBar.value = value;
				$$$('.rangeslider__fill').css('width', fillWidth+"%");
				$$$('.rangeslider__handle').css('left', fillWidth+"%");

				// Dispatch timeupdate to parent
				self.$dispatch('video-timeupdate', self.hipervideo.currentTime, self.hipervideo.duration, self.hipervideo.currentTime/self.hipervideo.duration);
			});
		},
    beforeDestroy: function(){
    	var self = this

      this.$off('mudou-qualidade')

      this.hipervideo.removeEventListener("loadstart" , function() {
				$$$('#loading').addClass('loading')
			})

			this.hipervideo.removeEventListener("canplay" , function() {
				$$$('#loading').removeClass('loading')
				self.$dispatch('hipervideo-canplay')
			})

			this.hipervideo.removeEventListener("loadedmetadata" , function() {
				var duracao = toFormat(self.hipervideo.duration);
				var tempoTotal = function(array) {
					var min = array[0];
					var sec = array[1];
					$$$('#tp-tt-min').text(min);
					$$$('#tp-tt-sec').text(sec);
				};

				tempoTotal(duracao);
			})

			this.hipervideo.removeEventListener("timeupdate", function() {
				// Calculate the slider value
				var value = (1000 / self.hipervideo.duration) * self.hipervideo.currentTime;
				var fillWidth = seekBar.value / 10;
				var tempo = toFormat(self.hipervideo.currentTime);
				tempoCorrido(tempo);

				// Update the slider value
				seekBar.value = value;
				$$$('.rangeslider__fill').css('width', fillWidth+"%")
				$$$('.rangeslider__handle').css('left', fillWidth+"%")

				// Dispatch timeupdate to parent
				self.$dispatch('video-timeupdate', self.hipervideo.currentTime, self.hipervideo.duration, self.hipervideo.currentTime/hipervideo.duration);
			});

    },
		methods: {
			play: function(){
				this.$$.hipervideo.play()
			},
			pause: function(){
				this.$$.hipervideo.pause()
			},
			continuarTemp: function() {
				this.hipervideo.currentTime = this.video.time
			}
		}
	}
</script>