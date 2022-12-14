using Keren.Util;
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
    public class ResultFillters : FilterAttribute, IResultFilter
    {
        /// <summary>
        /// 执行完action后跳转后执行
        /// </summary>
        /// <param name="filterContext"></param>
        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            if(filterContext.Result is ViewResult ){// 如果返回结果是视图
                var viewResult = (ViewResult)filterContext.Result;
                string html = string.Empty;
                IView view = ViewEngines.Engines.FindView(filterContext, viewResult.ViewName, string.Empty).View;
                using (System.IO.StringWriter sw = new System.IO.StringWriter())
                {
                    ViewContext vc = new ViewContext(filterContext, view, viewResult.ViewData, viewResult.TempData, sw);
                    vc.View.Render(vc, sw);
                    html = sw.ToString();
                }
                ContentResult Content = new ContentResult();
                Content.Content = html;
                filterContext.Result = Content;
            }
        }
        /// <summary>
        /// 执行完action后跳转前执行
        /// </summary>
        /// <param name="filterContext"></param>
        public void OnResultExecuting(ResultExecutingContext filterContext)
        {
        }
    }
}