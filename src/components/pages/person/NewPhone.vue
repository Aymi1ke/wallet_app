<template>
  <div class="forgetPWD">
    <yd-navbar title="新手机号码"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/alterPhone" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>

    <yd-cell-group class="check-group">
      <yd-cell-item>
        <span slot="left" class="medtxt">新手机号</span>
        <yd-input slot="right" class="plh" v-model="newMobile" placeholder="请输入手机号" required :show-success-icon="false" :show-error-icon="false" regex="mobile"></yd-input>
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

     <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native="update()">提交</yd-button>
     <div class="pointxt">
     	 <p>温馨提示：</p>
         <p>如果收不到信息，请冲话费后再试，谢谢合作</p>
     </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
 export default {
  name: 'NewPhone',
  data () {
    return {
      newMobile: '',
      code:'',
      start:false
    }
  },
  computed:{
    ...mapState({
      Authorization(state){
        return state.Authorization
      }

    })
  },
   methods: {
            sendCode() {
                if(this.newMobile.length>0 && this.newMobile.trim().length != 0) {
                  this.$dialog.loading.open('发送中...');
                  this.$post('/api/getCode', {
                    phone: this.mobile,
                    type: 'update'
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
       update(){
         this.$post('/api/replacePhone',{
           token:this.Authorization,
           phone:this.newMobile,
           code:this.code
         }).then(res=>{
           if(res.code === 1){
             this.$dialog.toast({
               mes: res.message,
               timeout: 1500,
               icon: 'success',
               callback:()=>{
                 this.$router.push('/Login')
             }
             });
           }else{
             this.$dialog.toast({
               mes: res.message,
               timeout: 1500,
               icon: 'error'
             });
           }
         })
     },
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnset{
	margin: 1.2rem auto;
}
.pointxt{
	text-align: left;
	font-size: .24rem;
	color: #999;
	line-height: .42rem;
	margin: .6rem .27rem;
}
.send-code{
  border-radius: 15px;
 margin-right: 0;
}
</style>
