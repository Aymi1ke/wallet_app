<template>
  <div class="popup">
  	<div class="shade">
  		<div class="alert">
  			<div class="closeIcon">
        	<yd-icon  slot="icon" custom  name="close" size=".42rem"  @click.native="close()"></yd-icon>
        </div>
        <div class="imgicon">
        	<img :src="imgSrc"/>
        </div>
        <p class="medtxt title-hint">{{remind}}</p>
        <p class="reltxt">{{assist}}</p> 
        	<slot v-if="isfail">
        		
        		<p class="reset" @click="close()">{{resetxt}}</p>
        
        	</slot>
        	<slot v-else>
        		<router-link :to="pushPage">
        		  <div class="monibtn">{{nexttxt}}</div>
        		</router-link>
        	</slot>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data () {
    return {
   
    }
  },
  props:['remind','assist','imgSrc','show',"resetxt",'nexttxt','isfail','pushPage'],
  methods:{
  	close(){
  	  this.$emit('close');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shade{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index:99;
}
.alert{
width: 85%;
background: #fff;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
border-radius: .24rem;
text-align: center;
padding:.5rem .5rem .58rem;
}
.closeIcon{
	float: right;
  margin-top: -.2rem;
}
.imgicon{
	width: 3.08rem;
	height: 2.79rem;
}
.title-hint{
	margin: .5rem 0 .2rem;
}
.reltxt{
	margin-bottom: .68rem;
}
</style>
