<template>
  <div class="callser">
    <yd-navbar title="联系客服"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/about" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>
    <yd-cell-group class="check-group">
        <yd-cell-item>
            <span slot="left" class="medtxt">客服电话</span>
            <yd-input slot="right" class="plh" placeholder="68618688" readonly></yd-input>
        </yd-cell-item>
         
        <yd-cell-item>
            <span slot="left" class="medtxt">客服微信</span>
            <yd-input slot="right" class="plh" placeholder="112542666" readonly></yd-input>
        </yd-cell-item>
         
        <yd-cell-item>
            <span slot="left" class="medtxt">客服QQ</span>
            <yd-input slot="right" class="plh" placeholder="666254123" readonly></yd-input>
        </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Callser',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
