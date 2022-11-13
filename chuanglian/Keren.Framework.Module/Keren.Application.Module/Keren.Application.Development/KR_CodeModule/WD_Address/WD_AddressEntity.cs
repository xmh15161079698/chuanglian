using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 14:58
    /// 描 述：地址管理
    /// </summary>
    public class WD_AddressEntity 
    {
        #region 实体成员
        /// <summary>
        /// 收货地址ID
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 用户ID
        /// </summary>
        [Column("F_USER_ID")]
        public string F_User_Id { get; set; }
        /// <summary>
        /// 收货详细地址
        /// </summary>
        [Column("F_Area")]
        public string F_Area { get; set; }
        /// <summary>
        /// 收货详细地址
        /// </summary>
        [Column("F_DETAIL_ADDRESS")]
        public string F_Detail_Address { get; set; }
        /// <summary>
        /// 是否默认地址 0：默认 1 ：不是默认
        /// </summary>
        [Column("F_IS_DEFAULT")]
        public int? F_Is_Default { get; set; }
        /// <summary>
        /// 收货人姓名
        /// </summary>
        [Column("F_RECEIVENAME")]
        public string F_ReceiveName { get; set; }
        /// <summary>
        /// 收货人电话
        /// </summary>
        [Column("F_RECEIVEPHONE")]
        public string F_ReceivePhone { get; set; }
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

