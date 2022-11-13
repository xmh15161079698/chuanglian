namespace Keren.Application.Extention.TaskScheduling
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.01.09
    /// 描 述：任务调度器执行的方法需要继承的接口
    /// </summary>
    public interface ITsMethod
    {
        /// <summary>
        /// 任务调度器执行的方法
        /// </summary>
        void Execute();
    }
}
