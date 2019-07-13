<template>
	<div class="helpdetail">
		<yd-navbar title="帮助中心" height=".88rem" fontsize=".36rem" border-color="rgba(0,0,0,0)">
			<router-link to="/help" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div class="detail">
			<p class="topic">{{helpDetail.topic}}</p>
			<p v-html='helpDetail.answer' class="medtxt"></p>
		</div>

	</div>
</template>

<script>
 	import helpDatas from '../../../../static/helpdetail.json'
	
	export default {
		name: 'Helpdetail',
		data() {
			return {
              helpDetail: {}
			}
		},
		mounted: function () {
		      //页面加载时获取列表索引号-[索引号为传递过来的参数]
		      let pIdx = this.$route.params.index;
		      //数据提取
		      this.helpDetail = helpDatas[pIdx]
		}
			
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.detail {
		padding: .23rem .31rem;
	}
	
	.topic{
		color: #f1c964;
		font-size: .32rem;
		line-height: .45rem;
	}
	.medtxt{
		margin-top: .42rem;
		line-height: .56rem;
	}
</style>