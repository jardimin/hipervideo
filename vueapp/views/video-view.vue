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
	<div v-with="params: params, db: db" allowfullscreen="true">

		<!-- VIDEO -->

		<in-bg-video></in-bg-video>

		<!-- NAV-VIDEO -->

		<nav class="hover" id="video-controls">
			<in-topbar-capitulos></in-topbar-capitulos>
			<in-topbar-slider></in-topbar-slider>
			<input type="range" id="seek-bar" min="0" max="1000" data-rangeslider="" style="display: none;">
		</nav>

		<!-- SIDEBAR -->

		<div class="sidebar" v-class="is-open: eventList.length">

			<!-- CONTENT -->

			<div class="sidebar_content">
				<in-sidebar-graph></in-sidebar-graph>
				<in-sidebar-chapter v-with="title: params.video"></in-sidebar-chapter>
				<in-sidebar-block v-repeat="eventList" v-transition>
					<div v-component="{{'in-sidebar-block-' + type}}" v-with="fields"></div>
				</in-sidebar-block>
			</div>

			<!-- BACKGROUND -->

			<div class="sidebar_back"></div>
		</div>
		
		<in-botbar-marcos></in-botbar-marcos>
		
		<!-- DEBUG -->

		<div class="debug">
			<a id="um" class="btn" v-on="click: addRandomEvent">Novo evento</a>
			<a id="dois" class="btn" v-on="click: removeFirstEvent">Remover primeiro evento</a>
			<a id="tres" class="btn" v-on="click: removeAllEvents">Remover todos os eventos</a>
		</div>

	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
		data: function(){
			return {
				counter: 0,
				eventList: []
			}
		},
		attached: function() {
			$$$('body').addClass("tocando");
			
			window.onmousemove = handleMouseMove;
			var controles = document.getElementById('video-controls');
		  function handleMouseMove(event) {
		    event = event || window.event; // IE-ism
		    // event.clientX and event.clientY contain the mouse position
		    if (event.clientY < 60) {
		      controles.className = "";
		    } else {
		      controles.className = "hover";
		    }
		  }

		  var video = document.getElementById('hipVid0');
		  video.addEventListener( "loadeddata", function() {
		  	var hiper = Popcorn("#hipVid0");

				hiper.code({
					start: 4,
					end: 18,
					onStart: function() {
						document.getElementById("um").click();
					},
					onEnd: function() {
						document.getElementById("dois").click();
					}
				});
				hiper.code({
					start: 30,
					end: 60,
					onStart: function() {
						document.getElementById("um").click();
					},
					onEnd: function() {
						document.getElementById("dois").click();
					}
				});
				hiper.code({
					start: 59.8,
					end: 106,
					onStart: function() {
						document.getElementById("um").click();
					},
					onEnd: function() {
						document.getElementById("dois").click();
					}
				});
				hiper.code({
					start: 330,
					end: 360,
					onStart: function() {
						document.getElementById("um").click();
					},
					onEnd: function() {
						document.getElementById("dois").click();
					}
				});
				hiper.code({
					start: 359.8,
					end: 400,
					onStart: function() {
						document.getElementById("um").click();
					},
					onEnd: function() {
						document.getElementById("dois").click();
					}
				});
		  }, false );

		},
		methods: {
			addRandomEvent: function(){
				this.counter++
				this.eventList.push({
					title: 'Evento ' + this.counter,
					type: 'profile',
					fields: {
						name: 'Maria do ap. ' + Math.round(Math.random()*1000),
						text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat tenetur adipisci aliquid temporibus veritatis necessitatibus hic ut, culpa placeat, voluptate, delectus dolores. Nam hic sequi aspernatur excepturi reiciendis aperiam. Sapiente.'
					}
				})
			},
			removeFirstEvent: function () {
				this.eventList.shift()
			},
			removeAllEvents: function () {
				this.eventList = []
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