using Keren.Util;
using System.Collections.Generic;

namespace Keren.Application.Base.SystemModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-02 12:03
    /// 描 述：图片保存
    /// </summary>
    public interface ImgIBLL
    {
        #region 获取数据

        /// <summary> 
        /// 获取页面显示列表数据 
        /// </summary> 
        /// <param name="pagination">分页参数</param> 
        /// <param name="queryJson">查询参数</param> 
        /// <returns></returns> 
        IEnumerable<ImgEntity> GetPageList(Pagination pagination, string queryJson);

        /// <summary> 
        /// 获取KR_Base_Img表实体数据
        /// </summary> 
        /// <param name="keyValue">主键</param> 
        /// <returns></returns> 
        ImgEntity GetEntity(string keyValue);

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
        void SaveEntity(string keyValue, ImgEntity entity);

        #endregion

        /// <summary>
        /// 获取图片
        /// </summary>
        /// <param name="keyValue">主键</param>
        void GetImg(string keyValue);
    }
}
