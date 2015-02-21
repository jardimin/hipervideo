<style lang="scss">
  #conteudo_info {
    overflow: hidden;
    position: relative;
    height: 96%;
    padding-left: 40px;
    padding-right: 40px;
    transition: all 0.3s ease;
    #app.marco-fechado & {
      height: 100%;
    }
  }

  .info-texto {
    letter-spacing: 0;
  }
  
  .image-list {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
    }
  }

  .video-list {
    & img {
      position: relative;
      float: left;
      margin-right: 10px;
      width: 220px;
    }
  }

  .link {
    font-weight: 900;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    text-decoration: none;
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

  .preso-bg {
    background-color: #f00;
  }

  .deficiente-bg {
    background-color: #00c;
  }

</style>

<template>
  <div>
  <div class="border context-bg"></div>
  <div id="conteudo_info">
    <h2> 
      {{conteudo.title}} 
    </h2>
    <div class="info-texto">
      {{{html_texto | marked}}}
    </div>

    <div v-component="in-databars" v-with="databars: conteudo.databars" v-if="hasDatabars"></div>
    
    <h3 v-if="conteudo.imagens"> IMAGENS </h3>
    <div class="image-list"></div>
    <h3 v-if="conteudo.video_list"> VÍDEOS </h3>
    <div class="video-list"></div>
    <h3 v-if="conteudo.arquivos"> LINKS </h3>
    <div class="link context-bg" v-repeat="conteudo.arquivos">
      <a href="{{link}}" target="_blank" class="link context-bg">
        {{nome | uppercase}}
      </a>
    </div>
    <h3 v-if="conteudo.discursoes"> DISCUSSÃO </h3>
    <div class="link context-bg" v-repeat="conteudo.discursoes">
      <a href="{{link}}" target="_blank" class="link context-bg">
        {{nome | uppercase}}
      </a>
    </div>
    <div class="link {{conteudo.icon}}-bg" v-if="conteudo.hipervideo">
      <a href="{{conteudo.hipervideo.link}}" class="link {{conteudo.icon}}-bg">
        {{conteudo.hipervideo.nome | uppercase}}
      </a>
    </div>
  </div>
  <a class="back" href="#/{{id}}">voltar ao video</a>
  </div>
</template>

<script>
  var Vue = require('vue')
  var $$$ = require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')
  var slick = require('slick-carousel')
  var marked = require('marked')

  module.exports = {

    replace: true,

    data: function(){
      return {
        conteudo: {},
        html_texto: '',
        videoIndex: 0,
        imageIndex: 0
      }
    },
    computed: {
      hasDatabars: function(){
        return this.conteudo.databars !== undefined
      }
    },
    attached: function() {
      var self = this

      $$$('.image-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      });

      $$$('.video-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3
      })

      this.$on('create-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar({
          suppressScrollX: true
        });

        this.html_texto = this.$parent.conteudo.texto;

        if (this.$parent.conteudo.imagens) {
          for (var i = this.$parent.conteudo.imagens.length - 1; i >= 0; i--) {
            $$$('.image-list').slick('slickAdd','<img src="' + this.$parent.conteudo.imagens[i].src + '">');
            self.imageIndex ++;
          };
        }

        if (this.$parent.conteudo.video_list) {
          var playlistUrl = 'http://gdata.youtube.com/feeds/api/playlists/' + this.$parent.conteudo.video_list + '?v=2&alt=json&callback=?';
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
              $$$('.video-list').slick('slickAdd','<a href="'+ list_data[i].url +'" target="_blank" title="'+ list_data[i].title +'"><img alt="'+ list_data[i].title +'" src="http://img.youtube.com/vi/'+ list_data[i].id +'/0.jpg"</a>');
              self.videoIndex ++;
            };
          });
        }
        
      })

      this.$on('destroy-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar('destroy');
        for (var i = 0; i < this.imageIndex; i++) {
          $$$('.image-list').slick('slickRemove', i);
        }
        for (var i = 0; i < this.videoIndex; i++) {
          $$$('.video-list').slick('slickRemove', i);
        }
        this.imageIndex = 0;
        this.videoIndex = 0;
      })
    },

    components: {
      'in-databars': require('../components/content-databars.vue'),
    },

    filters: {
      'marked': marked
    }

  }

</script>