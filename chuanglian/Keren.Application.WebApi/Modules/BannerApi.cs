using Nancy;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Keren.Util;
using Keren.Application.Development.KR_CodeModule;
using Keren.Application.Base.SystemModule;

namespace Keren.Application.WebApi
{
    /// <summary>  
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.05.12
    /// 描 述：默认页面
    /// </summary>
    public class Banner : BaseApi
    {


        public Banner()
            : base("/api/banner")
        {
            Get["/getbannerlist"] = GetBannerList;

            //Get["/index.html"] = MainIndex;
            //Get["/bgimg"] = BgImg;
        }
        private WD_BannerIBLL bannerIBLL = new WD_BannerBLL();
        private AnnexesFileIBLL annexesFileIBLL = new AnnexesFileBLL();

        public Response GetBannerList(dynamic _)
        {
            var bannerList = bannerIBLL.GetList(null);
            foreach(var banner in bannerList)
            {
                var entity = annexesFileIBLL.GetList(banner.F_Image);
                foreach (var img in entity)
                {
                    banner.F_Image = img.F_FilePath;
                }
            }
            return Success(bannerList);
        }
    }

       
}