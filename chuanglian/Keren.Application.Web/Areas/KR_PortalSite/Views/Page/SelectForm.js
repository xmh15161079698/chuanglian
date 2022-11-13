/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2019-01-02 09:35
 * 描  述：页面风格选择
 */
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('.box-content').on('click', function () {//1.列表2图形列表3详细信息 
                var value = $(this).attr('data-value');
                keren.frameTab.open({ F_ModuleId: keren.newGuid(), F_Icon: 'fa fa-file-text-o', F_FullName: '新增门户页面', F_UrlAddress: '/KR_PortalSite/Page/Form?type=' + value });
                keren.layerClose(window.name);
            });
        }
    };
    page.init();
}
