using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 16:00
    /// 描 述：订单
    /// </summary>
    public class WD_OrderEntity 
    {
        #region 实体成员
        /// <summary>
        /// 订单编号
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 订单编号
        /// </summary>
        [Column("F_Order_ID")]
        public string F_Order_Id { get; set; }
        /// <summary>
        /// 用户编号
        /// </summary>
        [Column("F_USER_ID")]
        public string F_User_Id { get; set; }
        /// <summary>
        /// 收货信息编号
        /// </summary>
        [Column("F_ADDRESS_ID")]
        public string F_Address_Id { get; set; }
        /// <summary>
        /// 实付金额
        /// </summary>
        [Column("F_PAYMENT")]
        public decimal? F_Payment { get; set; }
        /// <summary>
        /// 运费
        /// </summary>
        [Column("F_POSTAGE")]
        public int? F_Postage { get; set; }
        /// <summary>
        /// 订单状态 0：已取消 1：未付款 2 ：已付款 3 ：已发货 4 ：交易成功
        /// </summary>
        [Column("F_STATUS")]
        public int? F_Status { get; set; }
        /// <summary>
        /// 支付时间
        /// </summary>
        [Column("F_PAYMENTDATE")]
        public DateTime? F_PaymentDate { get; set; }
        /// <summary>
        /// 支付时间
        /// </summary>
        [Column("F_Remark")]
        public string F_Remark { get; set; }
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
        public WD_Order_ItemEntity OrderItem { get; set; }
        #endregion
    }
}

