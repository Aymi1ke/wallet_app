<template>
  <div class="notice">
		<yd-navbar title="消息中心" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
			   	<router-link to="/" slot="left">
	            <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
	  </yd-navbar>
	    
		<div class="bginfo" v-for="item in infoarr">
			<p class="title medtxt"><span class="read" v-show="isread"></span>{{item.title}}<span class="date">{{item.time}}</span></p>
			<p class="contents">{{item.content}}</p>
		</div>	
  </div>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  name: 'Notice',
  data () {
    return {
      infoarr:[],
      isread:true
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
   	this.$axios({
   		method:"post",
   		url:"/msg/api/lists",
   		headers:{'Content-Type':'application/x-www-form-urlencoded'},
   		data:{
   			token:this.Authorization
   		}
   	}).then(res=>{
   		if(res.data.code===1){
   			this.infoarr = res.data.data;
   		}
   		console.log(this.isID);
   	}).catch(error=>{
   		
   	})
   },
next(){
 	this.isread = false
// 	this.$axios({
// 		method:"post",
// 		url:"/msg/api/read",
// 		data:{
// 			token:this.Authorization,
// 			id:this.isID
// 		}
// 	}).then(res=>{
// 		if(res.data.code===1){
// 		
// 		}
// 		console.log(res.data);
// 	}).catch(error=>{
// 		
// 	})
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notice{
		background: #f7f7f7;
		text-align: left;
	}
.bginfo{
	width: 100%;
	height: 2.25rem;
	background: #fff;
	margin-top: .2rem;
}
.title{
	padding: .3rem .35rem 0;
}
.contents{
	font-size: .28rem;
	color: #999;
	padding: .26rem .20rem;

}
.read:before{
	content: '●';
	color: #EB5050;
	font-size: .12rem;
	vertical-align: middle;
	margin-right: .12rem;
}
</style>
