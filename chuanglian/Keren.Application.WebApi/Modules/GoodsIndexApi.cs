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
    public class GoodsIndex : BaseApi
    {

        
        public GoodsIndex()
            : base("/api/goodsIndex")
        {
            Get["/getgoodsList"] = GetGoodsList;
            Get["/getgoodsdetailbyId"] = GetGoodsDetailById;
            Post["/getgoodscolorListbyid"] = GetGoodsColorListById;

            //Get["/index.html"] = MainIndex;
            //Get["/bgimg"] = BgImg;
        }
        private WD_GoodsIBLL goodsIBLL = new WD_GoodsBLL();
        private WD_GoodsImgIBLL goodsImgIBLL = new WD_GoodsImgBLL();
        private WD_GoodsClassIBLL goodsClassIBLL = new WD_GoodsClassBLL();
        private WD_GoodsTypeIBLL goodsTypeIBLL = new WD_GoodsTypeBLL();
        private WD_ColorCardIBLL colorCardIBLL = new WD_ColorCardBLL();
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

        public Response GetGoodsList(dynamic _)
        {
            var parm = GetReq<Pagination>();

            var count = goodsIBLL.GetGoodsList();
            parm.records = count.count;
            parm.sidx = "F_CreateDate";
            parm.sord = "asc";
            var goodslist = goodsIBLL.GetPageList(parm,null);
            ArrayList objArr = new ArrayList();
            foreach(var goods in goodslist)
            {
                var imgList = goodsImgIBLL.GetImgByGoodsId(goods.F_Id);
                var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
                var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
                var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
                var colorCard = colorCardIBLL.GetWD_ColorCardEntity(goods.F_Goods_ColorCardId);
                
                var goodsType = goodsTypeIBLL.GetGoodsTypeById(goods.F_Goods_NameId);
                string str = goodsType.F_Goods_TypeName;
                while (goodsType.F_ParentId!="0")
                {
                    goodsType = goodsTypeIBLL.GetGoodsTypeById(goodsType.F_ParentId);
                    str += "-"+goodsType.F_Goods_TypeName;
                }
                if (colorCard == null)
                {
                    var obj = new
                    {
                        F_Id = goods.F_Id,
                        F_Goods_Type = str,
                        F_Goods_Price = goods.F_Goods_Price,
                        F_Goods_Stocks = goods.F_Goods_Stocks,
                        F_FromDate = goods.F_FromDate,
                        F_ToDate = goods.F_ToDate,

                        F_Goods_ColorId = color.F_GoodsClass_Name,
                        F_Goods_StyleId = style.F_GoodsClass_Name,
                        F_Goods_SpaceId = space.F_GoodsClass_Name,

                        //F_Goods_ColorCardId = colorCard.F_ColorCard_Name,
                        F_Goods_Detail = goods.F_Goods_Detail,
                        F_DeleteMark = goods.F_DeleteMark,
                        F_CreateDate = goods.F_CreateDate,
                        imgList = imgList

                    };
                    objArr.Add(obj);
                }
                else
                {
                    var obj = new
                    {
                        F_Id = goods.F_Id,
                        F_Goods_Type = str,
                        F_Goods_Price = goods.F_Goods_Price,
                        F_Goods_Stocks = goods.F_Goods_Stocks,
                        F_FromDate = goods.F_FromDate,
                        F_ToDate = goods.F_ToDate,

                        F_Goods_ColorId = color.F_GoodsClass_Name,
                        F_Goods_StyleId = style.F_GoodsClass_Name,
                        F_Goods_SpaceId = space.F_GoodsClass_Name,

                        F_Goods_ColorCardId = colorCard.F_ColorCard_Name,
                        F_Goods_Detail = goods.F_Goods_Detail,
                        F_DeleteMark = goods.F_DeleteMark,
                        F_CreateDate = goods.F_CreateDate,
                        imgList = imgList

                    };
                    objArr.Add(obj);
                }
                
                
            }
            var list = new {
                objArr = objArr,
                count
            };
            return Success(list);
        }

        public Response GetGoodsDetailById(dynamic _)
        {
            var goodsId = this.GetReqData();
            
            var goods = goodsIBLL.GetGoodsDetailById(goodsId);
            var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
            var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
            var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
            var imgList = goodsImgIBLL.GetImgByGoodsId(goods.F_Id);
            var goodsType = goodsTypeIBLL.GetGoodsTypeById(goods.F_Goods_NameId);
            var colorCard = colorCardIBLL.GetWD_ColorCardEntity(goods.F_Goods_ColorCardId);

            string str = goodsType.F_Goods_TypeName;
            while (goodsType.F_ParentId != "0")
            {
                goodsType = goodsTypeIBLL.GetGoodsTypeById(goodsType.F_ParentId);
                str += "-" + goodsType.F_Goods_TypeName;
            }
            goods.F_Goods_ColorId = color.F_GoodsClass_Name;
            goods.F_Goods_StyleId = style.F_GoodsClass_Name;
            goods.F_Goods_SpaceId = space.F_GoodsClass_Name;
            if (colorCard != null) { goods.F_Goods_ColorCardId = colorCard.F_ColorCard_Name; }
            
            goods.F_Goods_NameId = str;
            var obj = new
            {
                goods = goods,
                imgList = imgList

            };
              
            return Success(obj);
        }

        public Response GetGoodsColorListById(dynamic _)
        {
            var colorId = this.GetReqData();


            var colorCardList = colorCardIBLL.GetGoodsColorListById(colorId);



            var obj = new
            {
                colorCardList

            };

            return Success(obj);
        }

    }
    class ParmInfo
    {
        public int pageNo { get; set; }
        public int pageSize { get; set; }
    }
}