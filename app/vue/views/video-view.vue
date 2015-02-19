<style lang="scss">
	.sidebar {
		width: 22%;
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
		transform: translate3d(-300px,0,0);
		z-index: 10;
		.sidebar.is-open & {
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
		transform: translate3d(127%,0,0);
		&.is-open {
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
	}

	.is-cartela {
		height: auto !important;
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
				<in-sidebar-chapter v-with="title: db.nome"></in-sidebar-chapter>
				<in-sidebar-block v-repeat="contentBlocks" v-with="video: video" v-transition></in-sidebar-block>
				<div class="sidebar_opener clickable" v-on="click: openDefaultBlock" v-show="!hasBlocks && !fixedSidebar && !hasInfo" v-transition>
					<div class="sidebar_opener__inside context-bg">abrir</div>
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
		
		<!-- DEBUG -->

		<!-- <div class="debug">
			<a id="tres" class="btn" href="#/home">home</a>
			<a id="tres" class="btn" href="#/mulher">mulher</a>
			<a id="tres" class="btn" href="#/crianca">crianca</a>
			<br/>
			<a id="tres" class="btn" v-on="click: videoPlay">play</a>
			<a id="tres" class="btn" v-on="click: videoPause">pause</a>
		</div> -->

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
				counter: 0,
				contentBlocks: [],
				fixedSidebar: false,
				conteudo: null,
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
			}
		},
		attached: function() {

			var self = this

			// DATA
			
			// events: load hipervideo events

			var xhr = new XMLHttpRequest
			xhr.open('GET', '/api/events-' + this.id + '.json')
			xhr.onload = function () {
				self.events = JSON.parse(xhr.responseText)
				// attach events if popcorn already loaded
				if(self.video.popcorn != null){
					self.attachPopcornEvents();
				}
			}
			xhr.send()


			// POPCORN

			var video = document.getElementById('hipVid-' + self.id);
			var creditos = document.getElementById('creditos');

			video.addEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid-" + self.id);

				// attach events if data already loaded

				if(self.events != null){
					self.attachPopcornEvents();
				}

			}, false );

			video.addEventListener( "ended", function() {

				creditos.className = 'finalizado';
				video.pause();

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
				this.video.time = time
				this.video.duration = duration
				this.video.progress = progress
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
		ready: function(){
			this.$dispatch('video-view-ready');
		},
		detached: function(){
			$$$(window).unbind('mousemove', this.handleMouseMove)
		},
		methods: {
			infoOpen: function(info){
				var i = parseInt(info)
				var node = _.findWhere(this.events.nodes,{"id": i});
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
				this.videoPlay();
				this.conteudo = null;
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
				console.log('test');
				switch(e.which) {
					case 32 : 
						if (video.paused && this.conteudo === null) {
							video.play();
						} else if (!video.paused) {
							video.pause();
						}
						break;
				}
			},
			addBlock: function(event){
				
				var node = _.findWhere(this.events.nodes,{"id": event.node})

				if(node.funcao){
					this.contentBlocks.unshift({
						id: event.id,
						videoID: this.params.video,
						start: event.start,
						end: event.end,
						title: node.title,
						funcao: node.funcao,
						ap: true
					})
				} else {
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
					this.$.map.panTo(node.geo)
				}

				if (node.icon === 'marco') {
					$$$('#app').removeClass('marco-fechado');
					this.$broadcast('hover-marco', node);
				}

				this.fixedSidebar = false;
			},
			addBlockById: function(id){

				if(_.findWhere(this.contentBlocks,{"id": id})) return;

				var node = _.findWhere(this.events.nodes,{"id": id})

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
					this.$.map.panTo(node.geo)
				}

				this.fixedSidebar = false;

			},
			removeBlock: function(id) {
				$$$('#app').addClass('marco-fechado');
				$$$('#marco-'+id).removeClass('hover');
				this.contentBlocks = _.reject(this.contentBlocks, function(block){
					return block.start === null ? false : block.id === id
				})
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
			'in-sidebar-block-text': require('../components/sidebar-block-text.vue'),
			'in-sidebar-block-profile': require('../components/sidebar-block-profile.vue'),
			'in-sidebar-info': require('../components/sidebar-info.vue'),
			'in-creditos': require('../components/creditos.vue')
		}
	}
</script>