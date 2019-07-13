<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App',
    data(){
		  return{
      }
    },
		created() {

			// if (localStorage.getItem('store')) {
			// 	this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("store"))));
			// }
			// window.addEventListener("beforeunload", () => {
      //   localStorage.setItem("store", JSON.stringify(this.$store.state))
			// })
		},
	}
</script>

<style>
 *{
   touch-action: pan-y;
 }
  @media screen and (min-device-width: 960px) and (max-device-width: 1920px) {
		html,body{
			      background: #dfdfdf;
			    }
		    #app {
					width: 7.5rem;
		            height: 100vh;
					margin: 0 auto;
		            box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
				}
		    .headbg{
		      width: 7.5rem;
		      height: 3.2rem;
		      border: 1px solid red;
		    }
		    .swiper-container{
		      width: 7.5rem;
		      height: 3.2rem;
		      position: absolute;
		      top: 0;
		    }
        .footbar{
          width: 7.5rem !important;
        }
	}

	@media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
		#app {
			width: 100%;
            height: 100vh;
			margin: 0 auto;
            box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
		}
				.home{
			text-align: center;
			background: #fff;
			}

		 .headbg{
		      width: 100%;
		      height: 4.2rem;
		      border: 1px solid red;
		    }
		    .swiper-container{
		      width: 100%;
		      height: 4.2rem;
		      position: absolute;
		      top: 0;
		    }
		    .bg {
				width: 96%;
				height: 9.9rem;
				margin: .01rem auto;
				border-radius: 5px;
				padding-top: .3rem;
				box-shadow: 0 0 20px rgba(0, 0, 0, .13);
				position: relative;
				top: 0
			}
			.bg1 {
				width: 86.66%;
				height: 5.5rem;
				margin: 0 auto;
				position: relative
			}
			.period {
				width: 89.33%;
				height: .82rem;
				margin: 0 auto;
				text-align: center;
				-ms-flex-pack: justify;
				justify-content: space-between
			}
			.noticebar-wrap {
				position: relative;
				top: 0;
				width: 80%;
				margin: 0 auto;
				line-height: .88rem;
				font-size: .26rem
			}

	}


  .yd-cell-right .yd-datetime-input,
  .yd-cell-right input[type=date],
  .yd-cell-right input[type=datetime-local],
  .yd-cell-right input[type=email],
  .yd-cell-right input[type=number]:not(.yd-spinner-input),
  .yd-cell-right input[type=password],
  .yd-cell-right input[type=tel],
  .yd-cell-right input[type=text],
  .yd-cell-right input[type=time],
  .yd-cell-right input[type=url]{
    font-size: .32rem;
    height: 1.2rem;
  }

</style>
