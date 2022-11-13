/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：表单设计数据表添加	
 */
var dbId = request('dbId');

var selectedRow = top.layer_Form.selectedRow;
var dbTable = top.layer_Form.dbTable;


var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#field').krselect({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true
            });
            $('#relationField').krselect({
                value: 'f_column',
                text: 'f_column',
                title: 'f_remark',
                allowSearch: true
            });
            $('#name').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetList',
                param: { databaseLinkId: dbId },
                value: 'name',
                text: 'name',
                title: 'tdescription',
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        $('#field').krselectRefresh({
                            url: top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetFieldList',
                            param: { databaseLinkId: dbId, tableName: item.name }
                        });
                    }
                }
            });
            $('#relationName').krselect({
                data: dbTable,
                param: { databaseLinkId: dbId },
                value: 'name',
                text: 'name',
                maxHeight: 160,
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        $('#relationField').krselectRefresh({
                            url: top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetFieldList',
                            param: { databaseLinkId: dbId, tableName: item.name }
                        });
                    }
                }
            });
        },
        initData: function () {
            if (!!selectedRow) {
                $('#form').krSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }

        var data = $('#form').krGetFormData();
        if (data.name == data.relationName)
        {
            keren.alert.error('关联表不能是自己本身！');
            return false;
        }
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };
    page.init();
}