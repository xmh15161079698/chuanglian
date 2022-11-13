﻿using Keren.Util;
using System.Collections.Generic;

namespace Keren.Application.Base.SystemModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2017-12-19 12:03
    /// 描 述：常用字段类
    /// </summary>
    public interface DbFieldIBLL
    {
        #region 获取数据
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="queryJson">条件参数</param>
        /// <returns></returns>
        IEnumerable<DbFieldEntity> GetList(string queryJson);
        /// <summary>
        /// 获取列表分页数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="queryJson">条件参数</param>
        /// <returns></returns>
        IEnumerable<DbFieldEntity> GetPageList(Pagination pagination, string queryJson);
        /// <summary>
        /// 获取实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        DbFieldEntity GetEntity(string keyValue);
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
        void SaveEntity(string keyValue, DbFieldEntity entity);
        #endregion
    }
}
