import axios from 'axios'
import qs from "qs"

//axios 配置
//axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://192.168.101.101:8080';
//请求拦截
axios.interceptors.request.use(
  config => {
    if(config.method == "post") {
      config.data = qs.stringify(config.data);
      config.headers = {
        'Content-type':'application/x-www-form-urlencoded'
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
    this.$router.push('/Error')
  });

//响应拦截
axios.interceptors.response.use(
  response => {
    if(response.code == '401'){
      localStorage.removeItem('Authorization')
      router.push({
        path:"/login",
       // querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err)
       // this.$router.push('/')
      })
  });
}
export default {
  post(url,data){
    return post(url,data)
  }
}
