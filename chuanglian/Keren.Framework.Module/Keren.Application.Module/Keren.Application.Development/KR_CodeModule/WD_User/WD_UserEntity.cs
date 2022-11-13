using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 12:12
    /// 描 述：用户信息
    /// </summary>
    public class WD_UserEntity 
    {
        #region 实体成员
        /// <summary>
        /// 用户编号
        /// </summary>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// 昵称
        /// </summary>
        [Column("F_NICKNAME")]
        public string F_NickName { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        [Column("F_GENDER")]
        public int? F_Gender { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        [Column("F_PHONE")]
        public string F_Phone { get; set; }
        /// <summary>
        /// 头像地址
        /// </summary>
        [Column("F_AVATARURL")]
        public string F_AvatarUrl { get; set; }
        /// <summary>
        /// F_OpenId
        /// </summary>
        [Column("F_OPENID")]
        public string F_OpenId { get; set; }
       
        
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

