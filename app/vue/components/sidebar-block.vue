<style lang="scss">
	.sidebar_block {
		width: 348px;
		max-height: 80%;
		overflow: hidden;
		transition: all .6s ease;
		&.v-enter, &.v-leave {
			transform: translate3d(-400px,0,0);
			max-height: 0;
		}
		.sidebar.has-info & {
			width: 300px;
			max-height: 48px;
		}
	}
	.sidebar_block__header {
		position: relative;
		color: #fff;
		padding: 10px;
		height: 28px;
		line-height: 28px;
	}
	.sidebar_block__content {
		padding: 10px;
		padding-right: 58px;
		font-size: 14px;
		font-weight: 300;
		line-height: 1.4em;
		width: 280px;
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
	<div class="sidebar_block ">
		<div class="sidebar_block__header context-bg">
			{{title}}
			<svg width="28" height="28" class="timer clickable" v-on="click: onTimerClick" v-class="fixed: start == null">
				<circle class="base" cx="14" cy="14" r="12"></circle>
				<circle v-class="fadeout: perc < 3" class="progress" cx="14" cy="14" r="12" stroke-dashoffset="{{perc}}"></circle>
				<g class="close">
					<line x1="-4" y1="-4" x2="4" y2="4" />
					<line x1="-4" y1="4" x2="4" y2="-4" />
				</g>
			</svg>
		</div>
		<div class="sidebar_block__content">
			<content/>
		</div>
	</div>
</template>

<script>
	module.exports = {
		replace: true,
		computed: {
			perc: function () {
				var start = this.$data.start;
				var end = this.$data.end;
				var time = this.$data.video.time;
				return 75 - Math.floor(75 * (time - start) / (end - start));
			}
		},
		methods: {
			onTimerClick: function(){
				this.$dispatch('block-timer-clicked', this, this.$data.id)
			}
		}
	}
</script>