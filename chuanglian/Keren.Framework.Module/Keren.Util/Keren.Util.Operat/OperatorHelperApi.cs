using Keren.Application.Base.AuthorizeModule;
using Keren.Application.Base.SystemModule;
using Keren.Application.Organization;
using Keren.Application.Development.KR_CodeModule;
using Keren.Cache.Base;
using Keren.Cache.Factory;
using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;

namespace Keren.Util.Operat
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：当前连接用户信息处理类
    /// </summary>
    public class OperatorHelperApi
    {
        #region 基础数据类
        private WD_UserIBLL usrIBLL = new WD_UserBLL();

        #endregion

        /// <summary>
        /// 缓存操作类
        /// </summary>
        private ICache redisCache = CacheFactory.CaChe();
        private string cacheKeyToken = "Keren_API_token_";
        /// <summary>
        /// 获取实例
        /// </summary>
        public static OperatorHelperApi Instance
        {
            get { return new OperatorHelperApi(); }
        }
        /// <summary>
        /// 根据主键生成token
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public string CreateToken(WD_UserEntity entity)
        {
            try
            {
                List<string> lst = new List<string>();
                lst.Add(cacheKeyToken);
                lst.Add(entity.F_Id);
                lst.Sort();
                string strJoin = string.Join("", lst);
                string token = DESEncrypt.Encrypt(strJoin);
                //将token保存
                redisCache.Write<WD_UserEntity>(token, entity, new TimeSpan(7, 0, 0, 0));
                return token;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }
        /// <summary>
        /// 根据主键生成token
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //public string CreateToken1(WD_BaoMingEntity entity)
        //{
        //    try
        //    {
        //        List<string> lst = new List<string>();
        //        lst.Add(cacheKeyToken);
        //        lst.Add(entity.F_Id);
        //        lst.Sort();
        //        string strJoin = string.Join("", lst);
        //        string token = DESEncrypt.Encrypt(strJoin);
        //        //将token保存
        //        redisCache.Write<WD_BaoMingEntity>(token, entity, new TimeSpan(7, 0, 0, 0));
        //        return token;
        //    }
        //    catch (Exception)
        //    {
        //        return string.Empty;
        //    }
        //}
        ///// <summary>
        ///// 根据主键生成token
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns></returns>
        //public string HuoDongCreateToken(WD_HuoDongBaoMingEntity entity)
        //{
        //    try
        //    {
        //        List<string> lst = new List<string>();
        //        lst.Add(cacheKeyToken);
        //        lst.Add(entity.F_Id);
        //        lst.Sort();
        //        string strJoin = string.Join("", lst);
        //        string token = DESEncrypt.Encrypt(strJoin);
        //        //将token保存
        //        redisCache.Write<WD_HuoDongBaoMingEntity>(token, entity, new TimeSpan(7, 0, 0, 0));
        //        return token;
        //    }
        //    catch (Exception)
        //    {
        //        return string.Empty;
        //    }
        //}
        /// <summary>
        /// 清空当前登录信息
        /// </summary>
        /// <param name="token">登录票据</param>
        /// <param name="loginMark">登录设备标识</param>
        public void EmptyCurrent(string token, string loginMark)
        {
            try
            {
                redisCache.Remove(token);
            }
            catch (Exception)
            {
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="token"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public OperatorResult CacheUsrModel(string token, WD_UserEntity entity)
        {
            try
            {

                redisCache.Write<WD_UserEntity>(token, entity, new TimeSpan(30, 0, 0, 0));
                return new OperatorResult { stateCode = 1 };
            }
            catch (Exception)
            {
                return new OperatorResult { stateCode = -1 };
            }
        }
        /// <summary>
        /// 判断登录状态
        /// </summary>
        /// <returns>-1未登录,1登录成功,0登录过期</returns>
        public OperatorResultApi IsOnLine(string token)
        {
            try
            {
                WD_UserEntity entity = redisCache.Read<WD_UserEntity>(token);
                if (entity != null)
                {
                    return new OperatorResultApi { stateCode = 1, usrEntity = entity };
                }
                else
                {
                    return new OperatorResultApi { stateCode = 0 };
                }
            }
            catch (Exception)
            {
                return new OperatorResultApi { stateCode = -1 };
            }
        }
    }
}
