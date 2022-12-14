namespace Keren.Application.Organization
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.27
    /// 描 述：公司数据模型
    /// </summary>
    public class CompanyModel
    {
        /// <summary>
        /// 公司上级Id
        /// </summary>
        public string parentId { get; set; }
        /// <summary>
        /// 公司名称
        /// </summary>
        public string name { get; set; }
    }
}
