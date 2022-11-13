/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：数据库管理	
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
            $('#F_DbType').krDataItemSelect({ code: 'DbVersion' });

            $('#kr_test').on('click', function () {
                var dbType = $('#F_DbType').krselectGet();
                if (!dbType) {
                    keren.alert.error('请选择数据库类型');
                    return false;
                }
                var connection = $('#F_DbConnection').val();
                if (!connection) {
                    keren.alert.error('请填写数据库连接串');
                    return false;
                }
                $.krPostForm(top.$.rootUrl + '/KR_SystemModule/DatabaseLink/TestConnection', { connection: connection, dbType: dbType, keyValue: keyValue });
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_DatabaseLinkId;
                $('#form').krSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData(keyValue);
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/DatabaseLink/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}