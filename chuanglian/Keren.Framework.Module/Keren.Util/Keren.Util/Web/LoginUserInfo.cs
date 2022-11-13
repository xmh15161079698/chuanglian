using System.Web;

namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：当前上下文执行用户信息获取
    /// </summary>
    public static class LoginUserInfo
    {
        /// <summary>
        /// 获取当前上下文执行用户信息
        /// </summary>
        /// <returns></returns>
        public static UserInfo Get()
        {
            return (UserInfo)HttpContext.Current.Items["LoginUserInfo"]; 
        }
    }
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：当前上下文执行用户信息获取
    /// </summary>
    public static class LoginUsrInfo
    {
        /// <summary>
        /// 获取当前上下文执行用户信息
        /// </summary>
        /// <returns></returns>
        public static UsrInfo Get()
        {
            return (UsrInfo)HttpContext.Current.Items["LoginUsrInfo"];
        }
    }
}
