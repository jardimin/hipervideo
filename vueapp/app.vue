<style lang="scss">
	
	@import "sass/globals";

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
	  padding: 0px;
	  margin: 0px;
	  font: 16px "Lucida Grande", Helvetica, Arial, sans-serif;
	  &.tocando {
	    & header {
	      opacity: 0;
	    }
	    & a {
	      &.hipervideo {
	        opacity: 0;
	      }
	    }
	    #hipVid0 {
	      opacity: 1;
	    }
	    #video-controls {
	      display: block;
	    }
	  }
	}

	a {
	  &.hipervideo {
	    cursor: pointer;
	    transition: all 0.5s ease 0s;
	    &:hover {
	      color: black;
	      background-color: white;
	    }
	  }
	}

	.conteudo {
	  width: 95%;
	  margin: 0 auto;
	  min-height: 60px;
	  @extend %clearfix;
	}

</style>

<template>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<div class="view" v-class="className, is-video: view=='video-view'" v-component="{{view}}" v-transition />
	</div>
</template>

<script>

	module.exports = {
		el: '#app',
		data: require('./db.json'),
		/*filters: {
			fromNow: require('./filters/from-now'),
			domain: require('./filters/domain')
		},*/
		components: {
			'home-view': require('./views/home-view.vue'),
			'video-view': require('./views/video-view.vue')
		}
	}

</script>