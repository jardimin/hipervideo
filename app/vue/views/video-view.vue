<style lang="scss">
	.sidebar {
		width: 22%;
		@media screen and (min-width: 1600px) {
			width: 15%;
		}
		&.has-info {
			@media screen and (min-width: 1600px) {
				width: 16%;
			}
		}
	}
	.sidebar_content {
		position: relative;
		height: 100%;
		z-index: 20;
	}
	.sidebar_back {
		position: absolute;
		background-color: rgba(0,0,0,.5);
		width: 300px;
		height: 100%;
		top: 0;
		left: 0;
		transition: all 0.6s;
		-webkit-transform: translate3d(-300px,0,0);
		-moz-transform: translate3d(-300px,0,0);
		-o-transform: translate3d(-300px,0,0);
		-ms-transform: translate3d(-300px,0,0);
		transform: translate3d(-300px,0,0);
		z-index: 10;
		.sidebar.is-open & {
			-webkit-transform: translate3d(0,0,0);
			-moz-transform: translate3d(0,0,0);
			-o-transform: translate3d(0,0,0);
			-ms-transform: translate3d(0,0,0);
			transform: translate3d(0,0,0);
		}
	}

	.sidebar-right {
		position: absolute;
		right: 0;
		top: 57px;
		width: 300px;
	}

	.infopanel {
		position: absolute;
		background-color: rgba(0,0,0,.8);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		transition: all 0.6s;
		-webkit-transform: translate3d(127%,0,0);
		-moz-transform: translate3d(127%,0,0);
		-o-transform: translate3d(127%,0,0);
		-ms-transform: translate3d(127%,0,0);
		transform: translate3d(127%,0,0);
		&.is-open {
			-webkit-transform: translate3d(300px,0,0);
			-moz-transform: translate3d(300px,0,0);
			-o-transform: translate3d(300px,0,0);
			-ms-transform: translate3d(300px,0,0);
			transform: translate3d(300px,0,0);
		}
		.border {
			position: absolute;
			height: 100%;
			width: 10px;
			top: 0;
			left: 0;
		}
		.back {
			position: absolute;
			top: 10%;
			left: 79%;
			color: #fff;
			font-size: 24px;
		}
	}

	.debug {
		position: absolute;
		width: 400px;
		left: 50%;
		top: 40%;
		margin-left: -200px;
		text-align: center;
		.btn {
			cursor: pointer;
			padding: 10px;
			background: #ccc;
			display: inline-block;
			margin: 4px;
			color: black;
			font-size: 10px;
		}
	}

	#video-controls {
	  position: fixed;
	  top: 0;
	  width: 100%;
	  display: none;
	  z-index: 25;
	  &.hover {
	    .rangeslider, .rangeslider__fill {
	      top: 0px;
	      height: 3px;
	    }
	  }
	}

	.sidebar_opener {
		position: relative;
		transition: all 0.6s ease 0.6s;
		overflow: hidden;
		&.v-enter, &.v-leave {
			-webkit-transform: translate3d(-100px,0,0);
			-moz-transform: translate3d(-100px,0,0);
			-o-transform: translate3d(-100px,0,0);
			-ms-transform: translate3d(-100px,0,0);
			transform: translate3d(-100px,0,0);
		}
		&.v-leave {
			transition: all 0.3s ease 0;
		}
		.sidebar_opener__inside {
			display: inline-block;
			color: #fff;
			padding: 10px;
			height: 28px;
			line-height: 28px;
			transition: all 0.6s ease;
		}
	}

	.infopanel {
		-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 5% 20% 3% 3%;
		width: 79%;
		@media screen and (min-width: 1600px) {
			width: 85%;
		}
	}

	.is-cartela {
		height: auto !important;
	}

	.sidebar_cartela {
		transition: all 0.5s ease 0.5s;
		position: fixed;
		bottom: 60px;
		left: 0;
		min-width: 40%;
		&.expand-enter, &.expand-leave {
			left: -800px;
		}
	}

	.not-loading {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -150;
		opacity: 0;
		padding-top: 22%;
		text-align: center; 
		background-color: rgba(50, 50, 50, 0.6);
		transition: opacity 0.5s;
	}

	.loading {
		opacity: 1;
		z-index: 150;
	}

	.pausado {
		opacity: 0.3 !important;
	}

</style>

<template>
	<div v-with="id: params.video, params: params, db: db" allowfullscreen="true">

		<!-- CREDITOS -->

		<in-creditos></in-creditos>

		<!-- VIDEO -->

		<in-bg-video v-ref="hipervideo"></in-bg-video>

		<!-- NAV-VIDEO -->

		<nav class="hover" id="video-controls">
			<in-topbar-capitulos></in-topbar-capitulos>
			<in-topbar-slider></in-topbar-slider>
			<input type="range" id="seek-bar-{{id}}" min="0" max="1000" data-rangeslider="" style="display: none;">
		</nav>

		<!-- SIDEBAR -->

		<div class="sidebar" v-class="is-open: hasBlocks || hasInfo || fixedSidebar, has-info: hasInfo">

			<!-- CONTENT -->

			<div class="sidebar_content">
				<in-sidebar-graph></in-sidebar-graph>
				<in-sidebar-chapter v-with="capitulo: capitulo, libras: libras, audio_desc: audio_desc" v-if="capitulo"></in-sidebar-chapter>
				<in-sidebar-block v-repeat="contentBlocks" v-with="video: video" v-transition></in-sidebar-block>
				<div class="sidebar_opener clickable" v-on="click: openDefaultBlock" v-show="!hasBlocks && !fixedSidebar && !hasInfo" v-transition>
					<div class="sidebar_opener__inside context-bg">abrir</div>
				</div>
			</div>

			<!-- CARTELAS -->

			<div v-show="cartela" class="sidebar_cartela" v-transition="expand">
				<div class="sidebar_block__header context-bg" style="font-size: 100%;">
					<div id="cartela_nome">
						{{contentCartela.title | uppercase}}
					</div>
				</div>
				<div class="sidebar_block__header" style="background: #fff;">
					<div id="cartela_funcao">
						{{contentCartela.funcao}}
					</div>
				</div>
			</div>

			<!-- BACKGROUND -->

			<div class="sidebar_back"></div>
		</div>

		<!-- RIGHT SIDE -->

		<div class="sidebar-right">
			<in-event-block-map v-ref="map"></in-event-block-map>
		</div>

		<!-- INFO -->
	
		<div id="infopanel" class="infopanel" v-class="is-open: hasInfo">
	    <in-sidebar-info v-with="id: id, conteudo: conteudo"></in-sidebar-info>
	  </div>

		<!-- MARCOS -->
		
		<in-botbar-marcos></in-botbar-marcos>

		<!-- ACESSIBILIDADE -->

		<!-- <in-libras v-with="id: id" v-show="libras"></in-libras> -->

		<div class="audio_desc" v-show="audio_desc">
			<in-audio v-with="id: id"></in-audio>
		</div>

		<div id="loading" class="not-loading"><i class="fa fa-refresh fa-3x fa-spin"></i></div>
		<div id="aviso" style="position: fixed; top: 50px; width: 100%; text-align: center; font-size: 200%; background-color: #555; padding: 10px; transition: all 1s; opacity: 1;">Aperte ESPAÇO para pausar e ENTER para entrar no modo TELA CHEIA</div>
		
	</div>
</template>

<script>
	
	var Vue = require('vue')
	var $$$ = require('jquery')
	var _ = require('underscore')
	var perfectScrollbar = require('perfect-scrollbar')

	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
		data: function(){
			return {
				db: null,
				events: null,
				geo: false,
				counter: 0,
				contentBlocks: [],
				contentCartela: {title: "", funcao: ""},
				cartela: false,
				fixedSidebar: false,
				conteudo: {},
				capitulo: null,
				libras: false,
				audio_desc: false,
				viid: null,
				creditos: null,
				seeking: false,
				video: {
					popcorn: null,
					time: 0,
					duration: 0,
					progress: 0
				}
			}
		},
		computed: {
			hasBlocks: function() {
				return this.contentBlocks.length >= 2 || this.contentBlocks.length > 0 && !this.contentBlocks[0].funcao
			},
			hasInfo: function(){
				return this.params.route.length > 1 && this.params.route[1] == 'info'
			},
			hasLibras: function() {
				return this.libras
			}
		},
		attached: function() {

			this.capitulo = this.db.capitulos[0];
			this.libras = this.$parent.libras;
			this.audio_desc = this.$parent.audio_desc;
			setTimeout(function() {
				$$$('#aviso').css('opacity', 0)
			}, 4000)
			setTimeout(function() {
				$$$('#aviso').css('display', 'none')
			}, 5000)

			var self = this

			// DATA
			
			// events: load hipervideo events

			var xhr = new XMLHttpRequest
			xhr.open('GET', '/api/events-' + this.id + '.json')
			xhr.onload = function () {
				console.log(JSON.parse(xhr.responseText));
				self.events = JSON.parse(xhr.responseText)
				// attach events if popcorn already loaded
				if(self.video.popcorn != null){
					self.attachPopcornEvents();
				}
			}
			xhr.send()

			this.$on('mudou-libras', function (val) {
				self.libras = val;
			})

			this.$on('mudou-audio_desc', function (val) {
				self.audio_desc = val;
			})

			this.$on('hipervideo-canplay', function() {
				self.$broadcast('libras-load')
			})

			// POPCORN

			this.viid = document.getElementById('hipVid-' + self.id);
			this.creditos = document.getElementById('creditos');

			this.viid.addEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid-" + self.id);

				// attach events if data already loaded

				if(self.events != null){
					self.attachPopcornEvents();
				}

			}, false );

			this.viid.addEventListener( "play", function() {

				if (!self.seeking) {
					self.$broadcast('hipervideo-play')
					$$$('#hipVid-' + self.id).removeClass('pausado')
				}

			}, false );

			this.viid.addEventListener( "pause", function() {

				if (!self.seeking) {
					self.$broadcast('hipervideo-pause')
					$$$('#hipVid-' + self.id).addClass('pausado')
				}

			}, false );

			this.viid.addEventListener( "ended", function() {
				console.log(self.seeking);

				creditos.className = 'finalizado';
				self.viid.pause();

			}, false );

			// CHILD LISTENERS

			this.$on('block-timer-clicked', function (child, id) {
				var node = _.findWhere(this.contentBlocks,{"id": id})
				if(node && node.start == null){
					node.start = -1
				}
				if (this.conteudo && this.conteudo.id === id) {
					this.$broadcast('destroy-scrollbar');
				}				
				this.removeBlock(id);
			})

			this.$on('video-timeupdate', function (time, duration, progress) {
				var cap = this.capitulo;
				var caps = this.db.capitulos;
				var cap_atual = _.findWhere(caps, {id: cap.id});
				var cap_next = _.findWhere(caps, {id: cap.id + 1});
				var cap_prev = _.findWhere(caps, {id: cap.id - 1});
				this.video.time = time
				this.video.duration = duration
				this.video.progress = progress
				if (this.libras) {
					this.$broadcast('libras-update', time);
				} else if (this.audio_desc) {
					this.$broadcast('audio-update', time);
				}
				if (cap_next && time >= this.capitulo.timecode) {
					this.capitulo = cap_next;
					$$$('#chap').addClass('aberto')
          setTimeout(function() {
            $$$('#chap').removeClass('aberto')
          }, 5000)
				} else if (cap_prev && time <= cap_prev.timecode) {
					$$$('#chap').addClass('aberto')
          setTimeout(function() {
            $$$('#chap').removeClass('aberto')
          }, 5000)
					this.capitulo = cap_prev;
				}
			})

			this.$on('graph-node-clicked', function (node) {
				if(node.id == 0){

				} else {
					self.addBlockById(node.id)
				}
			})

			// DOM LISTENERS

			$$$('body').addClass("tocando");
			$$$(window).bind('mousemove', this.handleMouseMove);
			$$$(document).bind('keydown', this.keyEvents)

		},
		beforeDestroy: function(){
      this.$off('mudou-libras')
			this.$off('mudou-audio_desc')
			this.$off('hipervideo-canplay')
			var self = this
			this.viid.removeEventListener( "play", function() {

				if (!self.seeking) {
					self.$broadcast('hipervideo-play')
					$$$('#hipVid-' + self.id).removeClass('pausado')
				}

			}, false );

			this.viid.removeEventListener( "pause", function() {
				console.log(self.seeking);

				if (!self.seeking) {
					self.$broadcast('hipervideo-pause')
					$$$('#hipVid-' + self.id).addClass('pausado')
				}

			}, false );

			this.viid.removeEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid-" + self.id);

				// attach events if data already loaded

				if(self.events != null){
					self.attachPopcornEvents();
				}

			}, false );
			this.viid.removeEventListener( "ended", function() {

				creditos.className = 'finalizado';
				self.viid.pause();

			}, false );
			this.$off('block-timer-clicked')
			this.$off('video-timeupdate')
			this.$off('graph-node-clicked')
			location.reload()
    },
		ready: function(){
			this.$dispatch('video-view-ready');
		},
		detached: function(){
			$$$(window).unbind('mousemove', this.handleMouseMove)
			$$$(document).unbind('keydown', this.keyEvents)
		},
		methods: {
			infoOpen: function(info){
				var i = parseInt(info)
				var node = _.findWhere(this.events.nodes,{"id": i});
				this.$broadcast('info-open');
				this.videoPause();
				this.conteudo = node.conteudo;
				if (node.conteudo.texto === "") {
					this.conteudo.texto = node.component.fields.excerpt
				}
				this.conteudo.title = node.title;
				this.conteudo.id = node.id;
				this.conteudo.icon = node.icon;
				this.$broadcast('create-scrollbar');
			},
			infoClose: function(){
				this.$broadcast('info-close');
				this.videoPlay();
				this.conteudo = {};
				this.$broadcast('destroy-scrollbar');
			},
			videoPause: function(){
				this.$.hipervideo.pause()
			},
			videoPlay: function(){
				this.$.hipervideo.play()
			},
			makeFixedSidebar: function(){
				this.fixedSidebar = true;
			},
			openDefaultBlock: function(){
				this.contentBlocks.unshift({
					id: 99,
					ap: true,
					videoID: this.params.video,
					title: "APRESENTAÇÃO",
					type: "text",
					start: null,
					end: null,
					fields: {
						excerpt: this.db.descricao
					}
				})
			},
			attachPopcornEvents: function(){

				var self = this
				var popcorn = this.video.popcorn
				var id = 1

				this.events.timecode.map(function(event){
					
					event.id = id
					
					popcorn.code({
						start: event.start,
						end: event.end + 0.3,
						onStart: function() {
							self.addBlock(event)
						},
						onEnd: function() {
							self.removeBlock(event.id)
						}
					});
					
					id++

					return event
				});
			},
			handleMouseMove: function(event) {
				var controles = document.getElementById('video-controls');
				var linha = document.getElementById('linha-do-tempo');
				event = event || window.event; // IE-ism
				// event.clientX and event.clientY contain the mouse position
				if (event.clientY < 60) {
					controles.className = "";
				} else {
					controles.className = "hover";
				}
				if (event.clientY > window.innerHeight - 40) {
					linha.className = "marcos_handle cima";
				} else {
					linha.className = "marcos_handle";
				}
			},
			keyEvents: function(e) {
				var video = document.getElementById('hipVid-' + this.id);
				switch(e.which) {
					case 32 : 
						if (video.paused && !this.hasInfo && this.$parent.redes === false) {
							video.play();
						} else if (!video.paused) {
							video.pause();
						}
						break;
					case 13 : 
						this.toggleFullScreen();
						break;
				}
			},
			toggleFullScreen: function() {
				var a = document.getElementById('full')
				if (!document.mozFullScreen && !document.webkitFullScreen) {
					if (a.mozRequestFullScreen) {
						a.mozRequestFullScreen();
					} else {
						a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				} else {
				if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else {
						document.webkitCancelFullScreen();
					}
				}
			},
			addBlock: function(event){
				
				var node = _.findWhere(this.events.nodes,{"id": event.node})

				if(node.funcao){
					this.contentCartela = {
						id: event.id,
						videoID: this.params.video,
						title: node.title,
						funcao: node.funcao,
						ap: true
					}
					this.cartela = true
				} else {
					if(this.contentBlocks.length !== 0) {
						this.contentBlocks = [];
					}
					this.contentBlocks.unshift({
						id: event.id,
						videoID: this.params.video,
						title: node.title,
						type: node.component.type,
						start: event.start,
						end: event.end,
						fields: node.component.fields
					})
				}

				if(node.geo){
					this.$broadcast('event-map', node.geo);
					this.geo = true
				}

				if (node.icon === 'marco') {
					$$$('#app').removeClass('marco-fechado');
					this.$broadcast('hover-marco', node);
				}

				this.fixedSidebar = false;
			},
			addBlockById: function(id){

				if(_.findWhere(this.contentBlocks,{"id": id})) return;
				if(this.contentBlocks.length !== 0) {
					this.contentBlocks = [];
				}

				var node = _.findWhere(this.events.nodes,{"id": id})
				if(node.component.fields.excerpt === "") return;

				this.contentBlocks.unshift({
					id: node.id,
					videoID: this.params.video,
					title: node.title,
					type: node.component.type,
					start: null,
					end: null,
					fields: node.component.fields
				})

				if(node.geo){
					this.$broadcast('event-map', node.geo);
					this.geo = true
				}

				this.fixedSidebar = false;

				if (this.hasInfo) {
					var loc = window.location.href
					this.$broadcast('destroy-scrollbar');
					if (this.conteudo.id.toString().length === 1) {
						window.location.href = loc.substr(0, loc.length - 1) + node.id;
					} else {
						window.location.href = loc.substr(0, loc.length - 2) + node.id;	
					}
					this.$broadcast('so-scrollbar');
				}

			},
			removeBlock: function(id) {
				$$$('#app').addClass('marco-fechado');
				$$$('#marco-'+id).removeClass('hover');
				this.contentBlocks = _.reject(this.contentBlocks, function(block){
					return block.start === null ? false : block.id === id
				})
				this.cartela = null
				this.geo = false
				this.$broadcast('remove-event-map', this.db.geo);
			}
		},
		components: {
			'in-example': require('../components/example.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-topbar-slider': require('../components/topbar-slider.vue'),
			'in-topbar-capitulos': require('../components/topbar-capitulos.vue'),
			'in-bg-video': require('../components/bg-video.vue'),
			'in-botbar-marcos': require('../components/marcos.vue'),
			'in-event-block-map': require('../components/event-block-map.vue'),
			'in-sidebar-graph': require('../components/sidebar-graph.vue'),
			'in-sidebar-chapter': require('../components/sidebar-chapter.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-sidebar-info': require('../components/sidebar-info.vue'),
			'in-creditos': require('../components/creditos.vue'),
			'in-libras': require('../components/libras.vue'),
			'in-audio': require('../components/audio_desc.vue')
		}
	}
</script>