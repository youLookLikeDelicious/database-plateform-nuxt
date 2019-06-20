import axios from 'axios'
import Vue from 'vue'
//console.log(process.env.NODE_ENV)
// 对axios的封装
if(process.env.NODE_ENV === 'production' && process.env.hasOwnProperty('VUE_ENV') && process.env.VUE_ENV != 'server') {
    // 生产模式
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
    let token = document.head.querySelector('meta[name="csrf-token"]');
    
    // 添加token
    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
        new Error('缺少令牌，请求可能会被拦截。');
    }
}
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.prototype.$baseUrl = axios.defaults.baseURL = 'http://www.database.com/'

if( process.env.NODE_ENV != 'production')
    axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
export default axios