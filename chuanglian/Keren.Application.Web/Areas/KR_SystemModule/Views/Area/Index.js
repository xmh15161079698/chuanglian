/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：行政区域	
 */
var refreshGird; // 更新表格
var selectedRow;
var bootstrap = function ($, keren) {
    "use strict";
    var parentId = "0";
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
                page.search({keyword: keyword });
            });
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                selectedRow = null;
                keren.layerForm({
                    id: 'form',
                    title: '添加区域',
                    url: top.$.rootUrl + '/KR_SystemModule/Area/Form?parentId=' + parentId,
                    height: 310,
                    width: 500,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGird);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_AreaId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑区域',
                        url: top.$.rootUrl + '/KR_SystemModule/Area/Form?parentId=' + parentId,
                        height: 310,
                        width: 500,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGird);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_AreaId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_SystemModule/Area/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGird();
                            });
                        }
                    });
                }
            });
        },
        initTree: function () {
            $('#kr_left_tree').krtree({
                url: top.$.rootUrl + '/KR_SystemModule/Area/GetTree',
                nodeClick: function (item) {
                    parentId = item.id;
                    page.search();
                    $('#titleinfo').text(item.text);
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_SystemModule/Area/GetList',
                headData: [
                    { label: "编号", name: "F_AreaCode", width: 100, align: "left" },
                    { label: "名称", name: "F_AreaName", width: 300, align: "left" },
                    { label: "简拼", name: "F_SimpleSpelling", width: 100, align: "left" },
                    { label: "级别", name: "F_Layer", width: 50, align: "center" },
                    {
                        label: "有效", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue, options, rowObject) {
                            return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                        }
                    },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                mainId: 'F_AreaId',
                reloadSelected: true
            });

            page.search();
        },
        search: function (param) {
            param = param || {};
            param.parentId = parentId;
            $('#gridtable').jfGridSet('reload', param);
        }
    };
    // 保存数据后回调刷新
    refreshGird = function () {
        page.search();
    }

    page.init();
}