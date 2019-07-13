<<template>
  <div class="offline">
	   <div class="offbg">
		    <yd-navbar title="线下还款" fontsize=".36rem" height=".88rem" color="#fff" border-color="rgba(0,0,0,0)" bgcolor="rgba(0,0,0,0)">
				<router-link to="/repayment" slot="left">
		            <yd-navbar-back-icon  color="#fff"></yd-navbar-back-icon>
		      </router-link>
		     </yd-navbar>
	   </div>
	   <p class="medtxt">线下还款说明</p>
	   <div class="offcon">
	   	<p> 正常情况线上还款，请点击【首页】-【线上还款】选项还款-您也可以选择如下方式转账还款。 </p>
	   </div> 	
	    
	    <yd-tab class="tabs-title" bg-color="#F6D070" color= '#000' active-color= '#fff' >
	    	<yd-tab-panel label="支付宝">
	     	        <p style="margin-top: .44rem;">银行卡账号：<span>12541245632</span> </p>	
						    <p>收款人姓名：<span>win5511256</span> </p>	
						    <p>转账银行名：<span> 12254125874 </span> </p>	
						  <router-link to="/upload">
						  	 <div class="upproof">上传凭证</div>
						  </router-link>
		        	 
	     </yd-tab-panel>
       <yd-tab-panel label="微信" >
             <img src="../../../../static/img/i_code.png"/>
		        	 <p>扫一扫转账 </p>
		           <p> (保存到手机，微信扫一扫中选取进行还款） </p>
		          <router-link to="/upload">
		        	    <div class="upproof">上传凭证</div>
		        	</router-link>
       </yd-tab-panel>
       <yd-tab-panel label="银行卡">
             	<img src="../../../../static/img/i_code.png"/>
		        	 <p>扫一扫转账 </p>
		           <p> (保存到手机，微信扫一扫中选取进行还款） </p>
		           <p>支付宝账号：156161616</p>
		           <router-link to="/upload">
		        	    <div class="upproof">上传凭证</div>
		        	 </router-link>
       </yd-tab-panel>
	    </yd-tab>
  </div>
</template>

<script>
	
export default {
  name: 'Offline',
  
  data () {
    return {
    	
    }
  },
 methods: {
			 
		}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.offbg{
	width: 100%;
	height: 3.75rem;
	background: url(../../../../static/img/offbg.png) no-repeat;
	background-size: cover;
}
.medtxt{
	text-align: center;
	margin-top: .26rem;
	line-height: .7rem;
}
.offcon{
	font-size: .28rem;
	color: #666;
	line-height: .40rem;
	margin: .16rem .25rem;
}
.offcon span{
	color: #54AEE9;
}
.upproof{
	width: 3.11rem;
	height: .84rem;
	line-height: .84rem;
	margin: .5rem auto;
	border-radius: .5rem;
	border: 1px solid #f46772;
	color: #f46772;
	text-align: center;
	font-size: .4rem;
}
.tabs-title{
	width: 6.78rem;
	height: .62rem;
	line-height: .62rem;
	margin: 0 auto;
	text-align: center;
background: red;
}
.tabs-title img{
	width: 2.86rem;
	height: 2.86rem;
	margin: .44rem auto;
}
.yd-tab-nav-item .yd-tab-active{
	background: #F6D070 !important;
	color: #fff !important;
} 

</style>
