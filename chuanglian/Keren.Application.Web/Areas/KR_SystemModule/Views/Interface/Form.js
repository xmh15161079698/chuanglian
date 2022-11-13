/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：接口管理	
 */
var keyValue = request('keyValue');

var acceptClick;
var currentColRow = null;
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#kr_add_field').on('click', function () {
                currentColRow = null;
                keren.layerForm({
                    id: 'FieldForm',
                    title: '添加',
                    url: top.$.rootUrl + '/KR_SystemModule/Interface/FieldForm',
                    width: 450,
                    height: 310,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            $('#gridtable').jfGridSet('addRow', data);
                        });
                    }
                });
            });
            $('#kr_edit_field').on('click', function () {
                currentColRow = $('#gridtable').jfGridGet('rowdata');
                var _id = currentColRow ? currentColRow.fieldName : '';
                if (keren.checkrow(_id)) {
                    keren.layerForm({
                        id: 'FieldForm',
                        title: '修改',
                        url: top.$.rootUrl + '/KR_SystemModule/Interface/FieldForm',
                        width: 450,
                        height: 310,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                $.extend(currentColRow, data);
                                $('#gridtable').jfGridSet('updateRow', data);
                            });
                        }
                    });
                }

            });
            $('#kr_delete_field').on('click', function () {
                currentColRow = null;
                var row = $('#gridtable').jfGridGet('rowdata');
                var _id = row ? row.fieldName : '';
                if (keren.checkrow(_id)) {
                    keren.layerConfirm('是否确认删除该项！', function (res, index) {
                        if (res) {
                            $('#gridtable').jfGridSet('removeRow');
                            top.layer.close(index); //再执行关闭  
                        }
                    });
                }
            });

            $('#gridtable').jfGrid({
                headData: [
                    { label: "字段名称", name: "fieldName", width: 160, align: "left" },
                    { label: "字段注释", name: "fieldDescribe", width: 160, align: "left" },
                    {
                        label: "字段类型", name: "fieldType", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op, $cell) {
                            keren.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'FieldType',
                                callback: function (item) {
                                    callback(item.text);
                                }
                            });
                        }
                    }
                ]
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.krSetForm(top.$.rootUrl + '/KR_SystemModule/Interface/GetEntity?keyValue=' + keyValue, function (data) {
                    $('#form1').krSetFormData(data);
                    var formatdata = JSON.parse(data.F_FieldsJson);
                    $('#gridtable').jfGridSet('refreshdata', formatdata);
                });
            }

        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form1').krValidform()) {
            return false;
        }
        var postData = $('#form1').krGetFormData(keyValue);
        var formatdata = $('#gridtable').jfGridGet('rowdatas');
        if (formatdata.length == 0) {
            keren.alert.error('请设置字段！');
            return false;
        }
        postData.F_FieldsJson = JSON.stringify(formatdata);
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/Interface/SaveForm?keyValue=' + keyValue, postData, function (res) {
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}