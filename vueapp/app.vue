<style lang="scss">
	
	@import "sass/vars";

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

	.context-bg {
		.is-video-mulher & {
			background: $color-video-1;
		}
		.is-video-adolescente & {
			background: $color-video-2;
		}
		.is-video-crianca & {
			background: $color-video-3;
		}
		.is-video-preso & {
			background: $color-video-4;
		}
		.is-video-deficiente & {
			background: $color-video-5;
		}
	}

</style>

<template>
	<div v-class="className, is-video: view=='video-view'">
		<!-- main nav -->
		<ul class="vue-nav">
			<li><a href="#/">home</a></li>
			<li><a href="#/video/mulher">mulher</a></li>
			<li><a href="#/video/adolescente">adolescente</a></li>
			<li><a href="#/video/crianca">criança</a></li>
			<li><a href="#/video/deficiente">deficiente</a></li>
			<li><a href="#/video/preso">preso</a></li>
		</ul>
		<!-- main view -->
		<div class="view"  v-component="{{view}}" v-transition />
	</div>

</template>

<script>

	module.exports = {
		el: '#app',
		replace: true,
		data: {
			view: '',
			className: '',
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