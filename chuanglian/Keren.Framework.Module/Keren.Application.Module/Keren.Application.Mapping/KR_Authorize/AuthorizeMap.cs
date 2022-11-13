using Keren.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.17
    /// 描 述：授权功能
    /// </summary>
    public class AuthorizeMap : EntityTypeConfiguration<AuthorizeEntity>
    {
        public AuthorizeMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_BASE_AUTHORIZE");
            //主键
            //this.HasKey(t => t.F_AuthorizeId);
            this.HasKey(t =>new { t.F_AuthorizeId,t.F_CreateUserId});
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
