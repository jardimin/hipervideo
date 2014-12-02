<style lang="scss">

	.sidebar_block {
		width: 348px;
	}

	.sidebar_block__header {
		background: #555;
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