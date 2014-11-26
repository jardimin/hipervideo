var Vue = require('vue')
var Router = require('director').Router
var app = new Vue(require('./app.vue'))
var router = new Router()

router.on('/', function () {
	window.scrollTo(0, 0)
	app.view = 'home-view'
})

router.on('/video/:id', function (id) {
	window.scrollTo(0, 0)
	app.view = 'video-view'
	app.params.video = id
	console.log(app.params.video)
})

router.configure({
	notfound: function () {
		router.setRoute('/')
	}
})

router.init('/')