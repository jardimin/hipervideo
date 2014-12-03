<style lang="scss">
	.sidebar_block {
		width: 348px;
		height: 300px;
		overflow: hidden;
		transition: all .3s ease;
		&.v-enter, &.v-leave {
			transform: translate3d(-400px,0,0);
			height: 0;
		}
	}
	.sidebar_block__header {
		color: #fff;
		padding: 10px;
		height: 28px;
		line-height: 28px;
	}
	.sidebar_block__content {
		padding: 10px;
		padding-right: 58px;
	}
</style>

<template>
	<div class="sidebar_block ">
		<div class="sidebar_block__header context-bg">{{title}}</div>
		<div class="sidebar_block__content">
			<content/>
		</div>
	</div>
</template>

<script>

	module.exports = {
		replace: true,
	}

</script>