<style lang="scss">
	header {
		position: absolute;
		height: 100%;
		background-color: rgba(15,15,15,0.8);
		width: 100%;
		box-sizing: border-box;
		z-index: 1;
		transition: all 0.5s;
		@extend clearfix;
		& h1 {
			margin: 0.5%;
		}
		&.fechado {
			height: 5%;
			font-size: 50%;
			overflow: hidden;
			padding: 0;
			text-align: center;
			transition: all 0.5s;
			& p {
				opacity: 0;
			}
			& a {
				opacity: 0 !important;
			}
			&:hover {
				font-size: 55%;
			}
			&.ativo {
				top: -5%;
				transition: all 0.5s;
			}
			.conteudo {
				padding: 0;
			}
			#headHandle {
				z-index: 2;
				cursor: pointer;
			}
		}
		.conteudo {
			box-sizing: border-box;
			padding: 5%;
			transition: all 0.5s;
		}
	}

	.areaTematica {
	  text-align: center;
	  right: -40%;
	  width: 40%;
	  position: fixed;
	  height: 100%;
	  background-color: rgba(15,15,15,0.8);
	  z-index: 1;
	  transition: all 0.5s;
	  & h2 {
	  	margin-top: 10%;
	  }
	}

	.col-1-5 {
	  width: 20%;
	  text-decoration: none;
	  position: absolute;
	  height: 100%;
	  transition: all 0.5s;
	}

	.linha {
    height: 100%;
    position: fixed;
    right: 40%;
    width: 0.5%;
    z-index: 1;
    bottom: -100%;
    opacity: 0.6;
    transition: all 0.1s;
	}

	.botao {
		cursor: pointer;
    display: inline-block;
    margin: 10px;
    padding: 10px;
    width: 50%;
		background: #ccc;
		color: black;
		opacity: 0.6;
		transition: all 0.3s;
		text-align: center;
		&:hover {
			opacity: 1;
		}
		&.cruz {
			border-radius: 16px;
		  height: 20px;
		  padding: 5px;
		  position: absolute;
		  right: 2%;
		  top: 2%;
		  width: 20px;
		}
	}

	.fotoFundo {
		position: absolute;
	}

	.BW {
		transition: all 0.5s ease 0s;
	}

	#headHandle {
		z-index: -15;
		position: absolute;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.hipervideo {
		overflow: hidden;
		cursor: pointer;
	  transition: all 0.5s ease 0s;
	  &:hover {
	  	.BW {
	  		opacity: 0;
	  	}
	  }
		&.ativo {
			width: 100%;
			cursor: default;
			z-index: 2 !important;
			left: 0 !important;
			.areaTematica {
				right: 0;
			}
			.linha {
				transition: all 0.5s ease 0.3s;
				bottom: 0;
			}
			.fotoFundo {
				left: 0 !important;
			}
			.BW {
				z-index: -1 !important;
				opacity: 0;
			}
		}
	}

</style>

<template>
	<div v-with="db: fulldb">
		<header class="">
			<div class="conteudo">
				<div id="headHandle" v-on="click: abrir"></div>
				<h1>{{db.title}}</h1>
				<p>{{db.texto}}</p>
				<a v-on="click: fechar" class="botao cruz">X</a>
			</div>
		</header>
		<div class="conteudo" style="position: absolute; z-index: 0;">
			<div class="grid">
				<div v-repeat="db.hipervideos" class="hipervideo col-1-5 {{id}}" style="left: {{posHip[$index]}}%; z-index: -{{$index}}">
					<div class="linha" style="background-color: {{cor}}"></div>
					<div class="areaTematica">
						<h2>{{nome}}</h2>
						<p>{{descricao}}</p>
						<a v-on="click: deselect(id)" class="botao cruz" style="background-color: {{cor}}">X</a>
						<a href="#/{{id}}" class="botao" style="background-color: {{cor}}; text-decoration: none;">Assistir</a>
					</div>
					<img v-attr="src: '/img/RE_' + id + 'BW.png'" class="fotoFundo BW" style="left: -{{posHip[$index]}}%; z-index: 1;" v-on="click: select(id)">
					<img v-attr="src: '/img/RE_' + id + '.png'" class="fotoFundo" style="left: -{{posHip[$index]}}%" v-on="click: select(id)">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		replace: true,
		methods: {
			fechar: function() {
				var head = $$$('header')
				head.addClass('fechado')
			},
			abrir: function() {
				var head = $$$('header')
				head.removeClass('fechado')
			},
			select: function(id) {
				var head = $$$('header')
				var esse = $$$('.'+ id)
				head.addClass('ativo')
				esse.addClass('ativo')
			},
			deselect: function(id) {
				var head = $$$('header')
				var este = $$$('.'+ id)
				head.removeClass('ativo')
				este.removeClass('ativo')
			}
		},
		computed: {
			posHip: {
				get: function() {
					var hip = this.$data.db.hipervideos
					var posicao = []
					for (var i = 0, antes = 0; i < hip.length; i++) {
						var left = i * 20
						posicao.push(left)
					}
					return posicao
				}
			}
		},
		attached: function () {
			$$$('body').removeClass("tocando");
		}
	}
</script>