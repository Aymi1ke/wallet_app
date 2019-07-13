<template>
  <div class="alterBank">
    <yd-navbar title="更改银行卡"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/profile" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	       </router-link>
    </yd-navbar>
     
      <yd-cell-group class="check-group">
        <yd-cell-item>
            <span slot="left" class="medtxt">银行卡号：</span>
            <yd-input slot="right" type="number" class="plh" v-model="newCard"  placeholder="请输入新的银行卡号" regex="bankcard" ></yd-input>
        </yd-cell-item>
         
        <yd-cell-item>
            <span slot="left" class="medtxt">银行：</span>
            <yd-input slot="right" type="text" class="plh" v-model="bankName" placeholder="请输入银行名称" ></yd-input>
        </yd-cell-item>
         
        <yd-cell-item>
            <span slot="left" class="medtxt">预留手机号码：</span>
            <yd-input slot="right" class="plh" type="number" v-model="bankPhone" placeholder="请输入银行卡预留手机号"  regex="mobile" ></yd-input>
        </yd-cell-item>
    </yd-cell-group>
     <yd-button size="large" class="btnset" bgcolor="#F35C51" color="#fff" @click.native = "BINDCARD()">确认绑定</yd-button>
		</popup>
  </div>
</template>

<script>
	import {mapState} from 'vuex'

export default {
  name: 'AlterBank',
  
  data () {
    return {
     newCard:'',
     bankName:'',
     bankPhone:'',
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
  		BankName(state){
  			return state.BankName
  		},
  		BankPhone(state){	
  			return state.BankPhone
  		}
  		
  	})
  },
  methods:{
  	BINDCARD(){
  		if(this.newCard === "" || this.bankName === "" || this.bankPhone === "") {
					 this.$dialog.toast({
                            	mes: '请输入正确的信息！',
                            	timeout: 1500,
                            	icon: 'error'
                            });
					
				} else{
					this.$axios({
						method:'post',
						url:'/project/api/bank',
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						data:{
							token:this.Authorization,
							code:this.newCard,
							bank:this.bankName,
							mobile:this.bankPhone
						}
					}).then(res=>{
						if(res.data.code===1){
						console.log(res.data);
						    this.$store.dispatch('getUserBankCard',this.newCard)
						    this.$store.dispatch('getUserBankName',this.bankName)
						    this.$store.dispatch('getUserBankPhone',this.bankPhone)
						    this.$dialog.toast({
                            	mes: '银行卡更改成功！',
                            	timeout: 1500,
                            	icon: 'success',
                            	callback:()=>{
									   	   					this.$router.push('/myBankCard')
									   	   				}
                            });
						}
						
					}).catch(error=>{
						
					})
  	}
  }
}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnset{
	margin: 4.21rem auto;
}
.plh{
	position: absolute;
	text-align: left;
	left: 2.67rem;
}
</style>


