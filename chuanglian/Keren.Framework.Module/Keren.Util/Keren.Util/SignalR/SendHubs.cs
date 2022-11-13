using Microsoft.AspNet.SignalR.Client;
using System.Threading;

namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.06.15
    /// 描 述：发送消息给SignalR集结器
    /// </summary>
    public static class SendHubs
    {
        /// <summary>
        /// 调用hub方法
        /// </summary>
        /// <param name="methodName">方法名</param>
        /// <param name="args">参数</param>
        public static void callMethod(string methodName, params object[] args)
        {
            if (Config.GetValue("IMOpen") == "true") {
                var hubConnection = new HubConnection(Config.GetValue("IMUrl"));
                IHubProxy ChatsHub = hubConnection.CreateHubProxy("ChatsHub");
                bool done = false;
                hubConnection.Start().ContinueWith(task =>
                {
                    //连接成功调用服务端方法
                    if (!task.IsFaulted)
                    {
                        ChatsHub.Invoke(methodName, args);
                        done = true;
                    }
                    else
                    {
                        done = true;
                    }
                });
                while (!done)
                {
                    Thread.Sleep(100);
                }
                //结束连接
                hubConnection.Stop();
            }
        }
    }
}
