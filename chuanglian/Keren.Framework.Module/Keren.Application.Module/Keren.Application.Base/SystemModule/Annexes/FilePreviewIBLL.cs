using System.IO;

namespace Keren.Application.Base.SystemModule
{
    public interface FilePreviewIBLL
    {
        /// <summary>
        /// excel文档
        /// <summary>
        /// <returns></returns>
        void GetExcelData(string path);
        /// <summary>
        /// word文档
        /// <summary>
        /// <returns></returns>
        void GetWordData(string path);
        /// <summary>
        /// ppt文档
        /// <summary>
        /// <returns></returns>
        void GetPptData(string path);
    }
}