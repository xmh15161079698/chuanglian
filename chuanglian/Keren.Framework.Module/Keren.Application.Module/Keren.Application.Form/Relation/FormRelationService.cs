using Keren.DataBase.Repository;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Text;

namespace Keren.Application.Form
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.01
    /// 描 述：表单关联功能
    /// </summary>
    public class FormRelationService : RepositoryFactory
    {
        #region 属性 构造函数
        private string fieldSql;
        public FormRelationService()
        {
            fieldSql = @" 
                    t.F_Id,
                    t.F_CreateDate,
                    t.F_CreateUserId,
                    t.F_CreateUserName,
                    t.F_ModifyDate,
                    t.F_ModifyUserId,
                    t.F_ModifyUserName
            ";
        }
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
                var strSql = new StringBuilder();
                strSql.Append(" SELECT ");
                strSql.Append(fieldSql);
                strSql.Append(" ,s.F_Name as F_FormId,m.F_FullName as F_ModuleId  FROM KR_Form_Relation t ");
                strSql.Append(" LEFT JOIN KR_Form_SchemeInfo s ON t.F_FormId = s.F_Id ");
                strSql.Append(" LEFT JOIN KR_Base_Module m ON t.F_ModuleId = m.F_ModuleId WHERE 1=1 ");
                if (!string.IsNullOrEmpty(keyword))
                {
                    strSql.Append(" AND (s.F_Name like @keyword OR m.F_FullName like @keyword ) ");
                    keyword = "%" + keyword + "%";
                }
                return this.BaseRepository().FindList<FormRelationEntity>(strSql.ToString(), new { keyword = keyword }, pagination);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        /// <summary>
        /// 获取分页列表
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        public IEnumerable<FormRelationEntity> GetList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(" SELECT ");
                strSql.Append(fieldSql);
                strSql.Append(" ,t.F_FormId,m.F_FullName as F_ModuleId  FROM KR_Form_Relation t ");
                strSql.Append(" LEFT JOIN KR_Base_Module m ON t.F_ModuleId = m.F_ModuleId WHERE 1=1 ");
                return this.BaseRepository().FindList<FormRelationEntity>(strSql.ToString());
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
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
                return this.BaseRepository().FindEntity<FormRelationEntity>(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
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
                this.BaseRepository().Delete<FormRelationEntity>(t => t.F_Id == keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
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
                if (string.IsNullOrEmpty(keyValue))
                {
                    this.BaseRepository().Insert(formRelationEntity);
                }
                else
                {
                    formRelationEntity.Modify(keyValue);
                    this.BaseRepository().Update(formRelationEntity);
                }
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion
    }
}
