/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：公司管理	
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
                    id: 'Form',
                    title: '添加公司',
                    url: top.$.rootUrl + '/KR_OrganizationModule/Company/Form',
                    width: 750,
                    height: 500,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_CompanyId');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'Form',
                        title: '编辑公司',
                        url: top.$.rootUrl + '/KR_OrganizationModule/Company/Form',
                        width: 750,
                        height: 500,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_CompanyId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_OrganizationModule/Company/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_OrganizationModule/Company/GetList',
                headData: [
                    { label: "公司名称", name: "F_FullName", width: 260, align: "left" },
                    { label: "公司编码", name: "F_EnCode", width: 150, align: "left" },
                    { label: "公司简称", name: "F_ShortName", width: 150, align: "left" },
                    { label: "公司性质", name: "F_Nature", width: 80, align: "center" },
                    {
                        label: "成立时间", name: "F_FoundedTime", width: 80, align: "center",
                        formatter: function (value) {
                            return keren.formatDate(value, 'yyyy-MM-dd');
                        }
                    },
                    { label: "负责人", name: "F_Manager", width: 80, align: "center"},
                    { label: "经营范围", name: "F_Fax", width: 200, align: "left" },
                    { label: "备注", name: "F_Description", width: 200, align: "left" }
                ],
                isTree: true,
                isTreeClose: true,
                mainId: 'F_CompanyId',
                parentId: 'F_ParentId'
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


