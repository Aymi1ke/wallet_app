<template>
  <div class="myBankCard">
    <yd-navbar title="我的银行卡"  fontsize=".36rem" height=".88rem" border-color="rgba(0,0,0,0)">
    		<router-link to="/profile" slot="left">
	          <yd-navbar-back-icon></yd-navbar-back-icon>
	        </router-link>
      	<router-link to="/alterBank" slot="right">
            <span class="smatxt">更改绑定</span>
        </router-link>
    </yd-navbar>
     
      <yd-cell-group class="check-group">
        <yd-cell-item>
            <span slot="left" class="medtxt">银行卡号：</span>
            <yd-input slot="right" class="plh" v-model="BankCard" placeholder="请输入银行卡号"></yd-input>
        </yd-cell-item>
         
        <yd-cell-item>
            <span slot="left" class="medtxt">银行：</span>
            <yd-input slot="right" class="plh" v-model="BankName"  placeholder="请输入银行名称"></yd-input>
        </yd-cell-item>
         
        <yd-cell-item>
            <span slot="left" class="medtxt">预留手机号码：</span>
            <yd-input slot="right" class="plh" v-model="BankPhone"  regex="mobile"  placeholder="请输入银行卡预留手机号"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
     
  </div>
</template>

<script>
	import {mapState} from 'vuex'
export default {
  name: 'MyBankCard',
  data () {
    return {
      
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
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smatxt{
	font-size: .28rem;
	color: #333;
	}
.medtxt{
	margin-right: .50rem;
}

</style>
