/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：IP过滤设置	
 */
var objectId = request('objectId');
var objectType = request('objectType');

var refreshGirdData;
var bootstrap = function ($, keren) {
    "use strict";
    var visitType = '1';

    var page = {
        init: function () {
            page.initGrid();
            page.bind();
        },
        bind: function () {
            // 切换白黑名单
            $('#btn_visitType a').on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $("#btn_visitType a.active").removeClass('active');
                    $this.addClass('active');
                    visitType = $this.attr('data-value');
                    page.search();
                }
            });
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                keren.layerForm({
                    id: 'form',
                    title: '添加IP地址',
                    url: top.$.rootUrl + '/KR_AuthorizeModule/FilterIP/Form?objectId=' + objectId + '&objectType=' + objectType + "&visitType=" + visitType,
                    width: 400,
                    height: 240,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_FilterIPId');
                if (keren.checkrow(keyValue)) {
                    keren.layerForm({
                        id: 'form',
                        title: '编辑IP地址',
                        url: top.$.rootUrl + '/KR_AuthorizeModule/FilterIP/Form?keyValue=' + keyValue,
                        width: 400,
                        height: 260,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#kr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_FilterIPId');
                if (keren.checkrow(keyValue)) {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_AuthorizeModule/FilterIP/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGrid: function () {
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/KR_AuthorizeModule/FilterIP/GetList',
                headData: [
                    {
                        label: "访问", name: "F_VisitType", width: 80, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == 0) {
                                return '<span value=' + cellvalue + ' class=\"label label-danger\">拒绝</span>';
                            } else {
                                return '<span value=' + cellvalue + ' class=\"label label-success\">授权</span>';
                            }
                        }
                    },
                    { label: "IP地址(子网掩码)", name: "F_IPLimit", width: 450, align: "left"}
                ]
            });
            page.search();
        },
        search: function () {
            $('#gridtable').jfGridSet('reload', { visitType: visitType, objectId: objectId } );
        }
    };

    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };

    page.init();
}


