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
    public class GoodsOrderApi : BaseApi
    {

        
        public GoodsOrderApi()
            : base("/api/goodsOrder")
        {
            Get["/getgoodsList"] = GetGoodsList;
            Get["/getgoodsdetailbyId"] = GetGoodsDetailById;
            Post["/getgoodscolorListbyid"] = GetGoodsColorListById;
            Post["/createorder"] = CreateOrder;
            Post["/getallorderfy"] = GetAllOrderFenYe;
            Get["/getallorder"] = GetAllOrder;
            Post["/getnotorderfy"] = GetNotOrderFenYe;
            Post["/gethasorderfy"] = GetHasOrderFenYe;
            Post["/deleteorder"] = DeleteOrder;
            Post["/getorderinfobyid"] = GetOrderById;

            //Get["/index.html"] = MainIndex;
            //Get["/bgimg"] = BgImg;
        }
        private WD_GoodsIBLL goodsIBLL = new WD_GoodsBLL();
        private WD_GoodsImgIBLL goodsImgIBLL = new WD_GoodsImgBLL();
        private WD_GoodsClassIBLL goodsClassIBLL = new WD_GoodsClassBLL();
        private WD_GoodsTypeIBLL goodsTypeIBLL = new WD_GoodsTypeBLL();
        private WD_ColorCardIBLL colorCardIBLL = new WD_ColorCardBLL();
        private WD_OrderIBLL orderIBLL = new WD_OrderBLL();
        private WD_OrderItemIBLL orderItemIBLL = new WD_OrderItemBLL();
        private WD_AddressIBLL addressIBLL = new WD_AddressBLL();
        
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
        public Response CreateOrder(dynamic _)
        {
            var param = GetReq<WD_OrderEntity>();
            
            orderIBLL.CreateOrder(null, param);
           


            return Success("创建订单成功");
        }

        public Response DeleteOrder(dynamic _)
        {
            var orderId = GetReqData();
            var order = orderIBLL.GetWD_OrderEntity(orderId);
            var orderItem = orderItemIBLL.GetWD_Order_ItemEntity(orderId);
            orderIBLL.DeleteOrder(order,orderItem);
            return Success("删除订单成功");
        }
        public Response GetAllOrderFenYe(dynamic _)
        {
            var pag = GetReq<Pagination>();

            var retcount = orderIBLL.GetOrderLen(pag.uid);
            pag.records = retcount.count;
            pag.sidx = "time";
            pag.sord = "desc";
            var orderList = orderIBLL.GetAllOrderFenYe(pag,pag.uid);
            var list = new ArrayList();
            foreach(var order in orderList)
            {
                var goods = goodsIBLL.GetGoodsDetailById(order.goodsId);
                var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
                var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
                var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
                var colorCard = colorCardIBLL.GetWD_ColorCardEntity(goods.F_Goods_ColorCardId);
                order.color = color.F_GoodsClass_Name;
                order.style = style.F_GoodsClass_Name;
                order.space = space.F_GoodsClass_Name;
                if (colorCard != null) { order.colorCard = colorCard.F_ColorCard_Name; }
                list.Add(order);
            }
            return Success(list);
        }

        public Response GetNotOrderFenYe(dynamic _)
        {
            var pag = GetReq<Pagination>();

            var retcount = orderIBLL.GetNotOrderLen(pag.uid);
            pag.records = retcount.count;
            pag.sidx = "time";
            pag.sord = "desc";
            var orderList = orderIBLL.GetNotOrderFenYe(pag, pag.uid);
            var list = new ArrayList();
            foreach (var order in orderList)
            {
                var goods = goodsIBLL.GetGoodsDetailById(order.goodsId);
                var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
                var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
                var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
                var colorCard = colorCardIBLL.GetWD_ColorCardEntity(goods.F_Goods_ColorCardId);
                order.color = color.F_GoodsClass_Name;
                order.style = style.F_GoodsClass_Name;
                order.space = space.F_GoodsClass_Name;
                if (colorCard != null) { order.colorCard = colorCard.F_ColorCard_Name; }
                list.Add(order);
            }
            return Success(list);
        }

        public Response GetHasOrderFenYe(dynamic _)
        {
            var pag = GetReq<Pagination>();

            var retcount = orderIBLL.GetHasOrderLen(pag.uid);
            pag.records = retcount.count;
            pag.sidx = "time";
            pag.sord = "desc";
            var orderList = orderIBLL.GetHasOrderFenYe(pag, pag.uid);
            var list = new ArrayList();
            foreach (var order in orderList)
            {
                var goods = goodsIBLL.GetGoodsDetailById(order.goodsId);
                var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
                var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
                var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
                var colorCard = colorCardIBLL.GetWD_ColorCardEntity(goods.F_Goods_ColorCardId);
                order.color = color.F_GoodsClass_Name;
                order.style = style.F_GoodsClass_Name;
                order.space = space.F_GoodsClass_Name;
                if (colorCard != null) { order.colorCard = colorCard.F_ColorCard_Name; }
                list.Add(order);
            }
            return Success(list);
        }

        public Response GetAllOrder(dynamic _)
        {
            var uid = GetReqData();
            var orderList = orderIBLL.GetAllOrder(uid);
            var list = new ArrayList();
            foreach (var order in orderList)
            {
                var goods = goodsIBLL.GetGoodsDetailById(order.goodsId);
                var color = goodsClassIBLL.GetColorByGoodsId(goods.F_Goods_ColorId);
                var style = goodsClassIBLL.GetStyleByGoodsId(goods.F_Goods_StyleId);
                var space = goodsClassIBLL.GetSpaceByGoodsId(goods.F_Goods_SpaceId);
                var colorCard = colorCardIBLL.GetWD_ColorCardEntity(goods.F_Goods_ColorCardId);
                order.color = color.F_GoodsClass_Name;
                order.style = style.F_GoodsClass_Name;
                order.space = space.F_GoodsClass_Name;
                if (colorCard != null) { order.colorCard = colorCard.F_ColorCard_Name; }
                list.Add(order);
            }
            return Success(list);
        }

        public Response GetOrderById(dynamic _)
        {
            var uid = GetReqData();
            var order = orderIBLL.GetWD_OrderEntity(uid);
            var address = addressIBLL.GetWD_AddressEntity(order.F_Address_Id);
            var ret = new
            {
                order,
                address
            };
            return Success(ret);
        }



    }
}