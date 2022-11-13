using System.Web.Mvc;

namespace Keren.Application.Web
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：过滤器
    /// </summary>
    public class FilterConfig
    {
        /// <summary>
        /// 注册全局注册器
        /// </summary>
        /// <param name="filters">过滤控制器</param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandlerErrorAttribute());
            //filters.Add(new ResultFillters());
        }
    }
}
