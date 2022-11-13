using Keren.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping.KR_System.Module
{
    public class ModuleFormMap : EntityTypeConfiguration<ModuleFormEntity>
    {
        public ModuleFormMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_BASE_MODULEFORM");
            //主键
            this.HasKey(t => t.F_ModuleFormId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
