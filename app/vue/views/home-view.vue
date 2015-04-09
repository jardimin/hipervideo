<style lang="scss">

	body {
		font-family: 'fonte-normal', sans-serif;
		letter-spacing: -1px;
		@media screen and (min-width: 1600px) {
			font-size: 1.3rem;
		}
	}

	header {
		position: absolute;
		height: 100%;
		background-image: url(http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/home.png);
		background-size: 100% auto;
		width: 100%;
		-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
		box-sizing: border-box;
		z-index: 1;
		transition: all 0.5s;
		@extend clearfix;
		& h1 {
			margin: 0.5%;
			display: none;
		}
		&.fechado {
			height: 5%;
			font-size: 50%;
			overflow: hidden;
			padding: 0;
			text-align: center;
			background: #141414;
			transition: all 0.5s;
			& h1 {
				display: block;
				@media screen and (min-width: 1600px) {
					font-size: 1.5rem;
				}
			}
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
			-webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 20% 2% 2% 50%;
			transition: all 0.5s;
		}
	}

	.areaTematica {
	  text-align: center;
	  padding: 0 3%;
	  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
		box-sizing: border-box;
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
    width: 26%;
		background: #ccc;
		color: black;
		opacity: 0.6;
		transition: all 0.3s;
		text-align: center;
		&:hover {
			opacity: 1;
		}
		&.clic {
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
		height: 100%;
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

	.nest {
    bottom: -35%;
    height: 35%;
    opacity: 0.8;
    position: absolute;
    width: 100%;
    z-index: 2;
    padding: 17% 5%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
		box-sizing: border-box;
    transition: all 0.5s ease 0s;
    & h2 {
    	text-align: center;
    }
	}

	.hipervideo {
		overflow: hidden;
		cursor: pointer;
	  transition: all 0.5s ease 0s;
	  &:hover {
	  	.BW {
	  		opacity: 0;
	  	}
	  	.nest {
	  		bottom: 0;
	  	}
	  }
		&.ativo {
			width: 100%;
			cursor: default;
			z-index: 2 !important;
			left: 0 !important;
			background-color: darkgray;
			.areaTematica {
				right: 0;
			}
			.nest {
				padding: 0;
				opacity: 0;
				z-index: 0;
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
	.sub_menu {
		width: 50%;
		float: left;
		.botao {
			width: 80%;
		}
	}

</style>

<template>
	<div v-with="db: fulldb">
		<in-tutorial v-show="tutorial" v-with="data: tutdata" v-transition></in-tutorial>
		<header class="">
			<div class="conteudo">
				<div id="headHandle" v-on="click: abrir"></div>
				<h1>{{db.title | uppercase}}</h1>
				<p style="letter-spacing: 0; text-align: center;">{{{db.texto | marked}}}</p>
				<a v-on="click: tutorialGO()" class="botao">O QUE É HIPERVÍDEO?</a>
				<a v-on="click: fechar" class="botao">ASSISTIR HIPERVÍDEOS</a>
				<a v-on="click: redes" class="botao">VER REDES</a>
				<img src="http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Logomarca_DAPES.png" style="width: 30%; margin: 5% 5% 0; float: left;">
				<img src="http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo_ministerio_saude_sus2.png" style="width: 50%; float: left; margin-top: 6%;">
			</div>
		</header>
		<div class="conteudo" style="position: absolute; z-index: 0;">
			<div class="grid">
				<div v-repeat="db.hipervideos" class="hipervideo col-1-5 {{id}}" style="left: {{posHip[$index]}}%; z-index: -{{$index}}">
					<div v-on="click: select(id)" class="nest" style="background-color: {{cor}};">
						<h2>{{formato | uppercase}}</h2>
					</div>
					<div class="linha" style="background-color: {{cor}}"></div>
					<div class="areaTematica">
						<h2>{{formato | uppercase}}</h2>
						<p style="letter-spacing: 0;">{{{descricao | marked}}}</p>
						<a href="#/{{id}}" class="botao" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">ASSISTIR</a>
						<a v-on="click: deselect(id)" class="botao" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">VOLTAR</a>
						<div class="sub_menu">
							<h2>QUALIDADE</h2>
							<div v-on="click: selectAlta" class="botao" v-class="clic: isAlta" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">ALTA</div>
							<div v-on="click: selectMedia" class="botao" v-class="clic: isMedia" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">MEDIA</div>
							<div v-on="click: selectBaixa" class="botao" v-class="clic: isBaixa" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">BAIXA</div>
						</div>
						<div class="sub_menu">
							<h2>ACESSIBILIDADE</h2>
							<div v-on="click: selectNada" class="botao" v-class="clic: isNada" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">SEM ACESSIBILIDADE</div>
							<div v-on="click: selectLibras" class="botao" v-class="clic: isLibras" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">LIBRAS</div>
							<div v-on="click: selectAudio" class="botao" v-class="clic: isAudio" style="background-color: {{cor}}; text-decoration: none; color: white; font-weight: 900;">ÁUDIO DESCRIÇÃO</div>
						</div>
					</div>
					<img v-attr="src: 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_' + id + 'BW.png'" class="fotoFundo BW" style="left: -{{posHip[$index]}}%; z-index: 1;" v-on="click: select(id)">
					<img v-attr="src: 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_' + id + '.png'" class="fotoFundo" style="left: -{{posHip[$index]}}%" v-on="click: select(id)">
				</div>
			</div>
		</div>
		<div style="position: fixed; right: 0; bottom: 0; z-index: 1; width: 180px;">
			<p style="float: left; font-size: 80%; width: 100px;">desenvolvido por</p>
			<a href="http://jardim.in" target="_blank">
	      <img src="https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo-fundotransparente.png" style="width: 40%; float: left; margin-top: 0.5%;">
	    </a>
		</div>
		<div id="aviso" style="position: fixed; top: 0; width: 100%; text-align: center; font-size: 100%; background-color: #555; padding: 10px; transition: all 1s; opacity: 1; display: none; z-index: 1;">Recomendamos a utilização do navegador GOOGLE CHROME para uma melhor experiência</div>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	var marked = require('marked')
	module.exports = {
		replace: true,
		data: function(){
			return {
				tutorial: false,
				tutdata: [{
					imagem: "https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Tutorial/Tutorial_Hip_1.png"
				},
				{
					imagem: "https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Tutorial/Tutorial_Hip_2.png"
				},
				{
					imagem: "https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Tutorial/Tutorial_Hip_3.png"
				},
				{
					imagem: "https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Tutorial/Tutorial_Hip_4.png"
				},
				{
					imagem: "https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Tutorial/Tutorial_Hip_5.png"
				},
				{
					imagem: "https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Tutorial/Tutorial_Hip_6.png"
				}]
			}
		},
		methods: {
			fechar: function() {
				var head = $$$('header')
				head.addClass('fechado')
			},
			redes: function() {
				this.$parent.redes = true
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
			},
			tutorialGO: function() {
				if (this.tutorial) {
					this.tutorial = false;
				} else {
					this.tutorial = true;
					this.$broadcast('slick-tut');
				}
			},
      selectAlta: function(){
        this.$dispatch('video-qualidade', 'alta')
      },
      selectMedia: function(){
        this.$dispatch('video-qualidade', 'media')
      },
      selectBaixa: function(){
        this.$dispatch('video-qualidade', 'baixa')
      },
      selectLibras: function(){
      	this.$dispatch('video-acessibilidade', 'libras')
      },
      selectAudio: function(){
      	this.$dispatch('video-acessibilidade', 'audio')
      },
      selectNada: function(){
      	this.$dispatch('video-acessibilidade', 'nada')
      }
		},
		computed: {
      isAlta: function() {
        return this.$parent.qualidade === 'alta';
      },
      isMedia: function() {
        return this.$parent.qualidade === 'media';
      },
      isBaixa: function() {
        return this.$parent.qualidade === 'baixa';
      },
      isLibras: function() {
        return this.$parent.acessibilidade === 'libras';
      },
      isAudio: function() {
        return this.$parent.acessibilidade === 'audio';
      },
      isNada: function() {
        return this.$parent.acessibilidade === 'nada';
      },
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
			var usr_ag = navigator.userAgent
			if (usr_ag.search("Chrome") === -1) {
				$$$('#aviso').css('display', 'block')
				setTimeout(function() {
					$$$('#aviso').css('opacity', 0)
				}, 6000)
				setTimeout(function() {
					$$$('#aviso').css('display', 'none')
				}, 7000)
			}

		},
		components: {
			'in-tutorial': require('../components/tutorial.vue')
		},
		filters: {
      'marked': marked
    }
	}
</script>