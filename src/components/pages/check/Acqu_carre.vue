<template>
  <div class="Acqu_carre">
    <yd-navbar title="运营商认证"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/check" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>
    <p class="texth2">{{satus}}</p>
    <div class="probar">
    	<yd-progressbar :progress="ratio"  trail-width="8"  trail-color="#5676F9" >
        <yd-countup :endnum="ratio * 100" :duration="1" suffix="%" style="font-size:.55rem"></yd-countup>
    	</yd-progressbar>
    </div>

  </div>
</template>

<script>
	import {mapState} from 'vuex'

export default {
  name: 'Acqu_carre',
  data () {
    return {
        ratio: 0,
        satus:''
    }
  },
   //过滤器
   filters:{
       toInt:function(value){
            return parseInt(value);
        }
   },
  computed:{
  	...mapState({
  		Authorization(state){
  			return state.Authorization
  		}
  	})
  },
  beforeCreate(){
    this.$dialog.loading.open('加载中');
  },
created(){
  console.log("url====="+this.$route.query.outUniqueId);
  this.$store.dispatch('changeLogin',this.$route.query.outUniqueId);
	  let timer = setInterval(()=>
		this.$post('/api/detail',{
      token:this.Authorization,
	    }).then(res=> {
        console.log(res)
        if (res.code === 0) {
          this.$dialog.loading.close();
          this.satus = res.message;
          if (this.ratio < 0.88) {
              this.ratio += 0.02;
            console.log(this.ratio)
          }
        }else if(res.code === 1){
          this.$dialog.loading.close();
          this.ratio = 1;
          clearInterval(timer);
          this.satus = res.message;
          this.$dialog.toast({
            mes: res.message,
            icon: 'success',
            timeout: 1500,
            callback:()=>{
              this.$router.push('/zhima');
            }
          });
        }
      }).catch(error=>{
      this.$dialog.loading.close();
      clearInterval(timer);
      this.$dialog.toast({
        mes:'网络错误',
        icon:'error',
        timeout: 2500,
        callback: () => {
          this.$router.push('/')
        }
      });     }),3000)
},
  methods:{


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.texth2{
	font-size: .46rem;
	color: #333;
	text-align: center;
	margin: 1.37rem 0 .63rem;
}
.probar{
	width: 4.33rem;
	height: 4.33rem;
	margin: 0 auto;
  font-size: .5rem;
}
</style>
