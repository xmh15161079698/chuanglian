/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-24 16:14
 * 描  述：订单详情
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
                            Keren.deleteForm(top.$.rootUrl + '/KR_CodeModule/WD_OrderItem/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/KR_CodeModule/WD_OrderItem/GetPageList',
                headData: [
                    { label: "订单编号", name: "F_Order_Id", width: 100, align: "left"},
                    { label: "用户编号", name: "F_User_Id", width: 100, align: "left"},
                    { label: "商品编号", name: "F_Goods_Id", width: 100, align: "left"},
                    { label: "商品名称", name: "F_Goods_Name", width: 100, align: "left"},
                    {
                        label: "商品图", name: "F_Goods_ImageAddr", width: 100, align: "left",
                        formatter: function (value, row, op, $cell) {
                            return '<image src=' + value + ' height="100%" width="40"/>';
                        }
                    },
                    { label: "单价", name: "F_CurrentUnitPrice", width: 100, align: "left"},
                    { label: "购买数量", name: "F_Goods_Amount", width: 100, align: "left"},
                    { label: "总金额", name: "F_TotalPrice", width: 100, align: "left"},
                    { label: "下单时间", name: "F_CreateTime", width: 100, align: "left"},
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
