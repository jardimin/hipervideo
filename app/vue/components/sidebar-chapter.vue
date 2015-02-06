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
			transition: all 0.5s;
			min-width: 0;
			.sidebar.is-open & {
				min-width: 232px;
			}
		}
	}
</style>

<template>
	<div class="sidebar_chapter">
		<div class="sidebar_chapter_title">{{title}}</div>
	</div>
</template>

<script>

	module.exports = {
		replace: true,
	}

</script>