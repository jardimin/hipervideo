<style lang="scss">
  #conteudo_info_redes {
    overflow: hidden;
    position: relative;
    height: 85%;
    padding-left: 40px;
    padding-right: 40px;
    transition: all 0.3s ease;
    & img { width: 100%; }
    #app.marco-fechado & {
      height: 85%;
    }
  }

  .voltar {
    cursor: pointer;
    font-size: 150%;
    position: absolute;
    background-color: #555;
    top: 0;
    right: 30px;
    padding: 10px;
    &:hover {
      background-color: #999;
    }
  }

  .info-texto {
    letter-spacing: 0;
  }
  
  .image-list-redes {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
    }
  }

  .video-list-redes {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
      width: 220px;
    }
  }

  .mulher-bg {
    background-color: #ed1e79;
  }

  .adolescente-bg {
    background-color: #00a300;
  }

  .crianca-bg {
    background-color: #0cc;
  }

  .prisional-bg {
    background-color: #f00;
  }

  .deficiencia-bg {
    background-color: #00c;
  }

</style>

<template>
  <div style="height: 100%;">
  <h3>Clique nos botões acima da rede para filtrar o conteúdo de cada área.</h3>
  <h3>Clique pontos da rede para ver seu conteúdo relacionando.</h3>
  <div id="conteudo_info_redes">

    <div v-component="in-mapa" v-with="mapa: conteudo.mapa" v-if="conteudo && hasMap"></div>

    <h2 v-if="conteudo && conteudo.title"> 
      {{conteudo.title}} 
    </h2>
    <h2 v-if="conteudo && conteudo.ano"> 
      {{conteudo.ano}} 
    </h2>
    <div class="info-texto">
      {{{html_texto | marked}}}
    </div>

    <div v-component="in-databars" v-with="databars: conteudo.databars" v-if="conteudo && hasDatabars"></div>
    
    <h3 v-if="conteudo && conteudo.imagens"> IMAGENS </h3>
    <div class="image-list-redes"></div>
    <h3 v-if="conteudo && conteudo.video_list"> VÍDEOS </h3>
    <div class="video-list-redes"></div>
    <h3 v-if="conteudo && conteudo.arquivos"> LINKS </h3>
    <div class="link {{conteudo.group}}-bg" v-repeat="conteudo.arquivos">
      <a href="{{link}}" target="_blank">
        {{nome | uppercase}}
      </a>
    </div>
    <h3 v-if="conteudo && conteudo.discursoes"> DISCUSSÃO </h3>
    <div class="link {{conteudo.group}}-bg" v-repeat="conteudo.discursoes">
      <a href="{{link}}" target="_blank">
        {{nome | uppercase}}
      </a>
    </div>
    <div class="link {{conteudo.icon}}-bg" v-if="conteudo && conteudo.hipervideo">
      <a href="{{conteudo.hipervideo.link}}">
        {{conteudo.hipervideo.nome | uppercase}}
      </a>
    </div>
  </div>
  <div class="voltar" v-on="click: voltar">VOLTAR</div>
  </div>
</template>

<script>
  var Vue = require('vue')
  var $$$ = require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')
  var slick = require('slick-carousel')
  var marked = require('marked')

  module.exports = {
    inherit: true,
    replace: true,

    data: function(){
      return {
        html_texto: '',
        videoIndex: 0,
        imageIndex: 0
      }
    },
    computed: {
      hasDatabars: function(){
        return this.conteudo.databars !== undefined
      },
      hasMap: function(){
        return this.conteudo.mapa !== undefined
      }
    },
    attached: function() {
      var self = this

      $$$('.image-list-redes').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      });

      $$$('.video-list-redes').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      })

      $$$('#conteudo_info_redes').perfectScrollbar({
        suppressScrollX: true
      });

      this.$on('create-conteudo', function(text) {

        for (var i = 0; i < this.imageIndex; i++) {
          $$$('.image-list-redes').slick('slickRemove', i);
        }
        for (var i = 0; i < this.videoIndex; i++) {
          $$$('.video-list-redes').slick('slickRemove', i);
        }
        this.imageIndex = 0;
        this.videoIndex = 0;

        if (this.conteudo.texto !== "") {
          this.html_texto = this.conteudo.texto;
        } else {
          this.html_texto = text
        }

        if (this.conteudo.imagens) {
          for (var i = this.conteudo.imagens.length - 1; i >= 0; i--) {
            $$$('.image-list-redes').slick('slickAdd','<img src="' + this.conteudo.imagens[i].src + '">');
            self.imageIndex ++;
          };
        }

        if (this.conteudo.video_list) {
          var playlistUrl = 'http://gdata.youtube.com/feeds/api/playlists/' + this.conteudo.video_list + '?v=2&alt=json&callback=?';
          var videoURL= 'http://www.youtube.com/watch?v=';
          $$$.getJSON(playlistUrl, function(data) {
            var list_data=[];
            $$$.each(data.feed.entry, function(i, item) {
              var video_data = {};
              video_data.title = item.title.$t;
              var feedURL = item.link[1].href;
              var fragments = feedURL.split("/");
              video_data.id = fragments[fragments.length - 2];
              video_data.url = videoURL + video_data.id;
              list_data.push(video_data);
            });
            for (var i = list_data.length - 1; i >= 0; i--) {
              $$$('.video-list-redes').slick('slickAdd','<a href="'+ list_data[i].url +'" target="_blank" title="'+ list_data[i].title +'"><img alt="'+ list_data[i].title +'" src="http://img.youtube.com/vi/'+ list_data[i].id +'/0.jpg"</a>');
              self.videoIndex ++;
            };
          });
        }
        
      })
      
    },
    methods: {

      voltar: function() {
        this.redes = false;
      }

    },
    components: {
      'in-databars': require('../components/content-databars.vue'),
      'in-mapa': require('../components/content-map.vue')
    },

    filters: {
      'marked': marked
    }

  }

</script>