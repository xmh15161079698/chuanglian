namespace Keren.Application.Base.SystemModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：自定义查询-查询对象数据模型
    /// </summary>
    public class CustmerQueryModel
    {
        /// <summary>
        /// 字段
        /// </summary>
        public string field { get; set; }
        /// <summary>
        /// 字段中文名
        /// </summary>
        public string fieldname { get; set; }
        /// <summary>
        /// 比较符号类型1:等于;2:不等于;3:包含;4:不包含;
        /// </summary>
        public int condition { get; set; }
        /// <summary>
        /// 比较符号名称
        /// </summary>
        public string conditionname { get; set; }
        /// <summary>
        /// 数据类型1:文本;2:当前账号;3:当前公司;4:当前部门;5:当前岗位;
        /// </summary>
        public int type { get; set; }
        /// <summary>
        /// 具体数据值
        /// </summary>
        public string value { get; set; }
    }
}
