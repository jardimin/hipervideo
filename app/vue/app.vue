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
		transition: opacity .3s ease .3s;
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
	<div class="view" v-class="className, is-video: view=='video-view'" v-component="{{view}}" v-transition v-ref="view" />
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
			qualidade: 'alta',
			acessibilidade: 'nada',
			libras: false,
			audio_desc: false,
			params: {
				video: null,
				route: null
			}
		},
		watch : {
			qualidade: function (qualidade) {
				this.$broadcast('mudou-qualidade', qualidade);
			},
			libras: function (val) {
				this.$broadcast('mudou-libras', val);
			},
			audio_desc: function (val) {
				this.$broadcast('mudou-audio_desc', val);
			}
		},
		attached: function() {
			this.$on('video-qualidade', function (qualidade) {
				this.qualidade = qualidade;
				document.cookie = "qualidade = " + qualidade;
			})

			this.$on('video-acessibilidade', function (acess) {
				if (acess === 'libras') {
					this.libras = true;
					this.audio_desc = false;
					document.cookie = "acessibilidade = libras";
				} else if (acess === 'audio') {
					this.libras = false;
					this.audio_desc = true;
					document.cookie = "acessibilidade = audio";
				} else if (acess === 'nada') {
					this.libras = false;
					this.audio_desc = false;
					document.cookie = "acessibilidade = nada";
				}
				this.acessibilidade = acess;
			})
		},
		components: {
			'home-view': require('./views/home-view.vue'),
			'video-view': require('./views/video-view.vue')
		}
	}

</script>