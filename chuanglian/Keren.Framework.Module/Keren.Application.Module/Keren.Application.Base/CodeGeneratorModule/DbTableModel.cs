﻿
namespace Keren.Application.BaseModule.CodeGeneratorModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.17
    /// 描 述：数据表配置信息
    /// </summary>
    public class DbTableModel
    {
        /// <summary>
        /// 数据表名
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 数据表字段
        /// </summary>
        public string field { get; set; }
        /// <summary>
        /// 被关联表
        /// </summary>
        public string relationName { get; set; }
        /// <summary>
        /// 被关联表字段
        /// </summary>
        public string relationField { get; set; }
        /// <summary>
        /// 数据表主键
        /// </summary>
        public string pk { get; set; }
        /// <summary>
        /// 表主键类型
        /// </summary>
        public string pkType { get; set; }
    }
}
