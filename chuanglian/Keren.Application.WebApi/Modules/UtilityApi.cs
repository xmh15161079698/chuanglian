using Nancy;

namespace Keren.Application.WebApi.Modules
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：通用功能
    /// </summary>
    public class UtilityApi : BaseApi
    {
        /// <summary>
        /// 注册接口
        /// </summary>
        public UtilityApi()
            : base("/Keren/adms")
        {
            Get["/heart"] = Heart;
        }

        /// <summary>
        /// 登录接口
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response Heart(dynamic _)
        {
            return Success("成功");
        }
    }
}