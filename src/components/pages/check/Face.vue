<template>
  <div class="face">
  	 <div class="facebg">
  	 	<yd-navbar title="活体检测" height=".88rem" fontsize=".36rem" border-color="rgba(0,0,0,0)">
		    <router-link to="/Check" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
  	 	<yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff"  @click.native="getVerfication()" >开始检测</yd-button>
       <yd-popup v-model="showAlert" position="center" width="80%" masker-opacity=".7" :close-on-masker=false>
         <div class="closeIcon">
           <yd-icon  slot="icon" custom  name="close" size=".42rem"  @click.native="showAlert = false"></yd-icon>
         </div>
         <div class="alertbg">
           <p>请牢记一下验证码</p>
           <p style="margin-top: 10px;"> 此验证码将于<span style="color:#F35C51;">{{count}}</span>秒后过期 </p>
           <p style="margin-bottom: 10px">用普通话朗读数字,视频时长<span style="color:#F35C51;">3-6</span>秒最佳</p>
           <ul>
             <li v-for="i in Random">{{i}}</li>
           </ul>
           <yd-button class="videobtn"  bgcolor="#F35C51" color="#fff"  @click.native="videoCapture()">记住了,开始录制</yd-button>
         </div>
       </yd-popup>
  	 </div>
    <popup  v-if="show"  :remind="remind" :assist="assist" :imgSrc="imgSrc" @close="show=false" :resetxt="resetxt" :nexttxt="nexttxt" :isfail="isfail" :pushPage="pushPage" ></popup>

  </div>
</template>

<script>
  import Popup from '../../common/popup/Popup'
  import { mapState} from 'vuex'
export default {
  name: 'Face',
  components:{
    Popup
  },
  data () {
    return {
      showAlert:false,
      count:60,
      Random:'',//随机验证码
      bizNo:'',//业务ID
      token:'',//活体验证id
      show: false, //是否显示弹窗
      isfail: false, //成功失败信息显示
      remind: '', //提示标题
      assist: '', //提示信息
      imgSrc: '', //图片地址
      resetxt: '', //失败提示按钮
      nexttxt: '', //成功提示按钮
      pushPage: ''
    }
  },
  computed:{
    ...mapState({
      Authorization(state){
        return state.Authorization
      }
    })
  },
  methods:{
    //获取四位随机数
    getVerfication(){
        let _this = this;
        this.$post('/api/verification',{
           token:this.Authorization
        }).then(res=>{
          if(res.code == 1){
             _this.showAlert = true;
             let timer = setInterval(function () {
                 _this.count--;
               if(_this.count <= 0){
                 _this.count = 0;
                 clearInterval(timer)
               }
             },1000);
             _this.Random = res.result.random;
             _this.bizNo = res.result.bizNo;
             _this.token = res.result.tokenID;
            console.log("bizNo"+_this.bizNo);
            console.log("token"+_this.token);
          }
        }).catch(error=>{

        })
      },
    //调用摄像头
      videoCapture(){
        let _this = this;
        var cmr = plus.camera.getCamera();//获取相机
        cmr.startVideoCapture(function(p){//录像
          plus.io.resolveLocalFileSystemURL(p, function(entry) {//通过URL参数获取目录对象或文件对象 就是获取到录像文件位置
              console.log("p:"+p);//打印文件位置，可以直接用作上传路径
             let path = entry.toLocalURL();
             _this.getpressVideo(path)
          }, function(e) {
            console.log("读取录像文件错误：" + e.message);
          });

        }, function(e) {
          console.log("失败");
          plus.nativeUI.toast("录像失败！",{duration:"long"});
        }, {
          filename: "_doc/camera/",//文件保存目录
          index: 2
        });
      },
    //转换base64
      getpressVideo(url){
         let _this = this;
         plus.io.resolveLocalFileSystemURL(url,function (entry) {
           entry.file(function(file) {
             console.log("file:"+file)
             var fileReader = new plus.io.FileReader();
             fileReader.readAsDataURL(file);
             fileReader.onloadend = function(e) {
               var picVio = e.target.result.toString();
               console.log("picVio:"+picVio);
               _this.uploadvideo(picVio);
             }
           })
         })
         },
    //上传对比
      uploadvideo(picVio){
        let _this = this;
        console.log("bizNo"+_this.bizNo);
        console.log("token"+_this.token);
        plus.nativeUI.showWaiting('');
        this.$post('/api/getVideo',{
            token:_this.Authorization,
            videos:picVio,
            bizNo:_this.bizNo,
            tokenID:_this.token
        }).then(res=>{
          if(res.code === 1){ //上传比对成功
            plus.nativeUI.closeWaiting();
            _this.showAlert = false;
            _this.show = true;
            _this.isfail = false;
            _this.ishide = true;
            _this.imgSrc = require("../../../../static/img/pop_img_Bankcard_success.png");
            _this.remind = res.message;
            _this.assist = "";
            _this.nexttxt = "下一步";
            _this.pushPage = 'phone';
          }else{
            plus.nativeUI.closeWaiting();
            _this.showAlert = false;
            _this.show = true;
            _this.isfail = true;
            _this.imgSrc=require("../../../../static/img/pop_img_id_fail.png");
            _this.remind = res.message;
            _this.assist = "请重新认证";
            _this.resetxt = "重新认证";
          }

        }).catch(error=>{

        })
      }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.facebg{
	width: 100vw;
	height: 100vh;
	background: url(../../../../static/img/faceauth.png) no-repeat;
	background-size: cover;
}
.btnset{
    position: absolute;
    bottom: .55rem;
    left:50%;
  transform: translate(-50%);
}
  .alertbg{
    background: #fff;
    border-radius: 5px;
    padding: 30px;
    text-align: center;
    font-size: .26rem;
  }
  .alertbg ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .alertbg li{
    border: 1px solid #dfdfdf;
    border-radius:5px;
    padding: 15px;
    margin: 5px 5px 15px 0;
    font-size: .5rem;
  }
  .videobtn{
    width: 80%;
    height:.8rem;
    letter-spacing: .01rem;
    font-size: .28rem;
    border-radius: 5px;
  }
.closeIcon{
  float: right;
  margin: .2rem;

}
</style>
