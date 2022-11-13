using Dapper;
using Keren.DataBase.Repository;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-27 10:35
    /// 描 述：色卡管理
    /// </summary>
    public class WD_ColorCardService : RepositoryFactory
    {
        #region 获取数据
        
        public IEnumerable<WD_ColorCardEntity> GetGoodsColorListById(string id)
        {
            try
            {
                var strSql = new StringBuilder();
                
                strSql.Append(" select n.F_Id,n.F_ColorCard_Name,n.F_Type_Id,a.F_FilePath as F_ColorCard_Img from WD_ColorCard n,KR_Base_AnnexesFile a where n.F_Type_Id=(select t.F_Type_Id FROM WD_ColorCard t WHERE t.F_ColorCard_Name=@id) and  n.F_ColorCard_Img=a.F_FolderId");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("id", id);
                return this.BaseRepository().FindList<WD_ColorCardEntity>(strSql.ToString(), dp);
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

        public IEnumerable<WD_ColorCardEntity> GetCardIdByTypeId(string id)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_ColorCard_Name,
                t.F_Type_Id
                
                ");
                strSql.Append("  FROM WD_ColorCard t");
                strSql.Append("  WHERE  t.F_Type_Id=@id ");
                
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("id", id);
                return this.BaseRepository().FindList<WD_ColorCardEntity>(strSql.ToString(), dp);
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
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="pagination">查询参数</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<WD_ColorCardEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_ColorCard_Name,
                t.F_Type_Id,
                a.F_FilePath as F_ColorCard_Img
                ");
                strSql.Append("  FROM WD_ColorCard t,KR_Base_AnnexesFile a ");
                strSql.Append("  WHERE  a.F_FolderId = t.F_ColorCard_Img ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_ColorCardEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取WD_ColorCard表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_ColorCardEntity GetWD_ColorCardEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<WD_ColorCardEntity>(keyValue);
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
            try
            {
                this.BaseRepository().Delete<WD_ColorCardEntity>(t=>t.F_Id == keyValue);
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
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        public void SaveEntity(string keyValue, WD_ColorCardEntity entity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    entity.Modify(keyValue);
                    this.BaseRepository().Update(entity);
                }
                else
                {
                    entity.Create();
                    this.BaseRepository().Insert(entity);
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
