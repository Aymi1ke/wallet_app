<template>
  <div class="myInfo">
    <yd-navbar title="个人信息" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
		<router-link to="/profile" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <router-link to="/alterPhone" slot="right">
            <span style="color: #666;font-size: .32rem;padding-right: .05rem;">编辑</span>
        </router-link>
     </yd-navbar>
     <div class="per-bg">
       <div class="cirbg">
         <img src="../../../../static/img/touxiang.png"/>
       </div>
    </div>
     <P class="info-title">基本信息：</P>

     <yd-cell-group>
        <yd-cell-item>
            <span slot="left" class="medtxt">真实姓名</span>
            <yd-input slot="right" v-model="name" class="plh"  placeholder="请输入真实姓名"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left" class="medtxt">身份证号</span>
            <yd-input slot="right" v-model="idcard" class="plh" placeholder="请输入身份证号"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left" class="medtxt">手机号码</span>
            <yd-input slot="right" v-model="phone" class="plh" placeholder="请输入手机号码"></yd-input>
        </yd-cell-item>
    </yd-cell-group>

    <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native = "Logout()" >安全退出</yd-button>

  </div>
</template>

<script>
	import { mapState } from 'vuex'
export default {
  name: 'MyInfo',
  data () {
    return {
      name: '',
      idcard:'',
      phone:''
    }
  },
  computed:{
  		...mapState({
  			Authorization(state){
  				return state.Authorization
  			},
        mobile(state){
  			  return state.mobile
        }
  		})
  },
  created(){
  	this.myInfo();
    console.log('登录手机号----'+this.mobile);
  },
  methods:{
  	myInfo(){
  		this.$post( '/api/showData',{
				token:this.Authorization
			}).then(res => {
			  if(res.code===1){
          console.log(res);
          // this.avatar = res.data.data.avatar;
          this.name = res.result.username;
          this.idcard = res.result.idcard;
          this.phone = this.mobile;
        }else {
          this.$dialog.toast({
            mes: res.message,
            timeout: 1500,
            icon: 'error'
          });
        }
		}).catch(error => {
// 			              console.log(error);
// 			              this.$router.push('/error')
		})
  		},
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
                            	this.$post("/api/exit",{
                              token:this.Authorization
                            }).then(res=>{
                              if(res.code === 1){
                                this.$store.commit('LOGOUT')
                                this.$router.push('/login')
                              }else{

                              }

                            }).catch(error=>{

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
.per-bg{
	width: 100%;
	height: 2.18rem;
}
.cirbg{
	width: 1.33rem;
	height: 1.33rem;
	border-radius: 50%;
	background: #fff;
	margin: .85rem auto  0;
}
.cirbg img{
	width: 98%;
	height: 98%;
	margin: 1%;
}
.info-title{
	font-size: .28rem;
	color: #535353;
	line-height: .4rem;
	text-align: left;
	letter-spacing: .01rem;
	margin:.6rem 0 .28rem .31rem;
}
.btnset{
	margin: 1.2rem auto;
}
</style>
