﻿using System.Collections.Generic;

namespace Keren.Application.Base.SystemModule
{

    /// <summary> 
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架 
    /// Copyright (c) 2015-2020 成都可人软件有限公司 
    /// 创 建：超级管理员 
    /// 日 期：2018-07-30 14:53 
    /// 描 述：logo设置 
    /// </summary> 
    public interface LogoImgIBLL
    {
        #region 获取数据 
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="queryJson">条件参数</param>
        /// <returns></returns>
        IEnumerable<LogoImgEntity> GetList(string queryJson);
        /// <summary> 
        /// 获取实体数据 
        /// </summary> 
        /// <param name="keyValue">主键</param> 
        /// <returns></returns> 
        LogoImgEntity GetEntity(string keyValue);
        /// <summary>
        /// 获取logo图片
        /// </summary>
        /// <param name="code">编码</param>
        void GetImg(string code);
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
        /// <param name="entity">实体</param> 
        void SaveEntity(LogoImgEntity entity);

        #endregion
    }
}
