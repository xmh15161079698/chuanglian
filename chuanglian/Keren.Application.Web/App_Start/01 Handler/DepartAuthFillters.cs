using Keren.Application.Base.AuthorizeModule;
using System.Web.Mvc;

namespace Keren.Application.Web
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：控制器执行后执行
    /// </summary>
    public class DepartAuthFillters : FilterAttribute, IActionFilter
    {
        /// <summary>
        /// 执行完action后跳转后执行
        /// </summary>
        /// <param name="filterContext"></param>
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
        }
        /// <summary>
        /// 执行完action后跳转前执行
        /// </summary>
        /// <param name="filterContext"></param>
        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            DataAuthorizeBLL dataAuthorizeBLL = new DataAuthorizeBLL();
            dataAuthorizeBLL.SetWhereSql();
        }
    }
}