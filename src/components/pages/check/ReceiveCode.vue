<template>
    <div class="receivecode">
      <yd-navbar title="绑定银行卡" height=".88rem" fontsize=".36rem" border-color="rgba(0,0,0,0)">
        <router-link to="/Check" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
      </yd-navbar>
      <div class="hint">
          请输入移动运营商发送至{{bankPhone | conceal}}的短信验证码
      </div>
      <yd-cell-group class="bank-group">
        <yd-cell-item>
          <span slot="left" class="medtxt">短信验证码</span>
          <yd-input class="plh" slot="right" v-model="bankCode" placeholder="短信验证码"></yd-input>
          <yd-sendcode slot="right"
                       v-model="start"
                       class="send-code"
                       @click.native="sendCode"
                       init-str="发送验证码"
                       bgcolor="#F35C51"
                       color="#Fff">
          </yd-sendcode>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native="isBindCard()">确定</yd-button>
      <popup v-if="show" :remind="remind" :assist="assist" :imgSrc="imgSrc"  @close="show=false"  :resetxt="resetxt" :nexttxt="nexttxt" :isfail="isfail" :ishide="ishide" :pushPage="pushPage">
      </popup>
    </div>
</template>

<script>
  import Popup from '../../common/popup/Popup'
  import {mapState} from 'vuex'
    export default {
        name: "ReceiveCode",
      components:{
          Popup
      },
      data(){
          return{
            bankPhone:'',
            bankCode:'',
            start:false,
            show: false, //是否显示弹窗
            remind: '',  //提示标题
            assist: '',  //提示信息
            imgSrc: '',  //图片地址
            isfail: false, //成功失败信息显示
            resetxt: '', //失败提示按钮
            nexttxt: '', //成功提示按钮
            ishide:false, //是否显示成功提示按钮
            pushPage:''
          }
      },
      filters: {
        conceal: function (value) {
          if (value) {
            return (value = value.substr(0, 3) + '****' + value.substr(7))
          } else {
            return (value = '')
          }
        }
      },
      computed:{
        ...mapState({
          Authorization(state){
            return state.Authorization
          }
        })
      },
      mounted(){
          this.bankPhone = sessionStorage.getItem('phone');
          this.start = true;
      },
      methods:{
        isBindCard(){
          if(this.bankCode!==""){
            this.$post('/verifySendMsg',{
              token:this.Authorization,
              code:this.bankCode
            }).then(res=>{
              if(res.code === 1){
                this.show = true;
                this.isfail = false;
                this.ishide = true;
                this.imgSrc = require("../../../../static/img/pop_img_Bankcard_success.png");
                this.remind = res.message;
                this.assist = "";
                this.nexttxt = "下一步";
                this.pushPage= "check"
              }
              // else{
              //   this.show = true;
              //   this.isfail = true;
              //   this.imgSrc = require("../../../../static/img/pop_img_id_fail.png");
              //   this.remind = res.message;
              //   this.assist = "请重新认证，银行卡的信息准确";
              //   this.resetxt = '重新认证';
              // }
            }).catch(error=>{

            })
          }else{
            this.$dialog.toast({
              mes: "请输入验证码",
              timeout: 1500,
              icon: 'error'
            });
          }

        }

      }

    }
</script>

<style scoped>
.btnset{
  margin: 1.2rem auto;
}
  .send-code{
    border-radius: 15px;
  }
  .hint{
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    background-color: #fff;
    text-align: center;
    color: #C0C0C0;
    font-size: .28rem;
    border-bottom: 1px solid rgba(0,0,0,.06);
  }
</style>
