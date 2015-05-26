<style lang="scss">
	
	@import "app/sass/globals";

	%clearfix {
	  zoom: 1; /* IE6&7 */
	  &:before, :after,{
	    content: "";
	    display: table;
	  }
	  &:after {
	    clear: both;
	  }
	}

	#app,
	#app .view,
	#app .view .sidebar {
		height: 100%;
	}

	#full {
		&:-webkit-full-screen {
		  width: 100%;
		  height: 100%;
		  background-color: #333;
		}
	}
	.vue-nav {
		position: relative;
		z-index: 20;
		list-style-type: none;
		margin: 0;
		padding: 0;
		li {
			display: inline;
			margin: 0;
			padding: 0;
			a {
				padding: 10px;
				&:hover {
					background: #eee;
				}
			}
		}
	}

	.view {
		transition: all 0.5s, opacity .3s ease .3s;
		&.is-redes {
			transition: all 0.5s;
			-webkit-transform: translate3d(0,110%,0);
   		-moz-transform: translate3d(0,110%,0);
   		-o-transform: translate3d(0,110%,0);
   		-ms-transform: translate3d(0,110%,0);
   		transform: translate3d(0,110%,0);
   		#app.marco-fechado & {
   			transition: all 0.5s;
				-webkit-transform: translate3d(0,100%,0);
	   		-moz-transform: translate3d(0,100%,0);
	   		-o-transform: translate3d(0,100%,0);
	   		-ms-transform: translate3d(0,100%,0);
	   		transform: translate3d(0,100%,0);
   		}
		}
		&.v-enter, &.v-leave {
			opacity: 0;
		}
		&.v-leave {
			transition-delay: 0;
		}
	}

	body {
	  &.tocando {
	    & header {
	      opacity: 0;
	    }
	    & a {
	      &.hipervideo {
	        opacity: 0;
	      }
	    }
	    .hipVid {
	      opacity: 1;
	    }
	    #video-controls {
	      display: block;
	    }
	  }
	}

	.conteudo {
	  margin: 0 auto;
	  height: 100%;
		width: 100%;
	  @extend %clearfix;
	}

</style>

<template>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<in-redes></in-redes>
	<div id="full" class="view" v-class="className, is-video: view=='video-view', is-redes: redes" v-component="{{view}}" v-transition v-ref="view" />
	</div>
</template>

<script>

	module.exports = {
		el: '#app',
		data: {
			fulldb: null,
			db: null,
			view: "",
			className: "",
			redes: false,
			qualidade: 'baixa',
			acessibilidade: 'normal',
			params: {
				video: null,
				route: null
			}
		},
		watch : {
			qualidade: function (qualidade) {
				this.$broadcast('mudou-qualidade', qualidade);
			},
			acessibilidade: function (val) {
				this.$broadcast('mudou-acess', val);
			},
			redes: function (val) {
				this.$broadcast('redinha', val);
			}
		},
		attached: function() {
			var q = getCookie('qualidade')
			var a = getCookie('acessibilidade')

			if (q === "") {
				document.cookie = "qualidade=baixa";
			} else if (q === "alta") {
				this.qualidade = 'alta';
			} else if (q === "media") {
				this.qualidade = 'media';
			} else if (q === "baixa") {
				this.qualidade = 'baixa';
			}

			if (a === "") {
				document.cookie = "acessibilidade=normal";
			} else if (a === "libras") {
				this.acessibilidade = 'libras';
			} else if (a === "audio") {
				this.acessibilidade = 'audio';
			} else if (a === "normal") {
				this.acessibilidade = 'normal';
			}

			function getCookie(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		    }
		    return "";
			}

			this.$on('redes', function (val) {
				this.redes = val;
			})

			this.$on('video-qualidade', function (qualidade) {
				this.qualidade = qualidade;
				document.cookie = "qualidade = " + qualidade;
			})

			this.$on('video-acessibilidade', function (acess) {
				if (acess === 'libras') {
					document.cookie = "acessibilidade = libras";
				} else if (acess === 'audio') {
					document.cookie = "acessibilidade = audio";
				} else if (acess === 'normal') {
					document.cookie = "acessibilidade = normal";
				}
				this.acessibilidade = acess;
			})
		},
		components: {
			'home-view': require('./views/home-view.vue'),
			'video-view': require('./views/video-view.vue'),
			'in-redes': require('./components/redes.vue')
		}
	}

</script>