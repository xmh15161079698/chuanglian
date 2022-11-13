using System.Web.Mvc;

namespace Keren.Application.Web.Areas.KR_CodeGeneratorModule
{
    public class KR_CodeGeneratorModuleAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "KR_CodeGeneratorModule";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "KR_CodeGeneratorModule_default",
                "KR_CodeGeneratorModule/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}