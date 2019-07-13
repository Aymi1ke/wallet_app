<template>
  <div class="tabbar" >
       <ul class="footbar">
            <li v-for="(val,index) in tabbar"  :class="[val.cls,{on:index===idx}]"  @click="selectTab(index)" >
            		<img :src="index===idx? val.newsrc : val.oldsrc"/>
						    <p :class="[val.cls,{on:index===idx}]">{{val.title}}</p>
            </li>
        </ul>
  </div>
</template>
<script>
	import HomeDefault from '../../../static/img/bar_home_default.png'
	import HomeChoice from '../../../static/img/bar_home_choice.png'
	import MarketDefault from '../../../static/img/bar_Supermarket_default.png'
	import MarketChoice from '../../../static/img/bar_Supermarket_choice.png'
	import PeopleDefault from '../../../static/img/bar_people_default.png'
	import PeopleChoice from '../../../static/img/bar_people_choice.png'
export default {
  name: 'tabbar',
  data () {
    return {
      idx:0,
      tabbar:[
      {
        cls:'home',
      	title:"我要贷款",
      	oldsrc:HomeDefault,
      	newsrc:HomeChoice,
        push:'/'
      },
      {
        cls:'market',
      	title:"贷款超市",
      	oldsrc:MarketDefault,
      	newsrc:MarketChoice,
        push:'/Market'
      },
      {
        cls:'profile',
      	title:"个人中心",
      	oldsrc:PeopleDefault,
      	newsrc:PeopleChoice,
        push:'/profile'
      } ]
    }
  },
 mounted(){
   this.idx = sessionStorage.getItem('isSelect');
 },
 methods:{
   selectTab(e){
	   this.idx = e;
	   console.log(this.idx)
	   this.$router.push(this.tabbar[this.idx].push);
     sessionStorage.setItem('isSelect', this.idx);
   },
},
  watch:{

  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@media screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3) {
	 .footbar{
			bottom:0 !important;
		}
	}
	.tabbar{
		width:100%;
	}
.footbar{
	width: 100%;
	height: 1rem;
	margin: 0 auto;
	background-color:#fff;
	position: fixed;
	bottom: 0;
	padding: .06rem 0;
	z-index: 100;
	font-size: .22rem;
	text-align: center;
	color: #C0C0C0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.footbar li{
	width: 33.33%;
}
 img{
 	width: .42rem;
 	height: .42rem;
 	margin: .05rem auto;
 }
.on{
	color: #f55631;
}
</style>
