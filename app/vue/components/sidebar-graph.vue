<style lang="scss">

	@import "app/sass/globals";

	@mixin graph-node-styles($color) {
		&.root {
			fill: $color;
		}
		&.dispositivo {
			fill: #fff;
			stroke: $color;
			stroke-width: 2px;
		}
		&.funcao {
			fill: #fff;
		}
		&.conceito {
			fill: $color;
			stroke: #fff;
			stroke-width: 2px;
		}
		&.marco {
			fill: rgba(150,150,150,1);
		}
		&.mulher {
			fill: $color-video-1;
		}
		&.crianca {
			fill: $color-video-3;
		}
		&.preso {
			fill: $color-video-4;
		}
		&.adolescente {
			fill: $color-video-2;
		}
		&.deficiente {
			fill: $color-video-5;
		}
	}

	.sidebar_graph {
		width: 260px;
		height: 260px;
		padding: 20px;
		transition: all 0.5s ease;
		-webkit-transform: translate3d(-300px,0,0);
		-moz-transform: translate3d(-300px,0,0);
		-o-transform: translate3d(-300px,0,0);
		-ms-transform: translate3d(-300px,0,0);
		transform: translate3d(-300px,0,0);
		.sidebar.is-open & {
			-webkit-transform: translate3d(0,0,0);
			-moz-transform: translate3d(0,0,0);
			-o-transform: translate3d(0,0,0);
			-ms-transform: translate3d(0,0,0);
			transform: translate3d(0,0,0);
		}
		.sidebar_graph_svg {
			background: rgba(100,100,100,0.5);
			width: 100%;
			height: 100%;
			border-radius: 50%;
			.node {
				cursor: pointer;
				.is-video-mulher & {
					@include graph-node-styles($color-video-1);
				}
				.is-video-adolescente & {
					@include graph-node-styles($color-video-2);
				}
				.is-video-crianca & {
					@include graph-node-styles($color-video-3);
				}
				.is-video-preso & {
					@include graph-node-styles($color-video-4);
				}
				.is-video-deficiente & {
					@include graph-node-styles($color-video-5);
				}
			}
			.edge {
				stroke: rgba(255,255,255,0.2);
				stroke-width: 1;
			}
			.label-anchor {
				text {
					@extend .disable-select;
					cursor: default;
					font-size: 12px;
					fill: #fff;
				}
			}
		}
	}
</style>

<template>
	<div class="sidebar_graph" v-with="id: id, title: db.nome, video: video, events: events">
		<div v-el="graph" class="sidebar_graph_svg"></div>
	</div>
</template>

<script>
	
	var _ = require('underscore')
	var radius = 260

	module.exports = {

		replace: true,

		data: function(){
			return {
				_interval: null,
				_force: null,
				_forceL: null,
				_svg: null,
				_svg_nodes: null,
				_svg_edges: null,
				_svg_labels: null,
				_nodes: [],
				_edges: [],
				_labelAnchors: [],
				_labelLinks: []

			}
		},

		attached: function(){

			this.createGraph()
			this.addRootNode()
			this.updateGraph()

			this._interval = setInterval(this.checkTimecode,1000)		

		},

		beforeDestroy: function(){
			clearInterval(this._interval)
		},

		methods: {

			createGraph: function(){
				
				var self = this

				this._nodes = []
				this._edges = []
				this._labelAnchors = []
				this._labelLinks = []

				this._force = d3.layout.force()
					.size([radius, radius])
					.charge(function(d){return self.calcNodeRadius(d.icon) * -20})
					.linkStrength(0.1)
					.linkDistance(10)
					.nodes(this._nodes)
					.links(this._edges)
					.start()
					.on('tick',function(){
						self.tickGraph();
					})

				this._forceL = d3.layout.force()
					.size([radius, radius])
					.charge(-50)//-100
					.linkStrength(0.5)//8
					.linkDistance(5)
					.gravity(0)
					.friction(0.5)
					.nodes(this._labelAnchors)
					.links(this._labelLinks)
					.start()

				this._svg = d3.select(this.$$.graph).append("svg")
					.attr("width", radius)
					.attr("height", radius);

				this._svg_edges = this._svg.append("g").attr("class", "edges")
				this._svg_nodes = this._svg.append("g").attr("class", "nodes")
				this._svg_labels = this._svg.append("g").attr("class", "labels")
				
			},

			updateGraph: function(){

				var self = this

				this._force
					.nodes(this._nodes)
					.links(this._edges)

				this._forceL
					.nodes(this._labelAnchors)
					.links(this._labelLinks)

				var edge = this._svg_edges.selectAll(".edge")
					.data(this._edges)
					.enter().append("line")
					.attr("class", "edge")

				var node = this._svg_nodes.selectAll(".node")
					.data(this._nodes, function(d){ return d.id })
					.enter().append("circle")
					.attr("class", function(d) {
						return "node " + d.icon
					})
					.attr('r', function(d) { return self.calcNodeRadius(d.icon) })
					.call(this._force.drag)
					.on('click',function(d){
						if (d3.event.defaultPrevented) return;
						//console.log('click node ',d.id)
						self.$dispatch('graph-node-clicked', d)
					})

				var labelLink = this._svg_labels.selectAll(".label-link")
					.data(this._labelLinks)
					//.enter().append("svg:line")
					//.attr("class", "label-link")
					//.style("stroke", "#999")

				var labelAnchor = this._svg_labels.selectAll(".label-anchor")
					.data(this._labelAnchors)
					.enter().append("svg:g")
					.attr("class", "label-anchor")

				labelAnchor.append("svg:circle").attr("r", 0).style("fill", "#FFF");
				labelAnchor.append("svg:text")
					.text(function(d, i) {
						return i % 2 == 0 ? "" : d.node.title
					})

					this._force
						.start()
				},

			calcNodeRadius: function(type){
				return {
						'root': 8,
						'dispositivo': 5,
						'funcao': 4,
						'conceito': 3,
						'marco': 3,
						'mulher': 5,
						'deficiente': 5,
						'preso': 5,
						'crianca': 5,
						'adolescente': 5
					}[type]
			},

			addNode: function(obj){
				// array.push in js returns new length
				var node = this._nodes.push(obj);
				// create labels objects for last node
				var a1 = this._labelAnchors.push({node: this._nodes[node-1]})
				var a2 = this._labelAnchors.push({node: this._nodes[node-1]})
				// create link for label objects
				this._labelLinks.push({
					source: this._labelAnchors[a1-1],
					target: this._labelAnchors[a2-1]
				})
			},

			addRootNode: function(){
				this.addNode({
					id: 0,
					px: 0,
					py: 0,
					x: 0,
					y: 0,
					icon: 'root',
					title: " "
				})
			},

			tickGraph: function(){

				this._forceL.start()

				var edge = this._svg_edges.selectAll(".edge")
					.attr("x1", function(d) { return d.source.x })
					.attr("y1", function(d) { return d.source.y })
					.attr("x2", function(d) { return d.target.x })
					.attr("y2", function(d) { return d.target.y })
				
				var node = this._svg_nodes.selectAll(".node")
					.attr("transform", function(d) {
						return "translate(" + d.x + "," + d.y + ")";
					})
				
				var labelLink = this._svg_labels.selectAll(".label-link")
					.attr("x1", function(d) { return d.source.x })
					.attr("y1", function(d) { return d.source.y })
					.attr("x2", function(d) { return d.target.x })
					.attr("y2", function(d) { return d.target.y })

				var labelAnchor = this._svg_labels.selectAll(".label-anchor")
					.attr("transform", function(d) {
						return "translate(" + d.x + "," + d.y + ")";
					})
					.each(function(d, i) {
						if(i % 2 == 0) {
							d.x = d.node.x
							d.y = d.node.y
						} else {
							var b = this.childNodes[1].getBBox()

							var diffX = d.x - d.node.x
							var diffY = d.y - d.node.y

							var dist = Math.sqrt(diffX * diffX + diffY * diffY)

							var shiftX = b.width * (diffX - dist) / (dist * 2)
							var shiftY = 5

							shiftX = Math.max(-b.width, Math.min(0, shiftX))
							
							this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")")
						}
					})

			},

			checkTimecode: function(){
				
				var self = this

				var timecodes

				if (this.events) {
					timecodes = _.filter(this.events.timecode, function(timecode){
						return timecode.start < self.video.time
					}) || null
				}

				if(!timecodes){return}

				var nodes = []

				timecodes.map(function(timecode){
					var node = _.findWhere(self._nodes, {id: timecode.node})
					if(!node){
						var $node = _.findWhere(self.events.nodes, {id: timecode.node})
						if($node.icon !== 'marco' && !$node.funcao || $node.icon === 'marco' && $node.graph){
							var x = Math.random() * radius
							var y = Math.random() * radius
							node = {}
							node.id = $node.id;
							node.title = $node.title;
							node.icon = $node.icon;
							node.px = x
							node.py = y
							node.x = x
							node.y = y
							nodes.push(node)
							self.addNode(node)
						}
					}
				})

				if(!nodes.length){return}

				//self._nodes = self._nodes.concat(nodes)
				
				self._edges = []

				this.events.edges.map(function(edge){
					var source = _.findWhere(self._nodes, {id: edge.source})
					var target = _.findWhere(self._nodes, {id: edge.target})
					if(source && target){
						edge = {}
						edge.source = source
						edge.target = target
						self._edges.push(edge)
					}
				})

				this.updateGraph()
				
			}
		}
	}

</script>