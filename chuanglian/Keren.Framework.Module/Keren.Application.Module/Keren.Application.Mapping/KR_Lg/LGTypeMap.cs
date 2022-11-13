using Keren.Application.Language;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2018-04-10 15:08
    /// 描 述：语言类型
    /// </summary>
    public class LGTypeMap : EntityTypeConfiguration<LGTypeEntity>
    {
        public LGTypeMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_LG_TYPE");
            //主键
            this.HasKey(t => t.F_Id);

            #endregion

            #region 配置关系
            #endregion
        }
    }
}

