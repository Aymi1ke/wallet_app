<template>
  <div class="repayment">
       <yd-navbar title="还款日期" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
		<router-link to="/" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
       <router-link to="/notice" slot="right">
            <yd-icon  name="message" size="30px" color="#777" custom></yd-icon>
       </router-link>
     </yd-navbar>
     <div class="repay-bg">
     	<div class="gray-bg">
     		<img src="../../../../static/img/cir.png"/>
     		<div class="txt-bg">
     		<p>剩余还款日（天）</p>
     		<h1>{{days}}</h1>
     	</div>
     	</div>
     	
     </div>
     
     <div class="box-bg">

     	<div class="border-box">
     	 <div class="colork"></div>
     	 <span class="reltxt">到期还款日期</span>
     	 <span class="date">{{expiretime}}</span>
	     </div>
	     <div class="border-box">
	     <div class="colork green"></div>
	     <span class="reltxt">到期应还款</span>
     	 <span class="date">{{repay_money}}</span>
	     </div>
     </div>
     <router-link to="/Online">
     	<yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" >线上还款</yd-button>
     </router-link>
      <router-link to="/Offline">
      	<yd-button size="large" class="btnset" type="hollow" color="#F35C51" style="border: .01rem solid #F35C51;">线下还款</yd-button>
      </router-link>
    
  </div>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  name: 'Repayment',
  data () {
    return {
     expiretime:'',
     repay_money:'',
     days:''
    }
  },
  computed:{
  	...mapState({
  		Authorization(state){
  			return state.Authorization
  		},
  		orderID(state){
  			return state.orderID
  		}
  	})
  },
  created(){
  	this.initOrder()
  },
  methods:{
  	initOrder(){
  	this.$axios({
  		method:"post",
  		url:"/order/api/show",
  		headers:{'Content-Type':'application/x-www-form-urlencoded'},
  		data:{
  			token:this.Authorization,
  		  id:this.orderID,
  		  more:1
  		}
  	}).then(res=>{
  		if(res.data.code===1){
  			console.log(res.data);
  		this.expiretime = res.data.data.expiretime;
  		this.repay_money = res.data.data.repay_money;
  		this.days = res.data.data.days;
  		}
  		
  		
  	}).catch(err=>{
  		console.log(err)
  	})
  }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.repay-bg{
	width: 94.67%;
	height: 5.01rem;
	margin: .2rem auto;
	padding: .21rem;
	box-shadow: 0 0 20px rgba(0,0,0,0.13);
}
.gray-bg{
	width: 4.5rem;
	height: 4.5rem;
	margin: 0 auto;
	position: relative;
	background: url(../../../../static/img/graycir.png) no-repeat;
	background-size: cover;
}
.gray-bg img{
	width: 5.97rem;height: 5.85rem;
	position: absolute;
	top: -.43rem;
	left: -.57rem;
}
.txt-bg{
	position: absolute;
	top: 1.35rem;
	left: 1.19rem;
	color: #999;
	font-size: .26rem;
}
.txt-bg h1{
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
}
.box-bg{
	width: 6.64rem;
	margin: .7rem auto;
}
.border-box{
	width: 6.64rem;
	height: 1rem;
	line-height: 1rem;
	margin: 0 auto .24rem;
}
.colork{
	width: .13rem;
	height: .6rem;
	background: #F3C059;
	margin: .2rem .4rem .2rem 0;
	float: left;
}
.green{
	background: #B1E68D;
}
.date{
	margin-right: .35rem;
}
.btnset{
	margin: .4rem auto;
}
</style>
