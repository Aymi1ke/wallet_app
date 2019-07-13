<template>
  <div class="CopyRight">
    <yd-navbar title="版本信息"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/settings" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>
    <ul class="copytxt">
    	<li>版本信息：v10.0</li>
		<li>更新日期：2018-10-10</li>
		<li>更新功能：新增了借款功能，方便借钱。</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CopyRight',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.copytxt{
	padding: .4rem 0 0 0.3rem;
	text-align: left;
	font-size: .28rem;
	color: #333;
}
.copytxt li{
	line-height: .56rem;
}
</style>
