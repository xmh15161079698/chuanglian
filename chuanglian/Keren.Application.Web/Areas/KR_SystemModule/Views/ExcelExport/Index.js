/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：Excel导入配置	
 */
var refreshGirdData; // 更新数据
var selectedRow;
var bootstrap = function ($, keren) {
    "use strict";
    var moduleId = "";
    var page = {
        init: function () {
            page.initGrid();
            page.bind();
        },
        bind: function () {
            $('#module_tree').krtree({
                url: top.$.rootUrl + '/KR_SystemModule/Module/GetModuleTree',
                nodeClick: function (item) {
                    if (item.hasChildren) {
                        moduleId = '';
                    }
                    else {
                        moduleId = item.id;
                        page.search();
                    }
                    $('#titleinfo').text(item.text);
                }
            });

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
                if (!moduleId) {
                    keren.alert.warning('请选择功能！');
                    return false;
                }
                selectedRow = null;
                keren.layerForm({
                    id: 'Form',
                    title: '添加快速导出',
                    url: top.$.rootUrl + '/KR_SystemModule/ExcelExport/Form?moduleId=' + moduleId,
                    width: 500,
                    height: 300,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'Form',
                        title: '编辑快速导出',
                        url: top.$.rootUrl + '/KR_SystemModule/ExcelExport/Form',
                        width: 500,
                        height: 300,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_SystemModule/ExcelExport/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 启用
            $('#kr_enable').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认要【启用】！', function (res) {
                        if (res) {
                            keren.postForm(top.$.rootUrl + '/KR_SystemModule/ExcelExport/UpdateState', { keyValue: keyValue, state: 1 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 禁用
            $('#kr_disable').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认要【停用】！', function (res) {
                        if (res) {
                            keren.postForm(top.$.rootUrl + '/KR_SystemModule/ExcelExport/UpdateState', { keyValue: keyValue, state: 0 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_SystemModule/ExcelExport/GetPageList',
                headData: [
                    { label: "导出名称", name: "F_Name", width: 160, align: "left" },
                    {
                        label: "绑定功能", name: "F_ModuleId", width: 160, align: "left",
                        formatter: function (cellvalue) {
                            var data = keren.clientdata.get(['modulesMap']);
                            if (!!data[cellvalue]) { return data[cellvalue].F_FullName; }
                            else {
                                return '';
                            }


                        }
                    },
                    { label: "绑定按钮", name: "F_BtnName", width: 160, align: "left" },
                    {
                        label: "状态", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-success\" style=\"cursor: pointer;\">启用</span>';
                            } else if (cellvalue == 0) {
                                return '<span class=\"label label-default\" style=\"cursor: pointer;\">停用</span>';
                            }
                        }
                    },
                    {
                        label: '创建人', name: 'F_CreateUserName', width: 130, align: 'left'

                    },
                    {
                        label: '创建时间', name: 'F_CreateDate', width: 130, align: 'left',
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.moduleId = moduleId;
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    }

    page.init();
}
