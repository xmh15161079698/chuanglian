using Keren.Application.Base.SystemModule;
using Keren.Loger;
using Keren.Util;
using Keren.Util.Operat;
using Nancy;
using Nancy.ModelBinding;
using System;
using Keren.Application.Development.KR_CodeModule;
using System.Linq;

namespace Keren.Application.WebApi
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：Nancy-Api基础模块
    /// </summary>
    public class BaseApi : NancyModule
    {
        #region 构造函数
        public BaseApi()
            : base()
        {
            Before += BeforeRequest;
            OnError += OnErroe;
        }
        public BaseApi(string baseUrl)
            : base(baseUrl)
        {
            Before += BeforeRequest;
            OnError += OnErroe;
        }
        #endregion

        #region 获取请求数据
        /// <summary>
        /// 获取请求数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetReqData<T>() where T : class
        {
            try
            {
                ReqParameter<string> req = this.Bind<ReqParameter<string>>();
                return req.data.ToObject<T>();
            }
            catch (Exception)
            {
                throw;
            }

        }
        /// <summary>
        /// 获取请求数据
        /// </summary>
        /// <returns></returns>
        public string GetReqData()
        {
            try
            {
                ReqParameter<string> req = this.Bind<ReqParameter<string>>();
                return req.data;
            }
            catch (Exception)
            {
                throw;
            }

        }
        /// <summary>
        /// 获取请求数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T GetReq<T>() where T : class
        {
            try
            {
                T req = this.Bind<T>();
                return req;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 响应接口
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public Response Success(string info)
        {
            ResParameter res = new ResParameter { code = ResponseCode.success, info = info, data = new object { } };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="res"></param>
        /// <returns></returns>
        public Response Success(object data)
        {
            ResParameter res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = data };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="res"></param>
        /// <returns></returns>
        public Response Success<T>(T data) where T : class
        {
            ResParameter res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = data };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 成功响应数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="res"></param>
        /// <returns></returns>
        public Response SuccessString(string data)
        {
            ResParameter res = new ResParameter { code = ResponseCode.success, info = "响应成功", data = data };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        /// <summary>
        /// 接口响应失败
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public Response Fail(string info)
        {
            ResParameter res = new ResParameter { code = ResponseCode.fail, info = info, data = new object { } };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        public Response FailNoLogin(string info)
        {
            ResParameter res = new ResParameter { code = ResponseCode.nologin, info = info, data = new object { } };
            return Response.AsText(res.ToJson()).WithContentType("application/json");
        }
        #endregion

        #region 权限验证
        public WD_UserEntity userInfo;
        public string loginMark;
        public string token;
        /// <summary>
        /// 前置拦截器
        /// </summary>
        /// <param name="ctx"></param>
        /// <returns></returns>
        private Response BeforeRequest(NancyContext ctx)
        {
            
            string path = ctx.ResolvedRoute.Description.Path;
            if (path == "/api/goodsOrder/getorderinfobyid" || path == "/api/goodsOrder/deleteorder" || path == "/api/goodsOrder/gethasorderfy" || path == "/api/goodsOrder/getnotorderfy" || path == "/api/goodsOrder/getallorderfy" || path == "/api/goodsOrder/createorder" || path == "/api/goodsOrder/getgoodsdetailbyId" || path == "/api/address/getuserdefaultaddress" || path == "/api/goodsIndex/getgoodsList" || path == "/api/goodsIndex/getgoodsdetailbyId" || path == "/api/goodscategory/getgoodscateList" || path == "/api/goodsIndex/getgoodscolorListbyid" || path == "/api/video/getvideo" || path == "/api/system/getpage" || path == "/api/banner/getbannerlist" || path == "/api/goodscategory/getgoodslistbycondition" || path == "/api/address/getuseraddresslist" || path == "/api/system/banner" || path == "/api/address/adduseraddress" || path == "/api/usr/wxlogin" || path == "/api/verify/imagecode" || path == "/Keren/adms/user/login" || path == "/" || path == "/index.html" || path == "/bgimg" || path == "/Keren/adms/user/img" || path == "/Keren/adms/desktop/img" || path == "/Keren/adms/annexes/down" || path == "/api/choujiang/gettianjialist" || path == "/api/huodong/getbaominglists") 
            {// 登录接口，默认页面接口不做权限验证处理
                return null;
            }
            var headerToken = ctx.Request.Headers["token"];
            var token = string.Empty;

            if (headerToken != null && headerToken.Count() != 0)
            {
                token = headerToken.First();
            }
            if (string.IsNullOrEmpty(token))
            {
                return this.FailNoLogin("未找到登录信息");
            }
            OperatorResultApi res = OperatorHelperApi.Instance.IsOnLine(token);
            if (res.stateCode == -1)
            {
                return this.FailNoLogin("未找到登录信息");
            }
            if (res.stateCode == 0)
            {
                return this.FailNoLogin("登录信息已过期");
            }
            else
            {
                // 获取登录者信息
                userInfo = res.usrEntity;
            }
            return null;
        }
        #endregion

        #region 异常抓取
        /// <summary>
        /// 日志对象实体
        /// </summary>
        private Log _logger;
        /// <summary>
        /// 日志操作
        /// </summary>
        public Log Logger
        {
            get { return _logger ?? (_logger = LogFactory.GetLogger(this.GetType().ToString())); }
        }
        /// <summary>
        /// 监听接口异常
        /// </summary>
        /// <param name="ctx">连接上下信息</param>
        /// <param name="ex">异常信息</param>
        /// <returns></returns>
        private Response OnErroe(NancyContext ctx, Exception ex)
        {
            try
            {
                this.WriteLog(ctx, ex);
            }
            catch (Exception)
            {
            }
            string msg = "Keren敏捷框架提醒您：" + ex.Message;
            return Response.AsText(new ResParameter { code = ResponseCode.exception, info = msg }.ToJson()).WithContentType("application/json").WithStatusCode(HttpStatusCode.OK);
        }
        /// <summary>
        /// 写入日志（log4net）
        /// </summary>
        /// <param name="context">提供使用</param>
        private void WriteLog(NancyContext context, Exception ex)
        {
            if (context == null)
                return;
            string path = context.ResolvedRoute.Description.Path;
            var log = LogFactory.GetLogger("workflowapi");
            Exception Error = ex;
            LogMessage logMessage = new LogMessage();
            logMessage.OperationTime = DateTime.Now;
            logMessage.Url = path;
            logMessage.Class = "Kerenwebapi";
            logMessage.Ip = Net.Ip;
            logMessage.Host = Net.Host;
            logMessage.Browser = Net.Browser;
            if (userInfo != null)
            {
                logMessage.UserName = userInfo.F_NickName;
            }

            if (Error.InnerException == null)
            {
                logMessage.ExceptionInfo = Error.Message;
                logMessage.ExceptionSource = Error.Source;
                logMessage.ExceptionRemark = Error.StackTrace;
            }
            else
            {
                logMessage.ExceptionInfo = Error.InnerException.Message;
                logMessage.ExceptionSource = Error.InnerException.Source;
                logMessage.ExceptionRemark = Error.InnerException.StackTrace;
            }
            string strMessage = new LogFormat().ExceptionFormat(logMessage);
            log.Error(strMessage);

            LogEntity logEntity = new LogEntity();
            logEntity.F_CategoryId = 4;
            logEntity.F_OperateTypeId = ((int)OperationType.Exception).ToString();
            logEntity.F_OperateType = EnumAttribute.GetDescription(OperationType.Exception);
            logEntity.F_OperateAccount = logMessage.UserName;
            if (userInfo != null)
            {
                logEntity.F_OperateUserId = userInfo.F_Id;
            }
            logEntity.F_ExecuteResult = -1;
            logEntity.F_ExecuteResultJson = strMessage;
            logEntity.WriteLog();
            SendMail(strMessage);
        }
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="body">消息</param>
        private void SendMail(string body)
        {
            bool ErrorToMail = Config.GetValue("ErrorToMail").ToBool();
            if (ErrorToMail == true)
            {
                string SystemName = Config.GetValue("SystemName");//系统名称
                string recMail = Config.GetValue("RereceiveErrorMail");//接收错误信息邮箱
                MailHelper.Send("receivebug@Keren.cn", SystemName + " - 发生异常", body.Replace("-", ""));
            }
        }
        #endregion
    }
}