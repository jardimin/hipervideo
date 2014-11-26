<style lang="scss">

</style>

<template>
	<div v-with="params">
		<h1>video</h1>
		video #{{video}}
	</div>
</template>

<script>
	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
	}
</script>