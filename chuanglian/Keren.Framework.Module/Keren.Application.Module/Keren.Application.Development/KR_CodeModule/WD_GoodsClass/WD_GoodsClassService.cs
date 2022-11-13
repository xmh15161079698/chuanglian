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
    /// 日 期：2022-10-24 15:19
    /// 描 述：商品类别
    /// </summary>
    public class WD_GoodsClassService : RepositoryFactory
    {
        #region 获取数据

        public IEnumerable<WD_GoodsClassEntity> GetGoodsCateList_S(string id)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t ");
                strSql.Append("  WHERE t.F_ParentId=@id ");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("id", id);
                return this.BaseRepository().FindList<WD_GoodsClassEntity>(strSql.ToString(), dp);
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

        public IEnumerable<WD_GoodsClassEntity> GetGoodsCateList_P()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t ");
                strSql.Append("  WHERE t.F_ParentId=0 ");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_GoodsClassEntity>(strSql.ToString(), dp);
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

        public IEnumerable<WD_GoodsClassEntity> GetGoodsCateList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t ");
                strSql.Append("  WHERE 1=1 ");
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_GoodsClassEntity>(strSql.ToString(), dp);
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


        public WD_GoodsClassEntity GetColorByGoodsId(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t");
                strSql.Append("  WHERE t.F_Id= @goodsId");
                
                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsId", goodsId);
                return this.BaseRepository().FindEntity<WD_GoodsClassEntity>(strSql.ToString(), dp);
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

        public WD_GoodsClassEntity GetStyleByGoodsId(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t");
                strSql.Append("  WHERE t.F_Id= @goodsId");

                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsId", goodsId);
                return this.BaseRepository().FindEntity<WD_GoodsClassEntity>(strSql.ToString(), dp);
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


        public WD_GoodsClassEntity GetSpaceByGoodsId(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t");
                strSql.Append("  WHERE t.F_Id= @goodsId");

                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsId", goodsId);
                return this.BaseRepository().FindEntity<WD_GoodsClassEntity>(strSql.ToString(), dp);
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
        public IEnumerable<WD_GoodsClassEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_GoodsClass_Name,
                t.F_ParentId
                ");
                strSql.Append("  FROM WD_GoodsClass t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_GoodsClassEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取WD_GoodsClass表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_GoodsClassEntity GetWD_GoodsClassEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<WD_GoodsClassEntity>(keyValue);
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
                this.BaseRepository().Delete<WD_GoodsClassEntity>(t=>t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, WD_GoodsClassEntity entity)
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
