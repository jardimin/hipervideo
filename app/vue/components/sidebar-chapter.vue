<style lang="scss">
	.sidebar_chapter {
		position: relative;
		width: 300px;
		opacity: 0.3;
		transition: opacity 0.5s;
		&:hover {
			opacity: 1;
		}
		.sidebar.is-open & {
				opacity: 1;
			}
		&.aberto {
			opacity: 1;
		}
		.sidebar_chapter_title {
			background: none repeat scroll 0 0 #fff;
	    color: #555;
	    display: inline-block;
	    font-family: fonte-bold,sans-serif;
	    font-weight: 900;
	    line-height: 28px;
	    min-width: 0;
	    padding: 0 58px 0 10px;
	    position: relative;
	    transition: all 0.5s ease 0s;
	    z-index: 2;
	    & h4 {
	    	font-family: fonte-normal,sans-serif;
		    font-size: 85%;
		    font-weight: 100;
		    margin: 0;
	    }
	    & h3 {
	    	margin: -10px 0 0;
	    	@media screen and (min-width: 1600px) {
	    		margin: -5px 0 0;
	    	}
	    }
			.sidebar.is-open & {
				min-width: 232px;
			}
		}
	}
</style>

<template>
	<div class="sidebar_chapter" id="chap">
		<div class="sidebar_chapter_title">
		<h4>CAPÍTULO {{capitulo.id}}</h4>
		<h3>{{capitulo.nome | uppercase}}</h3>
		<div v-component="in-menu" v-with="libras: libras, audio_desc: audio_desc"></div>
		</div>
	</div>
</template>

<script>

	module.exports = {
		replace: true,
		components: {
      'in-menu': require('../components/sidebar-menu.vue')
    }
	}

</script>