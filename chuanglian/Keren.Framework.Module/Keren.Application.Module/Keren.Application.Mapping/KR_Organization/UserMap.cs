using Keren.Application.Organization;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.04
    /// 描 述：用户数据库实体映射
    /// </summary>
    public class UserMap : EntityTypeConfiguration<UserEntity>
    {
        /// <summary>
        /// 用户数据库实体映射
        /// </summary>
        public UserMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_BASE_USER");
            //主键
            this.HasKey(t => t.F_UserId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
