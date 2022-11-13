/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-24 14:58
 * 描  述：地址管理
 */
var refreshGirdData;
var bootstrap = function ($, Keren) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (Keren.checkrow(keyValue)) {
                    Keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            Keren.deleteForm(top.$.rootUrl + '/KR_CodeModule/WD_Address/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 打印
            $('#kr_print').on('click', function () {
                $('#gridtable').jqprintTable();
            });
        },
        // 初始化列表
        initGird: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_CodeModule/WD_Address/GetPageList',
                headData: [
                    { label: "用户编号", name: "F_User_Id", width: 100, align: "left" },
                    { label: "所在地区", name: "F_Area", width: 100, align: "left" },
                    { label: "详细地址", name: "F_Detail_Address", width: 100, align: "left"},
                    { label: "联系人", name: "F_ReceiveName", width: 100, align: "left"},
                    { label: "联系人电话", name: "F_ReceivePhone", width: 100, align: "left"},
                    {
                        label: "默认地址", name: "F_Is_Default", width: 100, align: "left",
                        formatter: function (value, row, op, $cell) {
                            return (value==0?"否":"是");
                        }
                    },
                ],
                mainId:'F_Id',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload',{ queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
