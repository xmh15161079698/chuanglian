namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：接口响应数据
    /// </summary>
    public class ResParameter
    {
        /// <summary>
        /// 接口响应码
        /// </summary>
        public ResponseCode code { get; set; }
        /// <summary>
        /// 接口响应消息
        /// </summary>
        public string info { get; set; }
        /// <summary>
        /// 接口响应数据
        /// </summary>
        public object data { get; set; }
    }
}
