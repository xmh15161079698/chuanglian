using Nancy;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Keren.Util;
using Keren.Application.Development.KR_CodeModule;

namespace Keren.Application.WebApi
{
    /// <summary>  
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：默认页面
    /// </summary>
    public class GoodsCategory : BaseApi
    {

        
        public GoodsCategory()
            : base("/api/goodscategory")
        {
            Get["/getgoodscateList"] = GetGoodsCateList;
            Post["/getgoodslistbycondition"] = GetGoodsListByCondition;
            //Get["/getgoodsdetailbyId"] = GetGoodsDetailById;

            //Get["/index.html"] = MainIndex;
            //Get["/bgimg"] = BgImg;
        }
        private WD_GoodsIBLL goodsIBLL = new WD_GoodsBLL();
        private WD_GoodsImgIBLL goodsImgIBLL = new WD_GoodsImgBLL();
        private WD_GoodsClassIBLL goodsClassIBLL = new WD_GoodsClassBLL();
        private WD_GoodsTypeIBLL goodsTypeIBLL = new WD_GoodsTypeBLL();

        ///// <summary>
        ///// 默认开始页面
        ///// </summary>
        ///// <param name="_"></param>
        ///// <returns></returns>
        //private Response MainIndex(dynamic _)
        //{
        //    return Response.AsFile("index.html");
        //}
        ///// <summary>
        ///// 默认开始页面图片
        ///// </summary>
        ///// <param name="_"></param>
        ///// <returns></returns>
        //private Response BgImg(dynamic _)
        //{
        //    return Response.AsImage("port.png");
        //}

        public Response GetGoodsCateList(dynamic _)
        {
            var goodsCatelist_P = goodsClassIBLL.GetGoodsCateList_P();
            ArrayList objArr = new ArrayList();
            foreach(var goodsCate in goodsCatelist_P)
            {
                var goodsCatelist_S = goodsClassIBLL.GetGoodsCateList_S(goodsCate.F_Id);
                var obj = new
                {
                   parent = goodsCate,
                   son = goodsCatelist_S

                };
                objArr.Add(obj);
            }


            var goodsTypeCatelist = goodsTypeIBLL.GetGoodsTypeCateList();
            var retObj = new {
                objArr,
                typelist = goodsTypeCatelist,
            };

            return Success(retObj);
        }
        
        public Response GetGoodsListByCondition(dynamic _)
        {
            var param_list = GetReq<ConditionParam>();
            ArrayList arrs = new ArrayList();
            var goods_list = goodsIBLL.GetGoodsListByCondition(param_list);
            foreach(var goods in goods_list)
            {
                var imgList = goodsImgIBLL.GetImgByGoodsId(goods.F_Id);
                var obj = new
                {
                    goods = goods,
                    imgList = imgList
                };
                arrs.Add(obj);
            }
            return Success(arrs);
        }


        public Response GetGoodsDetailById(dynamic _)
        {
            var goodsId = this.GetReqData();
            
            var goods = goodsIBLL.GetGoodsDetailById(goodsId);
            var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
            var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
            var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
            var imgList = goodsImgIBLL.GetImgByGoodsId(goods.F_Id);
            goods.F_Goods_ColorId = color.F_GoodsClass_Name;
            goods.F_Goods_StyleId = style.F_GoodsClass_Name;
            goods.F_Goods_SpaceId = space.F_GoodsClass_Name;
            var obj = new
            {
                goods = goods,
                imgList = imgList

            };
              
            return Success(obj);
        }

    }
    //class ParInfo
    //{
    //    public string goods { get; set; }
    //}
}