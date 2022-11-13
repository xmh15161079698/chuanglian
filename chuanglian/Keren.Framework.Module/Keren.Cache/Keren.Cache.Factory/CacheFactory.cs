using Keren.Cache.Base;
using Keren.Cache.Redis;


namespace Keren.Cache.Factory
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.06
    /// 描 述：定义缓存工厂类
    /// </summary>
    public class CacheFactory
    {
        /// <summary>
        /// 获取缓存实例
        /// </summary>
        /// <returns></returns>
        public static ICache CaChe()
        {
            return new CacheByRedis();
        }
    }
}
