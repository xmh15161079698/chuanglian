using Keren.Util;
using System;
using System.Data;
using System.Collections.Generic;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 16:00
    /// 描 述：订单
    /// </summary>
    public class WD_OrderBLL : WD_OrderIBLL
    {
        private WD_OrderService wD_OrderService = new WD_OrderService();
        private WD_OrderItemService orderItemService = new WD_OrderItemService();

        #region 获取数据
        public void DeleteOrder(WD_OrderEntity order, WD_Order_ItemEntity orderItem)
        {
            try
            {

                wD_OrderService.UpdateEntity(order);
                orderItemService.UpdateEntity(orderItem);
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
        public RetCount GetHasOrderLen(string uid)
        {
            try
            {

                return wD_OrderService.GetHasOrderLen(uid);
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

        public RetCount GetNotOrderLen(string uid)
        {
            try
            {

                return wD_OrderService.GetNotOrderLen(uid);
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

        public RetCount GetOrderLen(string uid)
        {
            try
            {

                return wD_OrderService.GetOrderLen(uid);
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

        public IEnumerable<OrderRet> GetAllOrderFenYe(Pagination pagination, string queryJson)
        {
            try
            {

                return wD_OrderService.GetAllOrderFenYe(pagination, queryJson);
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

        public IEnumerable<OrderRet> GetNotOrderFenYe(Pagination pagination, string queryJson)
        {
            try
            {

                return wD_OrderService.GetNotOrderFenYe(pagination, queryJson);
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

        public IEnumerable<OrderRet> GetHasOrderFenYe(Pagination pagination, string queryJson)
        {
            try
            {

                return wD_OrderService.GetHasOrderFenYe(pagination, queryJson);
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

        public IEnumerable<OrderRet> GetAllOrder(string uid)
        {
            try
            {

                return wD_OrderService.GetAllOrder(uid);
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

        protected static string GetRandomTime()
        {
            Random rd = new Random();
            string DateStr = DateTime.Now.ToString("yyyyMMddHHmmssMM");
            string str = DateStr + rd.Next(10000).ToString().PadLeft(4, '0');
            return str;
        }
        public void CreateOrder(string key,WD_OrderEntity entity)
        {
            try
            {
                entity.F_Order_Id = GetRandomTime();
                WD_OrderEntity order = new WD_OrderEntity();
                order.F_Address_Id = entity.F_Address_Id;
                order.F_User_Id = entity.F_User_Id;
                order.F_Payment = entity.F_Payment;
                order.F_Status = entity.F_Status;
                order.F_Remark = entity.F_Remark;
                order.F_Order_Id = entity.F_Order_Id;
                entity.OrderItem.F_Order_Id = entity.F_Order_Id;
                //entity.F_PaymentDate = DateTime.Now;
                wD_OrderService.SaveEntity(key,order);
                WD_Order_ItemEntity orderItem = new WD_Order_ItemEntity();
                orderItem = entity.OrderItem;
                orderItemService.SaveEntity(null,orderItem);
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
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<WD_OrderEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                return wD_OrderService.GetPageList(pagination, queryJson);
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
        /// 获取WD_Order表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_OrderEntity GetWD_OrderEntity(string keyValue)
        {
            try
            {
                return wD_OrderService.GetWD_OrderEntity(keyValue);
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
                wD_OrderService.DeleteEntity(keyValue);
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
        /// <returns></returns>
        public void SaveEntity(string keyValue, WD_OrderEntity entity)
        {
            try
            {
                wD_OrderService.SaveEntity(keyValue, entity);
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
