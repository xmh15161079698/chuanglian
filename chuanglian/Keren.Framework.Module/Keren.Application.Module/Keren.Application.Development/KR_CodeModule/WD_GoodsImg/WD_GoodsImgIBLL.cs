using Keren.Util;
using System.Data;
using System.Collections.Generic;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 15:33
    /// 描 述：图片地址
    /// </summary>
    public interface WD_GoodsImgIBLL
    {
        #region 获取数据

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        IEnumerable<WD_GoodsImgEntity> GetPageList(Pagination pagination, string queryJson);

        
        IEnumerable<WD_GoodsImgEntity> GetImgByGoodsId(string goodsId);
        /// <summary>
        /// 获取WD_GoodsImg表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        WD_GoodsImgEntity GetWD_GoodsImgEntity(string keyValue);
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
        void SaveEntity(string keyValue, WD_GoodsImgEntity entity);
        #endregion

    }
}
