
using Keren.Util;
using System.Collections.Generic;

namespace Keren.Application.Organization
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.06
    /// 描 述：用户模块业务类(接口)
    /// </summary>
    public interface UsrIBLL
    {

        #region 获取数据

        /// <summary>
        /// 用户列表(根据公司主键)
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <returns></returns>
        List<UsrEntity> GetList(string companyId);
        /// <summary>
        /// 用户列表(根据公司主键,部门主键)
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <param name="departmentId">部门主键</param>
        /// <param name="keyword">查询关键词</param>
        /// <returns></returns>
        List<UsrEntity> GetList(string companyId, string departmentId, string keyword);
        /// <summary>
        /// 用户列表(全部)
        /// </summary>
        /// <returns></returns>
        List<UsrEntity> GetAllList();
        /// <summary>
        /// 用户列表(根据部门主键)
        /// </summary>
        /// <param name="departmentId">部门主键</param>
        /// <returns></returns>
        List<UsrEntity> GetListByDepartmentId(string departmentId);
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <param name="departmentId">部门主键</param>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">查询关键词</param>
        /// <returns></returns>
        List<UsrEntity> GetPageList(string companyId, string departmentId, Pagination pagination, string keyword);
        /// <summary>
        /// 用户列表（导出Excel）
        /// </summary>
        /// <returns></returns>
        void GetExportList();
         /// <summary>
        /// 获取实体,通过用户账号
        /// </summary>
        /// <param name="account">用户账号</param>
        /// <returns></returns>
        UsrEntity GetEntityByAccount(string account);
        /// <summary>
        /// 获取用户数据
        /// </summary>
        /// <param name="usrId">用户主键</param>
        /// <returns></returns>
        UsrEntity GetEntityByUsrId(string usrId);
        /// <summary>
        /// 获取用户列表数据
        /// </summary>
        /// <param name="usrIds">用户主键串</param>
        /// <returns></returns>
        List<UsrEntity> GetListByUsrIds(string usrIds);
        /// <summary>
        /// 获取映射数据
        /// </summary>
        /// <returns></returns>
        Dictionary<string, UsrModel> GetModelMap();
        /// <summary>
        /// 获取用户列表数据
        /// </summary>
        /// <returns></returns>
        List<UsrEntity> GetList();
        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <param name="parentId">父级id</param>
        /// <returns></returns>
         List<TreeModel> GetTree(string parentId);
        /// <summary>
        /// 获取用户本身和子公司的id
        /// </summary>
        /// <param name="parentId">父级ID</param>
        /// <returns></returns>
         List<string> GetSubNodes(string parentId);

        #endregion

        #region 提交数据
        /// <summary>
        /// 虚拟删除
        /// </summary>
        /// <param name="keyValue">主键</param>
        void VirtualDelete(string keyValue);
        /// <summary>
        /// 保存用户表单（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="usrEntity">用户实体</param>
        /// <returns></returns>
        void SaveEntity(string keyValue, UsrEntity usrEntity);
         /// <summary>
        /// 修改用户登录密码
        /// </summary>
        /// <param name="newPassword">新密码（MD5 小写）</param>
        /// <param name="oldPassword">旧密码（MD5 小写）</param>
        bool RevisePassword(string newPassword, string oldPassword);
        /// <summary>
        /// 重置密码(000000)
        /// </summary>
        /// <param name="keyValue">账号主键</param>
        void ResetPassword(string keyValue);
        /// <summary>
        /// 修改用户状态
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="state">状态：1-启动；0-禁用</param>
        void UpdateState(string keyValue, int state);
        #endregion

        #region 验证数据
        /// <summary>
        /// 账户不能重复
        /// </summary>
        /// <param name="account">账户值</param>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        bool ExistAccount(string account, string keyValue);
        #endregion

        #region 扩展方法
        /// <summary>
        /// 验证登录 F_UsrOnLine 0 不成功,1成功
        /// </summary>
        /// <param name="usrname">账号</param>
        /// <param name="password">密码 MD5 32位 小写</param>
        /// <returns></returns>
        UsrEntity CheckLogin(string usrname, string password);
        /// <summary>
        /// 获取用户头像
        /// </summary>
        /// <param name="usrId">用户ID</param>
        void GetImg(string usrId);
        #endregion
    }
}
