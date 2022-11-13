using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Extention.TaskScheduling
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-09 16:07
    /// 描 述：任务计划模板信息
    /// </summary>
    public class TSSchemeEntity
    {
        #region 实体成员 
        /// <summary> 
        /// 主键 
        /// </summary> 
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary> 
        /// 任务模板信息主键 
        /// </summary> 
        [Column("F_SCHEMEINFOID")]
        public string F_SchemeInfoId { get; set; }
        /// <summary> 
        /// 标志1.启用2.未启用 
        /// </summary> 
        [Column("F_ISACTIVE")]
        public int? F_IsActive { get; set; }
        /// <summary> 
        /// 创建时间 
        /// </summary> 
        [Column("F_CREATEDATE")]
        public DateTime? F_CreateDate { get; set; }
        /// <summary> 
        /// 创建人主键 
        /// </summary> 
        [Column("F_CREATEUSERID")]
        public string F_CreateUserId { get; set; }
        /// <summary> 
        /// 创建人姓名 
        /// </summary> 
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary> 
        /// 模板 
        /// </summary> 
        [Column("F_SCHEME")]
        public string F_Scheme { get; set; }
        #endregion

        #region 扩展操作 
        /// <summary> 
        /// 新增调用 
        /// </summary> 
        public void Create()
        {
            this.F_Id = Guid.NewGuid().ToString();
            this.F_CreateDate = DateTime.Now;
            UserInfo userInfo = LoginUserInfo.Get();
            this.F_CreateUserId = userInfo.userId;
            this.F_CreateUserName = userInfo.realName;
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
