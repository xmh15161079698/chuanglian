/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-24 16:00
 * 描  述：订单
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
                            Keren.deleteForm(top.$.rootUrl + '/KR_CodeModule/WD_Order/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/KR_CodeModule/WD_Order/GetPageList',
                headData: [
                    { label: "订单编号", name: "F_Order_Id", width: 100, align: "left" },
                    { label: "用户编号", name: "F_User_Id", width: 100, align: "left"},
                    { label: "地址编号", name: "F_Address_Id", width: 100, align: "left"},
                    { label: "支付金额", name: "F_Payment", width: 100, align: "left"},
                    { label: "运费", name: "F_Postage", width: 100, align: "left"},
                    {
                        label: "订单状态", name: "F_Status", width: 100, align: "left",
                        formatter: function (value, row, op, $cell) {
                            return (value == 0 ? "未支付" : "已支付");
                        }
                    },
                    { label: "支付时间", name: "F_PaymentDate", width: 100, align: "left" },
                    { label: "下单时间", name: "F_CreateDate", width: 100, align: "left" },
                    { label: "备注", name: "F_Remark", width: 100, align: "left" },
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
