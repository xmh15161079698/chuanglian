/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：人员管理	
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
            $('#jfgrid_body_gridtable').krscrollSet('moveBottom');
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
                placeholder:'请选择部门',
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
                    title: '添加账号',
                    url: top.$.rootUrl + '/KR_OrganizationModule/User/Form?companyId=' + companyId,
                    width: 750,
                    height: 450,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑账号',
                        url: top.$.rootUrl + '/KR_OrganizationModule/User/Form?companyId=' + companyId,
                        width: 750,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_OrganizationModule/User/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 用户数据导出
            $('#kr_export').on('click', function () {
                location.href = top.$.rootUrl + "/KR_OrganizationModule/User/ExportUserList";
            });
            // 启用
            $('#kr_enabled').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认要【启用】账号！', function (res) {
                        if (res) {
                            keren.postForm(top.$.rootUrl + '/KR_OrganizationModule/User/UpdateState', { keyValue: keyValue, state: 1 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 禁用
            $('#kr_disabled').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认要【禁用】账号！', function (res) {
                        if (res) {
                            keren.postForm(top.$.rootUrl + '/KR_OrganizationModule/User/UpdateState', { keyValue: keyValue, state: 0 }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 重置账号
            $('#kr_resetpassword').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认要【重置密码】！', function (res) {
                        if (res) {
                            keren.postForm(top.$.rootUrl + '/KR_OrganizationModule/User/ResetPassword', { keyValue: keyValue}, function () {
                            });
                        }
                    });
                }
            });
            // 功能授权
            $('#kr_authorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'authorizeForm',
                        title: '功能授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/KR_AuthorizeModule/Authorize/Form?objectId=' + keyValue + '&objectType=2',
                        width: 550,
                        height: 690,
                        btn: null
                    });
                }
            });
            // 移动功能授权
            $('#kr_appauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'appAuthorizeForm',
                        title: '移动功能授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/KR_AuthorizeModule/Authorize/AppForm?objectId=' + keyValue + '&objectType=2',
                        width: 550,
                        height: 690,
                        callBack: function (id) {
                            return top[id].acceptClick();
                        }
                    });
                }
            });
            // 数据授权
            $('#kr_dataauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'dataAuthorizeForm',
                        title: '数据授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/KR_AuthorizeModule/DataAuthorize/Index?objectId=' + keyValue + '&objectType=2',
                        width: 1100,
                        height: 700,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 自定义表单数据授权
            $('#kr_cdataauthorize').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'dataAuthorizeForm',
                        title: '自定义表单数据授权 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/KR_AuthorizeModule/DataAuthorize/CustomerFormIndex?objectId=' + keyValue + '&objectType=2',
                        width: 1100,
                        height: 700,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 设置Ip过滤
            $('#kr_ipfilter').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'filterIPIndex',
                        title: 'TCP/IP 地址访问限制 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/KR_AuthorizeModule/FilterIP/Index?objectId=' + keyValue + '&objectType=Uesr',
                        width: 600,
                        height: 400,
                        btn: null,
                        callBack: function (id) { }
                    });
                }
            });
            // 设置时间段过滤
            $('#kr_timefilter').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_UserId');
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'filterTimeForm',
                        title: '时段访问过滤 - ' + selectedRow.F_RealName,
                        url: top.$.rootUrl + '/KR_AuthorizeModule/FilterTime/Form?objectId=' + keyValue + '&objectType=Uesr',
                        width: 610,
                        height: 470,
                        callBack: function (id) {
                            return top[id].acceptClick();
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
                url: top.$.rootUrl + '/KR_OrganizationModule/User/GetPageList',
                headData: [
                        { label: '账户', name: 'F_Account', width: 100, align: 'left', frozen: true },
                        { label: '姓名', name: 'F_RealName', width: 160, align: 'left', frozen: true },
                        {
                            label: '性别', name: 'F_Gender', width: 45, align: 'center',
                            formatter: function (cellvalue) {
                                return cellvalue == 0 ? "女" : "男";
                            }
                        },
                        { label: '手机', name: 'F_Mobile', width: 100, align: 'center'},
                        {
                            label: '部门', name: 'F_DepartmentId', width: 100, align: 'left',
                            formatterAsync: function (callback, value, row) {
                                keren.clientdata.getAsync('department', {
                                    key: value,
                                    callback: function (item) {
                                        callback(item.name);
                                    }
                                });
                            }
                        },
                        {
                            label: "状态", name: "F_EnabledMark", index: "F_EnabledMark", width: 50, align: "center",
                            formatter: function (cellvalue) {
                                if (cellvalue == 1) {
                                    return '<span class=\"label label-success\" style=\"cursor: pointer;\">正常</span>';
                                } else if (cellvalue == 0) {
                                    return '<span class=\"label label-default\" style=\"cursor: pointer;\">禁用</span>';
                                }
                            }
                        },
                        { label: "备注", name: "F_Description", index: "F_Description", width: 200, align: "left" }

                ],
                isPage: true,
                reloadSelected: true,
                mainId: 'F_UserId'
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


