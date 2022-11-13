using Keren.DataBase.Repository;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Keren.Application.Organization
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.04
    /// 描 述：用户模块数据操作服务类
    /// </summary>
    public class UsrService : RepositoryFactory
    {
        #region 属性 构造函数
        private string fieldSql;
        public  UsrService()
        {
            fieldSql = @" 
                        t.F_UsrId,
                        t.F_EnCode,
                        t.F_Account,
                        t.F_Password,
                        t.F_Secretkey,
                        t.F_RealName,
                        t.F_NickName,
                        t.F_HeadIcon,
                        t.F_QuickQuery,
                        t.F_SimpleSpelling,
                        t.F_Gender,
                        t.F_Birthday,
                        t.F_Mobile,
                        t.F_Telephone,
                        t.F_Email,
                        t.F_OICQ,
                        t.F_WeChat,
                        t.F_MSN,
                        t.F_CompanyId,
                        t.F_DepartmentId,
                        t.F_SecurityLevel,
                        t.F_OpenId,
                        t.F_Question,
                        t.F_AnswerQuestion,
                        t.F_CheckOnLine,
                        t.F_AllowStartTime,
                        t.F_AllowEndTime,
                        t.F_LockStartDate,
                        t.F_LockEndDate,
                        t.F_SortCode,
                        t.F_DeleteMark,
                        t.F_EnabledMark,
                        t.F_Description,
                        t.F_CreateDate,
                        t.F_CreateUsrId,
                        t.F_CreateUsrName,
                        t.F_ModifyDate,
                        t.F_ModifyUsrId,
                        t.F_ModifyUsrName
                        ";
        }
        #endregion

        #region 获取数据
       
        /// <summary>
        /// 获取实体,通过用户账号
        /// </summary>
        /// <param name="account">用户账号</param>
        /// <returns></returns>
        public UsrEntity GetEntityByAccount(string account)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(fieldSql);
                strSql.Append(" FROM KR_Base_Usr t ");
                strSql.Append(" WHERE t.F_Account = @account AND t.F_DeleteMark = 0  ");
                return this.BaseRepository().FindEntity<UsrEntity>(strSql.ToString(), new { account = account });
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 用户列表(根据公司主键)
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <returns></returns>
        public IEnumerable<UsrEntity> GetList(string companyId)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(fieldSql.Replace("t.F_Password,", "").Replace("t.F_Secretkey,", ""));
                strSql.Append(" FROM KR_Base_Usr t WHERE t.F_DeleteMark = 0 AND t.F_CompanyId = @companyId ORDER BY t.F_DepartmentId,t.F_RealName ");
                return this.BaseRepository().FindList<UsrEntity>(strSql.ToString(), new { companyId = companyId });
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }


        /// <summary>
        /// 用户列表(根据公司主键)(分页)
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="departmentId"></param>
        /// <param name="pagination"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public IEnumerable<UsrEntity> GetPageList(string companyId, string departmentId, Pagination pagination, string keyword)
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(fieldSql.Replace("t.F_Password,", "").Replace("t.F_Secretkey,", ""));
                strSql.Append(" FROM KR_Base_Usr t WHERE t.F_DeleteMark = 0 AND t.F_CompanyId = @companyId  ");

                if (!string.IsNullOrEmpty(departmentId)) {
                    strSql.Append(" AND t.F_DepartmentId = @departmentId ");
                }

                if (!string.IsNullOrEmpty(keyword)) {
                    keyword = "%" + keyword + "%";
                    strSql.Append(" AND( t.F_Account like @keyword or t.F_RealName like @keyword  or t.F_Mobile like @keyword  ) ");
                }

                return this.BaseRepository().FindList<UsrEntity>(strSql.ToString(), new { companyId , departmentId, keyword }, pagination);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }

        /// <summary>
        /// 用户列表,全部
        /// </summary>
        /// <returns></returns>
        public IEnumerable<UsrEntity> GetAllList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(fieldSql.Replace("t.F_Password,", "").Replace("t.F_Secretkey,", ""));
                strSql.Append(" FROM KR_Base_Usr t WHERE t.F_DeleteMark = 0  ORDER BY t.F_CompanyId,t.F_DepartmentId,t.F_RealName ");
                return this.BaseRepository().FindList<UsrEntity>(strSql.ToString());
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 用户列表（导出Excel）
        /// </summary>
        /// <returns></returns>
        public DataTable GetExportList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append(@"SELECT u.F_Account
                                  ,u.F_RealName
                                  ,CASE WHEN u.F_Gender=1 THEN '男' ELSE '女' END AS F_Gender
                                  ,u.F_Birthday
                                  ,u.F_Mobile
                                  ,u.F_Telephone
                                  ,u.F_Email
                                  ,u.F_WeChat
                                  ,u.F_MSN
                                  ,o.F_FullName AS F_Company
                                  ,d.F_FullName AS F_Department
                                  ,u.F_Description
                                  ,u.F_CreateDate
                                  ,u.F_CreateUsrName
                              FROM KR_Base_Usr u
                              INNER JOIN KR_Base_Department d ON u.F_DepartmentId=d.F_DepartmentId
                              INNER JOIN KR_Base_Company o ON u.F_CompanyId=o.F_CompanyId WHERE u.F_DeleteMark = 0 ");
                return this.BaseRepository().FindTable(strSql.ToString());
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 用户实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        public UsrEntity GetEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<UsrEntity>(t => t.F_UsrId == keyValue && t.F_DeleteMark == 0);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 获取用户列表信息（全部）
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CompanyEntity> GetList()
        {
            try
            {
                var strSql = new StringBuilder();
                strSql.Append("SELECT ");
                strSql.Append(fieldSql);
                strSql.Append(" FROM KR_Usr t WHERE t.F_EnabledMark = 1 AND t.F_DeleteMark = 0  ORDER BY t.F_ParentId ");
                return this.BaseRepository().FindList<CompanyEntity>(strSql.ToString());
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion

        #region 验证数据
        /// <summary>
        /// 账户不能重复
        /// </summary>
        /// <param name="account">账户值</param>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public bool ExistAccount(string account, string keyValue)
        {
            try
            {
                var expression = LinqExtensions.True<UsrEntity>();
                expression = expression.And(t => t.F_Account == account);
                if (!string.IsNullOrEmpty(keyValue))
                {
                    expression = expression.And(t => t.F_UsrId != keyValue);
                }
                return this.BaseRepository().IQueryable(expression).Count() == 0 ? true : false;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 虚拟删除
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void VirtualDelete(string keyValue)
        {
            try
            {
                UsrEntity entity = new UsrEntity()
                {
                    F_UsrId = keyValue,
                    F_DeleteMark = 1
                };
                this.BaseRepository().Update(entity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 保存用户表单（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="usrEntity">用户实体</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, UsrEntity usrEntity)
        {
            try
            {
                if (string.IsNullOrEmpty(keyValue))
                {
                    usrEntity.Create();
                    usrEntity.F_Secretkey = Md5Helper.Encrypt(CommonHelper.CreateNo(), 16).ToLower();
                    usrEntity.F_Password = Md5Helper.Encrypt(DESEncrypt.Encrypt(usrEntity.F_Password, usrEntity.F_Secretkey).ToLower(), 32).ToLower();
                    this.BaseRepository().Insert(usrEntity);
                }
                else
                {
                    usrEntity.Modify(keyValue);
                    usrEntity.F_Secretkey = null;
                    usrEntity.F_Password = null;
                    this.BaseRepository().Update(usrEntity);
                }
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 修改用户登录密码
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="password">新密码（MD5 小写）</param>
        public void RevisePassword(string keyValue, string password)
        {
            try
            {
                UsrEntity usrEntity = new UsrEntity();
                usrEntity.Modify(keyValue);
                usrEntity.F_Secretkey = Md5Helper.Encrypt(CommonHelper.CreateNo(), 16).ToLower();
                usrEntity.F_Password = Md5Helper.Encrypt(DESEncrypt.Encrypt(password, usrEntity.F_Secretkey).ToLower(), 32).ToLower();
                this.BaseRepository().Update(usrEntity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 修改用户状态
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="state">状态：1-启动；0-禁用</param>
        public void UpdateState(string keyValue, int state)
        {
            try
            {
                UsrEntity usrEntity = new UsrEntity();
                usrEntity.Modify(keyValue);
                usrEntity.F_EnabledMark = state;
                this.BaseRepository().Update(usrEntity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="usrEntity">实体对象</param>
        public void UpdateEntity(UsrEntity usrEntity)
        {
            try
            {
                this.BaseRepository().Update(usrEntity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion
    }
}
