<template>
  <div class="online">
    <div class="online-bg">
     <yd-navbar title="线上还款" fontsize=".36rem" height=".88rem" color="#fff" border-color="rgba(0,0,0,0)" bgcolor="rgba(0,0,0,0)">
		<router-link to="/repayment" slot="left">
            <yd-navbar-back-icon  color="#fff"></yd-navbar-back-icon>
       </router-link>
       <router-link to="/notice" slot="right">
            <yd-icon name="more" color="#fff"></yd-icon>
       </router-link>
     </yd-navbar>
     <div class="on-title">
     	<h1>{{amount}}</h1>
        <p>剩余还款总额(元）</p>
     </div>
    </div>
    
    <yd-cell-group class="check-group">
        <yd-cell-item>
            <span slot="left" class="medtxt">身份证号</span>
            <yd-input slot="right" v-model="IdCard" class="plh"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left" class="medtxt">银行卡号</span>
            <yd-input slot="right" v-model="BankCard" class="plh"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left" class="medtxt">还款人</span>
            <yd-input slot="right" v-model="Name" class="plh"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff"  @click.native="RepayOn()">确认还款</yd-button>
      <popups  v-if="show" :remind="remind" :assist="assist" :imgSrc="imgSrc" @close="show=false"></popups>
  </div>
 
</template>

<script>
	import Popups from '../../common/popup/Popups'
	import {mapState} from 'vuex'
export default {
  name: 'Online',
  components:{
  	Popups
  },
  data () {
    return {
    	idCard:'',
      bankCard:'',
      amount:'',
      name:'',
      show: false, //是否显示弹窗
			isfail: false, //成功失败信息显示
			remind: '',  //提示标题
			assist: '',  //提示信息
			imgSrc: '',  //图片地址
			resetxt: '', //失败提示按钮
			nexttxt: '', //成功提示按钮
			ishide:false //是否显示成功提示按钮
    }
  },
  computed:{
  	...mapState({
  			Authorization(state){
  		return state.Authorization
    	},
    	IdCard(state){
    		return state.IdCard
    	},
    	Name(state){
    		return state.Name
    	},
		BankCard(state){
    		return state.BankCard
    	},
    	orderID(state){
    		return state.orderID
    	}
  	})
  
  },
  created(){
  	this.getRepaymoney()
  //	this.getbank()
  },
  
  methods:{
//	getbank(){
//	this.$axios({
//		method:"post",
//		url:"/user/api/authInfo",
//		data:{
//			token:this.Authorization,
//			type:"bank"
//		}
//	}).then(res=>{
//		console.log(res.data);
//		if(res.data.code===1){
//			console.log(res.data);
//			this.BankCard = res.data.data.code;
//		}
//	}).catch(error=>{
//		
//	})
//},
  	getRepaymoney(){
  		this.$axios({
  			method:"post",
  			url:'/order/api/show',
  			data:{
  				token:this.Authorization,
  				id:this.orderID,
  				more:1
  			}
  		}).then(res=>{
  			if(res.data.code===1){
  				console.log(res.data.data)
  				this.amount = res.data.data.amount
  			}
  		})
  	},
  	RepayOn(){
  		this.$axios({
  			method:"post",
  			url:"/repay/api/online",
  			headers:{'Content-Type':'application/x-www-form-urlencoded'},
  			data:{
  				token:this.Authorization,
  				id:this.orderID
  			},
  		}).then(res=>{
  			console.log(res.data.data);
			  if(res.data.code == 0){
				this.show = true;
				this.isfail = true;
				this.imgSrc = require("../../../../static/img/fail.png");
				this.remind = "还款失败";
				this.assist = "您的卡上余额不足，请充值后重试";
				this.resetxt = "重新还款";
			 }else{
				this.show = true;
				this.imgSrc = require("../../../../static/img/success.png");
				this.remind = "还款成功";
				this.assist = "您的还款信息已提交审核，稍后会在【通知】里提示。";
			   }
				}).catch(err=>{
				 console.log("接口请求失败")
				})
  		 		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.online-bg{
	width: 100%;
	height: 3.75rem;
	background: linear-gradient(47deg,#FC6970,#FD7568);
}
.on-title{
	margin: .62rem auto;
	text-align: center;
	color: #fff;
	font-size: .28rem;
	letter-spacing: .02rem;
	line-height: .98rem;
}
.on-title h1{
	font-size: .6rem;
}
.btnset{
	margin: 1.2rem auto;
}
.reltxt{
	line-height: .44rem;
}


</style>
