<template>
	<div class="bankcard">
		<yd-navbar title="绑定银行卡" height=".88rem" fontsize=".36rem" border-color="rgba(0,0,0,0)">
			<router-link to="/Check" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<yd-cell-group class="bank-group">
			<yd-cell-item>
				<span slot="left" class="medtxt">银行卡号</span>
				<yd-input class="plh" slot="right" v-model="bankCard" required :show-success-icon="false" :show-error-icon="false" regex="bankcard" placeholder="请输入您的银行卡号"></yd-input>
			</yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="medtxt">预留手机号</span>
        <yd-input class="plh" slot="right" v-model="bankPhone" required :show-success-icon="false" :show-error-icon="false" regex="mobile"  placeholder="请输入银行卡预留手机号"></yd-input>
      </yd-cell-item>
		</yd-cell-group>
		<yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native="isBind()">确定</yd-button>

	</div>
</template>

<script>

    import {mapState} from 'vuex'
	export default {
		name: 'BankCard',
		data() {
			return {
            bankPhone: '',
            bankCard:'',

			}
		},
		computed:{
			...mapState({
				Authorization(state){
					return state.Authorization
				}
			})
		},
    created(){

    },
		methods: {
			isBind() {
			  this.$router.push('/ReceiveCode');
				//输入信息不能为空
				if(this.bankPhone== "" || this.bankCard== "" ) {
					 this.$dialog.toast({
              mes: '信息不能为空！',
              timeout: 1500,
              icon: 'error'
            });
				} else{
					this.$post('/bindingBankSendMsg',{
						  token:this.Authorization,
              phone:this.bankPhone,
              bankCard:this.bankCard,
					}).then(res=>{
						if(res.code===1){
						   console.log(res);
              sessionStorage.setItem("phone",this.bankPhone);
              // this.$dialog.toast({
              //   mes: res.message,
              //   timeout: 1500,
              //   icon: 'success',
              //   callback:()=>{
                  this.$router.push('/ReceiveCode');
              //   }
              // });


						}
						// else{
            //      this.$dialog.toast({
            //        mes: res.message,
            //        timeout: 1500,
            //        icon: 'error'
            //      });
            //
            //    }
					}).catch(error=>{

					})


				}

			}
		}
	}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.bank-group {
		margin-top: .2rem;
	}

	.btnset {
		margin: 1.2rem auto;
	}
</style>
