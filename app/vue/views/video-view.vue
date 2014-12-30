<style lang="scss">
	.btn {
		cursor: pointer;
		padding: 10px;
		background: #ccc;
		display: inline-block;
		margin: 4px;
		color: black;
	}
	.sidebar {
		width: 248px;
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
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0.5s;
		transform: translate3d(-300px,0,0);
		z-index: 10;
		.sidebar.is-open & {
			transform: translate3d(0,0,0);
		}
	}

	.debug {
		position: absolute;
		width: 400px;
		left: 50%;
		top: 40%;
		margin-left: -200px;
		text-align: center;
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
	<div v-with="params: params, parent_db: db" allowfullscreen="true">

		<!-- VIDEO -->

		<in-bg-video></in-bg-video>

		<!-- NAV-VIDEO -->

		<nav class="hover" id="video-controls">
			<in-topbar-capitulos></in-topbar-capitulos>
			<in-topbar-slider></in-topbar-slider>
			<input type="range" id="seek-bar" min="0" max="1000" data-rangeslider="" style="display: none;">
		</nav>

		<!-- SIDEBAR -->

		<div class="sidebar" v-class="is-open: contentBlocks.length">

			<!-- CONTENT -->

			<div class="sidebar_content">
				<in-sidebar-graph></in-sidebar-graph>
				<in-sidebar-chapter v-with="title: params.video"></in-sidebar-chapter>
				<in-sidebar-block v-repeat="contentBlocks" v-with="video: video" v-transition>
					<div v-component="{{'in-sidebar-block-' + type}}" v-with="fields"></div>
				</in-sidebar-block>
			</div>

			<!-- BACKGROUND -->

			<div class="sidebar_back"></div>
		</div>
		
		<in-botbar-marcos></in-botbar-marcos>
		
		<!-- DEBUG -->

		<div class="debug">
			<a id="um" class="btn" v-on="click: addRandomBlock">Novo evento</a>
			<a id="dois" class="btn" v-on="click: removeFirstBlock">Remover primeiro evento</a>
			<a id="tres" class="btn" v-on="click: removeAllBlocks">Remover todos os eventos</a>
		</div>

	</div>
</template>

<script>
	
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
		attached: function() {

			var self = this

			// DATA

			// db: filter hipervideo data

			this.db = _.findWhere(this.parent_db.hipervideos,{"id": this.params.video})
			
			// events: load hipervideo events

			var xhr = new XMLHttpRequest
			xhr.open('GET', '/api/db-events.json')
			xhr.onload = function () {
				self.events = JSON.parse(xhr.responseText).events
				// attach events if popcorn already loaded
				if(self.video.popcorn != null){
					self.attachPopcornEvents();
				}
			}
			xhr.send()


			// POPCORN

			var video = document.getElementById('hipVid0');

			video.addEventListener( "loadeddata", function() {

				self.video.popcorn = Popcorn("#hipVid0");

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
			$$$(window).bind('mousemove', handleMouseMove)

			function handleMouseMove(event) {
				var controles = document.getElementById('video-controls');
				event = event || window.event; // IE-ism
				// event.clientX and event.clientY contain the mouse position
				if (event.clientY < 60) {
					controles.className = "";
				} else {
					controles.className = "hover";
				}
			}

		},
		detached: function(){
			$$$(window).unbind('mousemove')
		},
		methods: {
			attachPopcornEvents: function(){

				var self = this
				var popcorn = this.video.popcorn

				this.events.map(function(event){
					popcorn.code({
						start: event.start,
						end: event.end,
						onStart: function() {
							self.addBlock(event.id,event.start,event.end)
						},
						onEnd: function() {
							self.removeBlock(event.id)
						}
					});
					return event;
				});
			},
			addRandomBlock: function(start,end){
				this.counter++
				this.contentBlocks.push({
					id: 'block-r-' + this.counter,
					title: 'Random Block ' + this.counter,
					type: 'profile',
					start: start,
					end: end,
					fields: {
						name: 'Maria do ap. ' + Math.round(Math.random()*1000),
						text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat tenetur adipisci aliquid temporibus veritatis necessitatibus hic ut, culpa placeat, voluptate, delectus dolores. Nam hic sequi aspernatur excepturi reiciendis aperiam. Sapiente.'
					}
				})
			},
			addBlock: function(id,start,end){
				
				this.contentBlocks.push({
					id: 'block-' + id,
					title: 'Block ' + id,
					type: 'profile',
					start: start,
					end: end,
					fields: {
						name: 'TITULO',
						text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat tenetur adipisci aliquid temporibus veritatis necessitatibus hic ut, culpa placeat, voluptate, delectus dolores. Nam hic sequi aspernatur excepturi reiciendis aperiam. Sapiente.'
					}
				})
			},
			removeFirstBlock: function () {
				this.contentBlocks.shift()
			},
			removeAllBlocks: function () {
				this.contentBlocks = []
			},
			removeBlock: function(id) {
				this.contentBlocks = _.reject(this.contentBlocks, function(block){
					return block.id === id || block.id === 'block-' + id
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
			'in-sidebar-block-profile': require('../components/sidebar-block-profile.vue')
		}
	}
</script>