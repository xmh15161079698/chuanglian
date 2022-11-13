/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.05
 * 描 述：添加明细
 */
var parentId = request('parentId');
var itemCode = request('itemCode');

var keyValue = '';
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = top.selectedDataItemRow;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            /*检测重复项*/
            $('#F_ItemName').on('blur', function () {
                $.krExistField(keyValue, 'F_ItemName', top.$.rootUrl + '/KR_SystemModule/DataItem/ExistDetailItemName', { itemCode: itemCode });
            });
            $('#F_ItemValue').on('blur', function () {
                $.krExistField(keyValue, 'F_ItemValue', top.$.rootUrl + '/KR_SystemModule/DataItem/ExistDetailItemValue', { itemCode: itemCode });
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_ItemDetailId || '';
                $('#form').krSetFormData(selectedRow);
            }
            else {
                $('#F_ParentId').val(parentId);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData(keyValue);
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/DataItem/SaveDetailForm?keyValue=' + keyValue + "&itemCode="+itemCode, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };

    page.init();
}