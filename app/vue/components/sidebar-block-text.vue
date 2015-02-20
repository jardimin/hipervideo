<style lang="scss">

</style>

<template>
	<div>
		{{{fields.excerpt | marked}}}
	</div>
</template>

<script>

	var marked = require('marked')

	module.exports = {
		replace: true,
		filters: {
			'marked': marked
		}
	}

</script>