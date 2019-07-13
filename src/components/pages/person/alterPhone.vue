<template>
  <div class="alterPhone">
    <yd-navbar title="更改手机号"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/myInfo" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>

      <yd-cell-group class="check-group">
        <yd-cell-item>
            <span slot="left" class="medtxt">手机号</span>
            <yd-input slot="right" class="plh" v-model="phone" placeholder="请输入手机号" required :show-success-icon="false" :show-error-icon="false" regex="mobile"></yd-input>
        </yd-cell-item>

        <yd-cell-item >
            <span slot="left" class="medtxt">验证码</span>
             <yd-input class="plh" slot="right" v-model="code" placeholder="请输入短信验证码"></yd-input>
          <yd-sendcode slot="right"
                       v-model="start"
                       class="send-code"
                       @click.native="sendCode"
                       init-str="发送验证码"
                       bgcolor="#5CB9F6"
                       color="#Fff">
          </yd-sendcode>
        </yd-cell-item>


    </yd-cell-group>
    <p class="looktxt">查看<a href="#">《服务及授权条约》 </a>
    </p>
     <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native="onSubmit()" >同意并提交</yd-button>
     <div class="pointxt">
     	 <p>温馨提示：</p>
         <p> 授权期间将受到运营商的通知短信，这是正常现象，无需担心。请确保短信收到。</p>
     </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'AlterPhone',
  data () {
    return {
      phone: '',
      code:'',
      start:false
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
  mounted(){
    this.phone = this.mobile;
  },
  methods:{
    sendCode(){
      if(this.phone.length>0 && this.phone.trim().length != 0) {
        this.$dialog.loading.open('发送中...');
        this.$post('/api/getCode', {
          phone: this.mobile,
          type: 'current'
        }).then(res => {
          if (res.code == 1) {
            console.log(res.message);
            this.start = true;
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: '已发送',
              icon: 'success',
              timeout: 1500
            });
          } else {
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: res.message,
              icon: 'error',
              timeout: 1500,
            });
          }
        }).catch(error => {

        })
      }
    },
    onSubmit(){
      this.$post('/api/VerificationPhone',{
        token:this.Authorization,
        code:this.code
      }).then(res=>{
        if(res.code ===1){
          this.$dialog.toast({
            mes: res.message,
            timeout: 1500,
            icon: 'success',
            callback:()=> {
              this.$router.push('/NewPhone')
            }
      })
    }else{
          this.$dialog.toast({
            mes: res.message,
            timeout: 1500,
            icon: 'error'
          });
        }
  }).catch(res=>{

      })
  }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnset{
	margin: 1.2rem auto;
}
.forget-pwd{
	border: 1px solid #eb5050;
	padding: .07rem .34rem;
	border-radius: .50rem;
	float: right;
	color: #eb5050;
	font-size: .30rem;
	margin-top: -.4rem;
}
.looktxt{
	text-align: left;
	font-size: .28rem;
	color: #666;
	margin: .8rem .33rem 0 .34rem;
}
.looktxt a{
	color: #528dcf;
}
.pointxt{
	text-align: left;
	font-size: .24rem;
	color: #c0c0c0;
	line-height: .42rem;
	margin: .6rem .27rem;
}
.send-code{
  border-radius: 15px;
  margin-right: 0;
}
</style>
