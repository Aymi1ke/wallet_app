// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
//import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
import App from './App'
import $ from 'jquery'
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import 'vue-ydui/dist/ydui.flexible.js'
import FastClick from 'fastclick'
import store from './store'
import moment from 'moment'
import '../static/defined.css'
import {post} from './axios/index.js'
import EXIF from 'exif-js'
Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.EXIF = EXIF;
Vue.use(YDUI);

document.addEventListener('DOMContentLoaded', function() {
	FastClick.attach(document.body);
}, false);

Vue.filter('moment', function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
	return moment(value).format(formatString);

});



/* eslint-disable no-new */

// 支持设置passive的，将被动模式显式设置为false
document.addEventListener('touchstart', this.onTouchStart, {
	passive: false
});
// 否则，去除默认的被动模式
document.addEventListener('touchstart', this.onTouchStart, false);

FastClick.prototype.focus = function(targetElement) {
	var length;
	if(deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
		length = targetElement.value.length;
		targetElement.focus();
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};

new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
