//注册全局组件
import Vue from 'vue'
import message from '@/components/common/message'
import bread from '@/components/common/bread-info'
// 提示消息组件
Vue.component('message', message)
// 面包屑信息组件
Vue.component('bread', bread)