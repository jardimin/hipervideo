<style lang="scss">
	.sidebar_chapter {
		position: relative;
		width: 300px;
		.sidebar_chapter_title {
			position: relative;
			z-index: 2;
			display: inline-block;
			background: #fff;
			color: #555;
			padding: 10px;
			padding-right: 58px;
			height: 28px;
			line-height: 28px;
		}
		.sidebar_chapter_bg {
			position: absolute;
			top: 0;
			left: 0;
			transition: all 0.5s;
			transform: translate3d(-100%,0,0);
			width: 100%;
			height: 100%;
			background: #fff;
			.sidebar.is-open & {
				transform: translate3d(0,0,0);
			}
		}
	}
</style>

<template>
	<div class="sidebar_chapter">
		<div class="sidebar_chapter_title">{{title}}</div>
		<div class="sidebar_chapter_bg"></div>
	</div>
</template>

<script>

	module.exports = {
		replace: true,
	}

</script>