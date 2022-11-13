﻿using Keren.Cache.Base;
using Keren.Cache.Factory;
using Keren.Util;
using System;
using System.Collections.Generic;

namespace Keren.Application.Form
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.01
    /// 描 述：表单关联功能
    /// </summary>
    public class FormRelationBLL : FormRelationIBLL
    {
        private FormRelationService formRelationService = new FormRelationService();
        private FormSchemeIBLL formSchemeIBLL = new FormSchemeBLL();

        #region 缓存定义
        private ICache cache = CacheFactory.CaChe();
        private string cacheKey = "Keren_ADMS_formrelation_";// +模板主键
        #endregion

        #region 获取数据
        /// <summary>
        /// 获取分页列表
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        public IEnumerable<FormRelationEntity> GetPageList(Pagination pagination, string keyword)
        {
            try
            {
                return formRelationService.GetPageList(pagination, keyword);
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
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public FormRelationEntity GetEntity(string keyValue)
        {
            try
            {
                FormRelationEntity entity = cache.Read<FormRelationEntity>(cacheKey + keyValue, CacheId.formRelation);
                if (entity == null)
                {
                    entity = formRelationService.GetEntity(keyValue);
                    cache.Write<FormRelationEntity>(cacheKey + keyValue, entity, CacheId.formRelation);
                }
                return entity;
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
        /// 获取树形数据列表
        /// </summary>
        /// <returns></returns>
        public List<TreeModel> GetTree()
        {
            try
            {
                var list = formRelationService.GetList();
                List<TreeModel> treeList = new List<TreeModel>();
                foreach (var item in list)
                {
                    TreeModel node = new TreeModel();
                    node.id = item.F_Id;
                    node.text = item.F_ModuleId;
                    node.value = item.F_FormId;
                    node.showcheck = false;
                    node.checkstate = 0;
                    node.isexpand = true;
                    node.parentId = "0";
                    treeList.Add(node);
                }
                return treeList.ToTree();
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
        /// 虚拟删除模板信息
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                formRelationService.DeleteEntity(keyValue);
                cache.Remove(cacheKey + keyValue, CacheId.formRelation);
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
        /// 保存模板信息
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="formRelationEntity">表单与功能信息</param>
        public void SaveEntity(string keyValue, FormRelationEntity formRelationEntity)
        {
            try
            {
                formRelationService.SaveEntity(keyValue, formRelationEntity);
                cache.Remove(cacheKey + keyValue, CacheId.formRelation);
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
    }
}
