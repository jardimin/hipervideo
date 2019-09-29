<style lang="scss">
.chart-databars {

	.axis path,
	.axis line {
		fill: none;
		stroke: #fff;
		shape-rendering: crispEdges;
	}

	.axis text {
		fill: #fff;
		font-size: 10px;
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
		<p>
			{{{fields.excerpt | marked}}}
			<div v-el="chart" class="chart-databars"></div>
		</p>
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

		attached: function(){

			// load spreadsheet

			this.loadData()

			// append <svg>

			this._svg = d3.select(this.$$.chart).append("svg")

		},

		methods: {

			loadData: function(){
				var self = this;
				var url = '//spreadsheets.google.com/feeds/list/' + this.fields.spreadsheet + '/od6/public/values?alt=json-in-script&callback=?';

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


				var margin = {top: 20, right: 20, bottom: 30, left: 40},
					width = 250 - margin.left - margin.right,
					height = 150 - margin.top - margin.bottom;

				var x0 = d3.scale.ordinal()
					.rangeRoundBands([0, width], .1);

				var x1 = d3.scale.ordinal();

				var y = d3.scale.linear()
					.range([height, 0]);

				var color = d3.scale.ordinal()
					.range(["#fff", "#ddd","#bbb", "#999", "#777", "#555", "#333", "#111"]);

				var xAxis = d3.svg.axis()
					.scale(x0)
					.orient("bottom");

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.tickFormat(d3.format(".2s"));

				self._svg
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

					var state = self._svg.selectAll(".state")
						.data(data)
						.enter().append("g")
							.attr("class", "state")
							.attr("transform", function(d) { return "translate(" + x0(d.filtro) + ",0)"; });

					state.selectAll("rect")
						.data(function(d) { return d.legenda; })
						.enter().append("rect")
							.attr("width", x1.rangeBand())
							.attr("x", function(d) { return x1(d.name); })
							.attr("y", function(d) { return y(d.value); })
							.attr("height", function(d) { return height - y(d.value); })
							.style("fill", function(d) { return color(d.name); });


			}
		},

		filters: {
			'marked': marked
		}
	}

</script>