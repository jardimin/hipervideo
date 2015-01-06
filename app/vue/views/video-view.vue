<style lang="scss">
	.sidebar {
		width: 300px;
	}
	.sidebar_content {
		position: relative;
		height: 100%;
		z-index: 20;
	}
	.sidebar_back {
		position: absolute;
		background-color: rgba(0,0,0,.2);
		width: 300px;
		height: 100%;
		top: 0;
		left: 0;
		transition: all 0.5s;
		transform: translate3d(-300px,0,0);
		z-index: 10;
		.sidebar.is-open & {
			transform: translate3d(0,0,0);
		}
	}

	.infopanel {
		position: absolute;
		background-color: rgba(0,0,0,.5);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		transition: all 0.5s;
		transform: translate3d(100%,0,0);
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
			top: 100px;
			left: 100px;
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

</style>

<template>
	<div v-with="id: params.video, params: params, db: db" allowfullscreen="true">

		<!-- VIDEO -->

		<in-bg-video v-ref="hipervideo"></in-bg-video>

		<!-- NAV-VIDEO -->

		<nav class="hover" id="video-controls">
			<in-topbar-capitulos></in-topbar-capitulos>
			<in-topbar-slider></in-topbar-slider>
			<input type="range" id="seek-bar-{{id}}" min="0" max="1000" data-rangeslider="" style="display: none;">
		</nav>

		<!-- SIDEBAR -->

		<div class="sidebar" v-class="is-open: hasBlocks || hasInfo">

			<!-- CONTENT -->

			<div class="sidebar_content">
				<in-sidebar-graph></in-sidebar-graph>
				<in-sidebar-chapter v-with="title: db.nome"></in-sidebar-chapter>
				<in-sidebar-block v-repeat="contentBlocks" v-with="video: video" v-transition>
					<div v-component="{{'in-sidebar-block-' + type}}" v-with="fields"></div>
				</in-sidebar-block>
			</div>

			<!-- BACKGROUND -->

			<div class="sidebar_back"></div>
		</div>

		<!-- INFO -->
	
		<div class="infopanel" v-class="is-open: hasInfo">
			<div class="border context-bg"></div>
			<a class="back" href="#/{{id}}">voltar ao video</a>
		</div>

		<!-- MARCOS -->
		
		<in-botbar-marcos></in-botbar-marcos>
		
		<!-- DEBUG -->

		<div class="debug">
			<a id="tres" class="btn" href="#/{{id}}">{{id}}</a>
			<a id="tres" class="btn" href="#/{{id}}/info/teste">info/teste</a>
			<a id="tres" class="btn" href="#/{{id}}/info/teste2">info/teste2</a>
			<br>
			<a id="tres" class="btn" href="#/home">home</a>
			<a id="tres" class="btn" href="#/mulher">mulher</a>
			<a id="tres" class="btn" href="#/crianca">crianca</a>
		</div>

	</div>
</template>

<script>
	
	var Vue = require('vue')
	var $$$ = require('jquery')
	var _ = require('underscore')

	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
		data: function(){
			return {
				db: null,
				events: null,
				counter: 0,
				contentBlocks: [],
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
				return this.contentBlocks.length > 0
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
			xhr.open('GET', '/api/db-events.json')
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

			video.addEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid-" + self.id);

				// attach events if data already loaded

				if(self.events != null){
					self.attachPopcornEvents();
				}

			}, false );

			// CHILD LISTENERS

			this.$on('block-timer-clicked', function (child, id) {
				this.removeBlock(id);
			})

			this.$on('video-timeupdate', function (time, duration, progress) {
				this.video.time = time
				this.video.duration = duration
				this.video.progress = progress
				//console.log(this.video, time, duration, progress)
			})

			// DOM LISTENERS

			$$$('body').addClass("tocando");
			$$$(window).bind('mousemove', this.handleMouseMove)

		},
		ready: function(){
			this.$dispatch('video-view-ready');
		},
		detached: function(){
			$$$(window).unbind('mousemove', this.handleMouseMove)
		},
		methods: {
			openinfo: function(info){
				this.$.hipervideo.pause()
			},
			closeinfo: function(){
				this.$.hipervideo.play()
			},
			attachPopcornEvents: function(){

				var self = this
				var popcorn = this.video.popcorn
				var id = 1

				this.events.timecode.map(function(event){
					
					event.id = id
					
					popcorn.code({
						start: event.start,
						end: event.end,
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
				event = event || window.event; // IE-ism
				// event.clientX and event.clientY contain the mouse position
				if (event.clientY < 60) {
					controles.className = "";
				} else {
					controles.className = "hover";
				}
			},
			addBlock: function(event){
				
				var node = _.findWhere(this.events.nodes,{"id": event.node})

				this.contentBlocks.push({
					id: event.id,
					title: node.title,
					type: node.component.type,
					start: event.start,
					end: event.end,
					fields: node.component.fields
				})
			},
			removeBlock: function(id) {
				this.contentBlocks = _.reject(this.contentBlocks, function(block){
					return block.id === id
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
			'in-sidebar-graph': require('../components/sidebar-graph.vue'),
			'in-sidebar-chapter': require('../components/sidebar-chapter.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-sidebar-block-text': require('../components/sidebar-block-text.vue'),
			'in-sidebar-block-profile': require('../components/sidebar-block-profile.vue')
		}
	}
</script>