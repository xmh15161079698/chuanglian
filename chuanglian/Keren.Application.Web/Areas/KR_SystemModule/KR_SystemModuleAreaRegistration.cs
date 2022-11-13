using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_SystemModule
{
    public class KR_SystemModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_SystemModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_SystemModule_default",
                "KR_SystemModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}