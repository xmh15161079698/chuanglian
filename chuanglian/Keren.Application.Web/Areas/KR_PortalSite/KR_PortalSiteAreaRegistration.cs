using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_PortalSite
{
    public class KR_PortalSiteAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_PortalSite";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_PortalSite_default",
                "KR_PortalSite/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}