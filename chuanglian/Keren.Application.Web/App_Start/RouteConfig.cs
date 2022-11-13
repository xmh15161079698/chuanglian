using System.Web.Mvc;
using System.Web.Routing;

namespace Keren.Application.Web
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：数据库类型枚举
    /// </summary>
    public class RouteConfig
    {
        /// <summary>
        /// 注册路由
        /// </summary>
        /// <param name="routes">路由控制器</param>
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("WebService1.asmx/{*pathInfo}");
            routes.IgnoreRoute("ActiveReports.ReportService.asmx/{*pathInfo}");
            routes.IgnoreRoute("{*allActiveReport}", new { allActiveReport = @".*\.ar13(/.*)?" });
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
