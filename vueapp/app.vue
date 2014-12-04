<style lang="scss">
	
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
	  color: #00B7FF;
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
	<div class="view" v-component="{{view}}" v-transition></div>
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