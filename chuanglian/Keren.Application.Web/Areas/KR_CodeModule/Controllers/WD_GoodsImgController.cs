﻿using Keren.Util;
using System.Data;
using Keren.Application.Development.KR_CodeModule;
using System.Web.Mvc;
using System.Collections.Generic;

namespace Keren.Application.Web.Areas.KR_CodeModule.Controllers
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 15:33
    /// 描 述：图片地址
    /// </summary>
    public class WD_GoodsImgController : MvcControllerBase
    {
        private WD_GoodsImgIBLL wD_GoodsImgIBLL = new WD_GoodsImgBLL();

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
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string queryJson)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = wD_GoodsImgIBLL.GetPageList(paginationobj, queryJson);
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records
            };
            return Success(jsonData);
        }
        /// <summary>
        /// 获取表单数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var WD_GoodsImgData = wD_GoodsImgIBLL.GetWD_GoodsImgEntity( keyValue );
            var jsonData = new {
                WD_GoodsImg = WD_GoodsImgData,
            };
            return Success(jsonData);
        }
        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            wD_GoodsImgIBLL.DeleteEntity(keyValue);
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="strEntity">实体</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, string strEntity)
        {
            WD_GoodsImgEntity entity = strEntity.ToObject<WD_GoodsImgEntity>();
            wD_GoodsImgIBLL.SaveEntity(keyValue,entity);
            if (string.IsNullOrEmpty(keyValue))
            {
            }
            return Success("保存成功！");
        }
        #endregion

    }
}
