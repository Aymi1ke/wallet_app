<template>
  <div class="Checkdetail">
   <div class="shade">
  		<div class="alert">
  			<div class="imgicon">
        	 <img :src="imgSrc"/>
	  			 <div class="closeIcon">
	        	 <yd-icon  slot="icon" custom  name="close" size=".42rem"  color="#fff" @click.native="close()"></yd-icon>
	         </div>
	         <div class="remind">
	        	  <p class="medtxt title-hint">{{status}}</p>
	            <p class="reltxt">{{assist}}</p> 
	            <router-link :to="linkPage">
	            	 <div class="monibtn" @click = "close()">{{next}}</div>
	            </router-link>
           </div>  
        </div> 
         
       
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Checkdetail',
  data () {
    return {
    	
    }
  },
  mounted(){

  },
  props:["imgSrc","status","assist","next","linkPage"],
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

	background: rgba(0,0,0,0.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
}
.alert{
	width: 76%;
  padding-bottom: .3rem;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	border-radius: .24rem;
	text-align: center;
}
.closeIcon{
	float: right;
  margin-top: -.2rem;
  position: absolute;
  top: .4rem;
  right: .2rem;
}
.imgicon{
	width: 100%;
	height: 100%;	
}
.title-hint{
	margin: .5rem 0 .2rem;
}
.reltxt{
  margin: .1rem .5rem .3rem;
}
.remind{
	width: 100%;
	position: absolute;
	top: 3.2rem;
	left: 50%;
	transform: translate(-50%);

}
</style>
