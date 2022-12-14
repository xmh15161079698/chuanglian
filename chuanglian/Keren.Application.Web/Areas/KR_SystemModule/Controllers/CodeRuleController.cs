using Keren.Application.Base.SystemModule;
using Keren.Util;
using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_SystemModule.Controllers
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.01
    /// 描 述：单据编号
    /// </summary>
    public class CodeRuleController : MvcControllerBase
    {
        CodeRuleIBLL codeRuleIBLL = new CodeRuleBLL();

        #region 视图功能
        /// <summary>
        /// 单据编号管理
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 表单
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
            return View();
        }
        /// <summary>
        /// 单据编号规则
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FormatForm() {
            return View();
        }

        #endregion

        #region 获取数据
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string keyword)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = codeRuleIBLL.GetPageList(paginationobj, keyword);
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records,
            };
            return Success(jsonData);
        }
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetList()
        {
            var data = codeRuleIBLL.GetList();
            return Success(data);
        }

        #endregion

        #region 数据验证
        /// <summary>
        /// 规则编码不能重复
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="F_EnCode">规则编码</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult ExistEnCode(string keyValue, string F_EnCode)
        {
            bool res = codeRuleIBLL.ExistEnCode(F_EnCode, keyValue);
            return Success(res);
        }
        /// <summary>
        /// 规则名不能重复
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="F_FullName"> 规则名</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult ExistFullName(string keyValue, string F_FullName)
        {
            bool res = codeRuleIBLL.ExistFullName(F_FullName, keyValue);
            return Success(res);
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 保存表单数据
        /// </summary>
        /// <param name="keyValue"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, CodeRuleEntity entity)
        {
            codeRuleIBLL.SaveEntity2(keyValue, entity);
            return Success("保存成功！");
        }
        /// <summary>
        /// 删除表单数据
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            codeRuleIBLL.VirtualDelete(keyValue);
            return Success("删除成功！");
        }
        #endregion

        #region 扩展方法
        /// <summary>
        /// 获取单据编码
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetEnCode(string code)
        {
            var data = codeRuleIBLL.GetBillCode(code);
            return SuccessString(data);
        }
        #endregion
    }
}