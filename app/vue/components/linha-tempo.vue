<style lang="scss">
	.linha_do_tempo {
		width: 88%;
		position: absolute;
		height: 60%;
		border-bottom: 1px solid rgba(250,250,250,0.2);
	}

	.ano {
		position: absolute;
		color: rgba(250,250,250,0.5);
		font-size: 75%;
		font-weight: 700;
		bottom: -8px;
	}

	.marco-detalhe {
		width: 150px;
		position: absolute;
		height: 0;
		bottom: 0;
		border-right: 1px solid;
		z-index: -1;
		right: 4px;
		overflow: hidden;
		opacity: 0;
		transition: all .2s ease-in-out;
	}

	.marco-titulo {
		padding: 6px;
		font-size: 12px;
		transition: all .2s ease-in-out;
	}

	.marco {
		height: 5px;
		width: 5px;
		border-radius: 5px;
		background-color: rgba(150,150,150,1);
		position: absolute;
		bottom: -2.5px;
		list-style: none;
		cursor: pointer;
		transition: all .2s ease-in-out;
		&.hover {
			height: 10px;
			width: 10px;
			border-radius: 10px;
			background-color: rgba(250,250,250,1);
			bottom: -5px;
			margin-left: -2.5px;
			.marco-detalhe {
				height: 50px;
				opacity: 1;
			}
		}
		&:hover {
			height: 10px;
			width: 10px;
			border-radius: 10px;
			background-color: rgba(250,250,250,1);
			bottom: -5px;
			margin-left: -2.5px;
			.marco-detalhe {
				height: 50px;
				opacity: 1;
			}
		}
	}
</style>

<template>
	<div v-with="db: db" class="linha_do_tempo">
		<p class="ano" style="left: 3%;">1950</p>
		<p class="ano" style="left: 16%;">1960</p>
		<p class="ano" style="left: 29%;">1970</p>
		<p class="ano" style="left: 42%;">1980</p>
		<p class="ano" style="left: 55%;">1990</p>
		<p class="ano" style="left: 68%;">2000</p>
		<p class="ano" style="left: 81%;">2010</p>
		<p class="ano" style="left: 93.75%;">2020</p>
		<ul>
			<li id="marco-{{id}}" v-repeat="marcos" class="marco" style="left: {{posMarco[$index]}}%;" v-on="click: marcoBlock($index)">
				<div class="marco-detalhe">
					<div class="marco-titulo context-bg">
						{{title | uppercase}}
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	var $$$ = require('jquery')
	var _ = require('underscore')
	module.exports = {
		replace: true,
		data: function() {
			return {
				marcos: null
			}
		},
		computed: {
			posMarco: {
				get: function () {
					var marc = this.marcos
					var pos = []
					for (var i = 0; i < marc.length; i++) {
						var calc = (marc[i].component.ano - 1950) * 1.295 + 4.3
						pos.push(calc)
					}
					return pos
				}
			}
		},
		attached: function() {
			var self = this;

			var xhr = new XMLHttpRequest
			xhr.open('GET', '/api/events-' + this.db.id + '.json')
			xhr.onload = function () {
				var t = JSON.parse(xhr.responseText)

				var m = _.where(t.nodes, {icon: "marco"});
				self.marcos = m;
			}
			xhr.send();

			this.$on('hover-marco', function (node) {
				var marco_hover = _.findWhere(self.marcos, {id: node.id})
				$$$('#marco-'+marco_hover.id).addClass('hover');
			});

		},
		methods: {
			marcoBlock: function(id) {
				var ma = this.marcos[id]
				this.$dispatch('graph-node-clicked', ma)
			}
		}
	}
</script>