using Keren.Util;
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
    public interface WD_OrderIBLL
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        IEnumerable<WD_OrderEntity> GetPageList(Pagination pagination, string queryJson);
        IEnumerable<OrderRet> GetAllOrderFenYe(Pagination pagination, string queryJson);
        IEnumerable<OrderRet> GetNotOrderFenYe(Pagination pagination, string queryJson);
        IEnumerable<OrderRet> GetHasOrderFenYe(Pagination pagination, string queryJson);
        IEnumerable<OrderRet> GetAllOrder(string uid);
        void DeleteOrder(WD_OrderEntity order,WD_Order_ItemEntity orderItem);
        void CreateOrder(string key,WD_OrderEntity entity);
        /// <summary>
        /// 获取WD_Order表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        WD_OrderEntity GetWD_OrderEntity(string keyValue);

        RetCount GetOrderLen(string uid);
        RetCount GetNotOrderLen(string uid);
        RetCount GetHasOrderLen(string uid);
        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        void DeleteEntity(string keyValue);
        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        void SaveEntity(string keyValue, WD_OrderEntity entity);
        #endregion

    }
}
