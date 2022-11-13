/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.05
 * 描 述：分类管理	
 */
var parentId = request('parentId');
var selectedRow = top.layer_ClassifyIndex.selectedRow;

var keyValue = '';
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 上级
            $('#F_ParentId').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetClassifyTree',
                type: 'tree',
                allowSearch: true,
                maxHeight:225
            }).krselectSet(parentId);
            /*检测重复项*/
            $('#F_ItemName').on('blur', function () {
                $.krExistField(keyValue, 'F_ItemName', top.$.rootUrl + '/KR_SystemModule/DataItem/ExistItemName');
            });
            $('#F_ItemCode').on('blur', function () {
                $.krExistField(keyValue, 'F_ItemCode', top.$.rootUrl + '/KR_SystemModule/DataItem/ExistItemCode');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ItemId || '';
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
        if (postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        else if (postData["F_ParentId"] == keyValue) {
            keren.alert.error('上级不能是自己本身');
            return false;
        }
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/DataItem/SaveClassifyForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };

    page.init();
}