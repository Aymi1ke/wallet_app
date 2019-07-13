<template>
  <div class="help">
    <yd-navbar title="帮助中心" height=".88rem"  fontsize=".36rem" border-color="rgba(0,0,0,0)">
	   	<router-link to="/" slot="left">
           <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
     <yd-tab bg-color="#F7f7f7" color='#000' active-color= '#F1C964' >
        <yd-tab-panel label="借款问题">
	        <yd-cell-group >
		        <yd-cell-item  v-for='(item,index) of items' v-if='index<9'  @click.native="$router.push('/Helpdetail/'+index)">
		            <span slot="left" >{{item.topic}}</span>
		        </yd-cell-item>
	        </yd-cell-group>
        </yd-tab-panel>
        
        
        <yd-tab-panel label="还款问题">
        	 <yd-cell-group>
		        <yd-cell-item  v-for='(item,index) of items'  v-if='index>8 && index<17' @click.native="$router.push('/Helpdetail/'+index)">
		            <span slot="left" >{{item.topic}}</span>
		        </yd-cell-item>
	        </yd-cell-group>
        	
        	
        </yd-tab-panel>
        <yd-tab-panel label="其他问题">
        	 <yd-cell-group> 
		        <yd-cell-item  v-for='(item,index) of items' v-if='index>16'  @click.native="$router.push('/Helpdetail/'+index)">
		            <span slot="left" >{{item.topic}}</span>
		        </yd-cell-item>
	        </yd-cell-group>
        </yd-tab-panel>
      </yd-tab>
    
  </div>
</template>

<script>
	import helpDatas from '../../../../static/helpdetail.json'
	
	
export default {
  name: 'Help',
  data () {
    return {
        items:helpDatas
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
