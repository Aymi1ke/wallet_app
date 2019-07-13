<template>
  <div class="orderdetail">
   <yd-navbar title="贷款详情">
        <router-link to="/record" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
   </yd-navbar>
   <div class="bg6">
   	 <div class="tanbox">
   	 	<img src="../../../../static/img/tan.png"  v-show="overdue"/>
   	 	<img src="../../../../static/img/noover.png" v-show="!overdue"/>
   	 </div>
   	 <p class="yuqi">{{state}}</p>
   	 <p class="mint">{{repay_status}}</p>
   </div>
   <yd-flexbox class="pro-box">
        <yd-flexbox-item class="pro">
        	<ProgressBar :progress="progress11" :fillColor="fillColor" :strokeWidth="strokeWidth" :trailColor="trailColor1" :strokeColor='strokeColor' >{{progress1}}</ProgressBar>
        	<p class="stxt" v-show="!overdue">剩余天数</p>
        	<p class="stxt" v-show="overdue">逾期天数</p>
        </yd-flexbox-item>
        <yd-flexbox-item class="pro">
        	<ProgressBar :progress="progress12" :fillColor="fillColor" :trailColor="trailColor2" :strokeColor="strokeColor">{{progress2}}</ProgressBar>
        	<p class="stxt" >剩余需还</p>
        </yd-flexbox-item>
   </yd-flexbox>
    <yd-cell-group v-show="overdue">
        <yd-cell-item>
            <span slot="left" class="overtxt">逾期未还金额</span>
            <span slot="right">{{expire_money}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="overtxt">逾期应还金额</span>
            <span slot="right">{{expire_repay_money}}</span>
        </yd-cell-item>
    </yd-cell-group>
     <yd-cell-group>
     	<yd-cell-item>
            <span slot="left">贷款时间</span>
            <span slot="right">{{loantime}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">放款金额</span>
            <span slot="right">{{amount}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">应还时间</span>
            <span slot="right">{{expiretime}}</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">应还金额</span>
            <span slot="right">{{repay_money}}</span>
        </yd-cell-item>
     </yd-cell-group>
     <router-link to="/repayment">
     	 <div class="gray-btn">去还款</div>
     </router-link>
     
  </div>
</template>

<script>
import ProgressBar from '@/components/common/ProgressBar'
import {mapState} from 'vuex'
 export default {
  name: 'Orderdetail',
  components:{
  	ProgressBar,
  },
  data () {
    return {
    	progress1:'',
		progress11:'0.4',
    	progress2:'',
		progress12:'0.6',
    	fillColor:'#fff',
    	trailColor1:'#F46772',
    	trailColor2:'',
    	strokeColor:'',
    	strokeWidth:'',
    	trailWidth:'',
      overdue:false,
      amount:'',
      state:'',
      repay_status:'',
      expire_money:'',
      expire_repay_money:'',
      loantime:'',
      expiretime:'',
      repay_money:''
    }
  },
  computed:{
  	...mapState({
  		Authorization(state){
  		return state.Authorization
    }
  	})
  	
  },
 created(){
 	 var pageID = this.$route.query.id;
  	this.$axios({
  		method:"post",
  		url:"/order/api/show",
  		headers:{'Content-Type':'application/x-www-form-urlencoded'},
  		data:{
  			token:this.Authorization,
  			id:pageID,
  			more:1
  		}
  	}).then(res=>{
  		if(res.data.code === 1){
  			console.log(res.data);
  			this.state = res.data.data.state;
  			this.repay_status =res.data.data.repay_status;
  			this.loantime = res.data.data.loantime;
  			this.expiretime = res.data.data.expiretime;
  			this.expire_money = res.data.data.expire_money;
  			this.repay_money = res.data.data.repay_money;
  			this.amount = res.data.data.amount
  			this.expire_repay_money = res.data.data.expire_repay_money
  			if(res.data.data.state === "逾期"){
  				this.overdue = true;
  				this.progress1 = res.data.data.expire_days+'天';
  				this.progress2 = res.data.data.repay_money+'元';
  				this.trailColor1 = '#F46772';
  				this.strokeWidth = "4";
  			}
  		}
  		
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bg6{
		width: 100%;
		height: 4.52rem;
		background: url(../../../../static/img/bg.png) 50% no-repeat;
		background-size: cover;
		margin-top: -.25rem;
	}
.pro-box{
	width: 100%;
  height: 3.11rem;
}
.pro{
	width: 1.2rem;
	padding: 0 8%;
	text-align: center;
}
.gray-btn{
	width: 3.38rem;
	height: .84rem;
	line-height: .84rem;
	text-align: center;
	border-radius: .5rem;
	margin: 1.2rem auto 1.9rem;
	font-size: .4rem;
	border: 1px solid #999;
}
.tanbox{
	width: 2.23rem;
	height: 1.69rem;
	margin: 0 auto;
}
.tanbox img{
	width: 100%;
	height: 100%;
	margin: .74rem auto;
}
.yuqi{
	font-size: .36rem;
	line-height: .3rem;
	color: #ff485d;
	font-weight: bold;
	text-align: center;
	margin: 1.2rem 0 .4rem;
}
.mint{
	color: #c0c0c0;
	font-size: .28rem;
	line-height: .3rem;
	text-align: center;
}
.overtxt{
	font-size: .28rem;
	line-height: .4rem;
	color: #F46772;
}
.stxt{
	font-size: .28rem;
	line-height: .30rem;
	color: #535353;
	margin: .15rem 0 .3rem;
}
</style>
