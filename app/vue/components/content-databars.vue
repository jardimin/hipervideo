<style lang="scss">
.info-chart-databars {

	.labels text,
	.axis text {
		fill: #fff;
	}

	.axis path,
	.axis line {
		fill: none;
		stroke: #fff;
		shape-rendering: crispEdges;
	}

	.bar {
		fill: steelblue;
	}

	.x.axis path {
		display: none;
	}
}
</style>

<template>
	<div>
		<div v-el="chart" class="info-chart-databars"></div>
	</div>
</template>

<script>

	var $$$ = require('jquery')
	var _ = require('underscore')
	var marked = require('marked')

	module.exports = {

		replace: true,

		data: function(){
			return {
				_entries: null,
				_svg: null
			}
		},

		ready: function(){
			console.log('content-databars ready!')
		},

		attached: function(){

			console.log('content-databars attached!')

			// load spreadsheet

			this.loadData()

		},

		methods: {

			loadData: function(){
				var self = this;
				var url = 'https://spreadsheets.google.com/feeds/list/' + this.databars + '/od6/public/values?alt=json-in-script&callback=?';

				console.log('spreadsheet will load now')

				$$$.getJSON(url).success(function(data) {

					var entries = []

					data.feed.entry.map(function(d,i){
						
						var o = {}      // object
						var s = 'gsx$' // string

						for (var prop in d) {
							if(d.hasOwnProperty(prop) && prop.indexOf(s) == 0){
								o[prop.split(s).join('')] = d[prop]['$t']
							}
						}

						entries.push(o)
					})

					self._entries = entries
					self.buildChart()

				}).error(function(message) {

					console.log('spreadsheet error: ' + message)

				}).complete(function() {

					console.log('completed spreadsheet load!')

				})
			},

			buildChart: function(){

				var self = this;


				var margin = {top: 80, right: 20, bottom: 30, left: 40},
					width = 400 - margin.left - margin.right,
					height = 300 - margin.top - margin.bottom;

				var x0 = d3.scale.ordinal()
					.rangeRoundBands([0, width], .1);

				var x1 = d3.scale.ordinal();

				var y = d3.scale.linear()
					.range([height, 0]);

				var color = d3.scale.ordinal()
					.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

				var xAxis = d3.svg.axis()
					.scale(x0)
					.orient("bottom");

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.tickFormat(d3.format(".2s"));

				self._svg = d3.select(this.$$.chart).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

					data = self._entries
				
					var filtro = d3.keys(data[0]).filter(function(key) { return key !== "filtro"; });

					data.forEach(function(d) {
						d.legenda = filtro.map(function(name) { return {name: name, value: +d[name]}; });
					});

					x0.domain(data.map(function(d) { return d.filtro; }));
					x1.domain(filtro).rangeRoundBands([0, x0.rangeBand()]);
					y.domain([0, d3.max(data, function(d) { return d3.max(d.legenda, function(d) { return d.value; }); })]);

					self._svg.append("g")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis);

					self._svg.append("g")
							.attr("class", "y axis")
							.call(yAxis)
						// .append("text")
						// 	.attr("transform", "rotate(-90)")
						// 	.attr("y", 6)
						// 	.attr("dy", ".71em")
						// 	.style("text-anchor", "end")
						// 	.text("Population");

					var state = self._svg.selectAll(".state")
						.data(data)
						.enter().append("g")
							.attr("class", "g")
							.attr("transform", function(d) { return "translate(" + x0(d.filtro) + ",0)"; });

					state.selectAll("rect")
						.data(function(d) { return d.legenda; })
						.enter().append("rect")
							.attr("width", x1.rangeBand())
							.attr("x", function(d) { return x1(d.name); })
							.attr("y", function(d) { return y(d.value); })
							.attr("height", function(d) { return height - y(d.value); })
							.style("fill", function(d) { return color(d.name); });

					var labels = self._svg.selectAll(".labels")
						.data(filtro.slice().reverse())
						.enter().append("g")
							.attr("class", "labels")
							.attr("transform", function(d, i) { return "translate(0," + (i * 20 - margin.top) + ")"; });

					labels.append("rect")
						.attr("x", width - 18)
						.attr("width", 18)
						.attr("height", 18)
						.style("fill", color);

					labels.append("text")
						.attr("x", width - 24)
						.attr("y", 9)
						.attr("dy", ".35em")
						.style("text-anchor", "end")
						.text(function(d) { return d; });


			}
		},

		filters: {
			'marked': marked
		}
	}

</script>