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
    padding: 3%;
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
    text-align: center;
    float: left;
  }
</style>

<template>
  <div id="creditos">
    <h1>CRÉDITOS</h1>
    <div class="info">
      <div class="papel">
        <h3>DESIGN E PROGRAMAÇÃO</h3>
        <p>Marlus Araújo</p>
        <p>Gustavo Junqueira</p>
      </div>
      <div class="papel">
        <h3>DIREÇÃO</h3>
        <p>Julio Braga</p>
        <p>Giuliano Bonorandi</p>
      </div>
      <div class="papel">
        <h3>PRODUÇÃO</h3>
        <p>Janaína Castro Alves</p>
        <p>Carolina Calcavecchia</p>
      </div>
      <div class="papel">
        <h3>FOTOGRAFIA</h3>
        <p>Milena Sá</p>
        <p>Tito José</p>
      </div>
      <div class="papel">
        <h3>SOM DIRETO</h3>
        <p>Alexandre Kubrusly</p>
        <p>Francisco</p>
      </div>
      <div class="papel">
        <h3>ASSISTÊNCIA DE EDIÇÃO</h3>
        <p>Raoni Seixas</p>
        <p>Tatiana Teitelroit</p>
      </div>
      <div class="papel">
        <h3>EDIÇÃO</h3>
        <p>Tatiana Gouveia</p>
        <p>Marco Meireles</p>
        <p>Claudio Tammela</p>
      </div>
      <div class="papel" style="margin-bottom: 40px;">
        <h3>FINALIZAÇÃO DE SOM</h3>
        <a href="http://criadomudo.net" target="_blank">Criado Mudo Produções Artísticas</a>
      </div>
      <div class="papel" style="margin-bottom: 40px;">
        <h3>TRILHA SONORA</h3>
        <p>Bernardo Adeodato</p>
        <p>Pedro Silveira</p>
      </div>
      <div class="papel" style="margin-bottom: 64px;">
        <h3>CORREÇÃO DE COR</h3>
        <p>Raoni Seixas</p>
      </div>
      <div class="papel" style="width: 100%;">
        <h3>REALIZAÇÃO</h3>
        <img src="http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Logomarca_DAPES.png" style="width: 20%; float: left; margin-right: 7%; margin-left: 8%; margin-top: 1.5%;">
        <img src="http://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo_ministerio_saude.png" style="width: 30%; margin-top: 2%; float: left; margin-right: 11%;">
        <a href="http://jardim.in" target="_blank">
          <img src="https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/logo-fundotransparente.png" style="width: 15%; float: left; margin-top: 1%;">
        </a>
      </div>
    </div>
    <div style="width: 80%; margin: 0 auto;">
      <a href="/#/home" class="botao" style="width: 16%; font-weight: 900; text-decoration: none;">INICIO</a>
      <a v-if="isMulher" href="/#/mulher" class="botao" style="width: 16%; font-weight: 900; color: white; text-decoration: none; background-color: #ed1e79;">SAÚDE DA MULHER</a>
      <a v-if="isCrianca" href="/#/crianca" class="botao" style="width: 16%; font-weight: 900; color: white; text-decoration: none; background-color: #0cc;">SAÚDE DA CRIANÇA</a>
      <a v-if="isAdolescente" href="/#/adolescente" class="botao" style="width: 16%; font-weight: 900; color: white; text-decoration: none; background-color: #00a300;">SAÚDE DO ADOLESCENTE</a>
      <a v-if="isDeficiente" href="/#/deficiente" class="botao" style="width: 16%; font-weight: 900; color: white; text-decoration: none; background-color: #00c;">SAÚDE DO DEFICIENTE</a>
      <a v-if="isPreso" href="/#/preso" class="botao" style="width: 16%; font-weight: 900; color: white; text-decoration: none; background-color: #f00;">SAÚDE DO PRESO</a>
    </div>
  </div>
</template>

<script>

  module.exports = {
    replace: true,
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
      isPreso: function() {
        return this.$parent.id !== 'preso';
      },
      isDeficiente: function() {
        return this.$parent.id !== 'deficiente';
      }
    }
  }

</script>