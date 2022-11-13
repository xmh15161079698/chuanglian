using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-27 10:16
    /// 描 述：商品管理
    /// </summary>
    public class WD_GoodsEntity 
    {
        #region 实体成员
        /// <summary>
        /// 商品ID
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 商品名称
        /// </summary>
        [Column("F_GOODS_NAMEID")]
        public string F_Goods_NameId { get; set; }
        /// <summary>
        /// 商品单价
        /// </summary>
        [Column("F_GOODS_PRICE")]
        public decimal? F_Goods_Price { get; set; }
        /// <summary>
        /// 商品库存数量
        /// </summary>
        [Column("F_GOODS_STOCKS")]
        public int? F_Goods_Stocks { get; set; }
        /// <summary>
        /// F_FromDate
        /// </summary>
        [Column("F_FROMDATE")]
        public DateTime? F_FromDate { get; set; }
        /// <summary>
        /// F_ToDate
        /// </summary>
        [Column("F_TODATE")]
        public DateTime? F_ToDate { get; set; }
        /// <summary>
        /// F_Goods_ColorId
        /// </summary>
        [Column("F_GOODS_COLORID")]
        public string F_Goods_ColorId { get; set; }
        /// <summary>
        /// F_Goods_StyleId
        /// </summary>
        [Column("F_GOODS_STYLEID")]
        public string F_Goods_StyleId { get; set; }
        /// <summary>
        /// F_Goods_SpaceId
        /// </summary>
        [Column("F_GOODS_SPACEID")]
        public string F_Goods_SpaceId { get; set; }
        /// <summary>
        /// F_Goods_SpaceId
        /// </summary>
        [Column("F_Goods_ColorCardId")]
        public string F_Goods_ColorCardId { get; set; }
        /// <summary>
        /// 商品详情
        /// </summary>
        [Column("F_GOODS_Detail")]
        public string F_Goods_Detail { get; set; }
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
        [NotMapped]
        public string p { get; set; }
        [NotMapped]
        public string son { get; set; }
        [NotMapped]
        public string sun { get; set; }
        #endregion
    }
}

