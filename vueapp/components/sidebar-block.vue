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
		background: #fff;
		border-radius: 14px;
	}
</style>

<template>
	<div class="sidebar_block ">
		<div class="sidebar_block__header context-bg">
			{{title}}
			<span class="timer clickable" v-on="click: onTimerClick"></span>
		</div>
		<div class="sidebar_block__content">
			<content/>
		</div>
	</div>
</template>

<script>
	module.exports = {
		replace: true,
		methods: {
			onTimerClick: function(){
				this.$dispatch('block-timer-clicked', this, this.$data.id)
			}
		}
	}
</script>