<style lang="scss">
  .tutorial_fundo {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(150,150,150,0.6);
    z-index: 10;
    transition: opacity .25s;
    &.v-enter, &.v-leave {
      opacity: 0;
    }
    &.v-leave {
      opacity: 0;
    }
    .voltar {
      position: absolute;
      right: 25px;
      top: 25px;
      background-color: rgba(50,50,50,1);
      color: white;
      padding: 10px;
    }
    .tutoriais {
      width: 80%;
      margin: 0 auto;
      background-color: gray;
      margin-top: 2%;
      box-shadow: 0px 0px 20px black;
      .passo {
        height: 100%;
      }
    }
  }
</style>

<template>
  <div class="tutorial_fundo">
    <a v-on="click: fecharTut" class="voltar">Voltar</a>
    <div class="tutoriais">
      <div v-repeat="tutdata" class="passo">
        <img src="{{imagem}}" style="width: 100%;">
      </div>
    </div>
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var slick = require('slick-carousel')

  module.exports = {
    inherit: true,
    replace: true,
    computed: {
      isTutorial: function() {
        return this.tutorial
      }
    },
    methods: {
      fecharTut: function() {
        this.tutorial = false;
      }
    },
    attached: function() {
      var self = this

      $$$('.tutoriais').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      });

      this.$on('slick-tut', function() {
        $$$('.tutoriais').slick('slickGoTo', 0);
      })
    }
  }

</script>