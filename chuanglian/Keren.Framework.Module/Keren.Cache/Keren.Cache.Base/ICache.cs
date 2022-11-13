using System;
using System.Collections.Generic;

namespace Keren.Cache.Base
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.06
    /// 描 述：定义缓存接口
    /// </summary>
    public interface ICache
    {
        #region Key-Value
        /// <summary>
        /// 读取缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        /// <param name="dbId">缓存库编码</param>
        /// <returns></returns>
        T Read<T>(string cacheKey, int dbId = 0) where T : class;
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        /// <param name="dbId">缓存库编码</param>
        void Write<T>(string cacheKey, T value, int dbId = 0) where T : class;
        /// <summary>
        /// 写入缓存
        /// </summary>
        /// <param name="value">对象数据</param>
        /// <param name="cacheKey">键</param>
        /// <param name="dbId">缓存库编码</param>
        /// <param name="timeSpan">到期时间</param>
        void Write<T>(string cacheKey, T value, TimeSpan timeSpan, int dbId = 0) where T : class;
        /// <summary>
        /// 移除指定数据缓存
        /// </summary>
        /// <param name="cacheKey">键</param>
        /// <param name="dbId">缓存库编码</param>
        void Remove(string cacheKey, int dbId = 0);
        /// <summary>
        /// 移除全部缓存
        /// </summary>
        /// <param name="dbId">缓存库编码</param>
        void RemoveAll(int dbId = 0);
        #endregion
        #region List

        #region 同步方法

        /// <summary>
        /// 移除指定ListId的内部List的值
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="value"></param>
        /// <param name="dbId">缓存库编码</param>
        void ListRemove<T>(string cacheKey, T value, int dbId = 0) where T : class;

        /// <summary>
        /// 获取指定key的List
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="dbId">缓存库编码</param>
        /// <returns></returns>
        List<T> ListRange<T>(string cacheKey, int dbId = 0) where T : class;

        /// <summary>
        /// 入队
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="value"></param>
        /// <param name="dbId">缓存库编码</param>
        void ListRightPush<T>(string cacheKey, T value, int dbId = 0) where T : class;

        /// <summary>
        /// 出队
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheKey"></param>
        /// <param name="dbId">缓存库编码</param>
        /// <returns></returns>
        T ListRightPop<T>(string cacheKey, int dbId = 0) where T : class;


        /// <summary>
        /// 入栈
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheKey"></param>
        /// <param name="value"></param>
        /// <param name="dbId">缓存库编码</param>
        void ListLeftPush<T>(string cacheKey, T value, int dbId = 0) where T : class;

        /// <summary>
        /// 出栈
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cacheKey"></param>
        /// <param name="dbId">缓存库编码</param>
        /// <returns></returns>
        T ListLeftPop<T>(string cacheKey, int dbId = 0) where T : class;

        /// <summary>
        /// 获取集合中的数量
        /// </summary>
        /// <param name="cacheKey"></param>
        /// <param name="dbId">缓存库编码</param>
        /// <returns></returns>
        long ListLength(string cacheKey, int dbId = 0);

        #endregion 同步方法

        #endregion List
    }
}
