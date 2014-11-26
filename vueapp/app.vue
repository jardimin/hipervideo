<style lang="scss">
	
	.vue-nav {
		list-style-type: none;
		li {
			display: inline;
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

</style>

<template>
	<!-- main nav -->
	<ul class="vue-nav">
		<li><a href="#/">home</a></li>
		<li><a href="#/video/1">video1</a></li>
		<li><a href="#/video/2">video2</a></li>
	</ul>
	<hr/>
	<!-- main view -->
	<div class="view" v-component="{{view}}" v-transition></div>
</template>

<script>

	module.exports = {
		el: '#app',
		data: {
			view: '',
			params: {
				video: null
			}
		},
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