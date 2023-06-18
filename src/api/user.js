import axios from '../utils/axios'
// 登录
export const login = (params) => axios.post('/user/login',params)
// 退出登录
export const logout = () => axios.post('/user/logout')
// 注册
export const register =(params)=> axios.post('/user/register',params)
// 获取用户信息
export const getUserInfo = ()=> axios.get('/user/info')
// 编辑用户信息
export const EditUserInfo = (params) => axios.put("/user/info",params)