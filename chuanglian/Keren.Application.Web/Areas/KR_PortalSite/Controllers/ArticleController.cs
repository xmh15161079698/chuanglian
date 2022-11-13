﻿using Keren.Application.Base.SystemModule;
using Keren.Application.Extention.PortalSiteManage;
using Keren.Util;
using System;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_PortalSite.Controllers
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2018-09-05 09:35
    /// 描 述：详细信息维护
    /// </summary>
    public class ArticleController : MvcControllerBase
    {
        private ArticleIBLL articleIBLL = new ArticleBLL();
        private ImgIBLL imgIBLL = new ImgBLL();


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
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetList( string queryJson )
        {
            var data = articleIBLL.GetList(queryJson);
            return Success(data);
        }
        /// <summary>
        /// 获取列表分页数据
        /// <param name="pagination">分页参数</param>
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string queryJson)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = articleIBLL.GetPageList(paginationobj, queryJson);
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
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetFormData(string keyValue)
        {
            var data = articleIBLL.GetEntity(keyValue);
            return Success(data);
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
            string[] content = keyValue.Split(',');
            foreach (var item in content)
            {
                var entity = articleIBLL.GetEntity(item);
                articleIBLL.DeleteEntity(item);

                if (!string.IsNullOrEmpty(entity.F_Img)) {
                    imgIBLL.DeleteEntity(entity.F_Img);
                }

            }
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly, ValidateInput(false)]
        public ActionResult SaveForm(string keyValue,ArticleEntity entity)
        {
            articleIBLL.SaveEntity(keyValue, entity);
            return Success("保存成功！");
        }

        /// <summary>
        /// 保存图片和存储数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        /// <returns></returns>
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult UploadFile(string keyValue, ArticleEntity entity)
        {
            entity.F_Content = entity.F_Content.Replace("script","");
            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            //没有文件上传，直接返回
            if (files[0].ContentLength == 0 || string.IsNullOrEmpty(files[0].FileName))
            {
                articleIBLL.SaveEntity(keyValue, entity);
            }
            else
            {
                string FileEextension = Path.GetExtension(files[0].FileName);
                ImgEntity imgEntity = null;
                if (string.IsNullOrEmpty(entity.F_Img))
                {
                    imgEntity = new ImgEntity();
                }
                else
                {
                    imgEntity = imgIBLL.GetEntity(entity.F_Img);
                }
                imgEntity.F_Name = files[0].FileName;
                imgEntity.F_ExName = FileEextension;

                byte[] bytes = new byte[files[0].InputStream.Length];
                files[0].InputStream.Read(bytes, 0, bytes.Length);

                imgEntity.F_Content = Convert.ToBase64String(bytes);

                imgIBLL.SaveEntity(entity.F_Img, imgEntity);

                entity.F_ImgName = imgEntity.F_Name;
                entity.F_Img = imgEntity.F_Id;
                articleIBLL.SaveEntity(keyValue, entity);
            }

            return Success("保存成功。");
        }
        #endregion

        #region 扩展方法
        /// <summary>
        /// 获取设置图片
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetImg(string keyValue)
        {
            articleIBLL.GetImg(keyValue);
            return Success("获取成功。");
        }
        #endregion
    }
}
