using Keren.Application.Extention.TaskScheduling;
using Keren.Cache.Base;
using Keren.Cache.Factory;
using System;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Keren.Application.Web
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：应用程序全局设置
    /// </summary>
    public class MvcApplication : HttpApplication
    {
        /// <summary>
        /// 启动应用程序
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            // 启动的时候清除全部缓存
            ICache cache = CacheFactory.CaChe();
            cache.RemoveAll(6);

            QuartzHelper.InitJob();
        }

        /// <summary>
        /// 应用程序错误处理
        /// </summary>
        /// <param name="sender">sender</param>
        /// <param name="e">EventArgs</param>
        protected void Application_Error(object sender, EventArgs e)
        {
            var lastError = Server.GetLastError();
        }
    }
}
