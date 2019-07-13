<template>
	<div class="profile">
		<div class="per-bg">
			<router-link :to="this.Authorization? '/myInfo' : '/login'">
				<div class="cirbg">
					<img  src="../../../../static/img/touxiang.png"/>
				</div>
				<p>{{username}}</p>
				<p>{{userphone}}</p>
			</router-link>

		</div>
		<yd-cell-group class="check-group">
			<yd-cell-item arrow type="link" :href="this.Authorization? '/check' : '/login'">
				<yd-icon slot="icon" custom name="check" color="#f55631" size=".48rem"></yd-icon>
				<span slot="left" class="medtxt">审批进度</span>
				<span slot="right" class="reltxt"></span>
			</yd-cell-item>
			<yd-cell-item arrow type="link" href='/Norecord'>
				<yd-icon slot="icon" custom name="record" color="#f55631" size=".48rem"></yd-icon>
				<span slot="left" class="medtxt">贷款记录</span>
				<span slot="right" class="reltxt"></span>
			</yd-cell-item>
			<yd-cell-item arrow type="link" :href="this.Authorization? '/myBankCard':'/login'">
				<yd-icon slot="icon" custom name="bankcard" color="#f55631" size=".48rem"></yd-icon>
				<span slot="left" class="medtxt">我的银行卡</span>
				<span slot="right" class="reltxt"></span>
			</yd-cell-item>
			<yd-cell-item arrow type="link" :href="this.Authorization?'/myInfo':'/login'">
				<yd-icon slot="icon" custom name="idcard" color="#f55631" size=".48rem"></yd-icon>
				<span slot="left" class="medtxt">我的评估</span>
				<span slot="right" class="reltxt"></span>
			</yd-cell-item>
		</yd-cell-group>
		<yd-cell-group class="check-group">
			<yd-cell-item arrow type="link" href="/help">
				<yd-icon slot="icon" custom name="help" color="#f55631" size=".48rem"></yd-icon>
				<span slot="left" class="medtxt">帮助中心</span>
				<span slot="right" class="reltxt"></span>
			</yd-cell-item>
			<yd-cell-item arrow type="link" href="/about">
				<yd-icon slot="icon" custom name="about" color="#f55631" size=".48rem"></yd-icon>
				<span slot="left" class="medtxt">关于</span>
				<span slot="right" class="reltxt"></span>
			</yd-cell-item>

		</yd-cell-group>
	</div>
</template>

<script>
	import { mapState} from 'vuex'
	export default {
		name: 'Profile',
		data() {
			return {
				username: '登录', //用户名
				userphone: '暂无绑定手机号', //电话号码
				avatar:'', //头像地址
				//    imgBaseUrl,
			}
		},
        computed:{
        		...mapState({
        			Authorization: function (state){
        				return state.Authorization
        			},
              mobile: function (state) {
                return state.mobile
              }
        		})
        },
		created() {
			this.initDate();
      console.log('登录手机号----'+this.mobile);
		},
		methods: {
			initDate() {
				if(!this.Authorization) {
					this.username = "登录";
					this.userphone = "暂无绑定手机号";
				} else {
					this.$post('/api/showData',{
							token:this.Authorization
					}).then(res => {
					  if(res.code===1){
              console.log(res);
              this.username = res.result.username;
              this.userphone = this.mobile;
            }else{
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
				}

			}



		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@media screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3) {
		.per-bg{
			margin-top: 88px;
		}
	}
	@media screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3) {
		.per-bg{
			margin-top: 0;
		}
	}
	.per-bg {
		width: 100%;
		height: 2.78rem;
		background: url(../../../../static/img/per_bg.png) no-repeat;
		background-size: cover;
		padding-top: .4rem;
	}

	.per-bg p {
		text-align: left;
		color: #fff;
		font-size: .28rem;
		margin-left: 2.53rem;
	}

	.per-bg p:first-of-type {
		margin-top: .4rem;
	}

	.cirbg {
		width: 1.33rem;
		height: 1.33rem;
		border-radius: 50%;
		background: #fff;
		margin-left: .86rem;
		float: left;
	}

	.cirbg img {
		width: 98%;
		height: 98%;
		margin: 1%;
		vertical-align: middle;
	}

	.medtxt {
		margin-left: .12rem;
	}
</style>
