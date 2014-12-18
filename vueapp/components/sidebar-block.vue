<style lang="scss">
	.sidebar_block {
		width: 348px;
		max-height: 80%;
		overflow: hidden;
		transition: all .3s ease;
		&.v-enter, &.v-leave {
			transform: translate3d(-400px,0,0);
			max-height: 0;
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
  			stroke-dasharray: 76 76;
  			stroke-linecap: round;
  			transition: stroke-dashoffset 0.5s linear;
  			transform: translate(0px,28px) rotate(-90deg);
		}
		.base {
			stroke: #fff;
  			stroke-width: 2px;
  			fill: transparent;
  			opacity: 0.2;
		}
	}
</style>

<template>
	<div class="sidebar_block ">
		<div class="sidebar_block__header context-bg">
			{{title}} {{perc}}
			<svg width="28" height="28" class="timer clickable" v-on="click: onTimerClick">
				<circle class="base" cx="14" cy="14" r="12"></circle>
				<circle class="progress" cx="14" cy="14" r="12" stroke-dashoffset="{{perc}}"></circle>
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
				return 76 - Math.floor(76 * (time - start) / (end - start));
			}
		},
		methods: {
			onTimerClick: function(){
				this.$dispatch('block-timer-clicked', this, this.$data.id)
			}
		}
	}
</script>