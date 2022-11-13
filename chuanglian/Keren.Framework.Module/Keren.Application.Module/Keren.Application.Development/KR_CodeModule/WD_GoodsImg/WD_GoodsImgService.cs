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
    /// 日 期：2022-10-24 15:33
    /// 描 述：图片地址
    /// </summary>
    public class WD_GoodsImgService : RepositoryFactory
    {
        #region 获取数据

        public IEnumerable<WD_GoodsImgEntity> GetImgByGoodsId(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                a.F_FilePath as F_ImageAddress,
                t.F_Goods_Id
                ");
                strSql.Append("  FROM WD_GoodsImg t,KR_Base_AnnexesFile a");
                strSql.Append("  WHERE  a.F_FolderId = t.F_ImageAddress and t.F_Goods_Id = @goodsId and t.F_DeleteMark = 0");
                
                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsId", goodsId);
                return this.BaseRepository().FindList<WD_GoodsImgEntity>(strSql.ToString(), dp);
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
        public IEnumerable<WD_GoodsImgEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                a.F_FilePath as F_ImageAddress,
                t.F_Goods_Id
                ");
                strSql.Append("  FROM WD_GoodsImg t,KR_Base_AnnexesFile a");
                strSql.Append("  WHERE  a.F_FolderId = t.F_ImageAddress");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_GoodsImgEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取WD_GoodsImg表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_GoodsImgEntity GetWD_GoodsImgEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<WD_GoodsImgEntity>(keyValue);
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
                this.BaseRepository().Delete<WD_GoodsImgEntity>(t=>t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, WD_GoodsImgEntity entity)
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
