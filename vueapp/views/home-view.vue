<style lang="scss">
	h1 {
		color: blue;
	}
</style>


<template>
	<h1>Home</h1>
	<div v-component="example">
		conteudo dentro de um componente
	</div>
</template>

<script>

	module.exports = {
		components: {
			example: require('../components/example.vue')
		}
	}
</script>