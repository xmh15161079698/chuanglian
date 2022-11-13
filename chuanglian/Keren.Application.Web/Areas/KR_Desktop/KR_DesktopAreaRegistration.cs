using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_Desktop
{
    public class KR_DesktopAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_Desktop";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_Desktop_default",
                "KR_Desktop/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}