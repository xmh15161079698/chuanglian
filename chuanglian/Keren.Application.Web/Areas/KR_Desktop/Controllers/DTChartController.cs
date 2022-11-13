﻿using Keren.Application.Base.Desktop;
using Keren.Application.Base.SystemModule;
using System.Data;
using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_Desktop.Controllers
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2018-05-29 09:58
    /// 描 述：桌面图表配置
    /// </summary>
    public class DTChartController : MvcControllerBase
    {
        private DTChartIBLL dTChartIBLL = new DTChartBLL();
        private DatabaseLinkIBLL databaseLinkIBLL = new DatabaseLinkBLL();


        #region 视图功能
        /// <summary>
        /// 主页面
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 表单页
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
            return View();
        }
        #endregion

        #region 获取数据
        /// <summary>
        /// 获取列表数据
        /// <param name="pagination">分页参数</param>
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string queryJson)
        {
            var data = dTChartIBLL.GetList(queryJson);
            return Success(data);
        }
        /// <summary>
        /// 获取表单数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var data = dTChartIBLL.GetEntity(keyValue);
            return Success(data);
        }

        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="Id">主键</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetSqlData(string Id)
        {
            var data = dTChartIBLL.GetEntity(Id);
            if (data != null && !string.IsNullOrEmpty(data.F_Sql))
            {
                DataTable dt = databaseLinkIBLL.FindTable(data.F_DataSourceId, data.F_Sql);
                var jsonData2 = new
                {
                    Id,
                    value = dt
                };
                return Success(jsonData2);
            }
            else
            {
                var jsonData = new
                {
                    Id
                };
                return Success(jsonData);
            }
        }

        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            dTChartIBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, DTChartEntity entity)
        {
            dTChartIBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }
        #endregion

    }
}