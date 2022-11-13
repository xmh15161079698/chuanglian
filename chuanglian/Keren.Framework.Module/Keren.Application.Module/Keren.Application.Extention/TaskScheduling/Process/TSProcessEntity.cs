﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Extention.TaskScheduling
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-09 16:07
    /// 描 述：任务进程
    /// </summary>
    public class TSProcessEntity
    {
        #region 实体成员 
        /// <summary> 
        /// 主键 
        /// </summary> 
        [Column("F_ID")]
        public string F_Id { get; set; }
        /// <summary> 
        /// 模板信息主键 
        /// </summary> 
        [Column("F_SCHEMEINFOID")]
        public string F_SchemeInfoId { get; set; }
        /// <summary> 
        /// 模板主键
        /// </summary> 
        [Column("F_SCHEMEID")]
        public string F_SchemeId { get; set; }
        /// <summary> 
        /// 开始时间 
        /// </summary> 
        [Column("F_BEGINTIME")]
        public DateTime? F_BeginTime { get; set; }
        /// <summary> 
        /// 结束类型1.无限期 2.有限期 
        /// </summary> 
        [Column("F_ENDTYPE")]
        public int? F_EndType { get; set; }
        /// <summary> 
        /// 结束时间 
        /// </summary> 
        [Column("F_ENDTIME")]
        public DateTime? F_EndTime { get; set; }
        /// <summary> 
        /// 状态 1.未执行2.运行中3.暂停4.已结束10.已关闭
        /// </summary> 
        [Column("F_STATE")]
        public int? F_State { get; set; }
        /// <summary> 
        /// F_CreateDate 
        /// </summary> 
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
        /// <summary>
        /// 任务名称
        /// </summary>
        [NotMapped]
        public string F_Name { get; set; }
        #endregion
    }
}
