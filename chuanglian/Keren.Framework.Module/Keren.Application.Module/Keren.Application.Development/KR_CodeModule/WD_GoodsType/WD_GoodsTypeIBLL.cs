using Keren.Util;
using System.Data;
using System.Collections.Generic;
using System.Collections;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-27 10:58
    /// 描 述：商品系列管理
    /// </summary>
    public interface WD_GoodsTypeIBLL
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        IEnumerable<WD_GoodsTypeEntity> GetPageList(Pagination pagination, string queryJson);
        
        ArrayList GetGoodsTypeCateList();
        
        IEnumerable<WD_GoodsTypeEntity> GetGoodsCateList_S(string id);
        WD_GoodsTypeEntity GetGoodsTypeById(string id);
        /// <summary>
        /// 获取WD_GoodsType表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        WD_GoodsTypeEntity GetWD_GoodsTypeEntity(string keyValue);
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
        void SaveEntity(string keyValue, WD_GoodsTypeEntity entity);
        #endregion

    }
}
