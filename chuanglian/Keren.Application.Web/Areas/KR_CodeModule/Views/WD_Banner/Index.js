/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-11-04 12:01
 * 描  述：轮播图管理
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, Keren) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                Keren.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/KR_CodeModule/WD_Banner/Form',
                    width: 600,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#kr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_Id');
                console.log("keyValue=",keyValue)
                if (Keren.checkrow(keyValue)) {
                    Keren.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_CodeModule/WD_Banner/Form?keyValue=' + keyValue,
                        width: 600,
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
                if (Keren.checkrow(keyValue)) {
                    Keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            Keren.deleteForm(top.$.rootUrl + '/KR_CodeModule/WD_Banner/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_CodeModule/WD_Banner/GetPageList',
                headData: [
                        //{ label: 'F_Id', name: 'F_Id', width: 200, align: "left" },
                        { label: '标题', name: 'F_Title', width: 200, align: "left" },
                    {
                        label: '链接类型', name: 'F_LinkType', width: 200, align: "left",
                        formatterAsync: function (callback, value, row, op, $cell) {
                            Keren.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'LinkType',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    
                        { label: '链接地址', name: 'F_LinkUrl', width: 200, align: "left" },
                        { label: '图片', name: 'F_Image', width: 200, align: "left" },
                        { label: '序号', name: 'F_SortOrder', width: 200, align: "left" },
                        { label: '描述', name: 'F_Desc', width: 200, align: "left" },
                        { label: '创建时间', name: 'F_CreateDate', width: 200, align: "left" },
                ],
                mainId:'F_Id',
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
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
