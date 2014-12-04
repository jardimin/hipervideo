<style lang="scss">
	.btn {
		cursor: pointer;
		padding: 10px;
		background: #ccc;
	}

	//controles video

	#video-controls {
	  position: fixed;
	  top: 0;
	  width: 100%;
	  display: none;
	  &.hover {
	    #capitulos {
	      height: 0;
	    }
	    .capitulo {
	      height: 0;
	      & hr {
	        height: 3px;
	      }
	      & p {
	        opacity: 0;
	        font-size: 0;
	      }
	    }
	    .rangeslider, .rangeslider__fill {
	      top: 0px;
	      height: 3px;
	    }
	    .rangeslider__handle {
	      width: 0;
	      height: 0;
	      opacity: 0;
	      &:after {
	        height: 0;
	        width: 0;
	      }
	    }
	    #tp-cr {
	      opacity: 0;
	      font-size: 0;
	    }
	    #tp-tt {
	      opacity: 0;
	      font-size: 0;
	    }
	  }
	}
</style>

<template>
	<div v-with="params: params, db: db">
		<in-bg-video></in-bg-video>
		<nav class="hover" id="video-controls">
			<in-topbar-capitulos></in-topbar-capitulos>
			<in-topbar-slider></in-topbar-slider>
			<input type="range" id="seek-bar" min="0" max="1000" data-rangeslider="" style="display: none;">
		</nav>
		<h1>video #{{params.video}}</h1>
		<p>{{db.nome}}</p>
		<p><a class="btn" v-on="click: clickHandle">Show block: {{toggle}}</a></p>
		
		<in-sidebar-block v-show="toggle" v-with="video: params.video, title: 'id do video: ' + params.video">
			<div v-component="in-example" v-with="video:video">
				conteudo dentro de um componente do video {{video}}
			</div>
		</in-sidebar-block>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
		data: function(){
			return {
				toggle: false
			}
		},
		attached: function() {
			$$$('body').addClass("tocando");
			
			window.onmousemove = handleMouseMove;
			var controles = document.getElementById('video-controls');
		  function handleMouseMove(event) {
		    event = event || window.event; // IE-ism
		    // event.clientX and event.clientY contain the mouse position
		    if (event.clientY < 50) {
		      controles.className = "";
		    } else {
		      controles.className = "hover";
		    }
		  }
		},
		methods: {
			clickHandle: function(){
				this.$data.toggle = !this.$data.toggle;
				console.log(this, this.$data, this.$data.toggle, this.$data.arr)
			}
		},
		components: {
			'in-example': require('../components/example.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-topbar-slider': require('../components/topbar-slider.vue'),
			'in-topbar-capitulos': require('../components/topbar-capitulos.vue'),
			'in-bg-video': require('../components/bg-video.vue')
		}
	}
</script>