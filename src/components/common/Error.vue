<template>
  <div class="error">
    <yd-navbar title="无网络" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
		   	<router-link to="/" slot="left">
           <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    
		<div class="bgno"></div>	
		<p class="reltxt">网络连接错误 请检测您的设备</p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
   
   
   
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
	background: #f7f7f7;
}
.bgno{
	width: 1.83rem;
	height: 1.38rem;
	margin: 2.31rem auto 0;
	background: url(../../../static/img/error.png) no-repeat;
	background-size: cover;
}
.reltxt{
	height: 8.87rem;
	text-align: center;
	margin: .26rem auto 7.67rem;
	letter-spacing: .01rem;
}
</style>