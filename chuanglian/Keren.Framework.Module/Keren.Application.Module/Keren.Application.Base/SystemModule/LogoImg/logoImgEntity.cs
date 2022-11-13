using System.ComponentModel.DataAnnotations.Schema;

namespace Keren.Application.Base.SystemModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.07.30
    /// 描 述：系统logo设置
    /// </summary>
    public class LogoImgEntity
    {
        #region 实体成员 
        /// <summary> 
        /// 编码 
        /// </summary> 
        /// <returns></returns> 
        [Column("F_CODE")]
        public string F_Code { get; set; }
        /// <summary> 
        /// 文件名字 
        /// </summary> 
        /// <returns></returns> 
        [Column("F_FILENAME")]
        public string F_FileName { get; set; }
        #endregion

        #region 扩展操作 
        /// <summary> 
        /// 新增调用 
        /// </summary> 
        public void Create()
        {
        }
        /// <summary> 
        /// 编辑调用 
        /// </summary> 
        /// <param name="keyValue"></param> 
        public void Modify(string keyValue)
        {
            this.F_Code = keyValue;
        }
        #endregion
    }
}
