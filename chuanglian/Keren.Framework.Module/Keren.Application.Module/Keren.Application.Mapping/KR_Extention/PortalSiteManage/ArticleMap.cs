using Keren.Application.Extention.PortalSiteManage;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2018-09-05 09:35
    /// 描 述：详细信息维护
    /// </summary>
    public class ArticleMap : EntityTypeConfiguration<ArticleEntity>
    {
        public ArticleMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_PS_ARTICLE");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}

