/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.28
 * 描 述：桌面消息查看
 */
var id = request('id');
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            var item = top['dtlist' + id];
            $('.title p').text(item.f_title);
            $('.con').html($('<div></div>').html(item.f_content).text());
        }
    };
    page.init();
}