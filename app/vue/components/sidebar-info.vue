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

</style>

<template>
  <div class="border context-bg"></div>
  <div id="conteudo_info">
    <h2> 
      {{conteudo.title}} 
    </h2>
    <div class="info-texto">
      {{{html_texto}}}
    </div>
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
  </div>
  <a class="back" href="#/{{id}}">voltar ao video</a>
</template>

<script>
  var Vue = require('vue')
  var $$$ = require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')
  var slick = require('slick-carousel')
  var markdown = require('markdown').markdown

  module.exports = {
    data: function(){
      return {
        html_texto: null
      }
    },
    attached: function() {
      this.$on('create-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar({
          suppressScrollX: true
        });

        this.html_texto = markdown.toHTML(this.$parent.conteudo.texto);

        if (this.$parent.conteudo.imagens) {
          $$$('.image-list').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3
          });
          for (var i = this.$parent.conteudo.imagens.length - 1; i >= 0; i--) {
            $$$('.image-list').slick('slickAdd','<img src="' + this.$parent.conteudo.imagens[i].src + '">');
          };
        }

        if (this.$parent.conteudo.video_list) {
          $$$('.video-list').slick({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3
          })
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
              $$$('.video-list').slick('slickAdd','<a href="'+ list_data[i].url +'" title="'+ list_data[i].title +'"><img alt="'+ list_data[i].title +'" src="http://img.youtube.com/vi/'+ list_data[i].id +'/0.jpg"</a>');
            };
          });
        }
        
      })

      this.$on('destroy-scrollbar', function() {
        $$$('#conteudo_info').perfectScrollbar('destroy');
        $$$('.image-list').empty();
        console.log('test');
        $$$('.video-list').empty();
      })
    }

  }

</script>