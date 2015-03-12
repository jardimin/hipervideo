<style lang="scss">
  .sidebar__menu {
    background-color: #fff;
    height: 46px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    transition: width 0.25s ease 0.25s, height 0.5s ease 0.5s, left 0.5s ease 0.5s, right 0.5s ease 0.5s;
    width: 50px;
    &.is-open {
      width: 100px;
      transition: width 0.25s ease 0.25s, left 0.5s ease 0.5s, right 0.5s ease 0.5s;
    }
    &.is-after {
      left: 0;
      top: 300px;
      width: 100%;
      height: 150px;
      position: fixed !important;
      transition: height 1s ease 0.5s, width 0.5s,
    }
  }
  .menu_handle {
    transition: opacity 0.5s;
    &:hover {
      opacity: 0.6;
    }
  }

  .menu_1 {
    left: 60px;
    padding: 0 15px;
    position: absolute;
  }

  .menu_2 {
    background-color: rgba(240, 240, 240, 1);
    padding: 10px 70px;
    position: absolute;
    top: 60px;
    width: 100%;
  }

  .menu_item {
    color: rgba(150, 150, 150, 1);
    cursor: pointer;
    float: left;
    font-size: 130%;
    font-weight: 400;
    letter-spacing: 1px;
    margin-top: 10px;
    padding: 10px 30px 32px;
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
    &.clicado {
      background-color: rgba(240, 240, 240, 1);
    }
    &.selecionado {
      background-color: #555;
      color: white;
    }
  }

</style>

<template>
  <div class="sidebar__menu" v-class="is-open: isOpen, is-after: isAfter">
    <div v-on="click: toggle" style="position: absolute; left: 0px; top: 0px; color: #555; cursor: pointer;" class="menu_handle"><i class="fa fa-bars fa-2x" style="position: absolute; left: 10px; top: 6px;"></i></div>
    <div class="menu_1">
<!--       <div class="menu_item" v-class="clicado: menuAcess" v-on="click: clickAcess">ACESSIBILIDADE</div> -->
      <div class="menu_item" v-class="clicado: menuQual" v-on="click: clickQual">QUALIDADE</div>
      <div class="menu_item" v-class="clicado: menuHip" v-on="click: clickHip">HIPERVÍDEOS</div>
      <div class="menu_item" v-on="click: clickRedes">VER REDES</div>
      <a href="/#/" class="menu_item">INÍCIO</a>
    </div>
<!--     <div class="menu_2" v-show="menuAcess">
      <div class="menu_item" v-class="selecionado: audio_desc" v-on="click: selectAudio">ÁUDIO DESCRIÇÃO</div>
      <div class="menu_item" v-class="selecionado: libras" v-on="click: selectLibras">LIBRAS</div>
    </div> -->
    <div class="menu_2" v-show="menuQual">
      <div class="menu_item" v-class="selecionado: isAlta" v-on="click: selectAlta">ALTA</div>
      <div class="menu_item" v-class="selecionado: isMedia" v-on="click: selectMedia">MÉDIA</div>
      <div class="menu_item" v-class="selecionado: isBaixa" v-on="click: selectBaixa">BAIXA</div>
    </div>
    <div class="menu_2" v-show="menuHip">
      <div class="menu_item context-bg" v-if="isMulher" style="color: white;">MULHER</div>
      <a href="/#/mulher" class="menu_item" v-if="!isMulher">MULHER</a>
      <div class="menu_item context-bg" v-if="isCrianca" style="color: white;">CRIANÇA</div>
      <a href="/#/crianca" class="menu_item" v-if="!isCrianca">CRIANÇA</a>
      <div class="menu_item context-bg" v-if="isAdolescente" style="color: white;">ADOLESCENTE</div>
      <a href="/#/adolescente" class="menu_item" v-if="!isAdolescente">ADOLESCENTE</a>
      <div class="menu_item context-bg" v-if="isDeficiente" style="color: white;">PESSOA COM DEFICIÊNCIA</div>
      <a href="/#/deficiente" class="menu_item" v-if="!isDeficiente">PESSOA COM DEFICIÊNCIA</a>
      <div class="menu_item context-bg" v-if="isPreso" style="color: white;">PESSOA PRIVADA DE LIBERDADE</div>
      <a href="/#/preso" class="menu_item" v-if="!isPreso">PESSOA PRIVADA DE LIBERDADE</a>
    </div>
  </div>
</template>

<script>
  var $$$ = require('jquery')

  module.exports = {
    replace: true,

    data: function(){
      return {
        isOpen: false,
        isAfter: false,
        menuAcess: false,
        menuHip: false,
        menuQual: true,
        infoOpen: false
      }
    },
    computed: {
      isMulher: function() {
        return this.$parent.$parent.id === 'mulher';
      },
      isCrianca: function() {
        return this.$parent.$parent.id === 'crianca';
      },
      isAdolescente: function() {
        return this.$parent.$parent.id === 'adolescente';
      },
      isPreso: function() {
        return this.$parent.$parent.id === 'preso';
      },
      isDeficiente: function() {
        return this.$parent.$parent.id === 'deficiente';
      },
      isAlta: function() {
        return this.$parent.$parent.$parent.qualidade === 'alta';
      },
      isMedia: function() {
        return this.$parent.$parent.$parent.qualidade === 'media';
      },
      isBaixa: function() {
        return this.$parent.$parent.$parent.qualidade === 'baixa';
      }
    },
    attached: function() {
      var self = this

      this.$on('info-open', function() {
        self.infoOpen = true
      })
      
      this.$on('info-close', function() {
        self.infoOpen = false
      })

      this.$on('hipervideo-play', function() {
        if (!self.infoOpen) {
          self.isAfter = false
          $$$('#chap').removeClass('aberto')
          setTimeout(function() {
            self.isOpen = false
          }, 400)
        }
      })

      this.$on('hipervideo-pause', function() {
        if (!self.infoOpen) {
          self.isOpen = true
          $$$('#chap').addClass('aberto')
          setTimeout(function() {
            self.isAfter = true
          }, 400)
        }
      })

    },
    beforeDestroy: function(){
      this.$off('info-open')
      this.$off('info-close')
      this.$off('hipervideo-play')
      this.$off('hipervideo-pause')
    },
    methods: {
      toggle: function(){
        if (!this.infoOpen) {
          if (!this.isOpen) {
            this.$parent.$parent.videoPause()
          } else {
            this.$parent.$parent.videoPlay()
          }
        } else if (this.infoOpen) {
          if (!this.isOpen) {
            self.isAfter = false
            $$$('#chap').removeClass('aberto')
            setTimeout(function() {
              self.isOpen = false
            }, 400)
          } else {
            self.isOpen = true
            $$$('#chap').addClass('aberto')
            setTimeout(function() {
              self.isAfter = true
            }, 400)
          }
        }
      },
      clickAcess: function(){
        this.menuAcess = true
        this.menuHip = false
        this.menuQual = false
      },
      clickHip: function(){
        this.menuAcess = false
        this.menuQual = false
        this.menuHip = true
      },
      clickQual: function(){
        this.menuQual = true
        this.menuAcess = false
        this.menuHip = false
      },
      clickRedes: function(){
        this.$dispatch('redes', true)
      },
      selectAudio: function(){
        if (this.$parent.$parent.audio_desc === true) {
          this.$dispatch('video-acessibilidade', 'nada')
        } else {
          this.$dispatch('video-acessibilidade', 'audio')
        }
      },
      selectLibras: function(){
        if (this.$parent.$parent.libras === true) {
          this.$dispatch('video-acessibilidade', 'nada')
        } else {
          this.$dispatch('video-acessibilidade', 'libras')
        }
      },
      selectAlta: function(){
        this.$dispatch('video-qualidade', 'alta')
      },
      selectMedia: function(){
        this.$dispatch('video-qualidade', 'media')
      },
      selectBaixa: function(){
        this.$dispatch('video-qualidade', 'baixa')
      }
    }
  }

</script>