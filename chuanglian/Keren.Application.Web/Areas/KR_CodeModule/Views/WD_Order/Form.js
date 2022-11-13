/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-24 16:00
 * 描  述：订单
 */
var acceptClick;
var keyValue = request('keyValue');
var bootstrap = function ($, Keren) {
    "use strict";
    var page = {
        init: function () {
            $('.kr-form-wrap').krscroll();
            page.bind();
            page.initData();
        },
        bind: function () {
        },
        initData: function () {
            if (!!keyValue) {
                $.krSetForm(top.$.rootUrl + '/KR_CodeModule/WD_Order/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                            $('#' + id ).jfGridSet('refreshdata', data[id]);
                        }
                        else {
                            $('[data-table="' + id + '"]').krSetFormData(data[id]);
                        }
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('body').krValidform()) {
            return false;
        }
        var postData = {
            strEntity: JSON.stringify($('body').krGetFormData())
        };
        $.krSaveForm(top.$.rootUrl + '/KR_CodeModule/WD_Order/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}
