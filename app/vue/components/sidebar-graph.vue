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
	var $d3 = {}

	module.exports = {
		replace: true,
		data: function(){
			return {
				interval: null,
				radius: 260
			}
		},
		attached: function(){
			var self = this

			this.createGraph()
			this.addRootNode()
			this.updateGraph()

			this.interval = setInterval(function(){
				self.checkTimecode()
			},2000)
		},
		detached: function(){
			setInterval()
		},
		methods: {
			createGraph: function(){
				
				var self = this

				$d3.$nodes = []
				$d3.$edges = []

				$d3.$force = d3.layout.force()
					.size([self.radius, self.radius])
					.start()
					.on('tick',function(){
						self.tickGraph();
					})


				$d3.$svg = d3.select(self.$$.graph).append("svg")
					.attr("width", self.radius)
					.attr("height", self.radius);
					
			},
			updateGraph: function(){
				var edge = $d3.$svg.selectAll(".edge")
					.data($d3.$edges, function(d){ return d.source + '_' + d.target;})
					.enter().append("line")
					.attr("class", "edge")
					.style("stroke-width", 1)

				var node = $d3.$svg.selectAll(".node")
					.data($d3.$nodes, function(d){ return d.id;})
					.enter().append("circle")
					.attr("class", "node")
					.attr("r", function(d) { return d.r; })
					.style("fill", function(d) {
						var color;
						switch(d.type){
							case 'root':
								color = '#f00'
								break
							default:
								color = '#fff'
								break
						}
						return color;
					})

				$d3.$force
					.nodes($d3.$nodes)
					.links($d3.$edges)
					.resume()
					
			},
			addRootNode: function(){
				$d3.$nodes.push({
					id: 0,
					r: 6,
					px: 0,
					py: 0,
					x: 0,
					y: 0,
					type: 'root'
				})
			},
			tickGraph: function(){

				var edge = $d3.$svg.selectAll(".edge")
					.attr("x1", function(d) { return d.source.x })
					.attr("y1", function(d) { return d.source.y })
					.attr("x2", function(d) { return d.target.x })
					.attr("y2", function(d) { return d.target.y })
				
				var node = $d3.$svg.selectAll(".node")
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
					var node = _.findWhere($d3.$nodes, {id: timecode.node})
					if(!node){
						node = _.findWhere(self.events.nodes, {id: timecode.node})
						node.px = 0
						node.py = 0
						node.x = 0
						node.y = 0
						node.r = 4
						nodes.push(node)
					}
				})

				if(!nodes.length){return}

				$d3.$nodes = $d3.$nodes.concat(nodes)

				$d3.$edges = []

				/*this.events.edges.map(function(edge){
					var source = _.findWhere(self.d3.$nodes, {id: edge.source})
					var target = _.findWhere(self.d3.$nodes, {id: edge.target})
					if(source && target){
						edge.source = source
						edge.target = target
						self.d3.$edges.push(edge)
					}
				})*/

				this.updateGraph()
				
			}
		}
	}

</script>