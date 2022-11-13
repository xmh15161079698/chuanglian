/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.28
 * 描 述：桌面统计配置
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
                    title: '添加',
                    url: top.$.rootUrl + '/KR_Desktop/DTChart/Form',
                    width: 600,
                    height: 500,
                    btn: null
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                selectedRow = $('#gridtable').jfGridGet('rowdata');
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'Form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_Desktop/DTChart/Form',
                        width: 600,
                        height: 500,
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
                            keren.deleteForm(top.$.rootUrl + '/KR_Desktop/DTChart/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_Desktop/DTChart/GetPageList',
                headData: [
                    { label: '名称', name: 'F_Name', width: 150, align: 'left' },
                    {
                        label: '图标', name: 'F_Icon', width: 60, align: 'center',
                        formatter: function (cellvalue) {
                            return '<i class="' + cellvalue + '" ></i>';
                        }
                    },
                    { label: '创建用户', name: 'F_CreateUserName', width: 100, align: 'left' },
                    {
                        label: '创建时间', name: 'F_CreateDate', width: 130, align: 'left',
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    },
                    { label: "说明", name: "F_Description", width: 200, align: "left" }

                ],
                mainId: 'F_Id'
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


