using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_CodeModule
{
    public class KR_CodeModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_CodeModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_CodeModule_default",
                "KR_CodeModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}