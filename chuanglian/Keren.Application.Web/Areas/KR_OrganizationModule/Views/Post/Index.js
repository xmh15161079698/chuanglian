﻿/*
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
    var departmentId = '';
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
            // 部门选择
            $('#department_select').krselect({
                type: 'tree',
                placeholder: '请选择部门',
                // 展开最大高度
                maxHeight: 300,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {

                    if (!item || item.value == '-1') {
                        departmentId = '';
                    }
                    else {
                        departmentId = item.value;
                    }
                    page.search();
                }
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
                    title: '添加岗位',
                    url: top.$.rootUrl + '/KR_OrganizationModule/Post/Form?companyId=' + companyId,
                    width: 500,
                    height: 379,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_PostId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑岗位',
                        url: top.$.rootUrl + '/KR_OrganizationModule/Post/Form?companyId=' + companyId,
                        width: 500,
                        height: 379,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_PostId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_OrganizationModule/Post/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 添加岗位成员
            $('#kr_memberadd').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_PostId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '添加岗位成员',
                        url: top.$.rootUrl + '/KR_AuthorizeModule/UserRelation/SelectForm?objectId=' + keyValue + '&companyId=' + companyId + '&departmentId=' + selectedRow.F_DepartmentId + '&category=2',
                        width: 800,
                        height: 520,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
            // 产看成员
            $('#kr_memberlook').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_PostId');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '查看岗位成员',
                        url: top.$.rootUrl + '/KR_AuthorizeModule/UserRelation/LookForm?objectId=' + keyValue,
                        width: 800,
                        height: 520,
                        btn: null
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

            $('#department_select').krselectRefresh({
                // 访问数据接口地址
                url: top.$.rootUrl + '/KR_OrganizationModule/Department/GetTree',
                // 访问数据接口参数
                param: { companyId: companyId, parentId: '0' },
            });
            departmentId = '';
            page.search();
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_OrganizationModule/Post/GetList',
                headData: [
                        { label: "岗位名称", name: "F_Name", width: 300, align: "left" },
                        { label: "岗位编号", name: "F_EnCode", width: 100, align: "left" },
                        {
                            label: "所属部门", name: "F_DepartmentId", width: 120, align: "left",
                            formatterAsync: function (callback, value) {
                                keren.clientdata.getAsync('department', {
                                    key: value,
                                    companyId: companyId,
                                    callback: function (item) {
                                        callback(item.name);
                                    }
                                });
                            }
                        },
                        { label: "备注", name: "F_Description", width: 200, align: "left" },
                        { label: "创建人", name: "F_CreateUserName", width: 100, align: "left" },
                        {
                            label: "创建时间", name: "F_CreateDate", width: 100, align: "left",
                            formatter: function (cellvalue) {
                                return keren.formatDate(cellvalue, 'yyyy-MM-dd');
                            }
                        }
                ],

                isTree: true,
                mainId: 'F_PostId',
                parentId: 'F_ParentId',
            });
        },
        search: function (param) {
            param = param || {};
            param.companyId = companyId;
            param.departmentId = departmentId;

            $('#gridtable').jfGridSet('reload', param);
        }
    };

    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };

    page.init();
}


