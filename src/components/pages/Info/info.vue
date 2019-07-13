<template>
  <div class="info">
	<yd-navbar title="空记录" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
		   	<router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
       </router-link>
    </yd-navbar>
    
	<div class="bgno">
	</div>	
	<p class="reltxt">暂时没有贷款记录</p>
	<router-link to="/Loan"><div class="gobtn">去借款</div></router-link>
  </div>
</template>

<script>
export default {
  name: 'info',
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
	width: 1.9rem;
	height: 1.48rem;
	margin: 2.31rem auto 0;
	background: url(../../../../static/img/img_record-free.png) no-repeat;
	background-size: cover;
}
.reltxt{
	text-align: center;
	margin: .26rem auto;
}
.gobtn{
	text-align: center;
	width: 3rem ;
	height: .86rem;
	line-height: .86rem;
	margin: .84rem auto;
	border-radius: .5rem;
  color: #999;
  border: .01rem solid #999;
  font-size: .4rem;
  letter-spacing: .02rem;
}
</style>
