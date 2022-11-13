using Keren.Application.Development.KR_CodeModule;
using System.Data.Entity.ModelConfiguration;

namespace  Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 12:12
    /// 描 述：用户信息
    /// </summary>
    public class WD_UserMap : EntityTypeConfiguration<WD_UserEntity>
    {
        public WD_UserMap()
        {
            #region 表、主键
            //表
            this.ToTable("WD_USER");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

