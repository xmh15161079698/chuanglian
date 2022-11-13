/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.09
 * 描 述：个人中心-语言设置	
 */
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#Setting').krselect({
                url: top.$.rootUrl + '/KR_LGManager/LGType/GetList',
                value: 'F_Code',
                text: 'F_Name',
                title: 'F_Name'
            });
            var code = top.$.cookie('Learn_ADMS_V7_Language') || keren.language.getMainCode();
            $('#Setting').krselectSet(code);

            $('#kr_save_btn').on('click', function () {
                var formData = $('#form').krGetFormData();
                top.$.cookie('Learn_ADMS_V7_Language', formData.Setting, { path: "/" });

                keren.alert.success('设置成功');

            });
        }
    };
    page.init();
}