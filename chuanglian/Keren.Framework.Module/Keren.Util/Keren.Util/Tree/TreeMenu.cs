using System.Collections.Generic;

namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.07
    /// 描 述：树菜单结构数据
    /// </summary>
    public class TreeMenu
    {
        /// <summary>
        /// 节点id
        /// </summary>
        public string id { get; set; }
        /// <summary>
        /// 节点显示数据
        /// </summary>
        public string text { get; set; }
        /// <summary>
        /// 节点提示
        /// </summary>
        public string title { get; set; }
        /// <summary>
        /// 节点数值
        /// </summary>
        public string value { get; set; }
        /// <summary>
        /// 显示图标
        /// </summary>
        public string icon { get; set; }
        /// <summary>
        /// 是否显示勾选框
        /// </summary>
        public bool showcheck { get; set; }
        /// <summary>
        /// 是否被勾选0 for unchecked, 1 for partial checked, 2 for checked
        /// </summary>
        public int checkstate { get; set; }
        /// <summary>
        /// 是否有子节点
        /// </summary>
        public bool hasChildren { get; set; }
        /// <summary>
        /// 是否展开
        /// </summary>
        public bool isexpand { get; set; }
        /// <summary>
        /// 子节点是否已经加载完成了
        /// </summary>
        public bool complete { get; set; }
        /// <summary>
        /// 跳转路劲
        /// </summary>
        public string urlAddress { get; set; }
        /// <summary>
        /// 页面类型
        /// </summary>
        public string pagetype { get; set; }
        /// <summary>
        /// 数据配置
        /// </summary>
        public string pagecode { get; set; }
        /// <summary>
        /// 内容
        /// </summary>
        public string content { get; set; }
        /// <summary>
        /// 列表时间
        /// </summary>
        public string datetime { get; set; }
        /// <summary>
        /// 子节点列表数据
        /// </summary>
        public List<TreeMenu> ChildNodes { get; set; }
        /// <summary>
        /// 父级节点ID
        /// </summary>
        public string parentId { get; set; }
    }
}
