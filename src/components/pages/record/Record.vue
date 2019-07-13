<template>
  <div class="record">
     <yd-navbar title="贷款记录">
        <router-link to="/profile" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <div class="record-mancl" v-for="(val,index) in record">
    	<yd-cell-item>
    		   <yd-icon slot="icon" name="success" size=".42rem" custom color="#5ACB72"></yd-icon>
                <span slot="left">{{val.state_name}}</span>
                <span slot="right" class="date">{{val.time}}</span>
        </yd-cell-item>
         <yd-cell-item arrow  type="link" :href="{path:'/orderdetail',query:{id:val.id}}">
            <span slot="left" class="amounted">{{val.money}}</span>
           <!-- <span slot="left"><yd-badge type="danger" scale="1.1">已逾期</yd-badge> </span>-->
            <span slot="right">{{val.repay_name}}{{val.id}}</span>
        </yd-cell-item>
    </div>
    
  </div>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  name: 'Record',
  data () {
    return {
    	record:[]
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
  	this.getRecord();
  },
  methods:{
  	getRecord(){
  		this.$axios({
  		method:"post",
  		url:"/order/api/lists",
  		headers:{'Content-Type':'application/x-www-form-urlencoded'},
  		data:{
  			token:this.Authorization
  		}
  	}).then(res=>{
  		if(res.data.code===1){
  			console.log(res.data.data);
  			this.record = res.data.data ; 
  		}
  	})
  		}
  	
  		
  	}
  }
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.record-mancl{
	width: 7.23rem;
	height: 1.89rem;
	margin: .15rem auto .23rem;
	border: .01rem solid #dfdfdf;
	background: #fff;
}
.amounted{
	font-size: .46rem;
	line-height: .87rem;
	color: #333;
	margin-left: .27rem;
	margin-right: .45rem;
}
</style>
