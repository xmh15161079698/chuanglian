using System;
using System.Web.Mvc;

namespace Keren.Application.Web
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：仅允许Ajax操作
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class AjaxOnlyAttribute : ActionMethodSelectorAttribute
    {
        /// <summary>
        /// 初始化仅允许Ajax操作
        /// </summary>
        /// <param name="ignore">跳过Ajax检测</param>
        public AjaxOnlyAttribute(bool ignore = false)
        {
            Ignore = ignore;
        }

        /// <summary>
        /// 跳过Ajax检测
        /// </summary>
        public bool Ignore { get; set; }

        /// <summary>
        /// 验证请求有效性
        /// </summary>
        /// <param name="controllerContext">控制器上下文</param>
        /// <param name="methodInfo">方法</param>
        public override bool IsValidForRequest(ControllerContext controllerContext, System.Reflection.MethodInfo methodInfo)
        {
            if (Ignore)
                return true;
            return controllerContext.RequestContext.HttpContext.Request.IsAjaxRequest();
        }
    }
}