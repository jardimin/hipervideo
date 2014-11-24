var express = require('express');
var fs = require('fs');

var router = express.Router();
var db = {
  title: 'Redes Estratégicas',
  hipervideos: [
    {
      nome: 'Mulher',
      descricao: 'T3 comes with a lot of features out of the box, but you can extend its functionality further with “packages”—plugins written by the greater ST3 community. The easiest way to install these packages is t',
      cor: 'red',
      url: 'http://player.aovivonaweb.tv/HiperVideo_audio_mix6_trilha2'
    },
    {
      nome: 'Criança',
      descricao: 'T3 comes with a lot of features out of the box, but you can extend its functionality further with “packages”—plugins written by the greater ST3 community. The easiest way to install these packages is t',
      cor: 'green',
      url: 'http://player.aovivonaweb.tv/HiperVideo_audio_mix6_trilha2'
    },
    {
      nome: 'Adolescente',
      descricao: 'T3 comes with a lot of features out of the box, but you can extend its functionality further with “packages”—plugins written by the greater ST3 community. The easiest way to install these packages is t',
      cor: 'yellow',
      url: 'http://player.aovivonaweb.tv/HiperVideo_audio_mix6_trilha2'
    },
    {
      nome: 'Deficiente',
      descricao: 'T3 comes with a lot of features out of the box, but you can extend its functionality further with “packages”—plugins written by the greater ST3 community. The easiest way to install these packages is t',
      cor: 'orange',
      url: 'http://player.aovivonaweb.tv/HiperVideo_audio_mix6_trilha2'
    },
    {
      nome: 'Preso',
      descricao: 'T3 comes with a lot of features out of the box, but you can extend its functionality further with “packages”—plugins written by the greater ST3 community. The easiest way to install these packages is t',
      cor: 'blue',
      url: 'http://player.aovivonaweb.tv/HiperVideo_audio_mix6_trilha2'
    }
  ],
  tocando: 'Intro'
}


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', db);
});

module.exports = router;
