/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：表格选择项字段选择	
 */
var dbId = request('dbId');
var tableName = request('tableName');

var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var selectFieldData = top.layer_SetFieldForm.selectFieldData;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 绑定字段
            $('#value').krselect({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true,
                maxHeight:160
            });
            keren.httpAsync('GET', top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetFieldList', { databaseLinkId: dbId, tableName: tableName }, function (data) {
                $('#value').krselectRefresh({
                    data: data
                });
            });
            // 对齐方式
            $('#align').krselect({ placeholder: false }).krselectSet('left');
            // 是否隐藏
            $('#hide').krselect({ placeholder: false }).krselectSet('0');
        },
        initData: function () {
            if (!!selectFieldData)
            {
                $('#form').krSetFormData(selectFieldData);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        callBack(postData);

        return true;
    };
    page.init();
}