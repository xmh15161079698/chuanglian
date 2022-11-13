using Nancy;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Keren.Util;
using Keren.Util.Operat;
using Keren.Application.Base.SystemModule;
using Senparc.Weixin;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using Keren.Application.Development.KR_CodeModule;

namespace Keren.Application.WebApi
{
    /// <summary>  
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：默认页面
    /// </summary>
    public class UserApi : BaseApi
    {


        public UserApi()
            : base("/api/usr")
        {
            //Get["/getgoodscateList"] = GetGoodsCateList;
            Post["/wxlogin"] = WXLogin;
            //Get["/getgoodsdetailbyId"] = GetGoodsDetailById;

            //Get["/index.html"] = MainIndex;
            //Get["/bgimg"] = BgImg;
        }
        WD_UserIBLL usrIBLL = new WD_UserBLL();
        private AnnexesFileIBLL annexesFileIBLL = new AnnexesFileBLL();

        public static readonly string Token = Senparc.Weixin.Config.SenparcWeixinSetting.WxOpenToken;//与微信公众账号后台的Token设置保持一致，区分大小写。
        public static readonly string EncodingAESKey = Senparc.Weixin.Config.SenparcWeixinSetting.WxOpenEncodingAESKey;//与微信小程序后台的EncodingAESKey设置保持一致，区分大小写。
        public static readonly string WxOpenAppId = "wx4dd87784527fc50e";//与微信小程序账号后台的AppId设置保持一致，区分大小写。
        public static readonly string WxOpenAppSecret = "2ef239712cb0dd82db52919a045a7967";//与微信小程序账号后台的AppSecret设置保持一致，区分大小写。


        private Response WXLogin(dynamic _)
        {
            ParamsWxLogin paramsWx = this.GetReq<ParamsWxLogin>();
            if (string.IsNullOrEmpty(paramsWx.code))
            {
                return Fail("用户信息错误");
            }
            else
            {
                WxUsrInfo wxInfo = paramsWx.rawData.ToObject<WxUsrInfo>();
                string getUrl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + WxOpenAppId + "&secret=" + WxOpenAppSecret + "&js_code=" + paramsWx.code + "&grant_type=authorization_code";
                var res = HttpMethods.Get(getUrl);
                var jsonResult = res.ToObject<JsCode2JsonResult>();
                //var jsonResult = SnsApi.JsCode2Json(WxOpenAppId, WxOpenAppSecret, paramsWx.code);
                if (jsonResult.errcode == ReturnCode.请求成功)
                {
                    //根据openId 获取用户
                    WD_UserEntity entity = usrIBLL.GetEntityOpenId(jsonResult.openid);
                    if (entity == null)
                    {
                        WD_UserEntity entity1 = new WD_UserEntity();
                        entity1.Create();
                        entity1.F_OpenId = jsonResult.openid;
                        entity1.F_NickName = wxInfo.nickName;
                        entity1.F_Gender = wxInfo.gender;
                        entity1.F_AvatarUrl = wxInfo.avatarUrl;
                        //entity1.F_City = wxInfo.city;
                        //entity1.F_Country = wxInfo.country;
                        //entity1.F_Province = wxInfo.province;
                        usrIBLL.SaveEntity(string.Empty, entity1);
                        var strToken = OperatorHelperApi.Instance.CreateToken(entity1);
                        var jsonData = new
                        {
                            rows = entity1,
                            token = strToken
                        };
                        return Success(jsonData);
                    }
                    else
                    {
                        entity.F_OpenId = jsonResult.openid;
                        entity.F_NickName = wxInfo.nickName;
                        entity.F_Gender = wxInfo.gender;
                        entity.F_AvatarUrl = wxInfo.avatarUrl;
                        //entity.F_City = wxInfo.city;
                        //entity.F_Country = wxInfo.country;
                        //entity.F_Province = wxInfo.province;
                        usrIBLL.SaveEntity(entity.F_Id, entity);
                        var strToken = OperatorHelperApi.Instance.CreateToken(entity);
                        var jsonData = new
                        {
                            rows = entity,
                            token = strToken
                        };
                        return Success(jsonData);
                    }


                }
                else
                {
                    return Fail("用户未授权");
                }
            }

        }



    }
}
public class WxUsrInfo
{
    public string nickName { get; set; }
    public int gender { get; set; }
    public string avatarUrl { get; set; }
    public string language { get; set; }
    public string city { get; set; }
    public string province { get; set; }
    public string country { get; set; }


}