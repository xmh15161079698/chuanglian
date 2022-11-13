using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_CodeGeneratorModule.Controllers
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.09
    /// 描 述：字体图标查看
    /// </summary>
    public class IconController : MvcControllerBase
    {
        #region 视图功能
        /// <summary>
        /// 图标查看
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 手机图标查看
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult AppIndex()
        {
            return View();
        }
        #endregion
    }
}