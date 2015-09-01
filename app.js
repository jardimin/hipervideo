var debug = require('debug')('dapes');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var livereload = require('connect-livereload');
var useragent = require('express-useragent');
var fs = require('fs');
var router = express.Router();

var routes = {
    index: require(path.join(__dirname, 'app/routes/index'))
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: __dirname + 'app/sass',
    dest: __dirname + 'public/styles',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/styles'
}));
app.use(livereload());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(path.join(__dirname, 'node_modules')));
app.use(useragent.express());

app.use('/', routes.index);
app.use('/mulher', function(req, res) {
    res.render('redirect', {'home': false, 'facetruque': {
      'urlized': 'mulher',
      'titulo': 'Hipervideo - Saúde da Mulher',
      'descricao': 'A Rede Cegonha surge do compromisso com a redução da mortalidade materno-infantil, com a mudança no modelo de atenção obstétrico e avanço da pauta do direito reprodutivo na sociedade brasileira. A experiência de Salvador permite cartografar um processo em construção de avanços, mudanças e desafios para a construção de Redes de Atenção em Saúde com ampliação do acesso, melhoria da atenção e reconhecimento dos direitos das mulheres.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_mulher.png'
    }});
});
app.use('/crianca', function(req, res) {
    res.render('redirect', {'home': false, 'facetruque': {
      'urlized': 'crianca',
      'titulo': 'Hipervideo - Saúde da Criança',
      'descricao': 'Os componentes da Saúde da Criança na consolidação da Rede Cegonha são explorados nessa rica experiência no município de Florianópolis que expressa o compromisso interfederativo que agrega acúmulos da esfera local com apoio ministerial. O cuidado com primeira infância, boas práticas e humanização do parto e nascimento, a participação da comunidade e o papel da atenção básica na articulação do cuidado do recém-nascido são temas abordados nesse hipervídeo.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_crianca.png'
    }});
});
app.use('/adolescente', function(req, res) {
    res.render('redirect', {'home': false, 'facetruque': {
      'urlized': 'adolescente',
      'titulo': 'Hipervideo - Saúde do Adolescente',
      'descricao': 'Este hipervídeo aborda, entre as diversas ações direcionadas a saúde do adolescente, a Política de Atenção Integral à Saúde de Adolescentes em Conflito com a Lei – PNAISARI, e sua missão de facilitar o acesso do adolescente em conflito com a lei no Serviço Único de Saúde – SUS, com ações intersetoriais nos espaços que desenvolvem programas socioeducativos, favorecendo o fortalecimento de redes e uma maior atuação das secretarias estaduais e municipais de saúde no aporte às necessidades desta população.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_adolescente.png'
    }});
});
app.use('/deficiencia', function(req, res) {
    res.render('redirect', {'home': false, 'facetruque': {
      'urlized': 'deficiencia',
      'titulo': 'Hipervideo - Saúde da Pessoa com Deficiência',
      'descricao': 'A ampliação do grau de autonomia das pessoas com deficiência é um compromisso da Rede de Cuidado em Saúde a Pessoa com deficiencia. Na experiência de Goiânia acompanhamos em ato a constituição de uma rede de saberes que agindo de modo integrado e transversal vem  possibilitando transformações nos modos de ver e cuidar, que produzem avanços no direito à saúde e na cidadania da pessoa com deficiência na sociedade brasileira.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_deficiencia.png'
    }});
});
app.use('/prisional', function(req, res) {
    res.render('redirect', {'home': false, 'facetruque': {
      'urlized': 'prisional',
      'titulo': 'Hipervideo - Saúde da Pessoa Privada de Liberdade',
      'descricao': 'A experiência de Porto Alegre-RS apresenta a complexidade desse novo território da saúde: o sistema prisional, e o desafio de integração desse novo ponto da Rede de Atenção em Saúde: as Equipe de Atenção Básica Prisional – EABP. Entre a saúde e a justiça emerge um novo campo de práticas mobilizado pelo avanço da garantia dos direitos humanos das pessoas privadas de liberdade.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_prisional.png'
    }});
});
app.use('/home/mulher', function(req, res) {
    res.render('redirect', {'home': true, 'facetruque': {
      'urlized': 'mulher',
      'titulo': 'Hipervideo - Saúde da Mulher',
      'descricao': 'A Rede Cegonha surge do compromisso com a redução da mortalidade materno-infantil, com a mudança no modelo de atenção obstétrico e avanço da pauta do direito reprodutivo na sociedade brasileira. A experiência de Salvador permite cartografar um processo em construção de avanços, mudanças e desafios para a construção de Redes de Atenção em Saúde com ampliação do acesso, melhoria da atenção e reconhecimento dos direitos das mulheres.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_mulher.png'
    }});
});
app.use('/home/crianca', function(req, res) {
    res.render('redirect', {'home': true, 'facetruque': {
      'urlized': 'crianca',
      'titulo': 'Hipervideo - Saúde da Criança',
      'descricao': 'Os componentes da Saúde da Criança na consolidação da Rede Cegonha são explorados nessa rica experiência no município de Florianópolis que expressa o compromisso interfederativo que agrega acúmulos da esfera local com apoio ministerial. O cuidado com primeira infância, boas práticas e humanização do parto e nascimento, a participação da comunidade e o papel da atenção básica na articulação do cuidado do recém-nascido são temas abordados nesse hipervídeo.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_crianca.png'
    }});
});
app.use('/home/adolescente', function(req, res) {
    res.render('redirect', {'home': true, 'facetruque': {
      'urlized': 'adolescente',
      'titulo': 'Hipervideo - Saúde do Adolescente',
      'descricao': 'Este hipervídeo aborda, entre as diversas ações direcionadas a saúde do adolescente, a Política de Atenção Integral à Saúde de Adolescentes em Conflito com a Lei – PNAISARI, e sua missão de facilitar o acesso do adolescente em conflito com a lei no Serviço Único de Saúde – SUS, com ações intersetoriais nos espaços que desenvolvem programas socioeducativos, favorecendo o fortalecimento de redes e uma maior atuação das secretarias estaduais e municipais de saúde no aporte às necessidades desta população.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_adolescente.png'
    }});
});
app.use('/home/deficiencia', function(req, res) {
    res.render('redirect', {'home': true, 'facetruque': {
      'urlized': 'deficiencia',
      'titulo': 'Hipervideo - Saúde da Pessoa com Deficiência',
      'descricao': 'A ampliação do grau de autonomia das pessoas com deficiência é um compromisso da Rede de Cuidado em Saúde a Pessoa com deficiencia. Na experiência de Goiânia acompanhamos em ato a constituição de uma rede de saberes que agindo de modo integrado e transversal vem  possibilitando transformações nos modos de ver e cuidar, que produzem avanços no direito à saúde e na cidadania da pessoa com deficiência na sociedade brasileira.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_deficiencia.png'
    }});
});
app.use('/home/prisional', function(req, res) {
    res.render('redirect', {'home': true, 'facetruque': {
      'urlized': 'prisional',
      'titulo': 'Hipervideo - Saúde da Pessoa Privada de Liberdade',
      'descricao': 'A experiência de Porto Alegre-RS apresenta a complexidade desse novo território da saúde: o sistema prisional, e o desafio de integração desse novo ponto da Rede de Atenção em Saúde: as Equipe de Atenção Básica Prisional – EABP. Entre a saúde e a justiça emerge um novo campo de práticas mobilizado pelo avanço da garantia dos direitos humanos das pessoas privadas de liberdade.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/foto_prisional.png'
    }});
});
app.use('/redes', function(req, res) {
    res.render('redirect', {'home': true, 'facetruque': {
      'urlized': 'redes',
      'titulo': 'Hipervideo - Redes Estratégicas de Saúde',
      'descricao': 'Veja e interaja com as Redes Estratégicas de Saúde.',
      'img': 'https://s3-sa-east-1.amazonaws.com/avnaweb/DAPES/Redes_Estrategicas_de_Sa%C3%BAde.png'
    }});
});
// app.use('/users', routes.users);
// app.use('/vue', routes.vue);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function(err) {
    debug('Express server listening on port ' + app.get('port'));
});
