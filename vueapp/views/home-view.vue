<style lang="scss">
	header {
		height: 200px;
		background-color: gray;
	}
</style>

<template>
	<div v-with="db: db">
		<header>
			<div class="conteudo">
				<h1>{{db.title}}</h1>
				<p>{{db.texto}}</p>
			</div>
		</header>
		<div class="conteudo">
			<div class="grid">
				<div  v-repeat="db.hipervideos">
					<a  href="#/video/{{id}}" class="hipervideo">
						<div class="col-1-5" style="background-color: {{cor}};">
							<div class="areaTematica">
								<h2>{{nome}}</h2>
								<p>{{descricao}}</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var $$$ = require('jquery')
	module.exports = {
		replace: true,
		attached: function () {
			$$$('body').removeClass("tocando");
		},
		components: {
			example: require('../components/example.vue')
		}
	}
</script>