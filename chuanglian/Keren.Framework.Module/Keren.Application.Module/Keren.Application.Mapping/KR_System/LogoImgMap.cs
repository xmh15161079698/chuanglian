using Keren.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping.KR_System
{
    public class LogoImgMap : EntityTypeConfiguration<LogoImgEntity>
    {
        public LogoImgMap()
        {
            #region 表、主键 
            //表 
            this.ToTable("KR_BASE_LOGO");
            //主键 
            this.HasKey(t => t.F_Code);
            #endregion

            #region 配置关系 
            #endregion
        }
    }
}
