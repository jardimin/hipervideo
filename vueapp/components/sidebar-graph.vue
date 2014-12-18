<style lang="scss">
	.sidebar_graph {
		width: 240px;
		height: 240px;
		padding: 30px;
		transition: all 0.5s ease;
		transform: translate3d(-300px,0,0);
		.sidebar.is-open & {
			transform: translate3d(0,0,0);
		}
		&:hover {
			width: 260px;
			height: 260px;
			padding: 20px;
		}
		.sidebar_graph_svg {
			background: rgba(100,100,100,0.5);
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
</style>

<template>
	<div class="sidebar_graph">
		<div class="sidebar_graph_svg"></div>
	</div>
</template>

<script>

	module.exports = {
		replace: true
	}

</script>