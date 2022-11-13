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
    public class AddressApi : BaseApi
    {
        public AddressApi()
            : base("/api/address")
        {
            //Get["/banner"] = GetBannerList;

            Post["/getuseraddresslist"] = GetUserAddressList ;
            Post["/adduseraddress"] = AddUserAddress;
            Post["/getuserdefaultaddress"] = GetUserDefaultAddress;

        }

        private WD_UserIBLL userIBLL = new WD_UserBLL();
        private WD_AddressIBLL addressIBLL = new WD_AddressBLL();
        //private WD_AddressService addressService = new WD_AddressService();
        /// <summary>
        /// 获取单页面信息
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        public Response GetUserAddressList(dynamic _)
        {
            var openId = this.GetReqData();

            var entity = userIBLL.GetEntityOpenId(openId);

            var addresslist = addressIBLL.GetList(entity.F_Id);


            return Success(addresslist);
        }
        public Response AddUserAddress(dynamic _)
        {
            var entity = GetReq<WD_AddressEntity>();
            if (entity.F_Is_Default == 1)
            {
                var defaultAdd = addressIBLL.GetListByDefault(entity.F_User_Id);
                if (defaultAdd!=null)
                {
                    var entity1 = new WD_AddressEntity();
                    entity1.F_Is_Default = 0;
                    addressIBLL.SaveEntity(defaultAdd.F_Id, entity1);
                }
            }
            addressIBLL.AddUserAddress(entity.F_Id,entity);


            return Success("操作成功");
        }
        public Response GetUserDefaultAddress(dynamic _)
        {
            var entity = GetReq<WD_AddressEntity>();
            
            var defaultAdd = addressIBLL.GetListByDefault(entity.F_User_Id);
              

            return Success(defaultAdd);
        }



    }
}