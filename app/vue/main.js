(function(){

	var _ = require('underscore')
	var Vue = require('vue')
	var Router = require('director').Router
	var app = new Vue(require('./app.vue'))
	// Vue.config.debug = true

	// ROUTES

	var routes = {
		'/home' : {
			'/:di': {
				on: function(di) {
					if (di === 'redes') {
						if(app.$.view){
							app.$data.redes = true
						} else {
							app.$once('home-view-ready',function(){
								app.$data.redes = true
							})
						}
					} else {
						if(app.$.view){
							app.$.view.fechar()
							app.$.view.hiperHome(di)
						} else {
							app.$once('home-view-ready',function(){
								app.$.view.fechar()
								app.$.view.hiperHome(di)
							})
						}
					}
				}
			},
			on: function () {
				app.className = 'is-home'

				Vue.nextTick(function () {
					app.view = 'home-view'
				})
			}
		},
		'/:id': {
			'/info/:info': {
				on: function(id,info){
					Vue.nextTick(function () {
						if(app.$.view){
							app.$.view.infoOpen(info)
						} else {
							app.$once('video-view-ready',function(){
								app.$.view.infoOpen(info)
							})
						}
					})
				}
			},
			on: function (id) {
				var self = this
				var last_route = app.params.route
				var cur_route = app.params.route = self.getRoute()

				if (app.view === 'video-view' && app.params.video === id) {
					
					// conditions
					var last_is_info = last_route.length > 1 && last_route[1] == 'info';
					var current_is_info = cur_route.length > 1 && cur_route[1] == 'info';

					if(last_is_info && !current_is_info){
						app.$.view.infoClose()
					}

					return // prevent transition on the same id

				}

				// force transition

				app.view = ''


				Vue.nextTick(function () {
					app.db = _.findWhere(app.fulldb.hipervideos,{"id": id})
					app.view = 'video-view'
					app.params.video = id
					app.className = 'is-video-' + id
				})
				
			}
		}
	}

	// DATA: load db.json before router initialization

	var xhr = new XMLHttpRequest()

	xhr.open('GET', '/api/db.json')
	xhr.onload = function () {
		app.fulldb = JSON.parse(xhr.responseText)
		init();
	}
	xhr.send()

	// ROUTER INIT
	
	var router = new Router(routes)

	function init(){
		router 
			.configure({
				recurse: 'forward',
				notfound: function () {
					router.setRoute('/home')
				}
			})
			.init('/')
	}

})()
