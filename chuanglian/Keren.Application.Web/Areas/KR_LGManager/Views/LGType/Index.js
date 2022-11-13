/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-04-10 15:08
 * 描  述：语言类型
 */
var selectedRow;
var refreshGirdData;
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
                page.search({ keyword: keyword });
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
                    title: '新增',
                    url: top.$.rootUrl + '/KR_LGManager/LGType/Form',
                    width: 300,
                    height: 180,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_LGManager/LGType/Form?keyValue=' + keyValue,
                        width: 300,
                        height: 180,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    if (selectedRow.F_IsMain === 1) {
                        keren.alert.warning("主语言不能删除！");
                        return false;
                    }
                    keren.httpAsyncGet(top.$.rootUrl + '/KR_LGManager/LGMap/GetListByTypeCode?TypeCode=' + selectedRow.F_Code, function (res) {
                        if (res.data.length != 0) {
                            keren.alert.warning("请先删除编码对应数据！");
                            return false;
                        }
                        else {
                            keren.layerConfirm('是否确认删除该项！', function (res) {
                                if (res) {
                                    keren.deleteForm(top.$.rootUrl + '/KR_LGManager/LGType/DeleteForm', { keyValue: keyValue }, function () {
                                        refreshGirdData();
                                    });
                                }
                            });
                        }
                    });
                }
            });
            $('#kr_mainlg').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认设为主语言！', function (res, index) {
                        if (res) {
                            keren.loading(true, '正在设置主语言');
                            keren.httpAsyncPost(top.$.rootUrl + '/KR_LGManager/LGType/SetMainLG', { keyValue: keyValue }, function (res) {
                                keren.loading(false);
                                if (res.code == keren.httpCode.success) {
                                    keren.alert.success(res.info);
                                    refreshGirdData();
                                }
                                else {
                                    keren.alert.error(res.info);
                                    keren.httpErrorLog(res.info);
                                }
                                top.layer.close(index)
                            });
                        }
                    })
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_LGManager/LGType/GetList',
                headData: [
                    { label: '名称', name: 'F_Name', width: 200, align: "left" },
                    { label: '编码', name: 'F_Code', width: 300, align: "left" },
                    {
                        label: '主语言', name: 'F_IsMain', width: 80, align: "left",
                        formatter: function (cellvalue) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-info\" style=\"cursor: pointer;\">是</span>';
                            }
                            else return '<span class=\"label label-danger\" style=\"cursor: pointer;\">否</span>';
                        }
                    },
                ],
                mainId: 'F_Id',
                reloadSelected: true,
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
