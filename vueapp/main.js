var Vue = require('vue')
var Router = require('director').Router
var app = new Vue(require('./app.vue'))
var router = new Router()
var database = require('./db.json')
var _ = require('underscore')

router.on('/', function () {
	app.view = 'home-view'
	app.db = database
})

router.on('/video/:id', function (id) {
	if (app.view === 'video-view' && app.params.video === id) {
		return // prevent transition on the same id
	}
	app.view = ''
	Vue.nextTick(function () {
		app.view = 'video-view'
		app.params.video = id
		app.db = _.findWhere(database.hipervideos,{"id": id})
	})
})

router.configure({
	notfound: function () {
		router.setRoute('/')
	}
})

router.init('/')


console.log(_.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }))