<template>
	<div class="idcard">
		<yd-navbar title="身份验证" fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
			<router-link to="/Check" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div class="card-wap" >

			<div class="upcard" id="front">
				<img id="face1" class="image"  />
				<img src="../../../../static/img/img_camera.png" class="imgbtn"  @click="showActionSheet(1)"/>
				<p class="medtxt upltxt">点击上传正面照</p>
			</div>
			<div class="upcard" id="back">
				<img id="face2" class="image"  />
				<img src="../../../../static/img/img_camera.png" class="imgbtn"  @click="showActionSheet(2)"/>
				<p class="medtxt upltxt">点击上传背面照</p>
			</div>
		</div>
		<div class="idcardform">
			<yd-cell-group>
				<yd-cell-item>
					<span slot="left" class="medtxt">姓名：</span>
					<input slot="right" type="text" v-model="name">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left" class="medtxt">身份证号：</span>
					<input slot="right" type="number" v-model="idCard">
				</yd-cell-item>
			</yd-cell-group>
			<yd-button size="large" bgcolor="#F35C51" color="#fff" class="btnset" @click.native="idUpload()">确定</yd-button>
			<popup  v-if="show"  :remind="remind" :assist="assist" :imgSrc="imgSrc" @close="show=false" :resetxt="resetxt" :nexttxt="nexttxt" :isfail="isfail" :pushPage="pushPage" ></popup>
		</div>
	</div>
</template>

<script>

	import Popup from '../../common/popup/Popup'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'IdCard',
		components: {
			Popup
		},
		data() {
			return {
				name: '',
				idCard: '',
				front: '', //请求类型
        back:'',
        ImageFront:'',
        ImageBack:'',
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
		computed: {
			...mapState({
				Authorization(state) {
					return state.Authorization
				}
			})
		},
		methods: {
				showActionSheet(obj){
					let that = this;
          var actionbuttons=[{title:"拍照"},{title:"从相册选取"}];
            var actionstyle={cancel:"取消",buttons:actionbuttons};
            plus.nativeUI.actionSheet(actionstyle, function(e){
              if(e.index==1){
                that.openCamera(obj);
              }else if(e.index==2){
                that.appendByGallery(obj);
              }
          } )
			              },
        showPics(url,name,obj){
           //根据路径读取到文件
          let that = this;
           plus.io.resolveLocalFileSystemURL(url,function(entry){
             entry.file(function(file){
               // let Orientation;
               // //获取照片方向角属性，用户旋转控制
               // that.EXIF.getData(file, function() {
               //   Orientation = that.EXIF.getTag(this, 'Orientation');
               // });
               var fileReader = new plus.io.FileReader();
                   fileReader.onload = function(e) {
                     var image = new Image();
                     image.src = e.target.result;
                     image.onload = function () {
                       var expectWidth = image.naturalWidth;
                       var expectHeight = image.naturalHeight;
                       if (image.naturalWidth > image.naturalHeight && image.naturalWidth > 800) {
                         expectWidth = 800;
                         expectHeight = expectWidth * image.naturalHeight / image.naturalWidth;
                       } else if (image.naturalHeight > image.naturalWidth && image.naturalHeight > 1200) {
                         expectHeight = 1200;
                         expectWidth = expectHeight * image.naturalWidth / image.naturalHeight;
                       }
                       var canvas = document.createElement("canvas");
                       var ctx = canvas.getContext("2d");
                       canvas.width = expectWidth;
                       canvas.height = expectHeight;
                       ctx.drawImage(image, 0, 0, expectWidth, expectHeight);
                       var picUrl = canvas.toDataURL("image/jpeg", 0.8);;
                       // //修复ios
                       // if (navigator.userAgent.match(/iphone/i)) {
                       //   console.log('iphone');
                       //   //alert(expectWidth + ',' + expectHeight);
                       //   //如果方向角不为1，都需要进行旋转 added by lzk
                       //   if(Orientation != "" && Orientation != 1){
                       //     //alert(Orientation);
                       //     switch(Orientation){
                       //       case 6://需要顺时针（向左）90度旋转
                       //         alert('需要顺时针（向左）90度旋转');
                       //         that.rotateImg(image,'left',canvas);
                       //         break;
                       //       case 8://需要逆时针（向右）90度旋转
                       //         alert('需要顺时针（向右）90度旋转');
                       //         that.rotateImg(image,'right',canvas);
                       //         break;
                       //       case 3://需要180度旋转
                       //         alert('需要180度旋转');
                       //         that.rotateImg(image,'right',canvas);//转两次
                       //         that.rotateImg(image,'right',canvas);
                       //         break;
                       //     }
                       //   }
                       //   picUrl = canvas.toDataURL("image/jpeg", 0.8);
                       // }else if (navigator.userAgent.match(/Android/i)) {// 修复android
                       //   var encoder = new JPEGEncoder();
                       //   picUrl = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                       // }else{
                       //   alert(Orientation);
                       //   if(Orientation != "" && Orientation != 1){
                       //     alert(Orientation);
                       //     switch(Orientation){
                       //       case 6://需要顺时针（向左）90度旋转
                       //         alert('需要顺时针（向左）90度旋转');
                       //         that.rotateImg(image,'left',canvas);
                       //         break;
                       //       case 8://需要逆时针（向右）90度旋转
                       //         alert('需要顺时针（向右）90度旋转');
                       //         that.rotateImg(image,'right',canvas);
                       //         break;
                       //       case 3://需要180度旋转
                       //         alert('需要180度旋转');
                       //         that.rotateImg(image,'right',canvas);//转两次
                       //         that.rotateImg(image,'right',canvas);
                       //         break;
                       //     }
                       //   }
                       //   picUrl = canvas.toDataURL("image/jpeg", 0.8);
                       // }
                       var face = document.getElementById('face'+obj)
                       face.src = picUrl;
                       face.style.opacity=1;
                       console.log('picurl为'+picUrl);
                       that.imageUploader(picUrl,obj);
                     };

                   };
               fileReader.readAsDataURL(file);
             })
                     })

           },
       //调取摄像头拍照
				openCamera(obj){
							let that = this;
							var cmr = plus.camera.getCamera();  ;//获取摄像头管理对象
//							var res = cmr.supportedImageResolutions[0]; //字符串数组，摄像头支持的拍照分辨率
//							var fmt = cmr.supportedImageFormats[0]; //字符串数组，摄像头支持的拍照文件格式
//							console.log("Resolution: "+res+", Format: "+fmt);
							//进行拍照
							cmr.captureImage(function(p){ //path为拍照成功的图片的路径
			               plus.io.resolveLocalFileSystemURL(p, function(entry){ //通过URL参数获取目录对象或文件对象
							       that.showPics(entry.toLocalURL(),entry.name,obj)
					            }, function(e){
					                console.log("读取拍照文件错误："+e.message);
					            });
					        }, function(e){
					            console.log("读取拍照文件错误："+e.message);

					        },{filename:'_doc/camera/',index:1});
						},
       //选择照片文件
				appendByGallery(obj){
					 	    let that = this;
					        plus.gallery.pick(function(path){
					        	let name = path.substr(path.lastIndexOf('/')+1);
								console.log(name)
								that.showPics(path,name,obj)
					        },function(e){

					        },{
					        	filter:'image'
					        });
					    },
       //上传照片
        imageUploader(picUrl,obj){
						  let that = this;
							  plus.nativeUI.showWaiting('');
							  that.$post('/api/idcardocr',{
							  	   token: that.Authorization,
							  	   image: picUrl
							  }).then(res=>{
							  	console.log(res);
							  	if(res.code === 1){
                    if(res.result.condition==="front"){
                      console.log("res.result.name------"+res.result.name);
                      console.log("res.result.idCard---------"+res.result.idCard);
                      that.front = res.result.condition;
                      that.name = res.result.name;
                      that.idCard = res.result.idCard;
                      plus.nativeUI.closeWaiting();
                      that.ImageFront = picUrl;
                      console.log("that.ImageFront-----"+that.ImageFront);
                    }else{
                      that.back= res.result.condition;
                      plus.nativeUI.closeWaiting();
                      that.ImageBack = picUrl;
                      console.log("that.ImageBack-----"+that.ImageBack);
                    }
							  	}else{
                    plus.nativeUI.closeWaiting();
                    that.$dialog.toast({
                      mes: res.message,
                      timeout: 2000,
                      icon: 'error'
                    })
                    var face = document.getElementById('face'+obj);
                    face.style.opacity = 0;
                  }
							  }).catch(error=>{
							  	console.log(error);
							  })

				},
       //旋转照片
        rotateImg(img,direction,canvas) {
          //alert(img);
          //最小与最大旋转方向，图片旋转4次后回到原方向
          var min_step = 0;
          var max_step = 3;
          //var img = document.getElementById(pid);
          if (img == null)return;
          //img的高度和宽度不能在img元素隐藏后获取，否则会出错
          var height = img.height;
          var width = img.width;
          //var step = img.getAttribute('step');
          var step = 2;
          if (step == null) {
            step = min_step;
          }
          if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
          } else {
            step--;
            step < min_step && (step = max_step);
          }
          //旋转角度以弧度值为参数
          var degree = step * 90 * Math.PI / 180;
          var ctx = canvas.getContext('2d');
          switch (step) {
            case 0:
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0);
              break;
            case 1:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(degree);
              ctx.drawImage(img, 0, -height);
              break;
            case 2:
              canvas.width = width;
              canvas.height = height;
              ctx.rotate(degree);
              ctx.drawImage(img, -width, -height);
              break;
            case 3:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(degree);
              ctx.drawImage(img, -width, 0);
              break;
          }
        },
       //绑定身份证
        idUpload() {
				  console.log('aaa')
				  let _this = this;
          var regName = /^[\u4e00-\u9fa5]{2,4}$/;
          var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (_this.name === '' && _this.idCard === "") {
            _this.$dialog.toast({
              mes: '信息不能为空',
              timeout: 1500,
              icon: 'error'
            })
            return false;
          } else if (!regName.test(_this.name)) {
            _this.$dialog.toast({
              mes: '真实姓名填写有误',
              timeout: 1500,
              icon: 'error'
            })
            return false;
          } else if (!regIdNo.test(_this.idCard)) {
            _this.$dialog.toast({
              mes: '身份证号填写有误',
              timeout: 1500,
              icon: 'error'
            })
          } else if(_this.front == "front"&&_this.back == "back"){
            plus.geolocation.getCurrentPosition(function (p) {
              console.log('lats---'+p.coords.latitude)
              console.log('lngs---'+p.coords.longitude)
              let lats = p.coords.latitude;
              let lngs = p.coords.longitude;
              console.log("_this.ImageFront-----"+_this.ImageFront);
              console.log("_this.ImageBack-----"+_this.ImageBack);
              _this.$post('/api/confirm',{
                token:_this.Authorization,
                name:_this.name,
                idCard:_this.idCard,
                lat:lats,
                lng:lngs,
                image:_this.ImageFront,
                images:_this.ImageBack
              }).then(res => {
                console.log(res)
                if(res.code===1){
                  _this.show = true;
                  _this.isfail = false;
                  _this.ishide = true;
                  _this.imgSrc = require("../../../../static/img/pop_img_Bankcard_success.png");
                  _this.remind = res.message;
                  _this.assist = "";
                  _this.nexttxt = "下一步";
                  _this.pushPage = 'Face';
                }else{
                  _this.show = true;
                  _this.isfail = true;
                  _this.imgSrc = require("../../../../static/img/pop_img_id_fail.png");
                  _this.remind = res.message;
                  _this.assist = "请重新认证，身份证务必清晰";
                  _this.resetxt = "重新认证";
                }

              }).catch(error => {

              })
            },function (e) {
              console.log(e.message);
            })

          }else{
            _this.show = true;
            _this.isfail = true;
            _this.imgSrc=require("../../../../static/img/pop_img_id_fail.png");
            _this.remind = "身份证验证失败";
            _this.assist = "请重新认证，身份证务必清晰";
            _this.resetxt = "重新认证";
          }

        },
		}

	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.card-wrap {
		width: 100%;
		height: 6.91rem;
		margin: .20rem auto 0;
	}

	.upcard {
		width: 66.13%;
		height: 3.05rem;
		position: relative;
	}

	#front {
		margin: .33rem auto .25rem;
		background: url(../../../../static/img/img_idface.png) no-repeat;
		background-size: cover;
	}

	#back {
		margin: 0 auto .25rem;
		background: url(../../../../static/img/img_idback.png) no-repeat;
		background-size: cover;
	}

	.imgbtn {
		width: .91rem;
		height: .77rem;
		position: absolute;
		top: .7rem;
		left: 50%;
		transform: translate(-50%);
	}

	.upltxt {
		position: absolute;
		top: 1.7rem;
		left: 50%;
		transform: translate(-50%);
	}

	.idcardform {
		margin-top: .57rem;
		width: 100%;
		height: 2rem;
		color: #F55631;
	}

	.image {
		width: 100%;
		height: 2.85rem;
		opacity: 0;
	}

	.btnset {
		margin: .6rem auto;
	}
</style>
