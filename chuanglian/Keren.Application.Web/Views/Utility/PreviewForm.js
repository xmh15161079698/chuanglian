/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.28
 * 描 述：自定义表单预览
 */
var keyValue = request('keyValue');
var bootstrap = function ($, keren) {
    "use strict";
    var formData;
    var page = {
        init: function () {
            if (!!keyValue) {
                formData = top[keyValue];
                $('body').krCustmerFormRender(formData);
            }
        }
    };
    page.init();
}