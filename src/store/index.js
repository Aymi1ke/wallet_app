import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '', // token
      mobile:''
    },
    getters:{


    },
    mutations:{
    	// 修改token，并将token存入localStorage
    	changeLogin(state,user){
        state.Authorization = user;
        localStorage.setItem('Authorization',user);
    	},
      setUserMobile(state,user){
    	  state.mobile = user;
    	  localStorage.setItem('mobile',user);
      },
    	 LOGOUT (state){
         localStorage.clear();
	        state.Authorization ='';
	        state.userAuth = false;
	        state.orderID = null;
	        state.isLoan = false;
       }
    },
    actions:{
      changeLogin({commit},token){
        commit('changeLogin',token)
      },
      setUserMobile({commit},item){
        commit('setUserMobile',item)
      }
    }
})
