<template>
  <div class="feedback">
    <yd-navbar title="意见反馈"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
	   <router-link to="/about" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
       </router-link>
    </yd-navbar>
    <yd-cell-group>
        <yd-cell-item  class="feedback-bg">
            <yd-textarea slot="right" placeholder="请说明你的意见和理由，以便我们更快的处理。" maxlength="100" :show-counter='false'></yd-textarea>
        </yd-cell-item>
        
    </yd-cell-group>
     <yd-cell-group>
     <yd-cell-item  class="img-bg">
            <yd-textarea slot="right" placeholder="上传图片" maxlength="100" :show-counter='false'></yd-textarea>
        </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff">提交</yd-button>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feedback-bg{
	height: 3.5rem;
	margin: .41rem auto;
}
.img-bg{
	height: 2.3rem;
	margin: .36rem auto;
}
.btnset{
	margin: 1.83rem auto;
}
</style>
