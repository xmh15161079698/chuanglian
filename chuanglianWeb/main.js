import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

App.mpType = 'app';

// Vue.prototype.appName = '';

// 本地地址
Vue.prototype.baseHost = 'http://localhost:31173/api';
// 正式地址
// Vue.prototype.baseHost = 'https://liudiao.cdkeren.com/api';


// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);


// i18n部分的配置
// 引入语言包，注意路径
// import Chinese from '@/common/locales/zh.js';
// import English from '@/common/locales/en.js';

// VueI18n
// import VueI18n from '@/common/vue-i18n.min.js';

// VueI18n
// Vue.use(VueI18n);

// const i18n = new VueI18n({
// 	// 默认语言
// 	locale: 'zh',
// 	// 引入语言文件
// 	messages: {
// 		'zh': Chinese,
// 		'en': English,
// 	}
// });

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
// Vue.prototype._i18n = i18n;

const app = new Vue({
	// i18n,
	store,
	...App
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);


/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	});
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
//随机数
Vue.prototype.serial = function(numCount, wordCount, myDefinedSN) {
	numCount = numCount ? numCount : 6;
	wordCount = wordCount ? wordCount : 2;
	myDefinedSN = myDefinedSN ? '-' + myDefinedSN : '';
	var timestamp = new Date().getTime(); //需要13位毫秒级时间戳
	var $nums = '0123456789';
	var numsRandom = '';
	for (var i = 0; i < numCount; i++) {
		//需要6位随机数字
		numsRandom += $nums.charAt(Math.floor(Math.random() * $nums.length));
	}
	var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charsRandom = '';
	for (var i = 0; i < wordCount; i++) {
		//需要2位随机字母
		charsRandom += $chars.charAt(Math.floor(Math.random() * $chars.length));
	}
	return charsRandom + timestamp + numsRandom + myDefinedSN; //13位时间戳(毫秒级) + 8位随机数(2位字母置于开头, 6位数字置于结尾)
};

Vue.prototype.openPage = function(hasLogin, type, path) {
	if (hasLogin == 'login') {
		if (!this.vuex_haslogin) {
			this.$u.route({
				url: '/pages/login/login'
			});
		} else {
			if (type == 'back') {
				this.$u.route({
					type: 'navigateBack'
				});
			}
			if (type == 'to') {
				this.$u.route({
					url: '/pages/' + path
				});
			}
			if (type == 'tab') {
				this.$u.route({
					type: 'switchTab',
					url: '/pages/' + path
				});
			}
		}
	} else {
		if (type == 'back') {
			this.$u.route({
				type: 'navigateBack'
			});
		}
		if (type == 'to') {
			this.$u.route({
				url: '/pages/' + path
			});
		}
		if (type == 'tab') {
			this.$u.route({
				type: 'switchTab',
				url: '/pages/' + path
			});
		}
	}
};

Vue.prototype.openAllPage = function(hasLogin, type, path) {
	if (hasLogin == 'login') {
		if (!this.vuex_haslogin) {
			this.$u.route({
				url: '/pages/login/login'
			});
		} else {
			if (type == 'back') {
				this.$u.route({
					type: 'navigateBack'
				});
			}
			if (type == 'to') {
				this.$u.route({
					url: path
				});
			}
			if (type == 'tab') {
				this.$u.route({
					type: 'switchTab',
					url: path
				});
			}
		}
	} else {
		if (type == 'back') {
			this.$u.route({
				type: 'navigateBack'
			});
		}
		if (type == 'to') {
			this.$u.route({
				url: path
			});
		}
		if (type == 'tab') {
			this.$u.route({
				type: 'switchTab',
				url: path
			});
		}
	}
};

Vue.prototype.html = function(str) {
	str = str.replace(/&amp;/g, '&');
	str = str.replace(/&lt;/g, '<');
	str = str.replace(/&gt;/g, '>');
	str = str.replace(/&quot;/g, "'");
	str = str.replace(/&#039;/g, "'");
	str = str.replace(/&nbsp;/g, " ");
	return str;
};

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage
};

App.mpType = 'app'


app.$mount()
