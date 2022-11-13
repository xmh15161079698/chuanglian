namespace Keren.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.17
    /// 描 述：时段过滤
    /// </summary>
    public interface FilterTimeIBLL
    {
        #region 获取数据
        /// <summary>
        /// 过滤时段实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        FilterTimeEntity GetEntity(string keyValue);
        #endregion

        #region 提交数据
        /// <summary>
        /// 删除过滤时段
        /// </summary>
        /// <param name="keyValue">主键</param>
        void DeleteEntiy(string keyValue);
        /// <summary>
        /// 保存过滤时段表单（新增、修改）
        /// </summary>
        /// <param name="filterTimeEntity">过滤时段实体</param>
        /// <returns></returns>
        void SaveForm(FilterTimeEntity filterTimeEntity);
        #endregion
    }
}
