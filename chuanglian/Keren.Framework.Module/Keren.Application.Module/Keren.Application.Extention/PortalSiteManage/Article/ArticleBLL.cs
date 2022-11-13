﻿using Keren.Application.Base.SystemModule;
using Keren.Util;
using System;
using System.Collections.Generic;

namespace Keren.Application.Extention.PortalSiteManage
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2018-09-05 09:35
    /// 描 述：详细信息维护
    /// </summary>
    public class ArticleBLL : ArticleIBLL
    {
        private ArticleService articleService = new ArticleService();
        private ImgIBLL imgIBLL = new ImgBLL();

        #region 获取数据

        /// <summary>
        /// 获取列表数据
        /// <summary>
        /// <returns></returns>
        public IEnumerable<ArticleEntity> GetList( string queryJson )
        {
            try
            {
                return articleService.GetList(queryJson);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取列表分页数据
        /// <param name="pagination">分页参数</param>
        /// <summary>
        /// <returns></returns>
        public IEnumerable<ArticleEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                return articleService.GetPageList(pagination, queryJson);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public ArticleEntity GetEntity(string keyValue)
        {
            try
            {
                return articleService.GetEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                articleService.DeleteEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 保存实体数据（新增、修改）
        /// <param name="keyValue">主键</param>
        /// <summary>
        /// <returns></returns>
        public void SaveEntity(string keyValue, ArticleEntity entity)
        {
            try
            {
                articleService.SaveEntity(keyValue, entity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        #endregion

        #region 扩展方法
        /// <summary>
        /// 获取图片
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void GetImg(string keyValue)
        {
            ArticleEntity entity = GetEntity(keyValue);
            string img = "";
            if (entity != null && !string.IsNullOrEmpty(entity.F_Img))
            {
                ImgEntity imgEntity = imgIBLL.GetEntity(entity.F_Img);

                if (imgEntity != null && !string.IsNullOrEmpty(imgEntity.F_Content))
                {
                    FileDownHelper.DownLoadBase64(imgEntity.F_Content, imgEntity.F_Name);
                    return;
                }
            }
            else
            {
                img = "/Content/images/plhome/banner_df.jpg";
            }

            if (string.IsNullOrEmpty(img))
            {
                img = "/Content/images/plhome/banner_df.jpg";
            }
            FileDownHelper.DownLoad(img);
        }
        #endregion
    }
}
