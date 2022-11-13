/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-27 10:16
 * 描  述：商品管理
 */
var refreshGirdData;
var bootstrap = function ($, Keren) {
    "use strict";
    var page = {
        init: function () {
            
            page.initGird();
            page.bind();
        },
        //xx: function () {
        //    //console.log(page.keyValue)
        //    $('#F_Goods_NameId').on('change', function () {
        //        $.ajax({

        //            url: top.$.rootUrl + '/KR_CodeModule/WD_Goods/GetColorCardByGoodsId?keyValue=' + page.keyValue,
        //            type: "get",
        //            dataType: "json",
        //            success: function (datas) {
        //                //console.log("CardEnt",datas.data.WD_Goods.F_Goods_ColorCardId);
        //                var id = datas.data.WD_Goods.F_Goods_ColorCardId;
        //                console.log($("#F_Goods_ColorCardId option").length)
        //                $("#F_Goods_ColorCardId option").each(function (item, index) {
        //                    console.log(item)
        //                    $(item).prop("selected", ($(item).val() == id))

        //                })
        //            }

        //        })
        //    })
        //},
        bind: function () {
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                Keren.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/KR_CodeModule/WD_Goods/Form',
                    width: 600,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                //console.log(page.keyValue)
                if (Keren.checkrow(keyValue)) {
                    Keren.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_CodeModule/WD_Goods/Form?keyValue=' + keyValue,
                        width: 600,
                        height: 400,
                        callBack: function (id) {
                            //console.log($("#F_Goods_ColorCardId option").length)
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                    
                }
                
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (Keren.checkrow(keyValue)) {
                    Keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            Keren.deleteForm(top.$.rootUrl + '/KR_CodeModule/WD_Goods/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/KR_CodeModule/WD_Goods/GetPageList',
                headData: [
                    { label: "商品编号", name: "F_Id", width: 100, align: "left" },
                    { label: "商品类别", name: "F_Goods_NameId", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             Keren.clientdata.getAsync('custmerData', {
                                 url: '/KR_SystemModule/DataSource/GetDataTable?code=' + 'Type',
                                 key: value,
                                 keyId: 'f_id',
                                 callback: function (_data) {
                                     callback(_data['f_type']);
                                 }
                             });
                        }},
                    { label: "单价", name: "F_Goods_Price", width: 100, align: "left"},
                    { label: "库存", name: "F_Goods_Stocks", width: 100, align: "left"},
                    { label: "开始时间", name: "F_FromDate", width: 100, align: "left"},
                    { label: "截止时间", name: "F_ToDate", width: 100, align: "left"},
                    { label: "颜色编号", name: "F_Goods_ColorId", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             Keren.clientdata.getAsync('custmerData', {
                                 url: '/KR_SystemModule/DataSource/GetDataTable?code=' + 'ColorType',
                                 key: value,
                                 keyId: 'f_id',
                                 callback: function (_data) {
                                     callback(_data['f_goodsclass_name']);
                                 }
                             });
                        }},
                    { label: "风格编号", name: "F_Goods_StyleId", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             Keren.clientdata.getAsync('custmerData', {
                                 url: '/KR_SystemModule/DataSource/GetDataTable?code=' + 'StyleType',
                                 key: value,
                                 keyId: 'f_id',
                                 callback: function (_data) {
                                     callback(_data['f_goodsclass_name']);
                                 }
                             });
                        }},
                    { label: "空间编号", name: "F_Goods_SpaceId", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             Keren.clientdata.getAsync('custmerData', {
                                 url: '/KR_SystemModule/DataSource/GetDataTable?code=' + 'SpaceType',
                                 key: value,
                                 keyId: 'f_id',
                                 callback: function (_data) {
                                     callback(_data['f_goodsclass_name']);
                                 }
                             });
                        }
                    },
                    {
                        label: "商品色卡", name: "F_Goods_ColorCardId", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op, $cell) {
                            Keren.clientdata.getAsync('custmerData', {
                                url: '/KR_SystemModule/DataSource/GetDataTable?code=' + 'ColorCardType',
                                key: value,
                                keyId: 'f_id',
                                callback: function (_data) {
                                    callback(_data['f_colorcard_name']);
                                }
                            });
                        }
                    },
                    { label: "商品详情", name: "F_Goods_Detail", width: 100, align: "left" },
                    
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
