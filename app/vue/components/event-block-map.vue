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
			.block_map__toggle {
				opacity: 1;
			}
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
		height: 48px;
		opacity: 0.3;
		transform: translate3d(-100%,0,0);
		transition: opacity 0.2s;
		&.event {
			opacity: 1;
		}
		&:hover {
			opacity: 1;
		}
	}
	.leaflet-top, .leaflet-bottom {
		z-index: 1;
	}
</style>

<template>
	<div class="block_map" v-with="db: db, geo: geo" v-class="is-open: isOpen">
		<div class="block_map__toggle context-bg clickable" v-class="event: geo" v-on="click: toggle">
			<i class="fa fa-map-marker fa-2x" style="position: absolute; left: 11px; top: 5px;"></i>
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

			var self = this

			this._map = L.map(this.$$.map, { zoomControl: false }).setView([this.db.geo[0], this.db.geo[1]], this.db.geo[2])

			new L.Control.Zoom({ position: 'topright' }).addTo(this._map)

			// add an OpenStreetMap tile layer
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this._map)

			L.Icon.Default.imagePath = 'img/leaflet';

			this.$on('event-map', function (geo) {
				this._map.setView([geo[0], geo[1]], geo[2])
			})

			this.$on('remove-event-map', function (geo) {
				this._map.setView([geo[0], geo[1]], geo[2])
			})

			if (this.db.locais) {
				var entries = this.db.locais
				var markers = []

				for (var i = 0; i < entries.length; i++) {
          markers.push(L.marker([entries[i].lat, entries[i].lon]).bindPopup('<a href="' + entries[i].site + '" target="_blank">' + entries[i].nome + '</a>'))
        }

        L.layerGroup(markers).addTo(self._map);
			}

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