using Keren.Cache.Base;
using Keren.Cache.Factory;
using Keren.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;

namespace Keren.Application.Organization
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.06
    /// 描 述：用户模块业务类
    /// </summary>
    public class UsrBLL : UsrIBLL
    {
        #region 属性
        private UsrService usrService = new UsrService();
        private DepartmentIBLL departmentIBLL = new DepartmentBLL();
        #endregion

        #region 缓存定义
        private ICache cache = CacheFactory.CaChe();
        private string cacheKey = "Keren_ADMS_usr_";       // +公司主键
        private string cacheKeyAccount = "Keren_ADMS_usr_account_";// +用户账号（账号不允许改动）
        private string cacheKeyId = "Keren_ADMS_usr_Id_";// +用户账号（账号不允许改动）
        #endregion

        #region 获取数据

        /// <summary>
        /// 用户列表(根据公司主键)
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <returns></returns>
        public List<UsrEntity> GetList(string companyId)
        {
            try
            {
                if (string.IsNullOrEmpty(companyId))
                {
                    return new List<UsrEntity>();
                }

                List<UsrEntity> list = cache.Read<List<UsrEntity>>(cacheKey + companyId, CacheId.usr);
                if (list == null)
                {
                    list = (List<UsrEntity>)usrService.GetList(companyId);
                    cache.Write<List<UsrEntity>>(cacheKey + companyId, list, CacheId.usr);
                }
                return list;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 用户列表(根据公司主键,部门主键)
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <param name="departmentId">部门主键</param>
        /// <param name="keyword">查询关键词</param>
        /// <returns></returns>
        public List<UsrEntity> GetList(string companyId, string departmentId, string keyword)
        {
            try
            {


                List<UsrEntity> list = GetList(companyId);
                if (!string.IsNullOrEmpty(departmentId))
                {
                    list = list.FindAll(t => t.F_DepartmentId.ContainsEx(departmentId));
                }
                if (!string.IsNullOrEmpty(keyword))
                {
                    list = list.FindAll(t => t.F_RealName.ContainsEx(keyword) || t.F_Account.ContainsEx(keyword));
                }
                return list;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 用户列表(全部)
        /// </summary>
        /// <returns></returns>
        public List<UsrEntity> GetAllList()
        {
            try
            {
                return (List<UsrEntity>)usrService.GetAllList();
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 用户列表(根据部门主键)
        /// </summary>
        /// <param name="departmentId">部门主键</param>
        /// <returns></returns>
        public List<UsrEntity> GetListByDepartmentId(string departmentId)
        {
            try
            {
                if (string.IsNullOrEmpty(departmentId))
                {
                    return new List<UsrEntity>();
                }
                DepartmentEntity departmentEntity = departmentIBLL.GetEntity(departmentId);
                if (departmentEntity == null)
                {
                    return new List<UsrEntity>();
                }
                return GetList(departmentEntity.F_CompanyId, departmentId, "");
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="companyId">公司主键</param>
        /// <param name="departmentId">部门主键</param>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">查询关键词</param>
        /// <returns></returns>
        public List<UsrEntity> GetPageList(string companyId, string departmentId, Pagination pagination, string keyword)
        {
            try
            {
                return (List<UsrEntity>)usrService.GetPageList(companyId, departmentId, pagination, keyword);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 用户列表（导出Excel）
        /// </summary>
        /// <returns></returns>
        public void GetExportList()
        {
            try
            {
                //取出数据源
                DataTable exportTable = usrService.GetExportList();
                //设置导出格式
                ExcelConfig excelconfig = new ExcelConfig();
                excelconfig.Title = "测试用户导出";
                excelconfig.TitleFont = "微软雅黑";
                excelconfig.TitlePoint = 25;
                excelconfig.FileName = "用户导出.xls";
                excelconfig.IsAllSizeColumn = true;
                //每一列的设置,没有设置的列信息，系统将按datatable中的列名导出
                excelconfig.ColumnEntity = new List<ColumnModel>();
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_account", ExcelColumn = "账户" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_realname", ExcelColumn = "姓名" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_gender", ExcelColumn = "性别" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_birthday", ExcelColumn = "生日" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_mobile", ExcelColumn = "手机", Background = Color.Red });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_telephone", ExcelColumn = "电话", Background = Color.Red });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_wechat", ExcelColumn = "微信" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_organize", ExcelColumn = "公司" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_department", ExcelColumn = "部门" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_description", ExcelColumn = "说明" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_createdate", ExcelColumn = "创建日期" });
                excelconfig.ColumnEntity.Add(new ColumnModel() { Column = "f_createusrname", ExcelColumn = "创建人" });
                //调用导出方法
                ExcelHelper.ExcelDownload(exportTable, excelconfig);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取实体,通过用户账号
        /// </summary>
        /// <param name="account">用户账号</param>
        /// <returns></returns>
        public UsrEntity GetEntityByAccount(string account)
        {
            try
            {
                string usrId = cache.Read<string>(cacheKeyAccount + account, CacheId.usr);
                UsrEntity usrEntity;
                if (string.IsNullOrEmpty(usrId))
                {
                    usrEntity = usrService.GetEntityByAccount(account);
                    if (usrEntity != null)
                    {
                        cache.Write<string>(cacheKeyAccount + usrEntity.F_Account, usrEntity.F_UsrId, CacheId.usr);
                        cache.Write<UsrEntity>(cacheKeyId + usrEntity.F_UsrId, usrEntity, CacheId.usr);
                    }
                }
                else
                {
                    usrEntity = cache.Read<UsrEntity>(cacheKeyId + usrId, CacheId.usr);
                    if (usrEntity == null)
                    {
                        usrEntity = usrService.GetEntityByAccount(account);
                        if (usrEntity != null)
                        {
                            cache.Write<UsrEntity>(cacheKeyId + usrEntity.F_UsrId, usrEntity, CacheId.usr);
                        }
                    }
                }
                return usrEntity;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取用户数据
        /// </summary>
        /// <param name="usrId">用户主键</param>
        /// <returns></returns>
        public UsrEntity GetEntityByUsrId(string usrId)
        {
            try
            {
                UsrEntity usrEntity = cache.Read<UsrEntity>(cacheKeyId + usrId, CacheId.usr);
                if (usrEntity == null)
                {
                    usrEntity = usrService.GetEntity(usrId);
                    if (usrEntity != null)
                    {
                        cache.Write<string>(cacheKeyAccount + usrEntity.F_Account, usrId, CacheId.usr);
                        cache.Write<UsrEntity>(cacheKeyId + usrId, usrEntity, CacheId.usr);
                    }
                }
                return usrEntity;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取用户列表数据
        /// </summary>
        /// <param name="usrIds">用户主键串</param>
        /// <returns></returns>
        public List<UsrEntity> GetListByUsrIds(string usrIds)
        {
            try
            {
                if (string.IsNullOrEmpty(usrIds))
                {
                    return null;
                }
                List<UsrEntity> list = new List<UsrEntity>();
                string[] usrList = usrIds.Split(',');
                foreach (string usrId in usrList)
                {
                    UsrEntity usrEntity = GetEntityByUsrId(usrId);
                    if (usrEntity != null)
                    {
                        list.Add(usrEntity);
                    }
                }


                return list;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取映射数据
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, UsrModel> GetModelMap()
        {
            try
            {
                Dictionary<string, UsrModel> dic = cache.Read<Dictionary<string, UsrModel>>(cacheKey + "dic", CacheId.usr);
                if (dic == null)
                {
                    dic = new Dictionary<string, UsrModel>();
                    var list = usrService.GetAllList();
                    foreach (var item in list)
                    {
                        UsrModel model = new UsrModel()
                        {
                            companyId = item.F_CompanyId,
                            departmentId = item.F_DepartmentId,
                            name = item.F_RealName,
                        };
                        string img = "";
                        if (!string.IsNullOrEmpty(item.F_HeadIcon))
                        {
                            string fileHeadImg = Config.GetValue("fileHeadImg");
                            string fileImg = string.Format("{0}/{1}{2}", fileHeadImg, item.F_UsrId, item.F_HeadIcon);
                            if (DirFileHelper.IsExistFile(fileImg))
                            {
                                img = item.F_HeadIcon;
                            }
                        }
                        if (string.IsNullOrEmpty(img))
                        {
                            if (item.F_Gender == 0)
                            {
                                img = "0";
                            }
                            else
                            {
                                img = "1";
                            }
                        }
                        model.img = img;
                        dic.Add(item.F_UsrId, model);
                    }
                    cache.Write(cacheKey + "dic", dic, CacheId.usr);
                }
                return dic;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取用户列表数据
        /// </summary>
        /// <returns></returns>
        public List<UsrEntity> GetList()
        {
            try
            {
                List<UsrEntity> list = cache.Read<List<UsrEntity>>(cacheKey, CacheId.usr);
                if (list == null)
                {
                    list = (List<UsrEntity>)usrService.GetList();
                    cache.Write<List<UsrEntity>>(cacheKey, list, CacheId.usr);
                }
                return list;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取树形数据
        /// </summary>
        /// <param name="parentId">父级id</param>
        /// <returns></returns>
        public List<TreeModel> GetTree(string parentId)
        {
            try
            {
                List<UsrEntity> list = GetList();
                List<TreeModel> treeList = new List<TreeModel>();
                foreach (var item in list)
                {
                    TreeModel node = new TreeModel
                    {
                        id = item.F_UsrId,
                        text = item.F_RealName,
                        value = item.F_UsrId,
                        showcheck = false,
                        checkstate = 0,
                        isexpand = true,
                        parentId = item.F_ParentId
                    };
                    treeList.Add(node);
                }
                return treeList.ToTree(parentId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取用户本身和子公司的id
        /// </summary>
        /// <param name="parentId">父级ID</param>
        /// <returns></returns>
        public List<string> GetSubNodes(string parentId)
        {
            try
            {
                if (string.IsNullOrEmpty(parentId))
                {
                    return new List<string>();
                }
                List<string> res = new List<string>();
                res.Add(parentId);
                List<TreeModel> list = GetTree(parentId);
                GetSubNodes(list, res);
                return res;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 遍历树形数据获取全部子节点ID
        /// </summary>
        /// <param name="list">树形数据列表</param>
        /// <param name="ourList">输出数据列表</param>
        private void GetSubNodes(List<TreeModel> list, List<string> ourList)
        {
            foreach (var item in list)
            {
                ourList.Add(item.id);
                if (item.hasChildren)
                {
                    GetSubNodes(item.ChildNodes, ourList);
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
                UsrEntity usrEntity = GetEntityByUsrId(keyValue);
                cache.Remove(cacheKey + usrEntity.F_CompanyId, CacheId.usr);
                cache.Remove(cacheKeyId + keyValue, CacheId.usr);
                cache.Remove(cacheKeyAccount + usrEntity.F_Account, CacheId.usr);

                Dictionary<string, UsrModel> dic = GetModelMap();
                dic.Remove(keyValue);
                cache.Write(cacheKey + "dic", dic, CacheId.department);


                usrService.VirtualDelete(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
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
                cache.Remove(cacheKey + usrEntity.F_CompanyId, CacheId.usr);
                cache.Remove(cacheKeyId + keyValue, CacheId.usr);
                cache.Remove(cacheKeyAccount + usrEntity.F_Account, CacheId.usr);
                cache.Remove(cacheKey + "dic", CacheId.usr);


                if (!string.IsNullOrEmpty(keyValue))
                {
                    usrEntity.F_Account = null;// 账号不允许改动
                }

                usrService.SaveEntity(keyValue, usrEntity);


            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 修改用户登录密码
        /// </summary>
        /// <param name="newPassword">新密码（MD5 小写）</param>
        /// <param name="oldPassword">旧密码（MD5 小写）</param>
        public bool RevisePassword(string newPassword, string oldPassword)
        {
            try
            {
                UsrInfo usrInfo = LoginUsrInfo.Get();
                cache.Remove(cacheKeyId + usrInfo.usrId, CacheId.usr);
                cache.Remove(cacheKeyAccount + usrInfo.account, CacheId.usr);

                string oldPasswordByEncrypt = Md5Helper.Encrypt(DESEncrypt.Encrypt(oldPassword, usrInfo.secretkey).ToLower(), 32).ToLower();
                if (oldPasswordByEncrypt == usrInfo.password)
                {
                    usrService.RevisePassword(usrInfo.usrId, newPassword);
                }
                else
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 重置密码(000000)
        /// </summary>
        /// <param name="keyValue">账号主键</param>
        public void ResetPassword(string keyValue)
        {
            try
            {
                cache.Remove(cacheKeyId + keyValue, CacheId.usr);
                string password = Md5Helper.Encrypt("000000", 32).ToLower();
                usrService.RevisePassword(keyValue, password);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
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
                UsrEntity usrEntity = GetEntityByUsrId(keyValue);
                cache.Remove(cacheKey + usrEntity.F_CompanyId, CacheId.usr);
                cache.Remove(cacheKeyId + keyValue, CacheId.usr);
                cache.Remove(cacheKeyAccount + usrEntity.F_Account, CacheId.usr);
                cache.Remove(cacheKey + "dic", CacheId.usr);
                usrService.UpdateState(keyValue, state);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
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
                return usrService.ExistAccount(account, keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        #endregion

        #region 扩展方法
        /// <summary>
        /// 验证登录
        /// </summary>
        /// <param name="account">账号</param>
        /// <param name="password">密码 MD5 32位 小写</param>
        /// <returns></returns>
        public UsrEntity CheckLogin(string account, string password)
        {
            ////调用微信开放平台接口获得Token、OpenId
            //string appid = Config.GetValue("AppId");
            //string appsecret = Config.GetValue("AppSecret");
            //OpenTokenGet openTokenGet = new OpenTokenGet();
            //openTokenGet.appid = appid;
            //openTokenGet.secret = appsecret;
            //openTokenGet.code = "0815LTNN0EEei42rURNN0z5QNN05LTNS";
            //OpenTokenGetResult openInfo = openTokenGet.OpenSend();
            //string openid = openInfo.openid;
            //string token = openInfo.access_token;
            ////调用微信开放平台接口获得登录用户个人信息
            //OpenUsrGet openusr = new OpenUsrGet();
            //openusr.openid = openid;
            //openusr.access_token = token;
            //OpenUsrGetResult usrinfo = openusr.OpenSend();
            try
            {
                UsrEntity usrEntity = GetEntityByAccount(account);
                if (usrEntity == null)
                {
                    usrEntity = new UsrEntity()
                    {
                        LoginMsg = "账户不存在!",
                        LoginOk = false
                    };
                    return usrEntity;
                }
                usrEntity.LoginOk = false;
                if (usrEntity.F_EnabledMark == 1)
                {
                    string dbPassword = Md5Helper.Encrypt(DESEncrypt.Encrypt(password.ToLower(), usrEntity.F_Secretkey).ToLower(), 32).ToLower();
                    if (dbPassword == usrEntity.F_Password)
                    {
                        usrEntity.LoginOk = true;
                    }
                    else
                    {
                        usrEntity.LoginMsg = "密码和账户名不匹配!";
                    }
                }
                else
                {
                    usrEntity.LoginMsg = "账户被系统锁定,请联系管理员!";
                }
                return usrEntity;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取用户头像
        /// </summary>
        /// <param name="usrId">用户ID</param>
        public void GetImg(string usrId)
        {
            UsrEntity entity = GetEntityByUsrId(usrId);
            string img = "";
            string fileHeadImg = Config.GetValue("fileHeadImg");
            if (entity != null)
            {
                if (!string.IsNullOrEmpty(entity.F_HeadIcon))
                {
                    string fileImg = string.Format("{0}/{1}{2}", fileHeadImg, entity.F_UsrId, entity.F_HeadIcon);
                    if (DirFileHelper.IsExistFile(fileImg))
                    {
                        img = fileImg;
                    }
                }
            }
            else
            {
                img = string.Format("{0}/{1}", fileHeadImg, "on-boy.jpg");
            }
            if (string.IsNullOrEmpty(img))
            {
                if (entity.F_Gender == 0)
                {
                    img = string.Format("{0}/{1}", fileHeadImg, "on-girl.jpg");
                }
                else
                {
                    img = string.Format("{0}/{1}", fileHeadImg, "on-boy.jpg");
                }
            }
            FileDownHelper.DownLoadnew(img);
        }
        #endregion
    }
}
