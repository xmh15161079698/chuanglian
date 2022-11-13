using Keren.DataBase.Repository;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Text;

namespace Keren.Application.Base.AuthorizeModule
{
    /// <summary>
    /// �� �� Keren-ADMS V7.0.6 �������ݿ������
    /// Copyright (c) 2015-2020 �ɶ�����������޹�˾
    /// �� ��������-��ܿ�����
    /// �� �ڣ�2017-06-21 16:30
    /// �� ��������Ȩ��
    /// </summary>
    public class DataAuthorizeService : RepositoryFactory
    {
        #region ���캯��������

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

        #region ��ȡ����
        /// <summary>
        /// ��ȡ�����б�����
        /// </summary>
        /// <param name="relationId">��ϵ����</param>
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
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// </summary>
        /// <param name="interfaceId">ģ������</param>
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
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// </summary>
        /// <param name="interfaceId">�ӿ�����</param>
        /// <param name="pagination">��ҳ����</param>
        /// <param name="keyword">��ѯ�ؼ���</param>
        /// <param name="objectId">��������</param>
        /// <param name="type">���� 2 �Զ���� ������ͨ�ӿ�</param>
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
                {// �Զ����
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
        /// ��ȡʵ��
        /// </summary>
        /// <param name="keyValue">����</param>
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

        #region �ύ����
        /// <summary>
        /// ɾ��ʵ������
        /// </summary>
        /// <param name="keyValue">����</param>
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
        /// ����ʵ�����ݣ��������޸ģ�
        /// </summary>
        /// <param name="keyValue">����</param>
        /// <param name="relationEntity">����</param>
        /// <param name="conditionEntityList">����</param>
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
