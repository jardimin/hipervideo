<style lang="scss">
	.sidebar_graph {
		width: 260px;
		height: 260px;
		padding: 20px;
		transition: all 0.5s ease;
		transform: translate3d(-300px,0,0);
		.sidebar.is-open & {
			transform: translate3d(0,0,0);
		}
		.sidebar_graph_svg {
			background: rgba(100,100,100,0.25);
			width: 100%;
			height: 100%;
			border-radius: 50%;
			.node {
				cursor: pointer;
			}
		}
	}
</style>

<template>
	<div class="sidebar_graph" v-with="id: id, video: video, events: events">
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
				_svg: null,
				_nodes: [],
				_edges: [],
			}
		},

		attached: function(){

			var self = this

			this.createGraph()
			this.addRootNode()
			this.updateGraph()

			this._interval = setInterval(this.checkTimecode,2000)

		},

		beforeDestroy: function(){
			clearInterval(this._interval)
		},

		methods: {

			createGraph: function(){
				
				var self = this

				self._nodes = []
				self._edges = []

				self._force = d3.layout.force()
					.size([radius, radius])
					.charge(function(d){return d.r * -20;})
					.nodes(self._nodes)
					.links(self._edges)
					.start()
					.on('tick',function(){
						self.tickGraph();
					})


				self._svg = d3.select(self.$$.graph).append("svg")
					.attr("width", radius)
					.attr("height", radius);
					
			},

			updateGraph: function(){

				this._force
					.links(this._edges)
					.nodes(this._nodes)

				var edge = this._svg.selectAll(".edge")
					.data(this._edges)
					.enter().append("line")
					.attr("class", "edge")
					.style("stroke-width", 1)
					.style("stroke", 'rgba(255,255,255,0.2)')

				var node = this._svg.selectAll(".node")
					.data(this._nodes, function(d){ return d.id;})
					.enter().append("circle")
					.attr("class", "node")
					.attr("r", function(d) { return d.r; })
					.style("fill", function(d) {
						var color;
						switch(d.icon){
							case 'root':
								color = '#f00'
								break
							default:
								color = '#fff'
								break
						}
						return color;
					})

				this._force
					.start()
			},

			addRootNode: function(){
				this._nodes.push({
					id: 0,
					r: 6,
					px: 0,
					py: 0,
					x: 0,
					y: 0,
					icon: 'root'
				})
			},

			tickGraph: function(){

				var edge = this._svg.selectAll(".edge")
					.attr("x1", function(d) { return d.source.x })
					.attr("y1", function(d) { return d.source.y })
					.attr("x2", function(d) { return d.target.x })
					.attr("y2", function(d) { return d.target.y })
				
				var node = this._svg.selectAll(".node")
					.attr("cx", function(d) { return d.x })
					.attr("cy", function(d) { return d.y })
				

			},

			checkTimecode: function(){
				
				var self = this

				var timecodes = _.filter(this.events.timecode, function(timecode){
					return timecode.start < self.video.time
				})

				if(!timecodes){return}

				var nodes = []

				timecodes.map(function(timecode){
					var node = _.findWhere(self._nodes, {id: timecode.node})
					if(!node){
						var $node = _.findWhere(self.events.nodes, {id: timecode.node})
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
						node.r = 4
						nodes.push(node)
					}
				})

				if(!nodes.length){return}

				self._nodes = self._nodes.concat(nodes)
				
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