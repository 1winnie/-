import axios from 'axios';
import { showNotify } from 'vant';
import 'vant/es/notify/style';
import router from '../router';
// import { useRouter } from 'vue-router';
// const router = useRouter();
console.log('import.meta.env', import.meta.env)
axios.defaults.baseURL = import.meta.env.MODE = 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
// 在跨域请求时，会携带用户凭证如cookie
axios.defaults.withCredentials = true
// 自定义请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.response.use(res => {
    
    console.log(router)
    if (typeof res.data !== 'object') {
     showNotify({ type: 'danger', message: '服务端异常！' });
      return Promise.reject(res)
    }
    if (res.data.resultCode != 200) {
      if (res.data.message) showNotify({ type: 'danger', message: `${res.data.message}`});
      if (res.data.resultCode == 416) {
        // router.push({ path: '/login' })
        router.push('/login')
      }
      if(res.data.resultCode == 500){
        showNotify({ type: 'danger', message: '登录失败！' });
      }
      if (res.data.data && window.location.hash == '#/login') {
        localStorage.setItem('token', res.data.data)
        axios.defaults.headers['token'] = res.data.data
      }
      return Promise.reject(res.data)
    }
  
    return res.data
  })
export default axios