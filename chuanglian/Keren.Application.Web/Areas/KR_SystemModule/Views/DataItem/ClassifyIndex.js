/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：数据字典管理	
 */
var refreshGirdData; // 更新数据
var selectedRow;
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.initGrid();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({keyword: keyword });
            });
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                var f_ItemId = $('#gridtable').jfGridValue('F_ItemId');
                selectedRow = null;
                keren.layerForm({
                    id: 'ClassifyForm',
                    title: '添加分类',
                    url: top.$.rootUrl + '/KR_SystemModule/DataItem/ClassifyForm?parentId=' + f_ItemId,
                    width: 500,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_ItemId');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'ClassifyForm',
                        title: '编辑分类',
                        url: top.$.rootUrl + '/KR_SystemModule/DataItem/ClassifyForm',
                        width: 500,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ItemId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_SystemModule/DataItem/DeleteClassifyForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetClassifyList',
                headData: [
                    { label: '名称', name: 'F_ItemName', width: 200, align: 'left' },
                    { label: '编号', name: 'F_ItemCode', width: 200, align: 'left' },
                    { label: '排序', name: 'F_SortCode', width: 50, align: 'center' },
                    {
                        label: "树型", name: "F_IsTree",width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    {
                        label: "有效", name: "F_EnabledMark",width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                isTree: true,
                mainId: 'F_ItemId',
                parentId: 'F_ParentId',
                reloadSelected:true
            });
            page.search();
        },
        search: function (param) {
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    }

    page.init();
}


