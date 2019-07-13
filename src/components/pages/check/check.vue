<template>
	<div class="check">
		<div class="mancl-bg">
			<img :src="bgSrc" />
			<div class="heder">
				<yd-navbar title="审批进度" height=".88rem" fontsize=".36rem" bgcolor="rgba(0,0,0,0)" color="#fff" border-color="rgba(0,0,0,0)">
					<router-link to="/" slot="left">
						<yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
					</router-link>
				</yd-navbar>
			</div>
			<p class="check-status">{{checkstatus}}</p>
		</div>
		<yd-cell-group class="check-group">
			<yd-cell-item v-for="(item,index) in lists" :arrow="item.arrow" @click.native="pushLink(index)">
				<yd-icon slot="icon" :name="item.icon" :color="item.color" size=".48rem" custom></yd-icon>
				<span slot="left" class="medtxt">{{item.title}}</span>
        <span v-show="!item.isOK"  slot="right" :class="item.auth==='未通过'?'relerr':'reltxt'">{{item.auth}}</span>
        <span v-show="item.isOK" slot="right" :class="item.auth==='认证中'?'relsuc':'relwat'">{{item.auth}}</span>
			</yd-cell-item>
		</yd-cell-group>
		<yd-button size="large" v-show="btnShow"  type="hollow" shape="circle" class="cirbtn" @click.native="goCheck()">{{promptstatus}}</yd-button>
		<checkdetail v-if="show" :imgSrc="imgSrc" :status="status" :next="next" :assist="assist"  :linkPage="linkPage" @close="show = false"  ></checkdetail>
	</div>
</template>

<script>
	import INITBG from '../../../../static/img/topbg.png'
	import SUCCESSBG from '../../../../static/img/topbg-success.png'
	import Checkdetail from '../../common/popup/checkdetail'
	import { mapState } from 'vuex'
	export default {
		name: 'Check',
		components: {
			Checkdetail
		},
		data() {
			return {
				INITBG,  //初始化背景
				SUCCESSBG, //验证通过背景
				bgSrc: INITBG,
				checkstatus: '未审核', //审核结果状态显示
				promptstatus: "去认证", //提示按钮文字
        btnShow:true, //是否显示按钮
				show: false, //是否显示弹窗
				isfail: false, //成功失败信息显示
				status: '', //状态提示结果
				assist: '', //提示信息
				imgSrc: '', //图片地址
				resetxt: '', //失败提示按钮
				next: '', //成功提示按钮
        linkPage:'',
				lists: [{
					isOK: false, //是否已认证
					isLock: false, //是否可跳转至另一页面
					arrow: false, //右边箭头
					icon: "idicon",
					color: "#FF6E6E",
					title: "身份验证",
					auth: "未认证",
					err: "请进行身份认证",
					push: "/IdCard"
				},
				{
					isOK: false,
					arrow: false,
					isLock: true,
					icon: "icon_life",
					color: "#82E6E6",
					title: "活体验证",
					auth: "未认证",
					err: "请进行活体验证",
					push: "/Face"
				},
				{
					isOK: false,
					arrow: false,
					isLock: true,
					icon: "idicon",
					color: "#ACE686",
					title: "运营商数据获取",
					auth: "未认证",
					err: "请进行运营商数据获取",
					push: "/Phone"
				},
				{
					isOK: false,
					arrow: false,
					isLock: true,
					icon: "idicon",
					color: "#11B69D",
					title: "芝麻分获取",
					auth: "未认证",
					err: "请进行芝麻分获取",
					push: "/Zhima"
				},
          {
					isOK: false,
					arrow: false,
					isLock: true,
					icon: "ibank",
					color: "#F9A777",
					title: "绑定银行卡",
					auth: "未认证",
					err: "请进行绑定银行卡",
					push: "/BankCard"
				}],

			}
		},
		computed: {
			...mapState({
				Authorization(state) {
					return state.Authorization
				}
			})
		},
    created(){
		  if(this.$route.query.outUniqueId){
        this.$store.dispatch('changeLogin',this.$route.query.outUniqueId)
      }

    },
		mounted() {

  		this.HandleAuditStatus();

    },

		methods: {
		  HandleAuditStatus(){
        this.$post('/api/Authentication',{
          token:this.Authorization
        }).then(res=> {
          console.log(res);
          if (res.code === 1) {
            if(res.result.auditstatus === 2){
              if (res.result.idcard === 1) {
                this.lists[0].auth = "已认证";
                this.lists[0].isOK = true;
                if (res.result.livingbody === 1) {
                  this.lists[1].auth = "已认证";
                  this.lists[1].isOK = true;
                }
              }
              if (res.result.operator === 1) {
                this.lists[2].auth = "已认证";
                this.lists[2].isOK = true;
              } else if (res.result.operator === 2) {
                this.lists[2].auth = "认证中";
                this.lists[2].isOK = true;
              }else if (res.result.operator === 3) {
                this.lists[2].auth = "未通过";
                this.lists[2].isOK = false;
              }
              if (res.result.sesame === 1) {
                this.lists[3].auth = "已认证";
                this.lists[3].isOK = true;
              }else if (res.result.sesame === 2) {
                this.lists[3].auth = "认证中";
                this.lists[3].isOK = true;
              }else if (res.result.sesame === 3) {
                this.lists[3].auth = "未通过";
                this.lists[3].isOK = false;
              }
              if (res.result.bankcard === 1) {
                this.lists[4].auth = "已认证";
                this.lists[4].isOK = true;
              }
            }else if(res.result.auditstatus === 1){
              if (res.result.idcard === 1) {
                this.lists[0].auth = "已认证";
                this.lists[0].isOK = true;
                if (res.result.livingbody === 1) {
                  this.lists[1].auth = "已认证";
                  this.lists[1].isOK = true;
                  if (res.result.operator === 1) {
                    this.lists[2].auth = "已认证";
                    this.lists[2].isOK = true;
                    if (res.result.sesame === 1) {
                      this.lists[3].auth = "已认证";
                      this.lists[3].isOK = true;
                      if (res.result.bankcard === 1) {
                        this.lists[4].auth = "已认证";
                        this.lists[4].isOK = true;
                        this.btnShow = false;
                        this.checkstatus = '审核中';
                        this.show = true;
                        this.status = "审核中";
                        this.assist = "您的资料已提交审核请到系统通过后再来借款";
                        this.next = "知道啦";
                        this.imgSrc = require("../../../../static/img/check-wait.png");
                      }
                    }
                  }
                }
              }

            }else if(res.result.auditstatus === 3){
              if (res.result.idcard === 1) {
                this.lists[0].auth = "已认证";
                this.lists[0].isOK = true;
                if (res.result.livingbody === 1) {
                  this.lists[1].auth = "已认证";
                  this.lists[1].isOK = true;
                  if (res.result.operator === 1) {
                    this.lists[2].auth = "已认证";
                    this.lists[2].isOK = true;
                    if (res.result.sesame === 1) {
                      this.lists[3].auth = "已认证";
                      this.lists[3].isOK = true;
                      if (res.result.bankcard === 1) {
                        this.lists[4].auth = "已认证";
                        this.lists[4].isOK = true;
                        this.checkstatus = '已拒绝';
                        this.imgSrc = require("../../../../static/img/check-fail.png");
                        this.btnShow = false;
                        this.show = true;
                        this.status = "审核失败";
                        this.assist = "您的个人信息有误 请重新提交";
                        this.next = "去审核";
                      }
                    }
                  }
                }
              }

            }else if(res.result.auditstatus === 0){
              if (res.result.idcard === 1) {
                this.lists[0].auth = "已认证";
                this.lists[0].isOK = true;
                if (res.result.livingbody === 1) {
                  this.lists[1].auth = "已认证";
                  this.lists[1].isOK = true;
                  if (res.result.operator === 1) {
                    this.lists[2].auth = "已认证";
                    this.lists[2].isOK = true;
                    if (res.result.sesame === 1) {
                      this.lists[3].auth = "已认证";
                      this.lists[3].isOK = true;
                      if (res.result.bankcard === 1) {
                        this.lists[4].auth = "已认证";
                        this.lists[4].isOK = true;
                        this.bgSrc = SUCCESSBG;
                        this.imgSrc = require("../../../../static/img/check-success.png");
                        this.btnShow = false;
                        this.checkstatus = "已通过";
                        this.show = true;
                        this.status = "审核成功";
                        this.assist = "您的审核已通过 等待放款中";
                        this.next = "待放款";
                        this.linkPage = "/";
                      }
                    }
                  }
                }
              }

            }else if(res.result.auditstatus === 4){
              if (res.result.idcard === 1) {
                this.lists[0].auth = "已认证";
                this.lists[0].isOK = true;
                if (res.result.livingbody === 1) {
                  this.lists[1].auth = "已认证";
                  this.lists[1].isOK = true;
                  if (res.result.operator === 1) {
                    this.lists[2].auth = "已认证";
                    this.lists[2].isOK = true;
                    if (res.result.sesame === 1) {
                      this.lists[3].auth = "已认证";
                      this.lists[3].isOK = true;
                      if (res.result.bankcard === 1) {
                        this.lists[4].auth = "已认证";
                        this.lists[4].isOK = true;
                        this.btnShow = false;
                        this.checkstatus = '审核中';
                        this.show = true;
                        this.status = "审核中";
                        this.assist = "您的资料已提交审核请到系统通过后再来借款";
                        this.next = "知道啦";
                        this.imgSrc = require("../../../../static/img/check-wait.png");
                      }
                    }
                  }
                }
              }
            }

          } else {
            this.$dialog.toast({
              mes: res.message,
              timeout: 1500,
              icon: 'error'
            });
          }
        }).catch(error=>{

        })
      },
			pushLink(index) {
        if(this.lists[index].isOK==true){
          return false;
        }
        let flag = false;
        if(this.lists[index].isLock === true){
          for(let i = 0; i <index; i++) {
            if(this.lists[i].isOK === false) {
              this.$dialog.toast({
                mes: this.lists[i].err,
                timeout: 1500,
                icon: 'error',
              });
              flag = true;
              break;
            }
          }
          if( flag === false){
            this.$router.push(this.lists[index].push)
          }
        }else{
          this.$router.push(this.lists[index].push)
        }
			},

			goCheck() {
				if(this.lists[0].isOK === false) this.$dialog.toast({
					mes: this.lists[0].err,
					timeout: 1500,
					icon: 'error'
				})
				else if(this.lists[1].isOK === false) this.$dialog.toast({
					mes: this.lists[1].err,
					timeout: 1500,
					icon: 'error'
				})
				else if(this.lists[1].isOK === false) this.$dialog.toast({
					mes: this.lists[1].err,
					timeout: 1500,
					icon: 'error'
				})
				else if(this.lists[2].isOK === false) this.$dialog.toast({
					mes: this.lists[2].err,
					timeout: 1500,
					icon: 'error'
				})
				else if(this.lists[3].isOK === false) this.$dialog.toast({
					mes: this.lists[3].err,
					timeout: 1500,
					icon: 'error'
				})
        else{
          this.$router.push('/')
        }

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mancl-bg {
		width: 100%;
		height: 3.8rem;
	}

	.mancl-bg img {
		width: 100%;
		height: 100%;
	}

	.heder {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.check-status {
		font-size: .32rem;
		color: #fff;
		position: absolute;
		top: 2.17rem;
		left: 50%;
		margin: 0 0 0 -.48rem;
	}

	.check-group {
		margin-top: .2rem;
	}

	.medtxt {
		margin-left: .12rem;
	}

	.cirbtn {
		width: 3.4rem;
		height: .86rem;
		margin: 1.2rem auto;
		border-color: #F35C51;
		color: #F35C51;
	}
   .reltxt{
     color: #999 !important;
     font-size: .28rem !important;
   }
	.relsuc {
		color: #FEB635 !important;
		font-size: .28rem !important;
	}
  .relwat{
    color:#5ACB72  !important;
    font-size: .28rem !important;
  }
  .relerr{
    color:  #EB5050 !important;
    font-size: .28rem !important;
  }
</style>
