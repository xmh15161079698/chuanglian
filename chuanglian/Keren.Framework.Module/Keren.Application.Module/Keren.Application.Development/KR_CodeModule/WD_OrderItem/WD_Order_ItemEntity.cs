using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 16:14
    /// 描 述：订单详情
    /// </summary>
    public class WD_Order_ItemEntity 
    {
        #region 实体成员
        /// <summary>
        /// 子订单编号
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 订单编号
        /// </summary>
        [Column("F_ORDER_ID")]
        public string F_Order_Id { get; set; }
        /// <summary>
        /// 用户编号
        /// </summary>
        [Column("F_USER_ID")]
        public string F_User_Id { get; set; }
        /// <summary>
        /// 商品编号
        /// </summary>
        [Column("F_GOODS_ID")]
        public string F_Goods_Id { get; set; }
        /// <summary>
        /// 商品名称
        /// </summary>
        [Column("F_GOODS_NAME")]
        public string F_Goods_Name { get; set; }
        /// <summary>
        /// 商品图片地址
        /// </summary>
        [Column("F_GOODS_IMAGEADDR")]
        public string F_Goods_ImageAddr { get; set; }
        /// <summary>
        /// 创建订单时的商品单价
        /// </summary>
        [Column("F_CURRENTUNITPRICE")]
        public decimal? F_CurrentUnitPrice { get; set; }
        /// <summary>
        /// 商品数量
        /// </summary>
        [Column("F_GOODS_AMOUNT")]
        public int? F_Goods_Amount { get; set; }
        /// <summary>
        /// 商品总价
        /// </summary>
        [Column("F_TOTALPRICE")]
        public decimal? F_TotalPrice { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [Column("F_CREATETIME")]
        public DateTime? F_CreateTime { get; set; }
        /// <summary>
        /// F_CreateUserName
        /// </summary>
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary>
        /// F_CreateUserId
        /// </summary>
        [Column("F_CREATEUSERID")]
        public string F_CreateUserId { get; set; }
        /// <summary>
        /// F_CreateDate
        /// </summary>
        [Column("F_CREATEDATE")]
        public DateTime? F_CreateDate { get; set; }
        /// <summary>
        /// F_DeleteMark
        /// </summary>
        [Column("F_DELETEMARK")]
        public int? F_DeleteMark { get; set; }
        #endregion

        #region 扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
            this.F_DeleteMark = 0;
            
        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue"></param>
        public void Modify(string keyValue)
        {
            this.F_Id = keyValue;
        }
        #endregion
        #region 扩展字段
        #endregion
    }
}

