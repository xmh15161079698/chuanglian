using Keren.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.04
    /// 描 述：系统功能模块按钮
    /// </summary>
    public class ModuleButtonMap : EntityTypeConfiguration<ModuleButtonEntity>
    {
        public ModuleButtonMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_BASE_MODULEBUTTON");
            //主键
            this.HasKey(t => t.F_ModuleButtonId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
