﻿using Keren.Util;
using System.Collections.Generic;

namespace Keren.Application.Extention.TaskScheduling
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-09 16:07
    /// 描 述：任务进程
    /// </summary>
    public interface TSProcessIBLL
    {
        #region 获取数据 

        /// <summary> 
        /// 获取页面显示列表数据 
        /// <summary> 
        /// <param name="pagination">分页参数</param> 
        /// <param name="queryJson">查询参数</param> 
        /// <returns></returns>
        IEnumerable<TSProcessEntity> GetPageList(Pagination pagination, string queryJson);

        /// <summary>
        /// 获取需要执行的任务实例
        /// </summary>
        /// <returns></returns>
        IEnumerable<TSProcessEntity> GetList();

        /// <summary> 
        /// 获取KR_TS_Process表实体数据 
        /// <param name="keyValue">主键</param> 
        /// <summary> 
        /// <returns></returns> 
        TSProcessEntity GetProcessEntity(string keyValue);

        #endregion

        #region 提交数据 

        /// <summary> 
        /// 删除实体数据 
        /// <param name="keyValue">主键</param> 
        /// <summary> 
        /// <returns></returns> 
        void DeleteEntity(string keyValue);

        /// <summary> 
        /// 保存实体数据（新增、修改） 
        /// <param name="keyValue">主键</param> 
        /// <summary> 
        /// <returns></returns> 
        void SaveEntity(string keyValue, TSProcessEntity entity);

        #endregion
    }
}
