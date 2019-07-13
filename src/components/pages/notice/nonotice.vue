<template>
  <div class="nonotice">
	<yd-navbar title="消息中心" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
		   	<router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
      	<router-link to="/notice" slot="right">
           <yd-icon name="message" size="30px" color="#a3a3a3" custom></yd-icon>
        </router-link>
    </yd-navbar>
    
	<div class="bgno">
	</div>	
	<p class="reltxt">暂时没有消息记录</p>
  </div>
</template>

<script>
export default {
  name: 'Nonotice',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nonotice{
	background: #f7f7f7;
}
.bgno{
	width: 2.24rem;
	height: 1.49rem;
	margin: 2.31rem auto 0;
	background: url(../../../../static/img/img_messige_free.png) no-repeat;
	background-size: cover;
}
.reltxt{
	height: 8.87rem;
	text-align: center;
	margin: .26rem auto 7.67rem;
	letter-spacing: .01rem;
}
</style>
