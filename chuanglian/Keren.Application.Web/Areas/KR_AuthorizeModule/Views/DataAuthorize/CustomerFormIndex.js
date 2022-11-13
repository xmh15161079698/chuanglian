﻿/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-框架开发组
 * 日  期：2017-06-21 16:30
 * 描  述：数据权限
 */
var objectId = request("objectId");
var objectType = request("objectType");


var refreshGirdData;
var bootstrap = function ($, keren) {
    "use strict";

    var interfaceId = '';
    var formId = '';
    var page = {
        init: function () {
            page.inittree();
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
            if (!!objectId) {
                // 新增
                $('#kr_add').on('click', function () {
                    if (!interfaceId) {
                        keren.alert.warning('请选择左侧功能！');
                        return false;
                    }
                    keren.layerForm({
                        id: 'form',
                        title: '新增数据权限',
                        url: top.$.rootUrl + '/KR_AuthorizeModule/DataAuthorize/Form?interfaceId=' + interfaceId + '&objectId=' + objectId + '&objectType=' + objectType + '&type=2' + '&formId=' + formId,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                });
            }
            else {
                $('#kr_add').hide();
            }
            // 编辑
            $('#kr_edit').on('click', function () {
                if (!formId) {
                    keren.alert.warning('请选择左侧功能！');
                    return false;
                }
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑数据权限',
                        url: top.$.rootUrl + '/KR_AuthorizeModule/DataAuthorize/Form?interfaceId=' + interfaceId + '&objectId=' + objectId + '&objectType=' + objectType + '&keyValue=' + keyValue + '&type=2' + '&formId=' + formId,
                        width: 700,
                        height: 400,
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
                            keren.deleteForm(top.$.rootUrl + '/KR_AuthorizeModule/DataAuthorize/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        inittree: function () {
            $('#interface_tree').krtree({
                url: top.$.rootUrl + '/KR_FormModule/FormRelation/GetTree',
                nodeClick: page.treeNodeClick
            });
        },
        treeNodeClick: function (item) {
            interfaceId = item.id;
            formId = item.value;
            $('#titleinfo').text(item.text);
            page.search();
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_AuthorizeModule/DataAuthorize/GetRelationPageList?type=2',
                headData: [
                    { label: "名称", name: "F_Name", width: 180, align: "left" },
                    {
                        label: "用户/角色", name: "F_ObjectId", width: 180, align: "left",
                        formatter: function (cellvalue, row) {
                            return !!row.UserName ? row.UserName : row.RoleName;
                        }
                    },
                    { label: "公式", name: "F_Formula", width: 280, align: "left" },
                    {
                        label: '创建人', name: 'F_CreateUserName', width: 100, align: 'left'
                    },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 100, align: "left",
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    }
                ],
                isPage: true,
                reloadSelected: true,
                mainId: 'F_Id'
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.interfaceId = interfaceId;
            param.objectId = objectId;
            $('#gridtable').jfGridSet('reload', param);
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
