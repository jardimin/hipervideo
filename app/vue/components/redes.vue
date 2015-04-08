<style lang="scss">

  @import "app/sass/globals";

  @mixin graph-node-styles($color) {
    &.sus {
      fill: white;
    }
    &.mulher {
      fill: $color-video-1;
    }
    &.crianca {
      fill: $color-video-3;
    }
    &.prisional {
      fill: $color-video-4;
    }
    &.adolescente {
      fill: $color-video-2;
    }
    &.deficiencia {
      fill: $color-video-5;
    }
    &.dispositivo {
      fill: #fff;
      stroke: $color;
      stroke-width: 2px;
    }
    &.conceito {
      fill: $color;
      stroke: #fff;
      stroke-width: 2px;
    }
    &.marco {
      fill: rgba(150,150,150,1);
    }
  }

  #redes {
    z-index: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    top: 0;
    position: fixed;
    transition: all 0.5s;
    &.v-enter{
      opacity: 1;
    }
    &.v-leave  {
      transition: all 0.5s;
      opacity: 0;
    }
    &.is-redes {
      transition: all 0.5s;
      opacity: 1;
    }
  }

  .redes_graph {
    height: 100%;
    width: 56%;
    position: relative;
    background-color: black;
    &.redes_graph_svg {
      /*background: rgba(100,100,100,0.5);
      width: 100%;
      height: 100%;
      border-radius: 50%;*/
      .node {
        cursor: pointer;
        &.mulher {
          @include graph-node-styles($color-video-1);
        }
        &.adolescente {
          @include graph-node-styles($color-video-2);
        }
        &.crianca {
          @include graph-node-styles($color-video-3);
        }
        &.prisional {
          @include graph-node-styles($color-video-4);
        }
        &.deficiencia {
          @include graph-node-styles($color-video-5);
        }
        &.sus {
          @include graph-node-styles(white);
        }
      }
      .edge {
        stroke: rgba(255,255,255,0.4);
        stroke-width: 2;
      }
      .label-anchor {
        display: none;
        &.is-ativo {
          display: block !important;
        }
        text {
          @extend .disable-select;
          cursor: default;
          font-size: 12px;
          fill: #fff;
        }
      }
    }
  }
  .redes_info {
    height: 88%;
    position: absolute;
    width: 40%;
    padding: 4% 2% 2% 2%;
    border-left: 5px solid white;
    background-color: #222;
    right: 0;
    top: 0;
  }
  .legendas {
    width: 100%;
    height: 6%;
    position: absolute;
    background-color: red;
  }
  .leg {
    width: 16%;
    background-color: #555;
    float: left;
    height: 100%;
    cursor: pointer;
    text-align: center;
    font-weight: 900;
    padding: 2%;
    &:hover {
      background-color: #999;
    }
    &.is-ativo {
      background-color: #999;
      color: black;
    }
  }

</style>

<template>
  <div id="redes" v-show="redes" v-class="is-redes: redes" v-transition>
    <div ></div>
    <div v-el="redes_graph" class="redes_graph redes_graph_svg">
      <div class="legendas">
        <div v-on="click: filter('mulher')" class="leg" v-class="is-ativo: filter_mulher" style="padding: 3% 2% 1%;">MULHER</div>
        <div v-on="click: filter('crianca')" class="leg" v-class="is-ativo: filter_crianca" style="padding: 3% 2% 1%;">CRIANÇA</div>
        <div v-on="click: filter('adolescente')" class="leg" v-class="is-ativo: filter_adolescente" style="padding: 3% 2% 1%;">ADOLESCENTE</div>
        <div v-on="click: filter('deficiencia')" class="leg" v-class="is-ativo: filter_deficiencia">PESSOA COM DEFICIENCIA</div>
        <div v-on="click: filter('prisional')" class="leg" v-class="is-ativo: filter_prisional">PESSOA PRIVADA DE LIBERDADE</div>
      </div>
    </div>
    <div class="redes_info">
      <in-redes-info></in-redes-info>
    </div>
  </div>
</template>

<script>
  var Vue = require('vue')
  
  var _ = require('underscore')
  var radius = 720

  module.exports = {
    inherit: true,
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
        filter_mulher: false,
        filter_crianca: false,
        filter_adolescente: false,
        filter_deficiencia: false,
        filter_prisional: false,
        conteudo: {},
        _nodes: [],
        _edges: [],
        _labelAnchors: [],
        _labelLinks: [],
        _mulher_nodes: [],
        _crianca_nodes: [],
        _adolescente_nodes: [],
        _deficiencia_nodes: [],
        _prisional_nodes: [],
        _mulher_edges: [],
        _crianca_edges: [],
        _adolescente_edges: [],
        _deficiencia_edges: [],
        _prisional_edges: [],
        _json: null

      }
    },

    attached: function(){

      this.createGraph()
      this.addRootNode()
      this.updateGraph()

      this.populateGraph('mulher')
      this.populateGraph('crianca')
      this.populateGraph('adolescente')
      this.populateGraph('deficiencia')
      this.populateGraph('prisional')

    },

    methods: {

      filter: function (area) {
        var labelAnchor = this._svg_labels.selectAll(".label-anchor")
        var nodes = _.where(this._nodes, {group: area})

        if (!this["filter_" + area]) {
          for (var i = 0; i < nodes.length; i++) {
            d3.select(labelAnchor[0][(nodes[i].id * 2) + 1]).attr('class', 'is-ativo label-anchor')
          }
          this["filter_" + area] = true
        } else if (this["filter_" + area]) {
          for (var i = 0; i < nodes.length; i++) {
            d3.select(labelAnchor[0][(nodes[i].id * 2) + 1]).attr('class', 'label-anchor')
          }
          this["filter_" + area] = false
        }
        
      },

      createGraph: function(){
        
        var self = this

        this._nodes = []
        this._edges = []
        this._labelAnchors = []
        this._labelLinks = []
        this._mulher_nodes = []
        this._crianca_nodes = []
        this._adolescente_nodes = []
        this._deficiencia_nodes = []
        this._prisional_nodes = []
        this._mulher_edges = []
        this._crianca_edges = []
        this._adolescente_edges = []
        this._deficiencia_edges = []
        this._prisional_edges = []

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
          .linkDistance(3)
          .gravity(0)
          .friction(0.2)
          .nodes(this._labelAnchors)
          .links(this._labelLinks)
          .start()

        this._svg = d3.select(this.$$.redes_graph).append("svg")
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
            return "node " + d.icon + " " + d.group
          })
          .attr('r', function(d) { return self.calcNodeRadius(d.icon) })
          .call(this._force.drag)
          .on('click',function(d){
            if (d3.event.defaultPrevented) return;
            if (self.conteudo !== {}) {
              self.conteudo = {}
            }
            self.conteudo = d.conteudo
            self.$broadcast('create-conteudo', d.text)
          })
          .on('mouseover', function(d) {
            d3.select(labelAnchor[0][(d.index * 2) + 1]).style('display', 'block')
          })
          .on('mouseout', function(d) {
            d3.select(labelAnchor[0][(d.index * 2) + 1]).style('display', 'none')
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
            'root': 10,
            'dispositivo': 7,
            'funcao': 6,
            'conceito': 5,
            'marco': 5,
            'mulher': 7,
            'deficiencia': 7,
            'prisional': 7,
            'crianca': 7,
            'adolescente': 7
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
          group: 'sus',
          title: 'SUS'
        })

        this.addNode({
          id: 1,
          px: 0,
          py: 0,
          x: 0,
          y: 0,
          group: 'mulher',
          icon: 'root',
          title: ' '
        })

        this.addNode({
          id: 2,
          px: 0,
          py: 0,
          x: 0,
          y: 0,
          group: 'crianca',
          icon: 'root',
          title: ' '
        })

        this.addNode({
          id: 3,
          px: 0,
          py: 0,
          x: 0,
          y: 0,
          group: 'adolescente',
          icon: 'root',
          title: ' '
        })

        this.addNode({
          id: 4,
          px: 0,
          py: 0,
          x: 0,
          y: 0,
          group: 'deficiencia',
          icon: 'root',
          title: ' '
        })

        this.addNode({
          id: 5,
          px: 0,
          py: 0,
          x: 0,
          y: 0,
          group: 'prisional',
          icon: 'root',
          title: ' '
        })

        this._edges = [{
          target: 0,
          source: 1
        },
        {
          target: 0,
          source: 2
        },
        {
          target: 0,
          source: 3
        },
        {
          target: 0,
          source: 4
        },
        {
          target: 0,
          source: 5
        }] 

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
              var b = {
                x: 0,
                width: 30
              }

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

      populateGraph: function(area){
        
        var self = this

        var xhr = new XMLHttpRequest
        xhr.open('GET', '/api/events-' + area + '.json')
        xhr.onload = function () {
          self._json = JSON.parse(xhr.responseText)
          var id_min = self._nodes.length - 1
          var root_id = 0
          if (area === 'mulher') {
            root_id = 1
            var x = 0
            var y = 0
          } else if (area === 'crianca') {
            root_id = 2
            var x = 0
            var y = 500
          } else if (area === 'adolescente') {
            root_id = 3
            var x = 500
            var y = 0
          } else if (area === 'deficiencia') {
            root_id = 4
            var x = 500
            var y = 500
          } else if (area === 'prisional') {
            root_id = 5
            var x = 250
            var y = 250
          }
          
          for (var i = 0; i < self._json.nodes.length; i++) {
            var node = self._json.nodes[i]

            if (!node.funcao) {
              var nod = {}
              nod.id = node.id + id_min;
              nod.title = node.title;
              nod.icon = node.icon;
              nod.conteudo = node.conteudo || {}
              nod.conteudo.title = node.title
              nod.conteudo.icon = node.icon
              nod.conteudo.group = area
              nod.text = node.component.fields.excerpt
              nod.group = area
              nod.px = x
              nod.py = y
              nod.x = x
              nod.y = y
              if (node.icon === 'marco' && !node.graph) {nod.conteudo.ano = node.component.ano}
              self['_' + area + '_nodes'].push(nod)
              self.addNode(nod)
              if (node.icon === 'marco' && !node.graph) {
                var e = {
                  source: root_id,
                  target: nod.id,
                  group: area
                }
                self._edges.push(e)
              } else if (node.icon === 'mulher') {
                var e = {
                  source: 1,
                  target: nod.id,
                  group: area
                }
                self._edges.push(e)
              } else if (node.icon === 'crianca') {
                var e = {
                  source: 2,
                  target: nod.id,
                  group: area
                }
                self._edges.push(e)
              } else if (node.icon === 'adolescente') {
                var e = {
                  source: 3,
                  target: nod.id,
                  group: area
                }
                self._edges.push(e)
              } else if (node.icon === 'deficiencia') {
                var e = {
                  source: 4,
                  target: nod.id,
                  group: area
                }
                self._edges.push(e)
              } else if (node.icon === 'prisional') {
                var e = {
                  source: 5,
                  target: nod.id,
                  group: area
                }
                self._edges.push(e)
              }
            }
          }

          var e = []

          for (var i = 0; i < self._json.edges.length; i++) {
            var edge = self._json.edges[i]
            var edg = {}

            if (edge.source === 0) {
              edg.source = root_id
            } else {
              edg.source = edge.source + id_min;
            }
            edg.target = edge.target + id_min;
            edg.group = area;
            self._edges.push(edg)
          }

          self.updateGraph()
        }
        xhr.send()
        
      }
    },
    components: {
      'in-redes-info': require('../components/info-redes.vue')
    }
  }

</script>