/* * 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-24 12:12
 * 描  述：用户信息
 */
var refreshGirdData;
var bootstrap = function ($, Keren) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#kr_add').on('click', function () {
                Keren.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/KR_CodeModule/WD_User/Form',
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
                if (Keren.checkrow(keyValue)) {
                    Keren.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_CodeModule/WD_User/Form?keyValue=' + keyValue,
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
                            Keren.deleteForm(top.$.rootUrl + '/KR_CodeModule/WD_User/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 打印
            $('#kr_print').on('click', function () {
                $('#gridtable').jqprintTable();
            });
        },
        // 初始化列表
        initGird: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_CodeModule/WD_User/GetPageList',
                headData: [
                    { label: "昵称", name: "F_NickName", width: 100, align: "left"},
                    { label: "性别", name: "F_Gender", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             Keren.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'usersex',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "电话", name: "F_Phone", width: 100, align: "left"},
                    {
                        label: '微信头像', name: 'F_AvatarUrl', width: 60, align: "left",
                        formatter: function (value, row, op, $cell) {
                            return '<image src=' + value + ' height="100%" width="40"/>';
                        }
                    },
                    
                ],
                mainId:'F_Id',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload',{ queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
