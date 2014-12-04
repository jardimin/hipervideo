<style lang="scss">
	#capitulos {
	  background-color: rgba(50, 50, 50, 1);
	  color: white;
	  height: 40px;
	  position: relative;
	  width: 100%;
	  z-index: 1;
	  cursor: pointer;
	  transition: all 0.5s ease 0s;
	  @extend %clearfix;
	  #video-controls.hover & {
	  	height: 0;
	  }
	}

	.capitulo {
	  transition: all 0.2s ease 0s;
	  height: 40px;
	  position: absolute;
	  #video-controls.hover & {
	  	height: 0;
      & hr {
        height: 3px;
      }
      & p {
        opacity: 0;
        font-size: 0;
      }
	  }
	  &:hover {
	    color: black;
	    background-color: rgba(200,200,200,1);
	  }
	  & hr {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    background-color: white;
	    border-color: -moz-use-text-color white -moz-use-text-color -moz-use-text-color;
	    border-image: none;
	    border-style: none solid none none;
	    border-width: medium 1px medium medium;
	    color: white;
	    float: left;
	    height: 100%;
	    margin: 0;
	    position: absolute;
	    top: 0;
	    width: 0;
	    transition: all 0.5s ease 0s;
	  }
	  & p {
	    margin: 12px 15px;
	    font-weight: 700;
	    font-size: 80%;
	    transition: all 0.5s ease 0s;
	  }
	}
</style>

<template>
	<div v-with="db: db" id="capitulos">
		<div class="capitulo" v-repeat="db.capitulos" style="width: {{tamanhoCap[$index]}}%; left: {{posicaoCap[$index]}}%" v-on="click: seekCap(posicaoCap[$index]) ">
			<hr></hr>
			<p>{{$index + 1}}.{{db.capitulos[$index].nome | uppercase}}</p>
		</div>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		replace: true,
		methods: {
			seekCap: function(perc) {
				var hipervideo = document.getElementById('hipVid0')
			  var timecode = (hipervideo.duration * perc) / 100
			  hipervideo.currentTime = timecode;
			}
		},
		computed: {
			tamanhoCap: {
				get: function() {
					var tempo = this.$data.db.duracao
					var capitulos = this.$data.db.capitulos
					var tamanhos = []
					for (var i = 0, antes = 0; i < capitulos.length; i++) {
						var width = ((capitulos[i].timecode - antes)*100) / tempo
						tamanhos.push(width)
						antes = capitulos[i].timecode
					}
					return tamanhos
				}
			},
			posicaoCap: {
				get: function() {
					var tempo = this.$data.db.duracao
					var capitulos = this.$data.db.capitulos
					var posicoes = []
					for (var i = 0, pos = 0; i < capitulos.length; i++) {
						var width = ((capitulos[i].timecode)*100) / tempo
						posicoes.push(pos)
						pos = width
					}
					return posicoes
				}
			}
		}
	}
</script>