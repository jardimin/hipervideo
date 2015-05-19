<style lang="scss">
  #creditos {
    width: 100%;
    position: fixed;
    height: 100%;
    z-index: -100;
    background-color: #141414;
    opacity: 0;
    transition: all 0.3s ease 0;
    &.finalizado {
      z-index: 100;
      opacity: 1;
    }
    & h1 {
      text-align: center;
    }
  }
  .info {
    background-color: rgba(200, 200, 200, 0.3);
    padding: 1% 3% 0;
    position: relative;
    width: 80%;
    margin: 0 auto;
    zoom: 1; /* IE6&7 */
    &:before, &:after,{
      content: "";
      display: table;
    }
    &:after {
      clear: both;
    }
    & p {
      margin: 0;
    }
  }
  .papel {
    width: 20%;
    height: 140px;
    text-align: center;
    float: left;
  }
  .slick-dots {
    bottom: -10px !important;
  }
  .slick-prev {
    left: 25px !important;
  }
  .slick-next {
    right: 25px !important;
  }
  .sslick {
    margin-bottom: 0px !important;
  }
</style>

<template>
  <div id="creditos">
    <h1>CRÉDITOS</h1>
    <a v-on="click: fecharCred" class="voltar">Voltar</a>
    <div class="sslick">
      <div class="info">
        <div class="papel">
          <h3>DESIGN E PROGRAMAÇÃO</h3>
          <p>Gustavo Junqueira</p>
          <p>Marlus Araújo</p>
        </div>
        <div class="papel">
          <h3>DIREÇÃO</h3>
          <p>Giuliano Bonorandi</p>
          <p>Julio Braga</p>
        </div>
        <div class="papel">
          <h3>COORDENAÇÃO GERAL</h3>
          <p>Tadeu de Paula Souza</p>
          <a href="http://jardim.in" target="_blank">Jardim.in</a>
        </div>
        <div class="papel">
          <h3>PESQUISA E CURADORIA</h3>
          <p>Cristiano Rodrigues</p>
          <p>Luiz Augusto de Paula Souza</p>
          <p>Tatiana Silva Tavares</p>
        </div>
        <div class="papel">
          <h3>PRODUÇÃO</h3>
          <p>Carolina Calcavecchia</p>
          <p>Janaína Castro Alves</p>
        </div>
        <div class="papel">
          <h3>FOTOGRAFIA</h3>
          <p>Milena Sá</p>
          <p>Tito José</p>
        </div>
        <div class="papel">
          <h3>SOM DIRETO</h3>
          <p>Alexandre Kubrusly</p>
          <p>Francisco Bragança</p>
        </div>
        <div class="papel">
          <h3>ASSISTÊNCIA DE EDIÇÃO</h3>
          <p>Raoni Seixas</p>
          <p>Tatiana Teitelroit</p>
        </div>
        <div class="papel">
          <h3>EDIÇÃO</h3>
          <p>Claudio Tammela</p>
          <p>Marco Meireles</p>
          <p>Tatiana Gouveia</p>
        </div>
        <div class="papel" style="margin-bottom: 40px;">
          <h3>FINALIZAÇÃO DE SOM</h3>
          <a href="http://criadomudo.net" target="_blank">Criado Mudo Produções Artísticas</a>
        </div>
      </div>
      <div class="info">
        <div class="papel">
          <h3>TRILHA SONORA</h3>
          <p>Bernardo Adeodato</p>
          <p>Pedro Silveira</p>
        </div>
        <div class="papel">
          <h3>CORREÇÃO DE COR</h3>
          <p>Raoni Seixas</p>
        </div>
        <div class="papel">
          <h3>INTERPRETE DE LIBRAS</h3>
          <p>Jhonatas Narciso</p>
        </div>
        <div class="papel">
          <h3>GRAVAÇÃO DE LIBRAS</h3>
          <p>Condomínio Multimedia</p>
        </div>
        <div class="papel">
          <h3>ÁUDIO DESCRIÇÃO</h3>
          <p>Rio Sound Produções</p>
          <p>Media Acessível Produções</p>
        </div>
        <div class="papel" style="width: 100%; margin-bottom: 40px;">
          <h3 style="margin-bottom: 0;">DESENVOLVIDO POR:</h3>
          <a href="http://jardim.in" target="_blank">
            <img src="https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo-fundotransparente.png" style="width: 20%; float: left; margin-top: 0.5%; margin-left: 41%;">
          </a>
        </div>
      </div>
      <div class="info">
        <div class="papel">
          <h3>HIPERVÍDEO MULHER</h3>
          <p>Aline Costa</p>
          <p>Ana Lia Cunha</p>
          <p>Larissa Paiva</p>
        </div>
        <div class="papel">
          <h3>HIPERVÍDEO CRIANÇA</h3>
        </div>
        <div class="papel">
          <h3>HIPERVÍDEO ADOLESCENTE</h3>
        </div>
        <div class="papel">
          <h3>HIPERVÍDEO DEFICIÊNCIA</h3>
        </div>
        <div class="papel">
          <h3>HIPERVÍDEO PRISIONAL</h3>
        </div>
        <div class="papel" style="width: 100%; margin-bottom: 40px;">
          <h3 style="margin-bottom: 0;">DESENVOLVIDO POR:</h3>
          <a href="http://jardim.in" target="_blank">
            <img src="https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo-fundotransparente.png" style="width: 20%; float: left; margin-top: 0.5%; margin-left: 41%;">
          </a>
        </div>
      </div>
    </div>
      <div class="papel" style="width: 100%;">
        <h3 style="margin-bottom: 0;">REALIZAÇÃO</h3>
        <img src="http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo_ministerio_saude_sus2.png" style="width: 25%; margin-top: 2%; margin-left: 8%; float: left; margin-right: 18%; margin-bottom: 4%;">
        <a href="http://jardim.in" target="_blank">
          <img src="https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo-fundotransparente.png" style="width: 12%; float: left; margin-top: 0.5%;">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var slick = require('slick-carousel')

  module.exports = {
    replace: true,
    attached: function() {
      $$$('.sslick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000
      });
    },
    computed: {
      isMulher: function() {
        return this.$parent.id !== 'mulher';
      },
      isCrianca: function() {
        return this.$parent.id !== 'crianca';
      },
      isAdolescente: function() {
        return this.$parent.id !== 'adolescente';
      },
      isprisional: function() {
        return this.$parent.id !== 'prisional';
      },
      isdeficiencia: function() {
        return this.$parent.id !== 'deficiencia';
      }
    },
    methods: {
      fecharCred: function() {
        this.$parent.creditos.className = '';
      }
    }
  }

</script>