using Keren.Application.Base.SystemModule;
using System.Data.Entity.ModelConfiguration;

namespace Keren.Application.Mapping
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2019-01-02 12:03
    /// 描 述：图片保存
    /// </summary>
    public class ImgMap : EntityTypeConfiguration<ImgEntity>
    {
        /// <summary>
        /// 映射
        /// </summary>
        public ImgMap()
        {
            #region 表、主键
            //表
            this.ToTable("KR_BASE_IMG");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
