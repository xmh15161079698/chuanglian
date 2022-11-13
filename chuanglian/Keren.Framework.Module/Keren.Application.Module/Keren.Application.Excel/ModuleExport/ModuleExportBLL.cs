using Keren.Util;
using Pechkin;
using Pechkin.Synchronized;
using System.IO;

namespace Keren.Application.Excel
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.04.01
    /// 描 述：模板导出功能
    /// </summary>
    public class ModuleExportBLL: ModuleExportIBLL
    {
        /// <summary>
        /// 导出PDF
        /// </summary>
        /// <param name="html">html页面字串</param>
        public void ExportPDF(string html)
        {
            SynchronizedPechkin sc = new SynchronizedPechkin(new GlobalConfig().SetMargins(new System.Drawing.Printing.Margins(100, 100, 100, 100)));

            byte[] buf = sc.Convert(new ObjectConfig(), html);

            var ms = new MemoryStream(buf);
            FileDownHelper.DownLoad(ms, "报价单.pdf");
            ms.Close();
        }
    }
}
