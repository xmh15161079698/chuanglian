/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2019-01-02 09:35
 * 描  述：模块风格选择
 */
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('.box-content').on('click', function () {//1.公告；2消息列表；3消息列表2； 4图形列表；5详细列表
                var value = $(this).attr('data-value');
                keren.frameTab.currentIframe().addModule(value);

                keren.layerClose(window.name);
            });
        }
    };
    page.init();
}
