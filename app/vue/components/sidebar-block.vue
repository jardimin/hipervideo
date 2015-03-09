<style lang="scss">
	.sidebar_block {
		width: 120%;
		height: 100%;
		overflow: hidden;
		transition: all .6s ease;
		&.v-enter, &.v-leave {
			transform: translate3d(-400px,0,0);
			max-height: 0;
		}
		.sidebar.has-info & {
			width: 100%;
			max-height: 48px;
		}
	}
	#cartela_nome, #cartela_funcao{
		float: right;
		font-size: 16px;
		font-size: 170%;
		padding-left: 20px;
		padding-right: 20px;
	}
	#cartela_funcao {
		color: #555;
	}
	.sidebar_block__header {
		font-family: 'fonte-bold', sans-serif;
		font-weight: 900;
		position: relative;
		color: #fff;
		padding: 10px;
		height: 28px;
		line-height: 28px;
	}
	.sidebar_block__content {
		overflow: hidden;
		height: 19%;
		position: relative;
		padding: 10px;
		padding-right: 58px;
		font-size: 14px;
		font-weight: 300;
		line-height: 1.4em;
		width: 65%;
		letter-spacing: 0;
		transition: all 0.3s ease;
		#app.marco-fechado & {
			height: 25%;
		}
	}
	.timer {
		display: block;
		position: absolute;
		top: 10px;
		right: 10px;
		width: 28px;
		height: 28px;
		.progress {
			fill: transparent;
			stroke: #fff;
  			stroke-width: 2px;
  			stroke-dasharray: 75 75;
  			stroke-linecap: round;
  			transition: all 0.5s linear;
  			transform: translate(0px,28px) rotate(-90deg);
  			&.fadeout {
  				opacity: 0;
  			}
		}
		.base {
			stroke: #fff;
  			stroke-width: 2px;
  			fill: transparent;
  			opacity: 0.2;
		}
		.close {
			transition: transform 0.3s ease, opacity 0.3s linear;
			opacity: 0;
			transform: translate(14px,14px) scale(.5);
			line {
				stroke: #fff;
  				stroke-width: 2px;
  				stroke-linecap: round;
			}
		}
		&.fixed,
		&:hover {
			.close {
				opacity: 1;
				transform: translate(14px,14px) scale(1);
			}
		}
	}
</style>

<template>
	<div class="sidebar_block" v-transition>
		<div v-if="!funcao" class="sidebar_block__header context-bg" >
			{{title | uppercase}}
			<svg width="28" height="28" class="timer clickable" v-on="click: onTimerClick" v-class="fixed: start == null">
				<circle class="base" cx="14" cy="14" r="12"></circle>
				<circle v-class="fadeout: perc < 3" class="progress" cx="14" cy="14" r="12" stroke-dashoffset="{{perc}}"></circle>
				<g class="close">
					<line x1="-4" y1="-4" x2="4" y2="4" />
					<line x1="-4" y1="4" x2="4" y2="-4" />
				</g>
			</svg>
		</div>
		<div v-if="!funcao" id="sidebar_block__content" class="sidebar_block__content">
			<div v-component="{{'in-sidebar-block-' + type}}" v-with="fields: fields"></div>
		</div>
		<p v-if="!ap" style="padding-left: 10px;"><strong><a style="font-weight: 900; text-decoration: none;" href="#/{{videoID}}/info/{{id}}">SAIBA MAIS</a></strong></p>
	</div>
</template>

<script>
	var Vue = require('vue')
	var $$$ = require('jquery')
	var perfectScrollbar = require('perfect-scrollbar')
	
	module.exports = {
		replace: true,
		data: function(){
			return {
				html_resumo: null
			}
		},
		computed: {
			perc: function () {
				var start = this.$data.start;
				var end = this.$data.end;
				var time = this.$data.video.time;
				return 75 - Math.floor(75 * (time - start) / (end - start));
			}
		},
		attached: function() {
			$$$('#sidebar_block__content').perfectScrollbar({
				suppressScrollX: true
			});

		},
		methods: {
			onTimerClick: function(){
				this.$dispatch('block-timer-clicked', this, this.$data.id)
				if (this.$parent.conteudo && this.$parent.conteudo.id === this.$data.id) {
					window.location.href = "/#/" + this.$parent.params.video;
				}
			}
		},
		components: {
			'in-sidebar-block-text': require('../components/sidebar-block-text.vue'),
			'in-sidebar-block-profile': require('../components/sidebar-block-profile.vue'),
			'in-sidebar-block-databars': require('../components/sidebar-block-databars.vue')
		}
	}
</script>