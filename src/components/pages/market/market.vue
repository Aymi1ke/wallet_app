<template>
  <div class="marker">
    <yd-navbar title="贷款超市"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
      	<router-link to="/notice" slot="right">
            <yd-icon name="ucenter-outline" size="30px" color="#777"></yd-icon>
        </router-link>
     </yd-navbar>
      <yd-slider autoplay="3000">
        <yd-slider-item>
            <a>
                <img src="../../../../static/img/market-swiper.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a>
                <img src="../../../../static/img/market-swiper.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a>
               <img src="../../../../static/img/market-swiper.png">
            </a>
        </yd-slider-item>
    </yd-slider>
    <div class="bg5">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Market',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper{
	width: 7.26rem;
	height: 2.84rem;
	margin: .21rem auto;
}
.bg5{
	width: 7.27rem;
	height: 5.3rem;
	margin: .7rem auto;
	background: url(../../../../static/img/marker-bg.png) no-repeat;
	background-size: cover;
}
</style>
