using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_AuthorizeModule
{
    public class KR_AuthorizeModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_AuthorizeModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_AuthorizeModule_default",
                "KR_AuthorizeModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}