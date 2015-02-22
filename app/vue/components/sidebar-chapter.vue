<style lang="scss">
	.sidebar_chapter {
		position: relative;
		width: 300px;
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
	<div class="sidebar_chapter">
		<div class="sidebar_chapter_title">
		<h4>CAPÍTULO {{capitulo.id}}</h4>
		<h3>{{capitulo.nome | uppercase}}</h3>
		<a href="/#/" style="position: absolute; right: 0px; top: 0px; color: #555;"><i class="fa fa-bars fa-2x" style="position: absolute; right: 10px; top: 7px;"></i></a>
		</div>
	</div>
</template>

<script>

	module.exports = {
		replace: true,
	}

</script>