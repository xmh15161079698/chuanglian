/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：数据源管理	
 */
var keyValue = "";
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_DbId').krDbSelect();
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_Id;
                keren.httpAsync('GET', top.$.rootUrl + '/KR_SystemModule/DataSource/GetEntityByCode', { keyValue: selectedRow.F_Code }, function (data) {
                    $('#form').krSetFormData(data);
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData(keyValue);
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/DataSource/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}