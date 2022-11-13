using Keren.Application.Development.KR_CodeModule;
using System.Data.Entity.ModelConfiguration;

namespace  Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-27 10:16
    /// 描 述：商品管理
    /// </summary>
    public class WD_GoodsMap : EntityTypeConfiguration<WD_GoodsEntity>
    {
        public WD_GoodsMap()
        {
            #region 表、主键
            //表
            this.ToTable("WD_GOODS");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

