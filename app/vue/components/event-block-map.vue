<style lang="scss">
	.block_map {
		width: 300px;
		height: 300px;
		background: #333;
	}
	.block_map__map {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>

<template>
	<div class="block_map">
		<div class="block_map__map" v-el="map"></div>
	</div>
</template>

<script>

	var L = require('leaflet')

	module.exports = {

		replace: true,

		data: function(){
			return {
				_map: null
			}
		},

		ready: function(){

			this._map = L.map(this.$$.map).setView([51.505, -0.09], 13);

			// add an OpenStreetMap tile layer
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this._map);

		}
	}

</script>