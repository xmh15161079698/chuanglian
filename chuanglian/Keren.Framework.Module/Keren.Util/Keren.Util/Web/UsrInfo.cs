using System;
using System.Collections.Generic;

namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：当前上下文执行用户信息
    /// </summary>
    public class UsrInfo
    {
        #region 用户信息

        /// <summary>
        /// 用户主键
        /// </summary>		
        public string usrId { get; set; }
        /// <summary>
        /// 账户
        /// </summary>	
        public string account { get; set; }
        /// <summary>
        /// 登录密码
        /// </summary>		
        public string password { get; set; }
        /// <summary>
        /// 密码秘钥
        /// </summary>	
        public string secretkey { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string realName { get; set; }
        /// <summary>
        /// 呢称
        /// </summary>	
        public string nickName { get; set; }
        /// <summary>
        /// 头像
        /// </summary>	
        public string headIcon { get; set; }
        /// <summary>
        /// 性别
        /// </summary>	
        public int? gender { get; set; }
        /// <summary>
        /// 手机
        /// </summary>	
        public string mobile { get; set; }

        /// <summary>
        /// 上级主键
        /// </summary>		
        public string parentId { get; set; }
        /// <summary>
        /// 所在上级所有主键
        /// </summary>
        public List<string> parentIds { get; set; }
       
        /// <summary>
        /// 单点登录标识
        /// </summary>		
        public int? openId { get; set; }
        /// <summary>
        /// 是否是超级管理员
        /// </summary>
        public bool isSystem { get; set; }
        #endregion

        #region 扩展信息
        /// <summary>
        /// 应用Id
        /// </summary>
        public string appId { get; set; }
        /// <summary>
        /// 登录时间
        /// </summary>
        public DateTime logTime { get; set; }
        /// <summary>
        /// 登录IP地址
        /// </summary>
        public string iPAddress { get; set; }
        /// <summary>
        /// 浏览器名称
        /// </summary>
        public string browser { get; set; }
        /// <summary>
        /// 登录者标识
        /// </summary>
        public string loginMark { get; set; }
        /// <summary>
        /// 票据信息
        /// </summary>
        public string token { get; set; }
        /// <summary>
        /// 即时通讯地址
        /// </summary>
        public string imUrl { get; set; }
        /// <summary>
        /// 即时通讯是否开启
        /// </summary>
        public string imOpen { get; set; }
        #endregion

        /// <summary>
        /// 信息加载时间
        /// </summary>
        public DateTime? loadTime { get; set; }
    }
}
