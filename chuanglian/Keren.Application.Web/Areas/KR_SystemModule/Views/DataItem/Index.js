/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：数据字典管理	
 */
var refreshGird;
var bootstrap = function ($, keren) {
    "use strict";
    var classify_itemCode = '';
    var page = {
        init: function () {
            page.initTree();
            page.initGrid();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                if (!classify_itemCode) {
                    keren.alert.warning('请选择字典分类！');
                    return false;
                }
                top.selectedDataItemRow = null;
                var parentId = $('#gridtable').jfGridValue('F_ItemDetailId') || '0';
                keren.layerForm({
                    id: 'form',
                    title: '添加字典',
                    url: top.$.rootUrl + '/KR_SystemModule/DataItem/Form?parentId=' + parentId + '&itemCode=' + classify_itemCode,
                    width: 500,
                    height: 370,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGird);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ItemDetailId');
                top.selectedDataItemRow = $('#gridtable').jfGridGet('rowdata');


               

                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑字典',
                        url: top.$.rootUrl + '/KR_SystemModule/DataItem/Form?itemCode=' + classify_itemCode,
                        width: 500,
                        height: 370,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGird);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_ItemDetailId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_SystemModule/DataItem/DeleteDetailForm', { keyValue: keyValue }, function () {
                                refreshGird();
                            });
                        }
                    });
                }
            });
            /*分类管理*/
            $('#kr_category').on('click', function () {
                keren.layerForm({
                    id: 'ClassifyIndex',
                    title: '分类管理',
                    url: top.$.rootUrl + '/KR_SystemModule/DataItem/ClassifyIndex',
                    width: 800,
                    height: 500,
                    maxmin: true,
                    btn: null,
                    end: function () {
                        location.reload();
                    }
                });
            });
        },
        initTree: function () {
            $('#kr_left_tree').krtree({
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetClassifyTree',
                nodeClick: function (item) {
                    classify_itemCode = item.value;
                    $('#titleinfo').text(item.text + '(' + classify_itemCode + ')');
                    page.search();
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetDetailList',
                headData: [
                    { label: '项目名', name: 'F_ItemName', width: 200, align: 'left' },
                    { label: '项目值', name: 'F_ItemValue', width: 200, align: 'left' },
                    { label: '简拼', name: 'F_SimpleSpelling', width: 150, align: 'left' },
                    { label: '排序', name: 'F_SortCode', width: 80, align: 'center' },
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],

                isTree: true,
                mainId: 'F_ItemDetailId',
                parentId: 'F_ParentId',
            });
        },
        search: function (param) {
            param = param || {};
            param.itemCode = classify_itemCode;
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    refreshGird = function () {
        page.search();
    };

    page.init();
}


    