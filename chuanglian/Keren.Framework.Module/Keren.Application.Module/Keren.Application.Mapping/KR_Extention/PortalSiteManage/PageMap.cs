using Keren.Application.Extention.PortalSiteManage;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-02 09:35
    /// 描 述：门户网站页面配置
    /// </summary>
    public class PageMap : EntityTypeConfiguration<PageEntity>
    {
        public PageMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_PS_PAGE");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
