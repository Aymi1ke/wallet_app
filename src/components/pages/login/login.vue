<template>
	<div class="login">
		<yd-navbar title="登录" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
			<router-link to="/" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>

		<div class="logo-wrap">
			<img src="../../../../static/img/logo.png" />
			<p class="medtxt">小花口袋</p>
		</div>

		<yd-cell-group class="login-form">
			<yd-cell-item>
				<yd-input slot="right" regex="mobile" v-model="mobile" max="20" placeholder="请输入手机号码"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<yd-input slot="right"  v-model="code" placeholder="请输入验证码"></yd-input>
        <yd-sendcode slot="right"
                     v-model="start"
                     class="send-code"
                     @click.native="sendCode"
                     init-str="发送验证码"
                     bgcolor="#fff"
                     color="#F7533E">
        </yd-sendcode>
      </yd-cell-item>
		</yd-cell-group>

		<yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native="Login()">登录</yd-button>
		<div class="dibg"></div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
        start: false,
        mobile: '',
        code: '',
      }
		},
		computed:{

		},
		methods: {
      //手机验证码接口
			sendCode() {
			  if(this.mobile.length>0 && this.mobile.trim().length != 0){
          this.$dialog.loading.open('发送中...');
          this.$post('/api/getCode',{
            phone:this.mobile,
            type:'login'
          }).then(res=>{
            if(res.code == 1){
              console.log(res.message);
              this.start = true;
              this.$dialog.loading.close();
              this.$dialog.toast({
                mes: '已发送',
                icon: 'success',
                timeout: 1500
              });
            }else{
              this.$dialog.loading.close();
              this.$dialog.toast({
                mes: res.message,
                 icon: 'error',
                timeout: 1500,
              });
            }
          }).catch(error=>{

          })
        }else{
          this.$dialog.toast({
            mes: '请输入正确手机号',
            timeout: 1500,
          });
        }

            },
      //登录接口
			Login() {
				let _this = this;
				if(_this.mobile === '' || _this.code === '') {
					_this.$dialog.toast({
                    mes: '手机或验证码不能为空',
                    timeout: 1500,
                    icon: 'error',
                  });
				}else{
          plus.geolocation.getCurrentPosition(function (p) {
            console.log('lat---'+p.coords.latitude)
            console.log('lng---'+p.coords.longitude)
            let lats = p.coords.latitude;
            let lngs = p.coords.longitude;
            _this.$post('/api/LoginInfo',{
                phone:_this.mobile,
                code:_this.code,
                lat:lats,
                lng:lngs
              }
            ).then(res=> {
              console.log(res)
              if(res.code === 1){
                console.log(res)
                // 将用户token保存到vuex中
                _this.$store.dispatch('changeLogin',res.result.token);
                _this.$store.dispatch('setUserMobile',res.result.phone);
                _this.$dialog.toast({
                  mes:	'登录成功',
                  icon:	'success',
                  timeout:	1500,
                  callback: () => {
                    _this.$router.push('/');
                  }
                });
              }else{
                _this.$dialog.toast({
                  mes:'账号或验证码错误',
                  icon:'error',
                  timeout: 1500,
                });
              }
            }).catch(error => {
              console.log(error);
              _this.$dialog.toast({
                mes:'获取位置信息失败,请开启手机定位',
                icon:'error',
                timeout: 1500,
              });
            });
          },function (e) {
            console.log(e.message);
            _this.$dialog.toast({
              mes:'获取位置信息失败,请开启手机定位',
              icon:'error',
              timeout: 1500,
            });
          })

				}
			 }
		}
	}





</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    height: 100vh;
    background: #fff;
  }
  .yd-cell-item{
      width: 7.12rem !important;
      height: 1.2rem !important;
      min-height: 1.2rem !important;
  }
  .logo-wrap {
		width: 1.54rem;
		height: 1.54rem;
		margin: .55rem auto;
		text-align: center;
	}

	.logo-wrap img {
		width: 100%;
		height: 100%;
	}

	.login-form {
		margin: 1.5rem auto;
	}

  .yd-cell-item:after {
    margin-left: .24rem;
    height: 1px;
    position: absolute;
    z-index:0;
    bottom:0;
    left: 0;
    content: "";
    width: 100%;
    background-image: linear-gradient(0deg, #ececec 50%, transparent 0);
  }
	.send-code {
		font-size: .32rem;
		color: #F7533E;
	}

	.btnset {
		margin: 1.2rem auto;
	}

	.dibg {
		width: 100%;
		height: 1.06rem;
		background: url(../../../../static/img/login_bg.png) no-repeat;
		background-size: cover;
		position: fixed;
		bottom: 0;
	}

	@media screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3) {
		 /*iphoneX,Xs */
		/*.dibg{
			position: fixed;
			bottom:34px;
		}
		.yd-navbar{
			margin-top: 88px;
		}*/
	}
</style>
