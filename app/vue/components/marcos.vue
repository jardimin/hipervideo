<style lang="scss">
	.marcos-historicos {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 60px;
		box-shadow: 0 0 10px black inset;
		background-color: rgba(50, 50, 50, 1);
		padding: 0 3%;
		z-index: 25;
		transition: all 0.5s;
		#app.marco-fechado & {
			bottom: -60px;
		}
	}

	.marcos_handle {
		width: 15%;
		font-weight: 900;
		font-size: 75%;
		padding-top: 5px;
		position: absolute;
		text-align: center;
		border-radius: 5px;
		height: 40px;
		cursor: pointer;
		top: -30px;
		background-color: rgba(50,50,50,1);
		left: 40%;
		z-index: -2;
		transition: all 0.5s;
		&.cima {
			top: -30px !important;
		}
		#app.marco-fechado & {
			top: 0;
		}
	}
</style>

<template>
	<div v-with="db: db" class="marcos-historicos">
		<div id="linha-do-tempo" class="marcos_handle" v-on="click: handleMarcos">CRONOLOGIA</div>
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