using Nancy;
using Keren.Util;
using Keren.Util.Operat;
using System.IO;
using System.Text;

namespace Keren.Application.WebApi
{
    /// <summary>  
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：用户验证码页面
    /// </summary>
    public class VerifyApi : BaseApi
    {
        public VerifyApi()
            : base("/api/verify")
        {
            Get["/imagecode"] = ImageCode;
            Post["/smscode"] = SmsCode;
        }
        /// <summary>
        /// 图片验证码
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response ImageCode(dynamic _)
        {
            string sessionId = this.GetReqData();
            MemoryStream ms = new MemoryStream(new VerifyCode().GetImageCode(sessionId));
            Stream stream = ms;
            return Response.FromStream(ms, @"image/Gif");
        }
        /// <summary>
        /// 短信验证码
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        private Response SmsCode(dynamic _)
        {
            MessageEntity messageEntity = this.GetReq<MessageEntity>();
            VerifyCode verifyCode = new VerifyCode();
            if (!string.IsNullOrEmpty(messageEntity.phone) && !string.IsNullOrEmpty(messageEntity.sessionId)  && !string.IsNullOrEmpty(messageEntity.type))
            {
                string code = verifyCode.GetMessageCode(messageEntity.sessionId);
                string content = "【农产通】您的验证码："+code+"，您正进行身份验证，，请勿泄漏于他人！";
                if (messageEntity.type == "reg")
                {
                     content = WebHelper.UrlEncode("【农产通】您的验证码："+code+"，您正进行会员注册，，请勿泄漏于他人！");
                }
                if (messageEntity.type == "info")
                {
                    content = WebHelper.UrlEncode("【农产通】您的验证码：" + code + "，您正进行身份验证，，请勿泄漏于他人！");
                }
                if (messageEntity.type == "pwd")
                {
                    content = WebHelper.UrlEncode("【农产通】您的验证码：" + code + "，您正进行密码修改，，请勿泄漏于他人！");
                }
                var url = new StringBuilder();
                url.Append("http://115.159.206.161:7862/sms?action=send");
                url.Append("&account=924267&password=123456&extno=10690924267&rt=json");
                url.Append("&mobile=" + messageEntity.phone);
                url.Append("&content=" + content);
                var codeRes = HttpMethods.Get(url.ToString());
                //var res = codeRes.ToObject<SendRes>();
                //if (res.status == "0")
                //{
                //    return Success("发送成功");
                //}
                //else
                //{
                //    return Fail("发送失败，请重新发送");
                //}
                return Success("发送成功");
            }
            else
            {
                return Fail("请正确填写手机号码");
            }

         
        }
    }
    public class MessageEntity
    {
        public string phone { get; set; }
        public string sessionId { get; set; }
        public string type { get; set; }
   }
    public class SendRes
    {
        public string status { get; set; }
        public string balance { get; set; }
        public string list { get; set; }
    }
}