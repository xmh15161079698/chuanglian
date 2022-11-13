namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.07
    /// 描 述：数据库参数
    /// </summary>
    public class FieldValueParam
    {
        /// <summary>
        /// 字段名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 数据值
        /// </summary>
        public object value { get; set; }
        /// <summary>
        /// 数据类型
        /// </summary>
        public int type { get; set; }
    }
}
