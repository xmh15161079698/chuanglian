using Keren.Util;
using System.Collections.Generic;

namespace Keren.Application.Base.SystemModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.01
    /// 描 述：接口管理
    /// </summary>
    public interface InterfaceIBLL
    {
        #region 获取数据
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <returns></returns>
        List<InterfaceEntity> GetList();
        /// <summary>
        /// 获取树形数据列表
        /// </summary>
        /// <returns></returns>
        List<TreeModel> GetTree();
        /// <summary>
        /// 获取分页列表
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键词</param>
        /// <returns></returns>
        List<InterfaceEntity> GetPageList(Pagination pagination, string keyword);
        /// <summary>
        /// 获取实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        InterfaceEntity GetEntity(string keyValue);
        /// <summary>
        /// 获取实体数据
        /// </summary>
        /// <param name="url">接口地址</param>
        /// <returns></returns>
        InterfaceEntity GetEntityByUrl(string url);
        #endregion

        #region 提交数据
        /// <summary>
        /// 虚拟删除分类数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        void DeleteEntity(string keyValue);
        /// <summary>
        /// 保存分类数据实体
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        void SaveEntity(string keyValue, InterfaceEntity entity);
        #endregion
    }
}
