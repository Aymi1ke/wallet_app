<template>
  <div class="popups">
  	<div class="shade">
  		<div class="alert">
  			<div class="closeIcon">
        	<yd-icon  slot="icon" custom  name="close" size=".42rem"  @click.native="close()"></yd-icon>
        </div>
        <div class="imgicon">
        	<img :src="imgSrc"/>
        </div>
        <p class="medtxt title-hint">{{remind}}</p>
        <h1 v-if="isAmount">{{showAmount}}</h1>
        <p class="reltxt">{{assist}}</p> 
        	<slot v-if="isfail">
        		
        		<p class="reset" @click="close()">{{resetxt}}</p>
        
        	</slot>
        	<slot v-else>
        		<router-link to="/">
        		<div class="monibtn" v-if="ishide">{{nexttxt}}</div>
        		</router-link>
        	</slot>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Popups',
  data () {
    return {
   
    }
  },
  props:['remind','assist','imgSrc','show',"resetxt",'nexttxt','isfail','ishide','isAmount','showAmount'],
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
	padding:.5rem .5rem .38rem;
	}
.closeIcon{
	float: right;
  margin-top: -.2rem;
}
.title-hint{
	margin: .5rem 0 .2rem;
}
.reltxt{
	margin-bottom: .68rem;
}
h1{
	font-size: .6rem;
}
</style>
