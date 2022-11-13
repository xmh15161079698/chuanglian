<template>
	<view class="content"
		:style="background ? 'background: url(' + background + ') no-repeat top; background-size: 100% auto;' : ''">

		<uni-nav-bar title="首页" :fixed="true" :statusBar="true" :placeholder="false">
			<!-- 顶部小搜索框 -->
			<!-- <view slot="left" @click="clickLink('/pages/search/search')">
				<view class="zhuige-nav-search">
					<uni-icons type="search" size="20" color="#999999"></uni-icons>
					<text>关键词...</text>
				</view>
			</view> -->
		</uni-nav-bar>

		<view class="zhuige-main-top">
			<!-- 大图轮播 -->
			<view v-if="slides && slides.length>0" class="zhuige-swiper">
				<swiper indicator-dots="true" autoplay="autoplay" circular="ture"
					indicator-color="rgba(255,255,255, 0.3)" indicator-active-color="rgba(255,255,255, 0.8)"
					interval="5000" duration="150" easing-function="linear">
					<swiper-item v-for="(slide, index) in slides" :key="index" @click="clickLink(slide.link)">
						<image :src="slide.image" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 自定义图标 -->
			<!-- <view v-if="icon_navs && icon_navs.length>0" class="zhuige-icon-menu">
				<view v-for="(icon, index) in icon_navs" :key="index" @click="clickLink(icon.link)">
					<image :src="icon.image" mode="aspectFill"></image>
					<text>{{icon.title}}</text>
				</view>
			</view> -->
		</view>
		<view class="u-demo-wrap">
			<u-back-top :scrollTop="scrollTop" :mode="mode"
			:bottom="bottom" :right="right" :top="top" :icon="icon" :custom-style="customStyle"
			:icon-style="iconStyle" :tips="tips"
			>
			</u-back-top>
		</view>
		<!-- 滑动推荐 -->
		<!-- <view v-if="home_rec" class="zhuige-recom">
			<view class="zhuige-title">
				<view>{{home_rec.title}}</view>
				<text>滑动查看</text>
			</view>
			<view v-if="home_rec.posts && home_rec.posts.length>0" class="zhuige-scroll">
				<scroll-view scroll-x="true">
					<view v-for="(post,index) in home_rec.posts" :key="index"
						@click="clickLink('/pages/detail/detail?goods_id=' + post.id)" class="zhuige-scroll-block">
						<image :src="post.thumbnail" mode="aspectFill"></image>
						<view>{{post.title}}</view>
					</view>
				</scroll-view>
			</view>
		</view> -->

		<view class="zhuige-goods-group">

			<!-- <view class="u-demo">
				<view class="u-demo-wrap">
					<view class="u-demo-area">
						<u-toast ref="uToast"></u-toast>
						<u-button @click="btnClick()">唤起弹窗</u-button>
						<u-popup border-radius="10" v-model="show" 
							@close="close" @open="open" :mode="mode" 
							length="50%" :mask="mask"
							:closeable="closeable"
							:close-icon-pos="closeIconPos"
						>
						
						
						
							<view v-if="mode == 'center'" style="height: 400rpx">
								<view class="close-btn">
									<u-button @click="show = false;" size="medium">关闭弹窗</u-button>
								</view>
							</view>
							<view class="close-btn" v-if="mode != 'center'">
								<u-button size="medium" @click="show = false;">关闭弹窗</u-button>
							</view>
						</u-popup>
					</view>
				</view>
			</view> -->
			<!-- 滑动导航 -->
			<!-- <view class="zhuige-goods-nav">
				<view class="zhuige-goods-scroll">
					<scroll-view>
						<view v-for="(item,index) in cats" :key="index" :class="cat_id==item.id?'active':''"
							@click="clickTab(item.id)">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view @click="clickCategory" class="zhuige-goods-more">
					<uni-icons type="bars" size="24"></uni-icons>
				</view>
			</view> -->

			<!-- 商品列表 -->
			<template v-if="goods_list.length>0">
				<view class="zhuige-goods-list">
					<view v-for="(item,index) in goods_list" :key="index"
						@click="clickLink('/pages/detail/detail?goods_id=' + item.F_Id)" class="zhuige-goods">
						<image :src="item.imgList[0].F_ImageAddress" mode="aspectFill"></image>
						<view class="zhuige-goods-text">
							<view class="zhuige-goods-title">
								<text>{{item.F_Goods_Type3==undefined?'':item.F_Goods_Type2}}</text> <text>{{item.F_Goods_Type1}}</text><br/>
								<text class="">{{item.F_Goods_SpaceId}}</text> 
								<text class="">{{item.F_Goods_ColorId}}</text>
								<text class="">{{item.F_Goods_StyleId}}</text>
							</view>
							<!-- <view class="zhuige-goods-price">
								<view class="promotion">
									<text>￥</text>
									<text>{{item.price}}</text>
								</view>
								<view class="original">
									<text>￥{{item.orig_price}}</text>
								</view>
							</view> -->
						</view>
					</view>
				</view>

				<uni-load-more :status="loadMore"></uni-load-more>
			</template>
			<template v-else>
				<jiangqie-no-data v-if="loaded"></jiangqie-no-data>
			</template>
		</view>

	</view>
</template>

<script>
	/*
	 * 追格商城小程序
	 * 作者: 追格
	 * 文档: https://www.zhuige.com/docs/sc.html
	 * gitee: https://gitee.com/zhuige_com/zhuige_shop
	 * github: https://github.com/zhuige-com/zhuige_shop
	 * Copyright © 2022 www.zhuige.com All rights reserved.
	 */

	import Util from '@/utils/util';
	import Alert from '@/utils/alert';
	import Api from '@/utils/api';
	import Rest from '@/utils/rest';
	import JiangqieNoData from "@/components/nodata/nodata";
	import {
		mapGetters,
	} from 'vuex'

	export default {
		data() {
			this.share_thumb = undefined;

			return {
				scrollTop: 0,
				
				bottom: 200,
				right: 40,
				top: 400,
				icon: 'arrow-upward',
				iconStyle: {
					color: '#909399',
					fontSize: '38rpx'
				},
				customStyle: {},
				type1:'',
				type2:'',
				type3:'',
				tips: '',
				show: false,
				mode: 'bottom',
				mask: true, // 是否显示遮罩
				closeable: true,

				background: undefined,

				slides: [],
				icon_navs: [],
				home_rec: undefined,

				cats: [],
				cat_id: undefined,

				goods_list: [],
				loadMore: 'more',
				loaded: false,
			}
		},

		computed: {
			...mapGetters([
				'getCartCount'
			])
		},

		components: {
			JiangqieNoData,
		},

		onLoad(options) {
			this.loadSetting();
			this.loadGoods();
		},

		onShow() {
			Util.updateCartBadge(this.getCartCount);
		},

		onReachBottom() {
			if (this.loadMore == 'more') {
				this.loadGoods();
			}
		},

		onPullDownRefresh() {
			this.refresh();
		},

		onShareAppMessage() {
			let params = {
				title: getApp().globalData.appDesc + '_' + getApp().globalData.appName,
				path: 'pages/index/index'
			};

			if (this.share_thumb) {
				params.imageUrl = this.share_thumb;
			}

			return params;
		},

		// #ifdef MP-WEIXIN
		onShareTimeline() {
			return {
				title: getApp().globalData.appName
			};
		},
		// #endif

		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			close() {
				// console.log('close');
			},
			open() {
				// console.log('open');
			},
			refresh() {
				this.loadSetting();

				this.loaded = false;
				this.goods_list = [];
				this.loadGoods();
			},

			clickLink(link) {
				Util.openLink(link);
			},
			btnClick() {
				console.log(11)
				this.show = true;
			},
			clickTab(cat_id) {
				this.cat_id = cat_id;

				this.loaded = false;
				this.goods_list = [];
				this.loadGoods();
			},

			clickCategory() {
				uni.switchTab({
					url: '/pages/category/category'
				})
			},

			loadSetting() {
							Rest.get(Api.ZHUIGE_SHOP_SETTING_HOME).then(res => {

								this.background = res.data.background;
								this.share_thumb = res.data.thumb;
			
								this.slides = res.data.slides;
								this.icon_navs = res.data.icon_navs;
								this.home_rec = res.data.home_rec;
			
								this.cats = res.data.cats;
								this.cat_id = this.cats[0].id;
			
								uni.stopPullDownRefresh();
							}, err => {
								console.log(err)
							});
						},


			loadGoods() {
				if (this.loadMore == 'loading') {
					return;
				}
				this.loadMore = 'loading';

				let params = {
					offset: this.goods_list.length
				};

				if (this.cat_id) {
					params.cat_id = this.cat_id;
				}

				Rest.get(Api.ZHUIGE_SHOP_GOODS_LAST).then(res => {
									this.goods_list = this.goods_list.concat(res.data.objArr);
									for (var i = 0; i < this.goods_list.length; i++) {
										this.type1 = this.goods_list[i].F_Goods_Type.split('-')[0];
										this.type2 = this.goods_list[i].F_Goods_Type.split('-')[1];
										this.type3 = this.goods_list[i].F_Goods_Type.split('-')[2];
										this.goods_list[i].F_Goods_Type1 = this.type1;
									  this.goods_list[i].F_Goods_Type2 = this.type2;
									  this.goods_list[i].F_Goods_Type3 = this.type3;
									}
									console.log(this.goods_list)
									this.loadMore = res.data.more;
									this.loaded = true;
								});

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/style/main.css";
</style>
