using System.Collections.Generic;

namespace Keren.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.17
    /// 描 述：用户关联对象
    /// </summary>
    public interface UserRelationIBLL
    {
        #region 获取数据
        /// <summary>
        /// 获取对象主键列表信息
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="category">分类:1-角色2-岗位</param>
        /// <returns></returns>
        List<UserRelationEntity> GetObjectIdList(string userId, int category);
        /// <summary>
        /// 获取对象主键列表信息
        /// </summary>
        /// <param name="userId">用户主键</param>
        /// <param name="category">分类:1-角色2-岗位</param>
        /// <returns></returns>
        string GetObjectIds(string userId, int category);
        /// <summary>
        /// 获取用户主键列表信息
        /// </summary>
        /// <param name="objectId">用户主键</param>
        /// <returns></returns>
        IEnumerable<UserRelationEntity> GetUserIdList(string objectId);
        /// <summary>
        /// 获取用户主键列表信息
        /// </summary>
        /// <param name="objectIdList">关联或角色主键集合</param>
        /// <returns></returns>
        IEnumerable<UserRelationEntity> GetUserIdList(List<string> objectIdList);
        #endregion

        #region 提交数据
        /// <summary>
        /// 保存用户对应对象数据
        /// </summary>
        /// <param name="objectId">对应对象主键</param>
        /// <param name="category">分类:1-角色2-岗位</param>
        /// <param name="userIds">对用户主键列表</param>
        void SaveEntityList(string objectId, int category, string userIds);
        #endregion
    }
}
