<template>
  <div class="caption">
    <yd-navbar title="公司介绍"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
	   <router-link to="/about" slot="left">
          <yd-navbar-back-icon  size="30px"></yd-navbar-back-icon>
       </router-link>
    </yd-navbar>
    <div class="about-us" v-for="val in caparr">
    	<p class="medtxt">{{val.title}}</p>
    	<p class="about-content">{{val.content}}</p>
    </div>
    
    
    
  </div>
</template>

<script>
export default {
  name: 'Caption',
  data () {
    return {
      caparr: [
	      {
	      	title:"关于小花口袋",
	      	content:"小花口袋是橙仟科技提供科技服务和支持的第三方，利用生物识别技术，结合智能机器学习方法，以及其他金融科技方面的优势为网络借贷信息中介平台及中航信托等合作方推荐优质的借款客户。小花口袋不保证推荐借款客户百分百通过合作方的风控审核。作为金融科技服务商，小花口袋不发放贷款。贷款服务由合作方提供，小花口袋不经手不触碰客户资金。"		      	
	      },
	      {
	      	title:"关于橙仟科技",
	      	content:"橙仟科技（杭州）互联网金融信息服务有限公司，由中腾信出资设立。作为线上消费金融领域科技服务的主体，为网络借贷信息中介平台及中航信托等合作方推荐优质的借款客户。公司成立以来发展迅速，已成为中腾信的重要支柱。"	      	
	      },
	      {
	      	title:"关于橙仟科技",
	      	content:"橙仟科技的核心成员在金融与互联网领域均有超过10年的服务经验。团队55%的人员来自中信、平安、招行、广发、微众、捷信等知名金融机构，45%人员则来自腾讯、阿里巴巴、京东等知名互联网公司。" 
	      	
	      }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.caption{
	padding-bottom: 1.68rem;
}
.about-us{
	padding: .68rem .3rem 0;
	letter-spacing: .02rem;
}
.medtxt{
	margin-bottom:.4rem;
	font-weight: bold;
}
.medtxt:before{
	content: "●";
	color: #F6855B;
	margin-right: .11rem;
	
}
.about-content{
	font-size: .28rem;
	color: #333;
	line-height: .52rem;
	
}
</style>
