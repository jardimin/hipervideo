var Vue = require('vue')
var Router = require('director').Router
var app = new Vue(require('./app.vue'))
var router = new Router()

router.on('/', function () {
	app.view = 'home-view'
})

router.on('/video/:id', function (id) {
	if (app.view === 'video-view' && app.params.video === id) {
		return // prevent transition on the same id
	}
	app.view = ''
	Vue.nextTick(function () {
		app.view = 'video-view'
		app.params.video = id
	})
})

router.configure({
	notfound: function () {
		router.setRoute('/')
	}
})

router.init('/')