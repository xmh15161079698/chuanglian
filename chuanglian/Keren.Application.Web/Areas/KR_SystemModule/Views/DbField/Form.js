/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-03-12 11:52
 * 描  述：添加常用字段
 */
var acceptClick;
var keyValue = request('keyValue');

var bootstrap = function ($, keren) {
    "use strict";

    var selectedRow = keren.frameTab.currentIframe().selectedRow;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_DataType').krDataItemSelect({ code: 'DbFieldType', maxHeight: 100 });
        },
        /*初始化数据*/
        initData: function () {
            if (!!keyValue) {
                $('#form').krSetFormData(selectedRow);
            }
        },

    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/DbField/SaveForm?keyValue=' + keyValue, postData, function (res) {
            callBack();
        });
    };
    page.init();
}

