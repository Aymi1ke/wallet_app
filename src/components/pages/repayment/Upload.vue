<template>
  <div class="upload">
    <div class="online-bg">
     <yd-navbar title="线下还款" fontsize=".36rem" height=".88rem" color="#fff" border-color="rgba(0,0,0,0)" bgcolor="rgba(0,0,0,0)">
		<router-link to="/repayment" slot="left">
            <yd-navbar-back-icon  color="#fff"></yd-navbar-back-icon>
       </router-link>
       <router-link to="/notice" slot="right">
            <yd-icon  name="message" size="30px" color="#777" custom></yd-icon>
       </router-link>
     </yd-navbar>
     <div class="on-title">
     	<h1>{{amount}}</h1>
        <p>剩余还款总额(元）</p>
     </div>
    </div>
      <yd-cell-group >
        <yd-cell-item>
            <span slot="left" class="medtxt">还款金额</span>
            <yd-input slot="right"  v-model="payamount"  type='number'  class="plh" >{{payamount}}</yd-input>
        </yd-cell-item> 
        <yd-cell-item arrow>	
            <span slot="left" class="medtxt">还款时间</span>
             <yd-datetime type="date"  v-model="paytime"   class="plh"  slot="right"   style="width: 100rem;">
             	请务必选择准确的还款时间
             </yd-datetime>	  
        </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group class="check-group">
        <yd-cell-item>
            <span slot="left" class="medtxt">身份证号</span>
            <yd-input slot="right" v-model="IdCard" class="plh"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="medtxt">银行卡号</span>
            <yd-input slot="right" v-model="BankCard" class="plh"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="medtxt">还款人</span>
            <yd-input slot="right" v-model="Name" class="plh"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
     <div class="card-wap">
    	<div class="upcard">
    		 <yd-button  @click.native="takephoto = true" size="small" class='photobtn' bgcolor="rgba(0,0,0,0)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</yd-button>
          <img :src="picurl==''? picbg : picurl" />
          <yd-actionsheet :items="myItems" v-model="takephoto" cancel="取消"></yd-actionsheet>
    	</div>
    </div>
    
    <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff"  @click.native="isUpload()" >确认上传</yd-button>
     <popups  v-if="show"  :remind="remind" :assist="assist" :imgSrc="imgSrc" @close="show=false" :resetxt="resetxt" :nexttxt="nexttxt" :isfail="isfail" :ishide="ishide"></popups>
  </div>
</template>

<script>
import Popups from '../../common/popup/Popups'
import {mapState} from 'vuex'
export default {
  name: 'Upload',
  components:{
  	Popups
  },
  data () {
    return {
    	paytime:'2019-01-01',
    	takephoto: false,
	    myItems: [
	        {
	            label: '拍照',
	            callback: () => {
	                this.openCamera()
	            }
	        },
	        {
	            label: '从相册中选取',
	            callback: () => {
	                this.appendByGallery()
	            }
	        }
	    ],
	    amount:'',
	    payamount:'',
    	idCard:'',
      bankCard:'',
      name:'',
      show: false, //是否显示弹窗
			isfail: false, //成功失败信息显示
			remind: '',  //提示标题
			assist: '',  //提示信息
			imgSrc: '',  //图片地址
			resetxt: '', //失败提示按钮
			nexttxt: '', //成功提示按钮
			ishide:false ,//是否显示成功提示按钮
			picurl:'', //还款凭证
			picbg:'require("../../../../static/img/pz.png")'
    }
  },
   computed:{
  	...mapState({
  			Authorization(state){
  		return state.Authorization
    	},
    	BankCard(state){
    		return state.BankCard
    	},
    	IdCard(state){
    		return state.IdCard
    	},
    	Name(state){
    		return state.Name
    	},
    	orderID(state){
    		return state.orderID
    	}
  	})
  
  },
  created(){
  		this.getRepaymoney()
  },
  mounted(){
  	this.$axios({
  		method:"post",
  		url:"/user/api/authInfo",
  		params:{
  			token:this.Authorization,
  			type:"bank"
  		}
  	}).then(res=>{
  		console.log(res.data);
  		if(res.data.code===1){
  			console.log(res.data);
  			this.BankCard = res.data.data.code;
  		}
  	}).catch(error=>{
  		
  	})
  },
  methods:{
  	getRepaymoney(){
  		this.$axios({
  			method:"post",
  			url:'/order/api/show',
  			params:{
  				token:this.Authorization,
  				id:this.orderID,
  				more:1
  			}
  		}).then(res=>{
  			if(res.data.code===1){
  				console.log(res.data.data)
  				this.amount = res.data.data.amount
  			}
  		})
  	},
  	  //调取摄像头拍照
			openCamera(){
				let that = this;
				var cmr = plus.camera.getCamera();  ;//获取摄像头管理对象
				//进行拍照
				cmr.captureImage(function(path){ //path为拍照成功的图片的路径
				
                plus.io.resolveLocalFileSystemURL(path, function(entry){ //通过URL参数获取目录对象或文件对象
                	
                var path = entry.toLocalURL();
                that.imagetoCanvas(path,entry.name); //文件传转base64方法 
                
                   that.picurl = path;
		            }, function(e){
		                console.log("读取拍照文件错误："+e.message);
		            });
		        }, function(e){
		            console.log("读取拍照文件错误："+e.message);
		        }, {filename:'_doc/camera/',index:1});
		    },
			
		//选择照片文件	
		 appendByGallery(){
		 	   let that = this;
		        plus.gallery.pick(function(path){
		        	let name = path.substr(path.lastIndexOf('/')+1);
		            //文件传转base64方法
		            that.imagetoCanvas(path,name);
					      that.picurl = path;
		        });
		    },
		    //图片压缩
		 imagetoCanvas(image){
				  var cvs = document.createElement("canvas");
				  var ctx = cvs.getContext('2d');
				  cvs.width = image.width;
				  cvs.height = image.height;
				  ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
				  return cvs ;
				},
  	isUpload(){
  		if(this.payamount == null && this.paytime == "" && this.IdCard=="" && this.BankCard == "" && this.name== ""){
  			this.$dialog.toast({
                    mes: '还款金额或还款时间不能为空',
                    timeout: 1500,
                    icon: 'error',
                  });
  		}else{
  			this.$axios({
  			method:"post",
  			url:"/repay/api/offline",
  			params:{
  				token:this.Authorization,
  				id:this.orderID,
  				money:this.payamount,
  				time:this.paytime,
  				pic:this.pic
  			}
  		}).then(res=>{
  			console.log(res.data);
  			if(res.data.data.code == 1){
  				this.show = true;
			    this.isfail = false;
		   	this.ishide = false;
	  		this.imgSrc = require("../../../../static/img/success.png");
	  		this.remind = "还款成功";
	  		this.assist = "您的还款信息已提交审核，稍后会在【通知】里提示。"; 	
  			}else{
  				this.show = true;
			    this.isfail = true;
		  		this.imgSrc = require("../../../../static/img/fail.png");
		  		this.remind = "还款失败";
		  		this.assist = "您的金额不足，请充值后重试。"; 	
		  		this.resetxt = '重新还款';
  			}
  		}).catch(err=>{
  			 this.$router.push("/error")
  		})
  		}
  		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.online-bg{
	width: 100%;
	height: 3.75rem;
	background: linear-gradient(47deg,#FC6970,#FD7568);
}
.on-title{
	margin: .62rem auto;
	text-align: center;
	color: #fff;
	font-size: .28rem;
	letter-spacing: .02rem;
	line-height: .98rem;
}
.on-title h1{
	font-size: .6rem;
}
.btnset{
	margin: .2rem auto .9rem;
}
.reltxt{
	line-height: .44rem;
}
.card-wrap{
	width: 100%;
	height: 6.91rem;
	margin: .20rem auto 0;
	
}
.upcard{
	width: 66.13%;
	height: 3.05rem;
	margin: 0 auto;
	position: relative;
}
.upcard img{
	width: 100%;
	height: 100%;
}
.photobtn{
	position: absolute;
   top: 1rem;
   left: 42%;
}
</style>
