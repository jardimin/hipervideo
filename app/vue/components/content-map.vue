<style lang="scss">
  .content_mapa {
    position: relative;
    width: 100%;
    height: 400px;
    background: #333;
  }
  .leaflet-top, .leaflet-bottom {
    z-index: 1;
  }
</style>

<template>
  <div class="content_mapa" v-el="mapa"></div>
</template>

<script>

  var L = require('leaflet')
  var $$$ = require('jquery')

  module.exports = {

    replace: true,

    data: function(){
      return {
        _mapa: null,
        isOpen: false
      }
    },

    attached: function() {
      console.log('content-mapa attached!')
      this._mapa = L.map(this.$$.mapa, { zoomControl: false }).setView([this.mapa.geo[0], this.mapa.geo[1]], this.mapa.geo[2])
      console.log('test');

      new L.Control.Zoom({ position: 'topright' }).addTo(this._mapa)

      // add an OpenStreetMap tile layer
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this._mapa)

      L.Icon.Default.imagePath = 'img/leaflet';

      this.loadData();
    },

    methods: {
      loadData: function() {
        var self = this;
        if (typeof this.mapa.locais === 'string') {
          var url = 'https://spreadsheets.google.com/feeds/list/' + self.mapa.locais + '/od6/public/values?alt=json-in-script&callback=?';

          console.log('mapa-spreadsheet will load now')

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

            var markers = []
            
            console.log(self._mapa);

            for (var i = 0; i < entries.length; i++) {
              console.log(entries[i].lat);
              markers.push(L.marker([parseFloat(entries[i].lat), parseFloat(entries[i].lon)]).bindPopup('<a href="' + entries[i].site + '" target="_blank">' + entries[i].nome + '</a>'))
            }

            L.layerGroup(markers).addTo(self._mapa);

          }).error(function(message) {

            console.log('mapa-spreadsheet error: ' + message)

          }).complete(function() {

            console.log('completed mapa-spreadsheet load!')

          })
        } else if(typeof this.mapa.locais === 'object') {
          var entries = self.mapa.locais
          var markers = []

          for (var i = 0; i < entries.length; i++) {
            markers.push(L.marker([entries[i].lat, entries[i].lon]).bindPopup('<a href="' + entries[i].site + '" target="_blank">' + entries[i].nome + '</a>'))
          }

          L.layerGroup(markers).addTo(self._mapa);
        }
      }
    }
  }

</script>