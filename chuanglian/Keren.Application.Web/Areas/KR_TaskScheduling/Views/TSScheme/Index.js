/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-10-19 16:07
 * 描  述：任务计划模板
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyWord: keyword });
            });
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                keren.layerForm({
                    id: 'form',
                    title: '新增任务',
                    url: top.$.rootUrl + '/KR_TaskScheduling/TSScheme/Form',
                    width: 700,
                    height: 610,
                    btn: null
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑任务',
                        url: top.$.rootUrl + '/KR_TaskScheduling/TSScheme/Form?keyValue=' + keyValue,
                        width: 700,
                        height: 610,
                        btn: null
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_TaskScheduling/TSScheme/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            ///暂停任务
            $('#kr_disabled').on('click', function () {
                var processId = $('#gridtable').jfGridValue('F_PorcessId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(processId)) {
                    if (selectedRow.F_State == "2" || selectedRow.F_State == "1") {
                        keren.layerConfirm('是否确认暂停该任务！', function (res,_index) {
                            if (res) {
                                keren.loading(true, '暂停任务中...');
                                keren.httpAsync('Post', top.$.rootUrl + '/KR_TaskScheduling/TSScheme/PauseJob', { processId: processId }, function (data) {
                                    keren.loading(false);
                                    refreshGirdData();
                                });
                                top.layer.close(_index);
                            }
                        });
                    } else {
                        keren.alert.error('当前任务状态下，无法暂停任务');
                    }
                }
            });
            ///重新启动任务
            $('#kr_enabled').on('click', function () {
                var processId = $('#gridtable').jfGridValue('F_PorcessId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(processId)) {
                    if (selectedRow.F_State == "3") {
                        keren.layerConfirm('是否确认启动该任务！', function (res, _index) {
                            if (res) {
                                if (res) {
                                    keren.loading(true, '启动任务中...');
                                    keren.httpAsync('Post', top.$.rootUrl + '/KR_TaskScheduling/TSScheme/ResumeJob', { processId: processId }, function (data) {
                                        keren.loading(false);
                                        refreshGirdData();
                                    });
                                    top.layer.close(_index);
                                }
                            }
                        });
                    } else {
                        keren.alert.error('当前任务状态下，无法启动任务');
                    }
                }
            });
        },
        initGird: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_TaskScheduling/TSScheme/GetPageList',
                headData: [
                    { label: '名称', name: 'F_Name', width: 200, align: "left" },
                    {
                        label: '状态', name: 'F_State', width: 80, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-primary\" style=\"cursor: pointer;\">待执行</span>';
                            } else if (cellvalue == 2) {
                                return '<span class=\"label label-success\" style=\"cursor: pointer;\">运行中</span>';
                            }
                            else if (cellvalue == 3) {
                                return '<span class=\"label label-default\" style=\"cursor: pointer;\">暂停中</span>';
                            }
                            else if (cellvalue == 4) {
                                return '<span class=\"label label-info\" style=\"cursor: pointer;\">已结束</span>';
                            }
                        }
                    },
                    {
                        label: '开始时间', name: 'F_BeginTime', width: 140, align: "center",
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
                        }
                    },
                    {
                        label: '结束时间', name: 'F_EndTime', width: 140, align: "center",
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
                        }
                    },
                    { label: '说明', name: 'F_Description', width: 200, align: "left" },

                ],
                mainId: 'F_Id',
                sidx:'',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
