using Keren.Application.Excel;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2017-09-05 16:07
    /// 描 述：Excel数据导出设置
    /// </summary>
    public class ExcelExportMap : EntityTypeConfiguration<ExcelExportEntity>
    {
        public ExcelExportMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_EXCEL_EXPORT");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion
 
            #region 配置关系
            #endregion
        }
    }
}
