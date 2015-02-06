<style lang="scss">
	.rangeslider {
	  position: fixed;
	  border-radius: 0;
	  top: 30px;
	  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.8);
	  transition: all 0.5s ease 0s;
	  .rangeslider__fill {
	    border-radius: 0;
	  }
	}

	.rangeslider__fill {
	  border-radius: 0;
	  transition: all 0.5s ease 0s;
	}

	.rangeslider__handle {
	  width: 25px;
	  height: 25px;
	  top: 0;
	  margin-left: -9px;
	  transition: all 0.5s ease 0s;
	  z-index: 11;
	  #video-controls.hover & {
	  	width: 0;
      height: 0;
      opacity: 0;
      &:after {
        height: 0;
        width: 0;
        background-color: rgba(50, 50, 50, 0.8);
      }
	  }
	  &:after {
	    height: 15px;
	    width: 15px;
	    background-color: rgba(50, 50, 50, 0.8);
	  }
	}

	#tp-cr {
	  position: absolute; 
	  margin: 7px;
	  opacity: 1;
	  top: 0; 
	  left: 5px; 
	  color: black;
	  font-weight: 700;
	  font-size: 75%;
	  z-index: 10;
	  transition: all 0.5s ease 0s;
	  #video-controls.hover & {
	  	opacity: 0;
      font-size: 0;
	  }
	}

	#tp-cr-min {
	  position: relative; 
	  float: left;
	}

	#tp-cr-sec{
	  position: relative; 
	  float: left;
	}

	#tp-tt {
	  position: absolute; 
	  margin: 7px;
	  opacity: 1;
	  top: 0; 
	  right: 5px; 
	  color: white;
	  font-weight: 700;
	  font-size: 75%;
	  z-index: 10;
	  transition: all 0.5s ease 0s;
	  #video-controls.hover & {
	  	opacity: 0;
	     font-size: 0;
	  }
	}

	#tp-tt-min {
	  position: relative; 
	  float: right;
	}

	#tp-tt-sec{
	  position: relative; 
	  float: right;
	}
</style>

<template>
	<div v-with="db: db" class="rangeslider" id="rangeslider-{{db.id}}">
		<div id="tp-cr">
			<div id="tp-cr-min">00</div>
			<div style="position: relative; float: left;">:</div>
			<div id="tp-cr-sec">00</div>
		</div>
		<div id="tp-tt">
			<div id="tp-tt-sec">00</div>
			<div style="position: relative; float: right;">:</div>
			<div id="tp-tt-min">00</div>
		</div>
		<div class="rangeslider__fill context-bg" style="width: 0px;"></div>
		<div class="rangeslider__handle" style="left: 0px;"></div>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		replace: true,
		attached: function() {

			var hipervideo = $$$('#hipVid-'+this.db.id).get(0);
			var selector = $$$('#rangeslider-'+this.db.id).get(0);
			var seekBar = $$$('#seek-bar-'+this.db.id).get(0);
			var bol = false;

			var seekTime = function(e) {
				var janela   = window.innerWidth,
					pos      = e.pageX,
					relativo = hipervideo.duration * (pos / janela);

				hipervideo.currentTime = relativo;
			};

			seekBar.addEventListener("change", function() {
				// Calculate the new time
				var time = hipervideo.duration * (seekBar.value / 1000);
				console.log(seekBar.value);

				// Update the video time
				hipervideo.currentTime = time;
			});

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
		}
	}
</script>