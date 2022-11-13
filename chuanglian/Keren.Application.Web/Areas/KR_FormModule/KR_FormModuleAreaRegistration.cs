using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_FormModule
{
    public class KR_FormModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_FormModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_FormModule_default",
                "KR_FormModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}