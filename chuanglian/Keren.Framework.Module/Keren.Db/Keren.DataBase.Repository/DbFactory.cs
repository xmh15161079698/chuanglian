using Keren.Ioc;
using Microsoft.Practices.Unity;
using System.Configuration;

namespace Keren.DataBase.Repository
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.04
    /// 描 述：数据库建立工厂
    /// </summary>
    public class DbFactory
    {
        /// <summary>
        /// 获取基础库数据库类型
        /// </summary>
        /// <returns></returns>
        public static DatabaseType GetIDatabaseType() {
            string providerName = ConfigurationManager.ConnectionStrings["BaseDb"].ProviderName;
            return GetDbType(providerName);
        }

        /// <summary>
        /// 连接基础库
        /// </summary>
        /// <returns></returns>
        public static IDatabase GetIDatabase()
        {
            string providerName = ConfigurationManager.ConnectionStrings["BaseDb"].ProviderName;
            return GetIDatabaseByIoc(GetDbType(providerName).ToString(), "BaseDb");
        }
        /// <summary>
        /// 连接数据库
        /// </summary>
        /// <param name="connString">连接字符串</param>
        /// <param name="dbType">数据库类型</param>
        /// <returns></returns>
        public static IDatabase GetIDatabase(string connString, DatabaseType dbType)
        {
            return GetIDatabaseByIoc(dbType.ToString(), connString);
        }
        /// <summary>
        /// 连接数据库
        /// </summary>
        /// <param name="connString">连接字符串</param>
        /// <param name="dbType">数据库类型</param>
        /// <returns></returns>
        public static IDatabase GetIDatabase(string connString, string dbType)
        {
            return GetIDatabaseByIoc(dbType, connString);
        }
        /// <summary>
        /// 连接数据库
        /// </summary>
        /// <param name="name">连接配置名称</param>
        /// <returns></returns>
        public static IDatabase GetIDatabase(string name)
        {
            string providerName = ConfigurationManager.ConnectionStrings[name].ProviderName;
            return GetIDatabaseByIoc(GetDbType(providerName).ToString(), name);
        }
        /// <summary>
        /// 连接数据库
        /// </summary>
        /// <param name="name">数据库类型</param>
        /// <param name="connString">连接字符串</param>
        /// <returns></returns>
        private static IDatabase GetIDatabaseByIoc(string name, string connString)
        {
            return UnityIocHelper.Instance.GetService<IDatabase>(name, new ParameterOverride(
              "connString", connString));
        }
        /// <summary>
        /// 获取数据库类型
        /// </summary>
        /// <param name="providerName">驱动名称</param>
        /// <returns></returns>
        private static DatabaseType GetDbType(string providerName)
        {
            DatabaseType dbType;
            switch (providerName)
            {
                case "System.Data.SqlClient":
                    dbType = DatabaseType.SqlServer;
                    break;
                case "MySql.Data.MySqlClient":
                    dbType = DatabaseType.MySql;
                    break;
                case "Oracle.ManagedDataAccess.Client":
                    dbType = DatabaseType.Oracle;
                    break;
                default:
                    dbType = DatabaseType.SqlServer;
                    break;
            }
            return dbType;
        }
    }
}
