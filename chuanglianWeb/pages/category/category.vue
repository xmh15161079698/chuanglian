<template>
	
	<view class="content">
		<view class="">
			
			<view class="u-demo-area category_mine">
				<view class="fenlei_top">
					
					<view @click="btnClick0()" >分类<u-icon name="arrow-down"></u-icon></view>
					<u-popup border-radius="10" v-model="show0" 
						@close="close" @open="open" :mode="mode" 
						length="80%" :mask="mask"
						:mask-custom-style="maskCustomStyle"
					>
						<!-- <view v-for="(item1,index) in cats.typelist" :key="index">
							<view @click="btnClick1(item1.F_Goods_TypeName,$event)" style="border: none;">{{item1.F_Goods_TypeName}}<u-icon name="arrow-down"></u-icon></view>
							<u-popup border-radius="10" v-model="show1"
								@close="close" @open="open" :mode="mode" 
								length="80%" :mask="mask"
								
								:mask-custom-style="maskCustomStyle"
								
							>
								<view v-for="(item2,inx) in item1.Children" :key="inx">
									<view @click="btnClick2(item2.F_Goods_TypeName)"  style="border: none;">{{item2.F_Goods_TypeName}}<u-icon name="arrow-down"></u-icon></view>
									<u-popup border-radius="10" v-model="show2"
										@close="close" @open="open" :mode="mode" 
										length="80%" :mask="mask"
										
										:mask-custom-style="maskCustomStyle"
										
									>
										<view v-for="(item3,inxx) in item2.Children" :key="inxx">
											<view >{{item3.F_Goods_TypeName}}</view>
										</view>
									</u-popup>
								</view>
							</u-popup>
						</view> -->
						<u-select v-model="show3" mode="mutil-column-auto" :list="list" ></u-select>
					</u-popup>
				</view>
				
				<view v-for="(item3,index) in cats.objArr" :key="index" class="fenlei_top">
					<view @click="btnClick(index)">{{item3.parent.F_GoodsClass_Name}}<u-icon name="arrow-down"></u-icon></view>
					<u-popup border-radius="10" v-model="show[index].value" 
						@close="close" @open="open" :mode="mode" 
						length="80%" :mask="mask"
						
						:mask-custom-style="maskCustomStyle"
						
					>
						<view v-for="(item4,inx) in item3.son" :key="inx" style="margin: 10px 0;">
							<view>{{item4.F_GoodsClass_Name}}</view>
						</view>
					</u-popup>
				</view>
			</view>
			
				<!-- <u-dropdown >
						<u-dropdown-item v-model="value1" title='分类'  :options="options1" >
							<view>
								<u-dropdown-item v-model="value1" title='布艺帘'  :options="options1" >
									<u-dropdown-item v-model="value1" title='莫奈'  :options="options1" >
										
									</u-dropdown-item>
								</u-dropdown-item>
							</view>
						</u-dropdown-item>
						<u-dropdown-item v-model="value1" title='颜色'  :options="options2" ></u-dropdown-item>
						<u-dropdown-item v-model="value2" title='风格'  :options="options3" ></u-dropdown-item>
						<u-dropdown-item v-model="value3" title='空间'  :options="options4" ></u-dropdown-item>
					
				</u-dropdown> -->
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
	import {
		mapGetters,
	} from 'vuex'
	import store from '@/store/index.js'

	export default {
		data() {
			return {
				list:[],
				scrollTop: 0,
				index:0,
				bottom: 200,
				right: 40,
				top: 400,
				icon: 'arrow-upward',
				iconStyle: {
					color: '#909399',
					fontSize: '38rpx'
				},
				customStyle: {},
				locationX:0,
				show:[],
				show3:true,
				show_cate:[],
				show1:false,
				show0:false,
				show2:false,
				mode: 'bottom',
				maskCustomStyle:{
					background: 'rgba(0, 0, 0, 0.1)'
				},
				mask: true, // 是否显示遮罩
				closeable: true,
				value1: 1,
				value2: 1,
				value3: 1,
				cats : [],
				options1: [
				],
				options2: [
				],
				options3: [
				],
				options4: [
				],
			}
		},
		
		computed: {
			...mapGetters([
				'getCartCount'
			])
		},

		onLoad(options) {
			Rest.get(Api.ZHUIGE_SHOP_GOODS_CATEGORY).then(res => {
				this.cats = res.data;
				for (var i = 0; i < res.data.objArr.length; i++) {
					var parent = res.data.objArr[i];
					var obj = {value:false};
					this.show.push(obj);
					
				}
				var count=0;
				var list1=[];
				var list2=[];
				var list3=[];
				var list4=[];
				console.log(res.data.typelist)
				//this.list=res.data.typelist;
				for (var i = 0; i < res.data.typelist.length; i++) {
					count+=1;
					var parent = res.data.typelist[i];
					var obj1= {label:parent.F_Goods_TypeName,value:count,children:parent.Children};
					
					if(parent.Children.length>0){
						list2=[];
						for (var j = 0; j < parent.Children.length; j++) {
							
							count++
							var son = parent.Children[j];
							var obj2= {label:son.F_Goods_TypeName,value:count,children:son.Children};
							if(son.Children.length>0){
								list3=[];
								for (var k = 0; k < son.Children.length; k++) {
									count++
									var sun = son.Children[k];
									var obj3= {label:sun.F_Goods_TypeName,value:count};
									// if(sun.Children.length>0){
									// 	list4=[];
									// 	for (var m = 0; m < sun.Children.length; m++) {
									// 		count++
									// 		var csun = sun.Children[m];
									// 		var obj4= {label:csun.F_Goods_TypeName,value:count,children:csun.Children};
											
									// 		list4.push(obj4);
									// 	}
									// 	obj3.children=list4
											
									// 	
									// }
									list3.push(obj3);
									
								}
								obj2.children=list3
									
								
							}
							list2.push(obj2);
						}
						obj1.children = list2
						
					}
					list1.push(obj1)
					
				}
				this.list = list1;
				console.log("我的list=",this.list)
				//console.log("show_cate=",this.show_cate)
				// for (var j = 0; j < res.data[i].son.length; j++) {
				// 	if(i==0){
				// 		this.options1.push({label:res.data[i].son[j].F_GoodsClass_Name,value:(j+1),},)
				// 	}
						
				// 	if(i == 1){
				// 		this.options2.push({label:res.data[i].son[j].F_GoodsClass_Name,value:(j+1),},)
				// 	}
				// 	if(i == 2){
				// 		this.options3.push({label:res.data[i].son[j].F_GoodsClass_Name,value:(j+1),},)
				// 	}
					
				// }
				//console.log(this.cats)
				
				
				// if (this.cats.length > 0) {
				// 	this.cur_cat_id = this.cats[0].id;
				// }
			}, err => {
				console.log(err)
			});
			
			
		},
		
		onShow() {
			Util.updateCartBadge(this.getCartCount);
		},

		onShareAppMessage() {
			return {
				title: '商品分类_' + getApp().globalData.appName,
				path: 'pages/category/category'
			};
		},

		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			
			close() {
				// console.log('close');
			},
			open() {
				//console.log("打开=")
				// console.log('open');
			},
			// btnClick1(val){
			// 	console.log(val)
			// 	for(var i =0;i<this.show_cate.length;i++){
			// 		if(this.show_cate[i].key==val){
			// 			//console.log("进入了")
			// 			this.show_cate[i].value = true;
			// 		}
					
			// 	}
			// 	console.log(this.show_cate);
			// },
			btnClick(index) {
				//console.log(x)
				this.show[index].value=true;
			},
			btnClick0() {
				//console.log(x)
				this.show0=true;
				this.show3=true;
			},
			btnClick1() {
				//console.log(x)
				this.show1=true;
			},
			btnClick2() {
				//console.log(x)
				this.show2=true;
			},
			
			
			// m(val){
			// 	//console.log("名称=",val);
			// 	for(var i =0;i<this.show_cate.length;i++){
			// 		if(this.show_cate[i].key==val){
			// 			return this.show_cate[i].value;
			// 		}
					
			// 	}
			// 	console.log("m=",this.show_cate);
			// },
			
			clickLink(link) {
				Util.openLink(link);
			},

			clickTopCat(cat_id) {
				this.cur_cat_id = cat_id;
			},
			
			/**
			 * 添加商品数量
			 */
			clickGoodsAdd(goods_id, count) {
				store.commit('cartGoodsAdd', {
					goods_id: goods_id,
					count: count
				});
				
				Util.updateCartBadge(this.getCartCount);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/style/main.css";
</style>
