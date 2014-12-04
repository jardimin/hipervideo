<style lang="scss">
	header {
		height: 200px;
		background-color: gray;
	}

	.areaTematica {
	  text-align: center;
	  padding: 5%;
	}

	// grid

	$pad: 1%;

	*, *:after, *:before {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}

	.grid {
	  background: transparent;
	  margin: 0 0 $pad 0;
	  
	  &:after {
	    @extend clearfix 
	  }
	}

	[class*='col-'] {
	  float: left;
	  padding-right: $pad;
	  &:last-of-type {
	    padding-right: 0;
	  }
	}
	.col-1-5 {
	  width: 20%;
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