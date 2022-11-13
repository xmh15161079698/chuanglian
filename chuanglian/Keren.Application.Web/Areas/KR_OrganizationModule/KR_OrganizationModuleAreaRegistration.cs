using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_OrganizationModule
{
    public class KR_OrganizationModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_OrganizationModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_OrganizationModule_default",
                "KR_OrganizationModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}