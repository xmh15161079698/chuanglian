using Keren.DataBase.Repository;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Text;

namespace Keren.Application.Organization
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.04
    /// 描 述：岗位管理
    /// </summary>
    public class PostService : RepositoryFactory
    {
        #region 构造函数和属性
        private string fieldSql;
        public PostService()
        {
            fieldSql = @"
                    t.F_PostId,
                    t.F_ParentId,
                    t.F_Name,
                    t.F_EnCode,
                    t.F_CompanyId,
                    t.F_DepartmentId,
                    t.F_DeleteMark,
                    t.F_Description,
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
        /// 获取岗位数据列表（根据公司列表）
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <returns></returns>
        public IEnumerable<PostEntity> GetList(string companyId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(fieldSql);
                strSql.Append(" FROM KR_Base_Post t WHERE t.F_DeleteMark = 0 AND t.F_CompanyId =@companyId ORDER BY t.F_DepartmentId,t.F_ParentId,t.F_EnCode ");
                return this.BaseRepository().FindList<PostEntity>(strSql.ToString(), new { companyId = companyId });
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
        /// 获取岗位数据列表(根据主键串)
        /// </summary>
        /// <param name="postIds">根据主键串</param>
        /// <returns></returns>
        public IEnumerable<PostEntity> GetListByPostIds(string postIds)
        {
            try
            {
                return this.BaseRepository().FindList<PostEntity>(t => postIds.Contains(t.F_PostId));
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
        /// 获取岗位的实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public PostEntity GetEntity(string keyValue) {
            try
            {
                return this.BaseRepository().FindEntity<PostEntity>(keyValue);
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
        /// 获取下级岗位id集合
        /// </summary>
        /// <param name="parentIds">父级Id集合</param>
        /// <returns></returns>
        public List<string> GetIdList(List<string> parentIds)
        {
            try
            {
                List<string> res = new List<string>();
                var list = this.BaseRepository().FindList<PostEntity>(t => parentIds.Contains(t.F_ParentId));
                foreach (var item in list) {
                    res.Add(item.F_PostId);
                }
                return res;
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
        /// 虚拟删除
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void VirtualDelete(string keyValue)
        {
            var db = this.BaseRepository().BeginTrans();
            try
            {
                PostEntity entity = new PostEntity()
                {
                    F_PostId = keyValue,
                    F_DeleteMark = 1
                };
                db.Update(entity);
                db.ExecuteBySql(" Delete  From KR_BASE_USERRELATION where F_OBJECTID = @keyValue  ", new { keyValue = keyValue });

                //db.Delete<UserRelationEntity>(t=>t.F_ObjectId == keyValue);

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
        /// 保存岗位（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="postEntity">岗位实体</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, PostEntity postEntity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    postEntity.Modify(keyValue);
                    this.BaseRepository().Update(postEntity);
                }
                else
                {
                    postEntity.Create();
                    this.BaseRepository().Insert(postEntity);
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
