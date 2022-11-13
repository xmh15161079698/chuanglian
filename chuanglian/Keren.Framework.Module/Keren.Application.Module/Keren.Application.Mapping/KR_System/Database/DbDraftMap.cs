using Keren.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping.KR_System.Database
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2017-12-19 12:03
    /// 描 述：数据库建表草稿类
    /// </summary>
    public class DbDraftMap : EntityTypeConfiguration<DbDraftEntity>
    {
        public DbDraftMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_BASE_DBDRAFT");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
