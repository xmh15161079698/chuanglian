using Keren.DataBase.Repository;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Text;

namespace Keren.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：可人-框架开发组
    /// 日 期：2017-06-21 16:30
    /// 描 述：数据权限
    /// </summary>
    public class DataAuthorizeService : RepositoryFactory
    {
        #region 构造函数和属性

        private string dataAuthorizeConditionSql;
        private string dataAuthorizeRelationSql;
        /// <summary>
        /// 
        /// </summary>
        public DataAuthorizeService()
        {
            dataAuthorizeConditionSql = @"
                t.F_Id,
                t.F_DataAuthorizeRelationId,
                t.F_FieldId,
                t.F_FieldName,
                t.F_FieldType,
                t.F_Symbol,
                t.F_SymbolName,
                t.F_FiledValueType,
                t.F_FiledValue,
                t.F_Sort
            ";
            dataAuthorizeRelationSql = @"
                t.F_Id,
                t.F_Name,
                t.F_InterfaceId,
                t.F_Type,
                t.F_ObjectId,
                t.F_ObjectType, 
                t.F_Formula,
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
        /// 获取条件列表数据
        /// </summary>
        /// <param name="relationId">关系主键</param>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeConditionEntity> GetDataAuthorizeConditionList(string relationId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(" SELECT ");
                strSql.Append(dataAuthorizeConditionSql);
                strSql.Append(" FROM KR_Base_DataCondition t where t.F_DataAuthorizeRelationId = @relationId  ORDER BY t.F_Sort ");

                return this.BaseRepository().FindList<DataAuthorizeConditionEntity>(strSql.ToString(), new { relationId = relationId });
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
        /// 获取数据权限对应关系数据列表
        /// </summary>
        /// <param name="interfaceId">模块主键</param>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeRelationEntity> GetRelationList(string interfaceId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(dataAuthorizeRelationSql);
                strSql.Append(" FROM KR_Base_DataRelation t where F_InterfaceId = @interfaceId ");

                return this.BaseRepository().FindList<DataAuthorizeRelationEntity>(strSql.ToString(), new { interfaceId = interfaceId });
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
        /// 获取数据权限对应关系数据列表
        /// </summary>
        /// <param name="interfaceId">接口主键</param>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">查询关键词</param>
        /// <param name="objectId">对象主键</param>
        /// <param name="type">类型 2 自定义表单 其他普通接口</param>
        /// <returns></returns>
        public IEnumerable<DataAuthorizeRelationEntity> GetRelationPageList(Pagination pagination, string interfaceId, string keyword, string objectId,int type)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(dataAuthorizeRelationSql);
                strSql.Append(" ,u.F_RealName as UserName,r.F_FullName as RoleName FROM KR_Base_DataRelation t ");
                strSql.Append(" LEFT JOIN KR_Base_User u ON t.F_ObjectId = u.F_UserId ");
                strSql.Append(" LEFT JOIN KR_Base_Role r ON t.F_ObjectId = r.F_RoleId where 1=1");

                if (!string.IsNullOrEmpty(interfaceId))
                {
                    strSql.Append(" AND t.F_InterfaceId = @interfaceId ");
                }

                if (!string.IsNullOrEmpty(keyword))
                {
                    strSql.Append(" AND t.F_Name = @keyword ");
                }

                if (!string.IsNullOrEmpty(objectId))
                {
                    strSql.Append(" AND t.F_ObjectId = @objectId ");
                }

                if (type == 2)
                {// 自定义表单
                    strSql.Append(" AND t.F_Type = 2 ");
                }
                else{
                    strSql.Append(" AND (t.F_Type != 2 OR t.F_Type is Null) ");
                }

                return this.BaseRepository().FindList<DataAuthorizeRelationEntity>(strSql.ToString(), new { interfaceId = interfaceId, keyword = keyword, objectId = objectId }, pagination);
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
        /// 获取实体
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public DataAuthorizeRelationEntity GetRelationEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<DataAuthorizeRelationEntity>(keyValue);
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
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntity(string keyValue)
        {
            var db = this.BaseRepository().BeginTrans();
            try
            {
                db.Delete<DataAuthorizeConditionEntity>(t => t.F_DataAuthorizeRelationId == keyValue);
                db.Delete<DataAuthorizeRelationEntity>(t => t.F_Id == keyValue);
                db.Commit();
            }
            catch (Exception ex)
            {
                db.Rollback();
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
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="relationEntity">主键</param>
        /// <param name="conditionEntityList">主键</param>
        public void SaveEntity(string keyValue, DataAuthorizeRelationEntity relationEntity, List<DataAuthorizeConditionEntity> conditionEntityList)
        {
            var db = this.BaseRepository().BeginTrans();
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    relationEntity.Modify(keyValue);
                    db.Update(relationEntity);
                    db.Delete<DataAuthorizeConditionEntity>(t => t.F_DataAuthorizeRelationId == keyValue);
                }
                else
                {
                    relationEntity.Create();
                    db.Insert(relationEntity);
                }
                int sort = 0;
                foreach (var item in conditionEntityList)
                {
                    item.Create();
                    item.F_Sort = sort;
                    item.F_DataAuthorizeRelationId = relationEntity.F_Id;
                    db.Insert(item);
                    sort++;
                }
                db.Commit();
            }
            catch (Exception ex)
            {
                db.Rollback();
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
