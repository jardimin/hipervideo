<style lang="scss">

</style>

<template>
	<div>
		<p>
			<img v-attr="src: fields.image">
		</p>
		<p>
			{{{fields.excerpt | marked}}}
		</p>
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