<template>
  <div class="home">
  	<div class="headbg">
  		<yd-navbar  bgcolor="rgba(0,0,0,0)" height=".88rem" border-color="rgba(0,0,0,0)">
      	<router-link to="/nonotice" slot="right">
      	   	<yd-badge slot="badge" type="danger" shape="circle">100</yd-badge>
            <yd-icon  name="message" size="30px" color="rgba(0,0,0,.5)" custom></yd-icon>
        </router-link>
     </yd-navbar>
	   <swiper :options="swiperOption">
        <swiper-slide> <img src="../../../../static/img/banner -two.png">   </swiper-slide>
        <swiper-slide> <img src="../../../../static/img/banner -two.png">   </swiper-slide>
        <swiper-slide> <img src="../../../../static/img/banner -two.png">   </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  	</div>
      <yd-rollnotice autoplay="2000" class="noticebar-wrap" height="30">
        <yd-rollnotice-item><span style="color:#F00;">小花口袋：   13：20来自河南省的段小花，成功贷款2000员 </span></yd-rollnotice-item>
      </yd-rollnotice>
      <div class="bg">
			<div class="bg1">
				<KnobControl  v-model ='showAmount' :size="220"  :max="2000"  :min="1000" :stepSize="500" :strokeWidth="8" primaryColor=" #F85d56" textColor="#F3412F" secondaryColor="#dfdfdf"></KnobControl>
			</div>
			<p class="lspace">借款周期</p>
			<yd-flexbox class="period">
			       <ul  v-for="item in days">
			        <li  size="mini" bgcolor="rgba(0,0,0,0)" class="cycle"  :class="{'alactive':isactive==item.id}">
			       		{{item.value}}
			       	</li>
			      </ul>
		    </yd-flexbox>
			<div class="line"></div>
			<yd-flexbox class="period">
			       <yd-flexbox-item class="txt">账户管理费用</yd-flexbox-item>
			       <yd-flexbox-item class="txt">利息</yd-flexbox-item>
			       <yd-flexbox-item class="txt">快速审查费用</yd-flexbox-item>
			</yd-flexbox>
			<yd-flexbox class="period">
			       <yd-flexbox-item class="cost">38</yd-flexbox-item>
			       <yd-flexbox-item class="cost">50</yd-flexbox-item>
			       <yd-flexbox-item class="cost">38</yd-flexbox-item>
			</yd-flexbox>
	  </div>
		<div class="bg4">
			<div class="relamount">{{showAmount-(showAmount*0.20)}}.00<span class="rmb">元</span><span class="reltxt">实际到账</span></div>
			<yd-button  bgcolor="#F35C51" class="btnbg" color="#fff"  @click.native="isLogin()">{{prompt}}</yd-button>
	   </div>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	import KnobControl from '../../common/KnobControl.vue';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
export default {
  name: 'Home',
  components: {
    KnobControl,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },
      val2: 200,
      showAmount: 1500,
      isactive: 15,
      fee_manage: null,
      fee_check: null,
      interest: null,
      money_max: null,
      money_min: null,
      money_step: null,
      days: [
        {
          "id": 7,
          "value": "7天"
        },
        {
          "id": 15,
          "value": "15天"
        },
        {
          "id": 30,
          "value": "30天"
        }
      ],
      prompt: "去贷款",
      id: null,
      // screenHeight: document.documentElement.clientHeight // 屏幕高度
    }
  },
  computed: {
    ...mapState({
      Authorization: function (state) {
        return state.Authorization
      },
      mobile: function (state) {
        return state.mobile
      }
    })
  },
  beforeCreate(){
    document.addEventListener('plusready',function () {
      console.log('系统名称-----'+plus.os.name);
      console.log('系统供应商-----'+plus.os.vendor);
      console.log('系统版本信息-----'+plus.os.version);
      console.log('设备型号-----'+plus.device.model);
      console.log('生产厂商-----'+plus.device.vendor);
      console.log("Screen width: " + plus.screen.resolutionWidth + "px" )
      console.log( "Screen height: " + plus.screen.resolutionHeight + "px" )
      console.log("Screen width: " + plus.screen.resolutionWidth*plus.screen.scale + "px" )
      console.log( "Screen height: " + plus.screen.resolutionHeight*plus.screen.scale + "px" )
      console.log("Screen resolution: " + plus.screen.resolutionWidth*plus.screen.scale + " x " + plus.screen.resolutionHeight*plus.screen.scale)
      console.log( "Screen dip in X: " + plus.screen.dpiX );
      console.log("Screen dip in Y: " + plus.screen.dpiY )
    },false)
  },
  mounted() {
    console.log('登录手机号-------'+this.mobile)
  },
  methods: {
         // 选择贷款周期
//    	   ChooseDays(e){
// 	   	   var target = event.target;
// 	   	   var curId = e;
// 	       console.log(curId)
// 	       this.isactive = curId;
// 	       return curId;
//  	   },
    gainAddress(){
      let _this = this;
      //判断用户还未获取通讯录
      _this.$dialog.confirm({
        title: '是否授权获取通讯录信息',
        mes: '为了更好的为您提供借贷服务我们需要获取您的通讯录！',
        opts: [
          {
            txt: '取消',
            color: false,
            callback: () => {
              _this.$dialog.toast({
                mes: '无法借款，谢谢！',
                timeout: 1500
              });
            }
          },
          {
            txt: '授权',
            color: true,
            callback: () => {
              let _this = this;
              plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function (addressbook) {
                addressbook.find(["displayName", "phoneNumbers"], function (contacts) {
                  console.log('原始数据' + contacts);
                  var list = [];
                  for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].phoneNumbers.length > 0) {
                      var b = {};
                      var username = contacts[i].displayName;
                      var mobile = contacts[i].phoneNumbers[0].value;
                      b.username = username;
                      b.mobile = mobile;
                      list.push(b)
                    }
                  }
                  let lists = JSON.stringify(list);
                  console.log('提取出的' + lists);
                  _this.$post('/api/book', {
                    token: _this.Authorization,
                    jsonArray: lists
                  }).then(res => {
                    if (res.code == 1) {
                      console.log(res)
                    }
                  }).catch(error => {
                    console.log(error)
                  })
                }, function (e) {
                  console.log("获取失败" + e.message);
                  _this.$dialog.toast({
                    mes: '获取权限失败',
                    icon: 'error',
                    timeout: 1500
                  });
                })
              }, function (e) {
                _this.$dialog.toast({
                  mes: '获取权限失败',
                  icon: 'error',
                  timeout: 1500
                });
                console.log("获取失败" + e.message);
              });
            },
          }
        ]
      });
    },
    // 判断是否登录
    isLogin() {
     // this.$router.push('/check');
      //没有token 直接跳转登录
      if (!this.Authorization) {
        this.$dialog.alert({
          mes: '请先去登录！',
          callback: () => {
            this.$router.push('/Login')
          }
        });
      }else{
         this.$post('/api/Authentication',{
           token:this.Authorization
         }).then(res=>{
            if(res.code === 1){
              if(res.result.phonebook === 0){
                 this.gainAddress();
              }else if(res.result.idcard === 0){
                this.$dialog.toast({
                  mes: '请先进行身份验证',
                  timeout: 1500,
                  callback: () => {
                    this.$router.push('/IdCard')
                  }
              })
            }else if(res.result.livingbody === 0){
                this.$dialog.toast({
                  mes: '请先进行活体识别',
                  timeout: 1500,
                  callback: () => {
                    this.$router.push('/Face')
                  }
                })
              }else if(res.result.operator === 0){
                this.$dialog.toast({
                  mes: '请先进行运营商验证',
                  timeout: 1500,
                  callback: () => {
                    this.$router.push('/Phone')
                  }
                })
              }else if(res.result.sesame === 0){
                this.$dialog.toast({
                  mes: '请先进行芝麻分验证',
                  timeout: 1500,
                  callback: () => {
                    this.$router.push('/zhima')
                  }
                })
              }else if(res.result.bankcard === 0){
                this.$dialog.toast({
                  mes: '请先进行银行卡验证',
                  timeout: 1500,
                  callback: () => {
                    this.$router.push('/BankCard')
                  }
                })
              }else{
                this.$router.push('/check')
              }
            }else{
              this.$dialog.toast({
                mes: res.message,
                timeout: 1500,
                icon:'error'
              })
            }
         }).catch(err=>{

         })
       }


    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home{
	text-align: center;
	background: #fff;
	}


@media screen and (min-device-width:320px) and (max-device-width:568px) and (-webkit-min-device-pixel-ratio:2) {
	.headbg,
	.swiper-container {
		width: 7.5rem;
		height: 2.6rem  !important;
	}

	.bg {
		width: 7.2rem;
		height: 6.8rem !important;
		top: 0;
		background: #fff;
		margin: .01rem auto;
		border-radius: 5px;
		padding-top: .3rem;
		box-shadow: 0 0 20px rgba(0, 0, 0, .13);
		position: relative;
	}
	.period {
		height: .62rem !important;
		width: 6.7rem;
		margin: 0 auto;
		text-align: center;
		-ms-flex-pack: justify;
		justify-content: space-between
	}
	.bg1 {
		width: 6.5rem;
		height: 3.42rem;
		margin: 0 auto;
		position: relative
	}
  .bg4 {
    top:.4rem !important;
  }
}
@media screen and (min-device-width:360px) and (max-device-width:640px) and (-webkit-min-device-pixel-ratio:3) {
  .headbg,
  .swiper-container {
    width: 7.5rem;
    height: 2.7rem !important;
  }
  .bg {
    width: 7.2rem;
    height: 6.96rem !important;
    top: 0;
    background: #fff;
    margin: .01rem auto;
    border-radius: 5px;
    padding-top: .3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .13);
    position: relative;
  }
  .period {
    height: .62rem !important;
    width: 6.7rem;
    margin: 0 auto;
    text-align: center;
    -ms-flex-pack: justify;
    justify-content: space-between
  }
  .bg1 {
    width: 6.5rem;
    height: 3.32rem;
    margin: 0 auto;
    position: relative
  }
  .bg4 {
    top:.42rem;
  }
}
@media screen and (min-device-width:360px) and (max-device-width:680px) and (-webkit-min-device-pixel-ratio:3) {
  .headbg,
  .swiper-container {
    width: 7.5rem;
    height: 2.71rem  !important;
  }
  .bg {
    width: 7.2rem;
    height: 7.22rem  !important;
    top: 0;
    background: #fff;
    margin: .01rem auto;
    border-radius: 5px;
    padding-top: .3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .13);
    position: relative;
  }
  .period {
    height: .62rem !important;
    width: 6.7rem;
    margin: 0 auto;
    text-align: center;
    -ms-flex-pack: justify;
    justify-content: space-between
  }
  .bg1 {
    width: 6.5rem;
    height: 3.32rem;
    margin: 0 auto;
    position: relative
  }
  .bg4 {
    top:.42rem  !important;
  }
}
@media screen and (min-device-width:360px) and (max-device-width:720px) and (-webkit-min-device-pixel-ratio:2) {

	/*  */
	.headbg,
	.swiper-container {

		width: 7.5rem;
		height: 3.22rem  !important;
	}
	.bg {
		width: 7.2rem;
		height: 7.62rem !important;
		top: 0;
		background: #fff;
		margin: .01rem auto;
		border-radius: 5px;
		padding-top: .3rem;
		box-shadow: 0 0 20px rgba(0, 0, 0, .13);
		position: relative;
	}
	.period {
		height: .82rem !important;
		width: 6.7rem;
		margin: 0 auto;
		text-align: center;
		-ms-flex-pack: justify;
		justify-content: space-between
	}
	.bg1 {
		width: 6.5rem;
		height: 3.42rem;
		margin: 0 auto;
		position: relative
	}
  .bg4 {
    top:.62rem;
  }
}
@media screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2) {
	/* iphone6,6s,7,8 */
.headbg,.swiper-container{
	width: 7.5rem;
	height: 2.71rem !important
}
.bg {
	width: 7.2rem;
	height: 6.96rem !important;
	margin: .01rem auto;
	border-radius: 5px;
	padding-top: .3rem;
	box-shadow: 0 0 20px rgba(0, 0, 0, .13);
	position: relative;
	top: 0
}
.period {
	width: 6.7rem;
	height: .63rem !important;
	margin: 0 auto;
	text-align: center;
	-ms-flex-pack: justify;
	justify-content: space-between
}
.bg1 {
	width: 86.66%;
	height: 3.32rem;
	margin: 0 auto;
	position: relative
}
.bg4 {
	top:.4rem !important;
}
}
@media screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3) {
  /* iphoneX,Xs */
  .headbg,.swiper-container  {
    width: 7.5rem;
    height: 2.71rem;
  }
  .bg {
    width: 7.2rem;
    height: 6.96rem  !important;
    margin: .01rem auto;
    border-radius: 5px;
    padding-top: .3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .13);
    position: relative;
    top: 0
  }
  .period {
    width: 6.7rem;
    height: .62rem;
    margin: 0 auto;
    text-align: center;
    -ms-flex-pack: justify;
    justify-content: space-between
  }
  .bg1 {
    width: 86.66%;
    height: 3.32rem;
    margin: 0 auto;
    position: relative
  }
  .bg4 {
    top:.68rem !important;
  }
}
@media screen and (min-device-width:392px) and (max-device-width:737px) and (-webkit-min-device-pixel-ratio:4){
  .headbg,
  .swiper-container {

    width: 7.5rem;
    height: 3.22rem  !important;
  }
  .bg {
    width: 7.2rem;
    height: 7.62rem !important;
    top: 0;
    background: #fff;
    border-radius: 5px;
    padding-top: .3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .13);
    position: relative;
  }
  .period {
    height: .82rem !important;
    width: 6.7rem;
    margin: 0 auto;
    text-align: center;
    -ms-flex-pack: justify;
    justify-content: space-between
  }
  .bg1 {
    width: 6.5rem;
    height: 3.42rem;
    margin: 0 auto;
    position: relative
  }
  .bg4 {
    top:.82rem !important;
  }
}
@media screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3) {
  /* iphone6+,6s+,7+,8+ */
  .headbg,.swiper-container {
    width: 7.5rem;
    height: 2.71rem
  }
  .bg {
    width: 7.2rem;
    height: 6.96rem  !important;
    margin: .01rem auto;
    border-radius: 5px;
    padding-top: .3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, .13);
    position: relative;
    top: 0
  }
  .period {
    width: 6.7rem;
    height: .62rem !important;
    margin: 0 auto;
    text-align: center;
    -ms-flex-pack: justify;
    justify-content: space-between
  }
  .bg1 {
    width: 86.66%;
    height: 3.32rem;
    margin: 0 auto;
    position: relative
  }
  .bg4 {
    top:.42rem  !important;
  }

}
.bg4 {
	width: 100%;
	height: 1.2rem;
	background: #fff;
	border-top: .01rem solid rgba(0, 0, 0, .16);
	position: relative;
}

.swiper-container{
  margin: 0 auto;
  position: absolute !important;
  top: 0
}
.swiper-wrapper img{
		width: 100%;
		height: 100%;
	}
.yd-rollnotice{
  width: 92% !important;
}
.noticebar-wrap {
  margin: 0 auto;
  line-height: .88rem;
  font-size: .26rem
}
	.lspace{
		line-height: .49rem;
		font-size: .28rem;
		margin: .08rem auto .16rem;

	}
	.line{
		width: 6.49rem;
		margin: .2rem auto;
		border: 1px dashed rgba(0,0,0,.1);
	}
	.txt{
		font-size: .28rem;
		color: #bebebe;

	}
	.cost{
		font-size: .3rem !important;
		color: #333;
		margin: .18rem auto;

	}
	.relamount{
		width: 60.23%;
		height: 1.2rem;
		color: #F35C51;
		font-size: .6rem ;
		float: left;
		padding-top:.18rem;
	}
	.rmb{
		color: #666 !important;
		font-size: .28rem !important;
		margin-right: .15rem;
	}
	.btnbg{
		width: 34.3%;
		height: 1.2rem !important;
		line-height: 1.2rem;
		float: right;
		font-size: .36rem !important;
	  letter-spacing: 1px;
	}
	.cycle{
		width: 1.8rem;
		height: .7rem;
		line-height: .68rem;
		margin: .2rem auto;
		border-radius: .5rem;
		font-size: .3rem;
		border: 1px solid rgba(0,0,0,0);
		color: #DFDDDD;
	}
  .alactive{
		border: 1px solid #F3412F;
		color: #F3412F;

	}
.yd-btn-mini{
  font-size: .3rem !important;
}
</style>
