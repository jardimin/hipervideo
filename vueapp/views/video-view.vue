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
				<div class="capitulo" v-repeat="db.capitulos" style="width: {{tamanhoCap($index)[0]}}%; left: {{tamanhoCap($index)[1]}}%"></div>
			</div>
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
				get: function(cap) {
					var tempo = this.$data.db.duracao;
					var itulo = this.$data.db.capitulos[cap].timecode;
					var tamanho = (itulo * 100) / tempo;
					if (cap === 0) {
						return [tamanho, 0];
					} else {
						var pos = 0;
						for (var i = 0; i < cap; i++) {
							var perc = (this.$data.db.capitulos[i].timecode * 100) / tempo;
							pos += perc;
						} return [tamanho, pos];
					}
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
			'in-sidebar-block': require('../components/sidebar-block.vue')
		}
	}
</script>