
using System.Collections.Generic;
namespace Keren.Application.BaseModule.CodeGeneratorModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.17
    /// 描 述：查询条件设置数据
    /// </summary>
    public class QueryModel
    {
        /// <summary>
        /// 搜索框宽
        /// </summary>
        public int width { get; set; }
        /// <summary>
        /// 搜索框高
        /// </summary>
        public int height { get; set; }
        /// <summary>
        /// 是否启用时间搜索框 1 启用 0 不启用
        /// </summary>
        public string isDate { get; set; }
        /// <summary>
        /// 时间搜索框对应字段
        /// </summary>
        public string DateField { get; set; }
        /// <summary>
        /// 查询字段设置
        /// </summary>
        public List<QueryFieldModel> fields { get; set; }
    }
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.17
    /// 描 述：查询条件字段设置数据
    /// </summary>
    public class QueryFieldModel
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 字段名
        /// </summary>
        public string field { get; set; }
        /// <summary>
        /// 名字
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 比例
        /// </summary>
        public string portion { get; set; }
    }
}
