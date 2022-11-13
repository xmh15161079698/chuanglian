using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Keren.Application.Development.KR_CodeModule

{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-11-04 12:01
    /// 描 述：轮播图管理
    /// </summary>
    public class WD_BannerEntity 
    {
        #region 实体成员
        /// <summary>
        /// F_Id
        /// </summary>
        /// <returns></returns>
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary>
        /// F_Title
        /// </summary>
        /// <returns></returns>
        [Column("F_TITLE")]
        public string F_Title { get; set; }
        /// <summary>
        /// F_LinkType
        /// </summary>
        /// <returns></returns>
        [Column("F_LINKTYPE")]
        public int? F_LinkType { get; set; }
        /// <summary>
        /// F_LinkUrl
        /// </summary>
        /// <returns></returns>
        [Column("F_LINKURL")]
        public string F_LinkUrl { get; set; }
        /// <summary>
        /// F_Image
        /// </summary>
        /// <returns></returns>
        [Column("F_IMAGE")]
        public string F_Image { get; set; }
        /// <summary>
        /// F_SortOrder
        /// </summary>
        /// <returns></returns>
        [Column("F_SORTORDER")]
        public int? F_SortOrder { get; set; }
        /// <summary>
        /// F_Desc
        /// </summary>
        /// <returns></returns>
        [Column("F_DESC")]
        public string F_Desc { get; set; }
        /// <summary>
        /// F_DeleteMark
        /// </summary>
        /// <returns></returns>
        [Column("F_DELETEMARK")]
        public int? F_DeleteMark { get; set; }
        /// <summary>
        /// F_CreateUserId
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEUSERID")]
        public string F_CreateUserId { get; set; }
        /// <summary>
        /// F_CreateUserName
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEUSERNAME")]
        public string F_CreateUserName { get; set; }
        /// <summary>
        /// F_CreateDate
        /// </summary>
        /// <returns></returns>
        [Column("F_CREATEDATE")]
        public DateTime? F_CreateDate { get; set; }
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
    }
}

