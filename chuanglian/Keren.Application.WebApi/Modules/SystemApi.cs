using Nancy;
using System.Collections.Generic;
using Keren.Application.Development.KR_CodeModule;
using Keren.Util;
using Keren.Util.Operat;
using Keren.Application.Organization;
using Keren.Application.Base.SystemModule;
using Keren.Application.Extention.PortalSiteManage;

namespace Keren.Application.WebApi
{
    /// <summary>  
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：用户操作页面
    /// </summary>
    public class SystemApi : BaseApi
    {
        public SystemApi()
            : base("/api/system")
        {
            //Get["/banner"] = GetBannerList;
          
            Get["/getpage"] = GetPage;

        }
        //private WD_BannerIBLL bannerIBLL = new WD_BannerBLL();
     
        WD_PageIBLL pageIBLL = new WD_PageBLL();

        //WD_NoticeIBLL noticeIBLL = new WD_NoticeBLL();




        /// <summary>
        /// 获取单页面信息
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetPage(dynamic _)
        {
            var data = this.GetReqData();
            WD_PageEntity entity = pageIBLL.GetEntity(data);
            return Success(entity);
        }

        ///// <summary>
        ///// 登录页面
        ///// </summary>
        ///// <param name="_"></param>
        ///// <returns></returns>
        //private Response GetBannerList(dynamic _)
        //{
        //    IEnumerable<WD_BannerModel> lst = bannerIBLL.GetAppList();
        //    return Success(lst);
        //}

    }
}