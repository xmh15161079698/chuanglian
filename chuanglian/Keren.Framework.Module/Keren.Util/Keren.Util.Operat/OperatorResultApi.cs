using Keren.Application.Development.KR_CodeModule;
namespace Keren.Util.Operat
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：当前连接用户信息返回数据
    /// </summary>
    public class OperatorResultApi
    {
        /// <summary>
        /// 状态码-1未登录,1登录成功,0登录过期
        /// </summary>
        public int stateCode { get; set; }
        /// <summary>
        /// 登录者用户信息
        /// </summary>
        public WD_UserEntity usrEntity { get; set; }
    }
}
