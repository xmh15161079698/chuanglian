using Dapper;
using Keren.Application.Development.KR_CodeModule.Common;
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
    /// 日 期：2022-10-24 14:01
    /// 描 述：商品信息
    /// </summary>
    public class WD_GoodsService : RepositoryFactory
    {
        #region 获取数据
        
        public IEnumerable<WD_GoodsEntity> GetGoodsListByCondition(ConditionParam param)
        {
            try
            {
                var strSql = new StringBuilder();
                var dp = new DynamicParameters(new { });
                strSql.Append(" SELECT g.F_Id,g.F_Goods_Price,g.F_Goods_Stocks,g.F_FromDate,g.F_ToDate,(SELECT F_GoodsClass_Name FROM dbo.WD_GoodsClass k WHERE g.F_Goods_ColorId= k.F_Id) F_Goods_ColorId,(SELECT F_GoodsClass_Name FROM dbo.WD_GoodsClass k WHERE g.F_Goods_StyleId= k.F_Id) F_Goods_StyleId,(SELECT F_GoodsClass_Name FROM dbo.WD_GoodsClass k WHERE g.F_Goods_SpaceId= k.F_Id) F_Goods_SpaceId,g.F_Goods_ColorCardId,g.F_Goods_Detail,t.p,t.son,t.sun FROM dbo.WD_Goods g LEFT JOIN (SELECT ISNULL(c.F_Id,a.F_Id) AS F_Id, b.F_Goods_TypeName AS p ,a.F_Goods_TypeName AS son,ISNULL(c.F_Goods_TypeName,'')AS sun FROM (SELECT n.* FROM dbo.WD_GoodsType n,(SELECT * FROM dbo.WD_GoodsType WHERE F_ParentId = '0') a WHERE a.F_Id = n.F_ParentId) a LEFT JOIN (SELECT * FROM dbo.WD_GoodsType WHERE F_ParentId = '0') b ON a.F_ParentId = b.F_Id LEFT JOIN dbo.WD_GoodsType c on  a.F_Id = c.F_ParentId) t ON g.F_Goods_NameId = t.F_Id ");
                strSql.Append("  WHERE 1=1 ");
                if (!string.IsNullOrEmpty(param.fenlei))
                {
                    if (param.fenlei.Contains("-"))
                    {
                        string[] res = param.fenlei.Split('-');
                        if (res.Length == 2)
                        {
                            strSql.Append(" and  t.p=@p  and t.son=@son ");
                            dp.Add("p", res[0]);
                            dp.Add("son", res[1]);
                        }
                        if (res.Length == 3)
                        {
                            strSql.Append(" and  t.p=@p  and t.son=@son  and t.sun=@sun ");
                            dp.Add("p", res[0]);
                            dp.Add("son", res[1]);
                            dp.Add("sun", res[2]);
                            
                        }
                    }
                    else
                    {
                        strSql.Append(" and  t.p=@p " );
                        dp.Add("p", param.fenlei);
                    }
                   
                }
                if (!string.IsNullOrEmpty(param.yanse))
                {
                    strSql.Append(" and (SELECT F_GoodsClass_Name FROM dbo.WD_GoodsClass k WHERE g.F_Goods_ColorId= k.F_Id) =@color ");
                    dp.Add("color", param.yanse);
                }
                if (!string.IsNullOrEmpty(param.fengge))
                {
                    strSql.Append(" and (SELECT F_GoodsClass_Name FROM dbo.WD_GoodsClass k WHERE g.F_Goods_StyleId= k.F_Id) =@style ");
                    dp.Add("style", param.fengge);
                }
                if (!string.IsNullOrEmpty(param.kongjian))
                {
                    strSql.Append(" and (SELECT F_GoodsClass_Name FROM dbo.WD_GoodsClass k WHERE g.F_Goods_SpaceId= k.F_Id) =@space ");
                    dp.Add("space", param.kongjian);
                }
                // 虚拟参数
                
                
                return this.BaseRepository().FindList<WD_GoodsEntity>(strSql.ToString(), dp);
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


        public WD_GoodsEntity GetColorCardByGoodsId(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Goods_NameId,
                t.F_Goods_Price,
                t.F_Goods_Stocks,
                t.F_FromDate,
                t.F_ToDate,
                t.F_Goods_ColorId,
                t.F_Goods_StyleId,
                t.F_Goods_SpaceId,
                t.F_Goods_ColorCardId,
                t.F_Goods_Detail
                ");
                strSql.Append("  FROM WD_Goods t ");
                strSql.Append("  WHERE t.F_Id=@goodsId ");

                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsId", goodsId);
                return this.BaseRepository().FindEntity<WD_GoodsEntity>(strSql.ToString(), dp);
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

        public GoodsTypeRes GetGoodsIdByName(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(" SELECT ISNULL(c.F_Id,a.F_Id) AS F_Id, (b.F_Goods_TypeName +'-'+a.F_Goods_TypeName+'-'+ISNULL(c.F_Goods_TypeName,'')) AS F_Type FROM (SELECT n.* FROM dbo.WD_GoodsType n,(SELECT * FROM dbo.WD_GoodsType WHERE F_ParentId = '0') a WHERE a.F_Id = n.F_ParentId) a LEFT JOIN (SELECT * FROM dbo.WD_GoodsType WHERE F_ParentId = '0') b ON a.F_ParentId = b.F_Id LEFT JOIN dbo.WD_GoodsType c on  a.F_Id = c.F_ParentId WHERE (b.F_Goods_TypeName +'-'+a.F_Goods_TypeName+'-'+ISNULL(c.F_Goods_TypeName,'')) = @goodsTypeName");

                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsTypeName", goodsId);
                return this.BaseRepository().FindEntity<GoodsTypeRes>(strSql.ToString(), dp);
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

        public WD_GoodsEntity GetGoodsDetailById(string goodsId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Goods_NameId,
                t.F_Goods_Price,
                t.F_Goods_Stocks,
                t.F_FromDate,
                t.F_ToDate,
                t.F_Goods_ColorId,
                t.F_Goods_StyleId,
                t.F_Goods_SpaceId,
                t.F_Goods_ColorCardId,
                t.F_Goods_Detail
                ");
                strSql.Append("  FROM WD_Goods t ");
                strSql.Append("  WHERE t.F_Id = @goodsId ");

                // 虚拟参数
                var dp = new DynamicParameters();
                dp.Add("goodsId", goodsId);
                return this.BaseRepository().FindEntity<WD_GoodsEntity>(strSql.ToString(), dp);
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

        public RetCount GetGoodsList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                count(*) as count
                ");
                strSql.Append("  FROM WD_Goods t ");
                strSql.Append("  WHERE 1=1");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindEntity<RetCount>(strSql.ToString(), dp);
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
        public IEnumerable<WD_GoodsEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Goods_NameId,
                t.F_Goods_Price,
                t.F_Goods_Stocks,
                t.F_FromDate,
                t.F_ToDate,
                t.F_Goods_ColorId,
                t.F_Goods_StyleId,
                t.F_Goods_SpaceId,
                t.F_Goods_ColorCardId,
                t.F_Goods_Detail,
                t.F_CreateDate
                ");
                strSql.Append("  FROM WD_Goods t ");
                strSql.Append("  WHERE 1=1 ");
                //var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_GoodsEntity>(strSql.ToString(), dp, pagination);
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
        /// 获取WD_Goods表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_GoodsEntity GetWD_GoodsEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<WD_GoodsEntity>(keyValue);
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
                this.BaseRepository().Delete<WD_GoodsEntity>(t => t.F_Id == keyValue);
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
        public void SaveEntity(string keyValue, WD_GoodsEntity entity)
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