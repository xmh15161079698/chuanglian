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
    /// 日 期：2022-10-24 16:00
    /// 描 述：订单
    /// </summary>
    public class WD_OrderService : RepositoryFactory
    {
        #region 获取数据

        public void UpdateEntity(WD_OrderEntity order)
        {
            try
            {
                order.F_DeleteMark = 1;
                this.BaseRepository().Update<WD_OrderEntity>(order);
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

        public RetCount GetHasOrderLen(string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                count(*) as count
                ");
                strSql.Append("  FROM WD_Order t");
                strSql.Append("  WHERE  t.F_User_Id = @uid and t.F_Status=2 and t.F_DeleteMark=0");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
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

        public RetCount GetNotOrderLen(string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                count(*) as count
                ");
                strSql.Append("  FROM WD_Order t");
                strSql.Append("  WHERE  t.F_User_Id = @uid and t.F_Status=1 and t.F_DeleteMark=0");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
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

        public RetCount GetOrderLen(string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                count(*) as count
                ");
                strSql.Append("  FROM WD_Order t");
                strSql.Append("  WHERE  t.F_User_Id = @uid and t.F_DeleteMark=0");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
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

        public IEnumerable<OrderRet> GetAllOrderFenYe(Pagination pagination, string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Status as state,
                t.F_Order_Id as orderId,
                i.F_Goods_Id as goodsId,
                t.F_CreateDate as time,
                i.F_Goods_Name as title,
                i.F_CurrentUnitPrice as price,
                i.F_Goods_ImageAddr as image,
                i.F_Goods_Amount as number 
                ");
                strSql.Append("  FROM WD_Order t,WD_Order_Item i");
                strSql.Append("  WHERE t.F_Order_Id = i.F_Order_Id and t.F_User_Id = @uid and t.F_DeleteMark=0");
                
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
                return this.BaseRepository().FindList<OrderRet>(strSql.ToString(), dp, pagination);
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

        public IEnumerable<OrderRet> GetNotOrderFenYe(Pagination pagination, string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Status as state,
                t.F_Order_Id as orderId,
                i.F_Goods_Id as goodsId,
                t.F_CreateDate as time,
                i.F_Goods_Name as title,
                i.F_CurrentUnitPrice as price,
                i.F_Goods_ImageAddr as image,
                i.F_Goods_Amount as number 
                ");
                strSql.Append("  FROM WD_Order t,WD_Order_Item i");
                strSql.Append("  WHERE t.F_Order_Id = i.F_Order_Id and t.F_User_Id = @uid and t.F_Status=1 and t.F_DeleteMark=0");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
                return this.BaseRepository().FindList<OrderRet>(strSql.ToString(), dp, pagination);
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

        public IEnumerable<OrderRet> GetHasOrderFenYe(Pagination pagination, string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Status as state,
                t.F_Order_Id as orderId,
                i.F_Goods_Id as goodsId,
                t.F_CreateDate as time,
                i.F_Goods_Name as title,
                i.F_CurrentUnitPrice as price,
                i.F_Goods_ImageAddr as image,
                i.F_Goods_Amount as number 
                ");
                strSql.Append("  FROM WD_Order t,WD_Order_Item i");
                strSql.Append("  WHERE t.F_Order_Id = i.F_Order_Id and t.F_User_Id = @uid and t.F_Status=2 and t.F_DeleteMark=0");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
                return this.BaseRepository().FindList<OrderRet>(strSql.ToString(), dp, pagination);
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

        public IEnumerable<OrderRet> GetAllOrder(string uid)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Status as state,
                i.F_Goods_Id as goodsId,
                t.F_CreateDate as time,
                i.F_Goods_Name as title,
                i.F_CurrentUnitPrice as price,
                i.F_Goods_ImageAddr as image,
                i.F_Goods_Amount as number 
                ");
                strSql.Append("  FROM WD_Order t,WD_Order_Item i");
                strSql.Append("  WHERE t.F_Order_Id = i.F_Order_Id and t.F_User_Id = @uid and t.F_DeleteMark=0");

                // 虚拟参数
                var dp = new DynamicParameters(new { });
                dp.Add("uid", uid);
                return this.BaseRepository().FindList<OrderRet>(strSql.ToString(), dp);
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
        public IEnumerable<WD_OrderEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(@"
                t.F_Id,
                t.F_Order_Id,
                t.F_User_Id,
                t.F_Address_Id,
                t.F_Payment,
                t.F_Postage,
                t.F_Status,
                t.F_PaymentDate,
                t.F_Remark,
                t.F_CreateDate
                ");
                strSql.Append("  FROM WD_Order t ");
                strSql.Append("  WHERE 1=1 ");
                var queryParam = queryJson.ToJObject();
                // 虚拟参数
                var dp = new DynamicParameters(new { });
                return this.BaseRepository().FindList<WD_OrderEntity>(strSql.ToString(),dp, pagination);
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
        /// 获取WD_Order表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_OrderEntity GetWD_OrderEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<WD_OrderEntity>(t => t.F_Order_Id == keyValue);
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
                this.BaseRepository().Delete<WD_OrderEntity>(t=>t.F_Order_Id== keyValue);
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
        public void SaveEntity(string keyValue, WD_OrderEntity entity)
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
