<template>
  <div class="Norecord">
	<yd-navbar title="空记录" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
		   	<router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    
	<div class="bgno"></div>	
	<p class="reltxt">暂时没有贷款记录</p>
	<button class="monibtn" @click="goApply()">去借款</button>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  name: 'Norecord',
  data () {
    return {
    }
  },
  computed: {
	  ...mapState({
		  Authorization(state) {
		  	return state.Authorization
		  }
	  })
  	
  },
  methods:{
	  goApply(){
		  if(!this.Authorization){
			  this.$router.push('/login')
		  }else{
			  this.$router.push('/')
		  }
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.norecord{
	background: #f7f7f7;
}
.bgno{
	width: 2.24rem;
	height: 1.49rem;
	margin: 2.31rem auto 0;
	background: url(../../../../static/img/img_record-free.png) no-repeat;
	background-size: cover;
}
.reltxt{
	height: auto;
	text-align: center;
	margin: .26rem auto;
	letter-spacing: .01rem;
}
.monibtn{
	background-color: transparent;
	color: #999;
	margin: .84rem 50%;
	transform: translate(-50%);
	border: .01rem solid #999;
}
</style>
