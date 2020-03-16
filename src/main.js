// 入口文件

import Vue from 'vue';

// 导入MUI
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

// 按需导入

import { Header } from 'mint-ui';

Vue.component(Header.name,Header);

import app from './App.vue';

// Vue实例

const vm=new Vue({
    el:"#app",
    render:c=>c(app)
})