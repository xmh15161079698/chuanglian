using Keren.Util;
using System.Collections.Generic;
namespace Keren.Application.Organization
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.04
    /// 描 述：角色管理
    /// </summary>
    public interface RoleIBLL
    {
        #region 获取数据
        /// <summary>
        /// 获取角色数据列表
        /// </summary>
        /// <returns></returns>
        List<RoleEntity> GetList();
        /// <summary>
        /// 获取角色数据列表
        /// </summary>
        /// <param name="keyword">关键字</param>
        /// <returns></returns>
        List<RoleEntity> GetList(string keyword);
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">查询关键词</param>
        /// <returns></returns>
        List<RoleEntity> GetPageList(Pagination pagination, string keyword);
         /// <summary>
        /// 获取角色数据列表
        /// </summary>
        /// <param name="roleIds">主键串</param>
        /// <returns></returns>
        IEnumerable<RoleEntity> GetListByRoleIds(string roleIds);

        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <returns></returns>
        List<TreeModel> GetTree();
        #endregion

        #region 提交数据
        /// <summary>
        /// 虚拟删除角色
        /// </summary>
        /// <param name="keyValue">主键</param>
        void VirtualDelete(string keyValue);
        /// <summary>
        /// 保存角色（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="roleEntity">角色实体</param>
        /// <returns></returns>
        void SaveEntity(string keyValue, RoleEntity roleEntity);
        #endregion
    }
}
