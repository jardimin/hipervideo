<style lang="scss">
	.btn {
		cursor: pointer;
		padding: 10px;
		background: #ccc;
	}
</style>

<template>
	<div v-with="params: params">
		<h1>video #{{params.video}}</h1>
		<p><a class="btn" v-on="click: clickHandle">Show block: {{toggle}}</a></p>
		
		<in-sidebar-block v-show="toggle" v-with="video: params.video, title: 'id do video: ' + params.video">
			<div v-component="in-example" v-with="video:video">
				conteudo dentro de um componente do video {{video}}
			</div>
		</in-sidebar-block>
	</div>
</template>

<script>
	module.exports = {
		// replace para pegar com v-with objetos do parent
		replace: true,
		data: function(){
			return {
				toggle: false
			}
		},
		methods: {
			clickHandle: function(){
				this.$data.toggle = !this.$data.toggle;
				console.log(this, this.$data, this.$data.toggle, this.$data.arr)
			}
		},
		components: {
			'in-example': require('../components/example.vue'),
			'in-sidebar-block': require('../components/sidebar-block.vue')
		}
	}
</script>