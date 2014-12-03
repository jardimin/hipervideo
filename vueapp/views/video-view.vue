<style lang="scss">
	.btn {
		cursor: pointer;
		padding: 10px;
		background: #ccc;
	}
</style>

<template>
	<div v-with="params: params, db: db">
		<video poster="http://jardim.in/hipervideo/img/splash.jpg" preload="auto" class="" id="hipVid0" >
			<source src="{{db.url}}.mp4" type="video/mp4" id="mp4">
			<source type="video/webm" src="{{db.url}}.webm" id="webm">
		</video>
		<nav class="hover" id="video-controls">
			<div id="capitulos">
				<div class="capitulo" v-repeat="db.capitulos" style="width: {{tamanhoCap[$index]}}%; left: {{posicaoCap[$index]}}%" v-on="click: seekCap(posicaoCap[$index]) ">
					<hr></hr>
					<p>{{$index + 1}} {{db.capitulos[$index].nome}}</p>
				</div>
			</div>
			<div class="rangeslider">
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
				<div class="rangeslider__fill" style="width: 0px;"></div>
				<div class="rangeslider__handle" style="left: 0px;"></div>
			</div>
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
		},
		// redy: function() {
		// 	var tempo = this.$data.duracao;
		// 	var cap = this.$data.capitulos;
		// 	var pos = 0;
		// 	for (var i = 0; i < cap.length; i++) {
		// 		var tamanho = (cap[i].timecode * 100) / tempo;
		// 		this.$data.capitulos[i].tamanho = tamanho;
		// 		this.$data.capitulos[i].lef = pos;
		// 	}
		// },
		attached: function() {
			var hipervideo = $$$('#hipVid0').get(0);
			var selector = $$$('.rangeslider').get(0);
			var seekBar = $$$('#seek-bar').get(0);
			$$$('body').addClass("tocando");
			hipervideo.play();
			var tempoCorrido = function(array) {
			  var min = array[0];
			  var sec = array[1];
			  $$$('#tp-cr-min').text(min);
			  $$$('#tp-cr-sec').text(sec);
			};

			var playVideo = function(argument) {
			  
			  $$$('#mp4').prop("src", argument + ".mp4");
			  $$$('#webm').prop("src", argument + ".webm");
			  hipervideo.load();
			  
			}

			var seekCap = function(perc) {
			  var timecode = (hipervideo.duration * perc) / 100
			  hipervideo.currentTime = timecode;
			}

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
		    var fillWidth = seekBar.value / 10;
		    var tempo = toFormat(hipervideo.currentTime);
		    tempoCorrido(tempo);

		    // Update the slider value
		    seekBar.value = value;
		    $$$('.rangeslider__fill').css('width', fillWidth+"%")
		    $$$('.rangeslider__handle').css('left', fillWidth+"%")
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
			},
			seekCap: function(perc) {
				var hipervideo = document.getElementById('hipVid0')
			  var timecode = (hipervideo.duration * perc) / 100
			  hipervideo.currentTime = timecode;
			}
		},
		components: {
			'in-example': require('../components/example.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue')
		}
	}
</script>