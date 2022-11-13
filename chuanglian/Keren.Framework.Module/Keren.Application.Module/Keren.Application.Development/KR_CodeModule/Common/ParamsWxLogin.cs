using Keren.Util;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Keren.Application.Development.KR_CodeModule

{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2021-02-05 23:42
    /// 描 述：用户信息管理
    /// </summary>
    public class ParamsWxLogin
    {
        public string code { get; set; }

        public string rawData { get; set; }

    }
}

