import { createApp } from 'vue'
import App from './App.vue'
// import { NavBar,  ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'
import './assets/main.css'
// 引入remixicon样式
import 'remixicon/fonts/remixicon.css'
// 注册路由
import router from './router/index.js'
//注册pinia仓库
import {createPinia} from 'pinia';
import { myPiniaPlugin } from './store/plugins'
const pinia = createPinia()
pinia.use(myPiniaPlugin)
const app =createApp(App)
app.use(router)
app.use(pinia)
// app.use(ActionBarButton)
//   .use(ActionBarIcon)
//   .use(ActionBar)
//   .use(Divider)
//   .use(Popup)
//   .use(Overlay)
//   .use(Loading)
//   .use(Dialog)
//   .use(Toast)
//   .use(ContactCard)
//   .use(Form)
//   .use(AddressEdit)
//   .use(AddressList)
//   .use(Field)
//   .use(CellGroup)
//   .use(Cell)
//   .use(SwipeCell)
//   .use(Icon)
//   .use(Stepper)
//   .use(Card)
//   .use(Button)
//   .use(Swipe)
//   .use(SwipeItem)
//   .use(PullRefresh)
//   .use(List)
//   .use(Tab)
//   .use(Tabs)
//   .use(SubmitBar)
//   .use(Checkbox)
//   .use(CheckboxGroup)
//   .use(Skeleton)
//   .use(NavBar)
app.mount('#app')