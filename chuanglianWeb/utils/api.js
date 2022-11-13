const Config = require("@/utils/config");

function makeURL(module, action) {
	return `http://localhost:31173/api/${module}/${action}`;
}

module.exports = {
	
	// ---------- 文章 ----------
	
	/**
	 * 获取页面详情
	 */
	//ZHUIGE_SHOP_POST_PAGE: makeURL('post', 'page'),
	
	
	// ---------- 商品 ----------
	
	/**
	 * 获取最新商品列表
	 */
	ZHUIGE_SHOP_GOODS_LAST: makeURL('goodsIndex', 'getgoodsList'),
	ZHUIGE_SHOP_GOODS_COLOR: makeURL('goodsIndex', 'getgoodscolorListbyid'),
	/**
	 * 获取商品详情
	 */
	ZHUIGE_SHOP_GOODS_DETAIL: makeURL('goodsIndex', 'getgoodsdetailbyId'),
	
	/**
	 * 获取分类配置
	 */
	ZHUIGE_SHOP_GOODS_CATEGORY: makeURL('goodscategory', 'getgoodscateList'),
	
	/**
	 * 搜索商品
	 */
	ZHUIGE_SHOP_GOODS_SEARCH: makeURL('goods', 'search'),
	
	/**
	 * 购物车商品
	 */
	ZHUIGE_SHOP_GOODS_CART: makeURL('goods', 'cart'),
	
	/**
	 * 积分兑换记录
	 */
	ZHUIGE_SHOP_GOODS_RECORD: makeURL('goods', 'record'),
	
	// ---------- 评论 ----------
	
	/**
	 * 获取评论
	 */
	ZHUIGE_SHOP_COMMENT_INDEX: makeURL('comment', 'index'),
	
	/**
	 * 添加评论
	 */
	ZHUIGE_SHOP_COMMENT_ADD: makeURL('comment', 'add'),
	
	/**
	 * 删除评论
	 */
	ZHUIGE_SHOP_COMMENT_DELETE: makeURL('comment', 'delete'),
	
	// ---------- 配置 ----------
	
	/**
	 * 获取首页配置
	 */
	ZHUIGE_SHOP_SETTING_HOME: makeURL('setting', 'home'),
	
	/**
	 * 获取我的配置
	 */
	ZHUIGE_SHOP_SETTING_MINE: makeURL('setting', 'mine'),
	
	/**
	 * 获取登录配置
	 */
	ZHUIGE_SHOP_SETTING_LOGIN: makeURL('setting', 'login'),
	
	// ---------- 用户 ----------
	
	/**
	 * 登录
	 */
	ZHUIGE_SHOP_USER_LOGIN: makeURL('user', 'login'),
	
	/**
	 * 设置手机号
	 */
	ZHUIGE_SHOP_SET_MOBILE: makeURL('user', 'set_mobile'),
	
	/**
	 * 注销
	 */
	ZHUIGE_SHOP_USER_LOGOUT: makeURL('user', 'logout'),
	
	// ---------- 订单 ----------
	
	/**
	 * 创建订单
	 */
	ZHUIGE_SHOP_ORDER_CREATE: makeURL('order', 'create'),
	
	/**
	 * 支付订单
	 */
	ZHUIGE_SHOP_ORDER_PAY: makeURL('order', 'pay'),
	
	/**
	 * 确认订单
	 */
	ZHUIGE_SHOP_ORDER_CONFIRM: makeURL('order', 'confirm'),
	
	/**
	 * 取消订单
	 */
	ZHUIGE_SHOP_ORDER_CANCEL: makeURL('order', 'cancel'),
	
	/**
	 * 删除订单
	 */
	ZHUIGE_SHOP_ORDER_DELETE: makeURL('order', 'delete'),
	
	/**
	 * 订单详情
	 */
	ZHUIGE_SHOP_ORDER_LIST: makeURL('order', 'list'),
	
	/**
	 * 订单详情
	 */
	ZHUIGE_SHOP_ORDER_DETAIL: makeURL('order', 'detail'),
	
	/**
	 * 订单统计
	 */
	ZHUIGE_SHOP_ORDER_COUNT: makeURL('order', 'count'),
	
};
