<style lang="scss">
	.btn {
		cursor: pointer;
		padding: 10px;
		background: #ccc;
		display: inline-block;
	}
	.sidebar_content {
		position: relative;
		z-index: 20;
	}
	.sidebar_back {
		position: absolute;
		background-color: rgba(0,0,0,.2);
		width: 300px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all 0.5s;
		transform: translate3d(-300px,0,0);
		z-index: 10;
		.sidebar.is-open & {
			transform: translate3d(0,0,0);
		}
	}
</style>

<template>
	<div v-with="params: params" >
		
		<!-- SIDEBAR -->

		<div class="sidebar" v-class="is-open: toggle">

			<!-- CONTENT -->

			<div class="sidebar_content">
				<in-sidebar-graph></in-sidebar-graph>
				<in-sidebar-chapter v-with="title: params.video"></in-sidebar-chapter>
				<in-sidebar-block v-show="toggle" v-with="video: params.video, title: 'id do video: ' + params.video">
					<div v-component="in-example" v-with="video:video">
						conteudo dentro de um componente do video {{video}}
					</div>
				</in-sidebar-block>
				<div>
					<a class="btn" v-on="click: clickHandle">Show block: {{toggle}}</a>
				</div>
			</div>

			<!-- BACKGROUND -->

			<div class="sidebar_back"></div>
		</div>

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
			'in-sidebar-block': require('../components/sidebar-block.vue'),
			'in-sidebar-graph': require('../components/sidebar-graph.vue'),
			'in-sidebar-chapter': require('../components/sidebar-chapter.vue')
		}
	}
</script>