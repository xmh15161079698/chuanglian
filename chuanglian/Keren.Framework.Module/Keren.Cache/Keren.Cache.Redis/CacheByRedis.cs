using Keren.Cache.Base;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace Keren.Cache.Redis
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2013-2050 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.06
    /// 描 述：定义缓存接口
    /// 2018.4.6 bertchen 增加Redis 前缀
    /// </summary>
    public class CacheByRedis : ICache
    {
        #region Key-Value
        /// <summary>
        /// 读取缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        /// <returns></returns>
        public T Read<T>(string cacheKey, int dbId = 0) where T : class
        {
            return new RedisCache(dbId, null).StringGet<T>(cacheKey);
        }
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        public void Write<T>(string cacheKey, T value, int dbId = 0) where T : class
        {
            new RedisCache(dbId, null).StringSet<T>(cacheKey, value);
        }
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        /// <param name="expireTime">到期时间</param>
        public void Write<T>(string cacheKey, T value, TimeSpan expireTime, int dbId = 0) where T : class
        {
            new RedisCache(dbId, null).StringSet<T>(cacheKey, value, expireTime);
        }
        /// <summary>
        /// 移除指定数据缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        public void Remove(string cacheKey, int dbId = 0)
        {
            new RedisCache(dbId, null).KeyDelete(cacheKey);
        }
        /// <summary>
        /// 移除全部缓存
        /// </summary>
        public void RemoveAll(int dbId = 0)
        {
            new RedisCache().FlushDatabase(dbId);
        }
        #endregion
        #region List

        #region 同步方法

        /// <summary>
        /// 移除指定ListId的内部List的值
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void ListRemove<T>(string cacheKey, T value, int dbId = 0) where T : class
        {
            new RedisCache(dbId, null).ListRemove<T>(cacheKey, value);
        }

        /// <summary>
        /// 获取指定key的List
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public List<T> ListRange<T>(string cacheKey, int dbId = 0) where T : class
        {
            return new RedisCache(dbId, null).ListRange<T>(cacheKey);
        }

        /// <summary>
        /// 入队
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void ListRightPush<T>(string cacheKey, T value, int dbId = 0) where T : class
        {
            new RedisCache(dbId, null).ListRightPush(cacheKey, value);
        }

        /// <summary>
        /// 出队
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public T ListRightPop<T>(string cacheKey, int dbId = 0) where T : class
        {
            return new RedisCache(dbId, null).ListRightPop<T>(cacheKey);

        }

        /// <summary>
        /// 入栈
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void ListLeftPush<T>(string cacheKey, T value, int dbId = 0) where T : class
        {
            new RedisCache(dbId, null).ListLeftPush<T>(cacheKey, value);
        }

        /// <summary>
        /// 出栈
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public T ListLeftPop<T>(string cacheKey, int dbId = 0) where T : class
        {
            return new RedisCache(dbId, null).ListLeftPop<T>(cacheKey);
        }

        /// <summary>
        /// 获取集合中的数量
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public long ListLength(string cacheKey, int dbId = 0)
        {
            return new RedisCache(dbId, null).ListLength(cacheKey);
        }

        #endregion 同步方法

        #endregion List
    }
}
