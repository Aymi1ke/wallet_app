<template>
  <div class="Loan">
    <yd-navbar title="放款金额"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
      	<router-link to="/" slot="left">
          <yd-navbar-back-icon  color="#000"></yd-navbar-back-icon>
       </router-link>
     </yd-navbar>
     <div class="loanbg">
     	<div class="mancl-loan">
     		<p class="loan-amount">放款额度</p>
	     	<h1>{{approve}}</h1> 
	     	<p class="hitcon">您的信贷分数不够100分 只能部分放款哦！多待多还可以提升您的分数</p>
     	</div>
     	
     	  <yd-cell-group class="loan-group">
            <yd-cell-item>
                <span slot="left" class="medtxt">申请放款</span>
                <span slot="right" class="reltxt">{{money}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="medtxt">实际放款</span>
                <span slot="right" class="reltxt">{{amount}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="medtxt">借款时间</span>
                <span slot="right" class="reltxt">{{time}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="medtxt">借款周期</span>
                <span slot="right" class="reltxt">{{days}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="medtxt">收取费用</span>
                <span slot="right" class="reltxt">{{fee}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="medtxt">实际到账</span>
                <span slot="right" class="reltxt">{{amount}}</span>
            </yd-cell-item>
        </yd-cell-group>
     </div>
     <yd-button size="large" class="btnset" bgcolor="#f35c51" color="#fff" @click.native="confirm()">确认借款</yd-button>
         <popups  v-if="show" :remind="remind" :assist="assist" :imgSrc="imgSrc"  :isAmount="isAmount" :showAmount="showAmount" @close="isclose()"></popups>
  </div>
</template>

<script>
	import Popups from '../../common/popup/Popups'
	import {mapState,mapActions} from 'vuex'
export default {
  name: 'Loan',
  components:{
  	Popups
  },
  data () {
    return {
       money:"", //申请金额
       approve:"", //审批金额
       time:"", //申请时间
       days:null, //贷款周期
       fee:null, //收取费用
       amount:"",//实际到账金额
       show: false, //是否显示弹窗
	   isfail: false, //成功失败信息显示
		remind: '',  //提示标题
		assist: '',  //提示信息
		imgSrc: '',  //图片地址
		resetxt: '', //失败提示按钮
	    nexttxt: '', //成功提示按钮
		ishide:false,//是否显示成功提示按钮
		isAmount:false, //是否显示放款金额
		showAmount:"" //放款金额
    }
  },
  computed:{
  	...mapState({
  		Authorization(state){
  			return state.Authorization
  		},
  		orderID(state){
  			if(state.orderID==null){
  				this.$store.dispatch('saveOrder')
  			}
  			return state.orderID
  		}
  	})
  },
  created(){
  	this.$axios({
  		method:"post",
  		url:"/order/api/show",
  		headers:{'Content-Type':'application/x-www-form-urlencoded'},
  		data:{
  		  token:this.Authorization,
  		  id:this.orderID,
  		  more:0
  		}
  	}).then(res=>{
  		console.log(res.data);
  		this.amount = res.data.data.amount;
  		this.approve = res.data.data.approve;
  		this.money = res.data.data.money;
  		this.time = res.data.data.time;
  		this.fee = res.data.data.fee;
  		this.days = res.data.data.days;
  	}).catch(err=>{
  		console.log(err)
  	})
  },
  methods:{
  	...mapActions(['setIsLoan']),
  	confirm(){
  		this.$axios({
  			method:"post",
  			url:"/order/api/confirm",
  			headers:{'Content-Type':'application/x-www-form-urlencoded'},
  			data:{
  			token:this.Authorization,
  		    id:this.orderID
  			}
  		}).then(res=>{
  			console.log(res.data);
  			this.show = true;
  			this.imgSrc = require("../../../../static/img/success.png");
  			this.remind ="放款中";
  			this.isAmount = true;
  			this.showAmount = this.approve;
  			this.assist = "您的信用分数不足哦，我们给你部分贷款，经常完成贷款可以提升额度哦"
  		}).catch(err=>{
  			console.log(err);
  		})
  	},
  	isclose(){
  		this.show = false;
  		this.$router.push("/")
  		this.$store.dispatch('setIsLoan')
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loanbg{
	width: 100%;
	height: 10.95rem;
	margin-top: -.42rem;
	background: url(../../../../static/img/loan_bg.png)  50% no-repeat;
	background-size:cover ;
}
.mancl-loan{
	color: #fff;
	text-align: center;
}
.loan-amount{
	font-size: .32rem;
	padding: 1.17rem 0 0;
}
h1{
	font-size: .6rem;
	font-weight: normal;
	margin: .27rem 0;
}
.hitcon{
	font-size: .24rem;
	color: #f5f5f5;
	line-height: .36rem;
	margin: .49rem 1.53rem;
}
.loan-group{
	width: 86.66%;
	margin: 0 auto;
}
.btnset{
	margin: .12rem auto .53rem;
} 
.reltxt{
	margin-right: .65rem;
}
</style>
