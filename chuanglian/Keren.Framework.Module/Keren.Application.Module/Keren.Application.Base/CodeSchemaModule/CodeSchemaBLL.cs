﻿using Keren.Util;
using System;
using System.Data;
using System.Collections.Generic;

namespace Keren.Application.Base.CodeSchemaModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-03-01 11:09
    /// 描 述：代码模板
    /// </summary>
    public class CodeSchemaBLL : CodeSchemaIBLL
    {
        private CodeSchemaService codeSchemaService = new CodeSchemaService();

        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<KR_Base_CodeSchemaEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                return codeSchemaService.GetPageList(pagination, queryJson);
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
        /// 获取KR_Base_CodeSchema表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public KR_Base_CodeSchemaEntity GetKR_Base_CodeSchemaEntity(string keyValue)
        {
            try
            {
                return codeSchemaService.GetKR_Base_CodeSchemaEntity(keyValue);
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
        /// 获取左侧树形数据
        /// </summary>
        /// <returns></returns>
         public List<TreeModel> GetTree()
        {
            try
            {
                DataTable list = codeSchemaService.GetSqlTree();
                List<TreeModel> treeList = new List<TreeModel>();
                foreach (DataRow item in list.Rows)
                {
                    TreeModel node = new TreeModel
                    {
                        id = item["f_itemdetailid"].ToString(),
                        text = item["f_itemname"].ToString(),
                        value = item["f_itemdetailid"].ToString(),
                        showcheck = false,
                        checkstate = 0,
                        isexpand = true,
                        parentId = item["f_parentid"].ToString()
                    };
                    treeList.Add(node);                }
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
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                codeSchemaService.DeleteEntity(keyValue);
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
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        public void SaveEntity(string keyValue, KR_Base_CodeSchemaEntity entity)
        {
            try
            {
                codeSchemaService.SaveEntity(keyValue, entity);
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
