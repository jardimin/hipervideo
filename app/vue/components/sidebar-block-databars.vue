<style lang="scss">

</style>

<template>
	<div>
		<p>
			{{{fields.excerpt | marked}}}
			<div v-el="chart" class="chart-databars"></div>
		</p>
		<p><strong><a href="#/{{videoID}}/info/{{id}}">leia mais</a></strong></p>
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
				.attr("width", 250)
				.attr("height", 150);

		},

		methods: {

			loadData: function(){
				var self = this;
				var url = 'https://spreadsheets.google.com/feeds/list/' + this.fields.spreadsheet + '/od6/public/values?alt=json-in-script&callback=?';

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

					self._entries = d3.nest().key(function(d)  {
							return d.legenda;
						}).entries(entries);

					console.log(self._entries)
					self.buildChart()

				}).error(function(message) {

					console.log('spreadsheet error: ' + message)

				}).complete(function() {

					console.log('completed spreadsheet load!')

				})
			},

			buildChart: function(){

				var self = this,
					year0 = d3.min(self._entries, function(d) { return d.ano; }),
					year1 = d3.max(self._entries, function(d) { return d.ano; }),
					x = d3.scale.ordinal()
						.domain(d3.range(10))
						.rangeRoundBands([0, 250])

				console.log(year0,year1)

			}
		},

		filters: {
			'marked': marked
		}
	}

</script>