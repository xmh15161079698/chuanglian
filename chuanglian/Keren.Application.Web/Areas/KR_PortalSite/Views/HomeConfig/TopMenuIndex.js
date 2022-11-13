﻿/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：数据字典管理	
 */
var refreshGirdData; // 更新数据
var selectedRow;
var topMenuList = {};
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
                

                var id = $('#gridtable').jfGridValue('F_Id');
                selectedRow = null;
                keren.layerForm({
                    id: 'TopMenuForm',
                    title: '添加菜单',
                    url: top.$.rootUrl + '/KR_PortalSite/HomeConfig/TopMenuForm?parentId=' + id,
                    width: 500,
                    height: 400,
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
                        id: 'TopMenuForm',
                        title: '编辑菜单',
                        url: top.$.rootUrl + '/KR_PortalSite/HomeConfig/TopMenuForm',
                        width: 500,
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
                            keren.deleteForm(top.$.rootUrl + '/KR_PortalSite/HomeConfig/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/KR_PortalSite/HomeConfig/GetList?type=6',
                headData: [
                    { label: '名称', name: 'F_Name', width: 200, align: 'left' },
                    { label: '排序码', name: 'F_Sort', width: 50, align: 'center' },
                    {
                        label: '链接类型', name: 'F_UrlType', width: 80, align: 'center',
                        formatter: function (cellvalue, row) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-warning\" style=\"cursor: pointer;\">内部链接</span>';
                            } else {
                                return '<span class=\"label label-primary\" style=\"cursor: pointer;\">外部链接</span>';
                            }
                        }
                    },
                    {
                        label: '链接地址', name: 'F_Url', width: 200, align: 'left',
                        formatterAsync: function (callback, value, row) {
                            if (row.F_UrlType == 1) {
                                keren.clientdata.getAsync('custmerData', {
                                    url: '/KR_PortalSite/Page/GetList',
                                    key: value,
                                    keyId: 'F_Id',
                                    callback: function (item) {
                                        callback(item.F_Title);
                                    }
                                });
                            } else {
                                return callback(value);
                            }
                        }
                    }
                ],
                isTree: true,
                mainId: 'F_Id',
                parentId: 'F_ParentId',
                reloadSelected: true,
                onRenderComplete: function (data) {
                    topMenuList = {};
                    $.each(data, function (_index, _item) {
                        topMenuList[_item.F_ParentId] = topMenuList[_item.F_ParentId] || [];
                        topMenuList[_item.F_ParentId].push(_item);
                    });
                    keren.frameTab.currentIframe().renderTopMenu(topMenuList);
                }
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


