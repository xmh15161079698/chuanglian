using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_TaskScheduling
{
    public class KR_TaskSchedulingAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_TaskScheduling";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_TaskScheduling_default",
                "KR_TaskScheduling/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}