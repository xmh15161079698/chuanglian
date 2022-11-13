/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：部门管理	
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, keren) {
    "use strict";
    var companyId = '';
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
            // 新增
            $('#kr_add').on('click', function () {
                if (!companyId) {
                    keren.alert.warning('请选择公司！');
                    return false;
                }
                selectedRow = null;
                keren.layerForm({
                    id: 'form',
                    title: '添加部门',
                    url: top.$.rootUrl + '/KR_OrganizationModule/Department/Form?companyId=' + companyId,
                    width: 700,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_DepartmentId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑部门',
                        url: top.$.rootUrl + '/KR_OrganizationModule/Department/Form?companyId=' + companyId,
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
                var keyValue = $('#gridtable').jfGridValue('F_DepartmentId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_OrganizationModule/Department/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        inittree: function () {
            $('#companyTree').krtree({
                url: top.$.rootUrl + '/KR_OrganizationModule/Company/GetTree',
                param: { parentId: '0' },
                nodeClick: page.treeNodeClick
            });
            $('#companyTree').krtreeSet('setValue', '53298b7a-404c-4337-aa7f-80b2a4ca6681');
        },
        treeNodeClick: function (item) {
            companyId = item.id;
            $('#titleinfo').text(item.text);
            page.search();
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_OrganizationModule/Department/GetList',
                headData: [
                        { label: "部门名称", name: "F_FullName", width: 200, align: "left" },
                        { label: "部门编号", name: "F_EnCode", width: 100, align: "left" },
                        { label: "部门简称", name: "F_ShortName", width: 100, align: "left"},
                        { label: "部门性质", name: "F_Nature", width: 100, align: "left" },
                        { label: "负责人", name: "F_Manager", width: 100, align: "left"},
                        { label: "电话号", name: "F_OuterPhone", width: 100, align: "left" },
                        { label: "分机号", name: "F_InnerPhone", width: 60, align: "center" },
                        { label: "备注", name: "F_Description", width: 200, align: "left"}
                ],

                isTree: true,
                mainId: 'F_DepartmentId',
                parentId: 'F_ParentId',
            });
        },
        search: function (param) {
            param = param || {};
            param.companyId = companyId;
            $('#gridtable').jfGridSet('reload', param);
        }
    };

    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };

    page.init();
}


