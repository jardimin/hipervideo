<style lang="scss">
	.block_map {
		position: relative;
		width: 300px;
		height: 300px;
		background: #333;
		transition: all 0.6s ease;
		transform: translate3d(300px,0,0);
		&.is-open {
			transform: translate3d(0,0,0);
		}
	}
	.block_map__map {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.block_map__toggle {
		position: absolute;
		-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 20px;
		font-weight: 900;
		padding: 4% 4% 4% 3%;
		top: 0;
		left: 0;
		width: 48px;
		transform: translate3d(-100%,0,0);
	}
	.leaflet-top, .leaflet-bottom {
		z-index: 1;
	}
</style>

<template>
	<div class="block_map" v-with="db: db" v-class="is-open: isOpen">
		<div class="block_map__toggle context-bg clickable" v-on="click: toggle">
			{{db.cidade}}
		</div>
		<div class="block_map__map" v-el="map"></div>
	</div>
</template>

<script>

	var L = require('leaflet')

	module.exports = {

		replace: true,

		data: function(){
			return {
				_map: null,
				isOpen: false
			}
		},

		ready: function(){

			this._map = L.map(this.$$.map, { zoomControl: false }).setView([this.db.geo[0], this.db.geo[1]], this.db.geo[2])

			new L.Control.Zoom({ position: 'topright' }).addTo(this._map)

			// add an OpenStreetMap tile layer
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this._map)

		},

		methods: {
			toggle: function(){
				this.isOpen = !this.isOpen
			},
			panTo: function(latlng){
				this._map.panTo(latlng)
			}
		}
	}

</script>