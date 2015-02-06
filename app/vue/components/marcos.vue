<style lang="scss">
	.marcos-historicos {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 60px;
		box-shadow: 0 0 10px black inset;
		background-color: rgba(50, 50, 50, 1);
		padding: 0 3%;
		z-index: 10;
		transition: all 0.5s;
		#app.marco-fechado & {
			bottom: -60px;
		}
	}

	.marcos_handle {
		width: 15%;
		position: absolute;
		border-radius: 5px;
		height: 23px;
		cursor: pointer;
		top: -15px;
		background-color: rgba(50,50,50,1);
		left: 40%;
	}
</style>

<template>
	<div v-with="db: db" class="marcos-historicos">
		<div class="marcos_handle" v-on="click: handleMarcos"></div>
		<in-linha-tempo></in-linha-tempo>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		replace: true,
		methods: {
			handleMarcos: function () {
				$$$('#app').toggleClass('marco-fechado');
			}
		},
		components: {
			'in-linha-tempo': require('../components/linha-tempo.vue'),
		}
	}
</script>