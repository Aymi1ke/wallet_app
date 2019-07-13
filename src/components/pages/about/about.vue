<template>
  <div class="about">
    <yd-navbar title="关于"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/profile" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>
    <div class="logo-wrap">
  		<img src="../../../../static/img/logo.png" />		
  		<p class="medtxt">小花口袋</p>
  	</div>
  	 <yd-cell-group class="check-group">
        <yd-cell-item arrow type="link" href="/caption">
            <span slot="left" class="medtxt">公司介绍</span>
        </yd-cell-item>
         
        <yd-cell-item arrow type="link" href="/Feedback">
            <span slot="left" class="medtxt">意见反馈</span>      
        </yd-cell-item>
        
        <yd-cell-item arrow type="link" href="/callser">
            <span slot="left" class="medtxt">联系客服</span>      
        </yd-cell-item>
        
         <yd-cell-item arrow type="link" href="/CopyRight">
            <span slot="left" class="medtxt">版本信息</span>
            <span slot="right" class="reltxt">v1.0</span>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" bgcolor="#fff" class="safe" color="#999" @click.native="Logout()">安全退出</yd-button>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
	  Logout(){
	  	this.$dialog.confirm({
	              title: '退出登录',
	              mes: '确定要退出吗?不再想一想？',
	              opts: [
	                  {
	                      txt: '取消',
	                      color: false
	                  },
	                  {
	                      txt: '确定',
	                      color: true,
	                      callback: () => {
	                      	this.$axios({
	  										  				method:"post",
	  										  				url:"/user/api/logout"
	  										  			}).then(res=>{
	  										  				if(res.data.code===1){
	  										  					this.$store.commit('LOGOUT')
	  										  				  this.$router.push('/login')
	  										  				}
	  										  				
	  										  			})
	                              }
	                  }
	              ]
	          });
	  	
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-wrap{
	width: 1.54rem;
	height: 1.54rem;
	margin: .55rem auto 1.7rem;
}
.logo-wrap img{
	width: 100%;
	height: 100%;
}
.safe{
	position: absolute;
	bottom: 0;
	font-size: .32rem;
}
</style>
