/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：PC端代码生成模板管理	
 */
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 自定义开发模板
            $('#kr_custmerCode').on('click', function () {
                keren.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(自定义开发模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/CustmerCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 快速开发模板
            $('#kr_fastCode').on('click', function () {
                keren.layerForm({
                    id: 'FastCodeIndex',
                    title: '在线代码生成器 并自动创建代码(快速开发模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/FastCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 实体映射类生成
            $('#kr_entityCode').on('click', function () {
                keren.layerForm({
                    id: 'FastCodeIndex',
                    title: '在线代码生成器 并自动创建代码(实体映射类生成)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/EntityCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 系统表单开发模板
            $('#kr_workflowCode').on('click', function () {
                keren.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(流程系统表单开发模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/WorkflowCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 列表编辑开发模板
            $('#kr_gridEditCode').on('click', function () {
                keren.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(编辑列表页模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/GridEditCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 报表开发模板
            $('#kr_reportCode').on('click', function () {
                keren.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(报表显示页模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/ReportCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
            // 移动开发模板
            $('#kr_appCustmerCode').on('click', function () {
                keren.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(移动开发模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/AppCustmerCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });

            // 小程序开发模板
            $('#kr_wxCustmerCode').on('click', function () {
                keren.layerForm({
                    id: 'CustmerCodeIndex',
                    title: '在线代码生成器 并自动创建代码(小程序开发模板)',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/WxCustmerCodeIndex',
                    width: 1100,
                    height: 700,
                    maxmin: true,
                    btn: null
                });
            });
        }
    };
    page.init();
}