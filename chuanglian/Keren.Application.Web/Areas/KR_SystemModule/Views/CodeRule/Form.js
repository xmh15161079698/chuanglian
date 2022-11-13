/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：单据编号	
 */
var acceptClick;
var keyValue = '';
var currentColRow = null;
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#kr_add_format').on('click', function () {
                currentColRow = null;
                keren.layerForm({
                    id: 'FormatForm',
                    title: '添加',
                    url: top.$.rootUrl + '/KR_SystemModule/CodeRule/FormatForm',
                    width: 450,
                    height: 310,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            $('#gridtable').jfGridSet('addRow', data);
                        });
                    }
                });
            });
            $('#kr_edit_format').on('click', function () {
                currentColRow = $('#gridtable').jfGridGet('rowdata');
                var _id = currentColRow ? currentColRow.itemTypeName : '';
                if (keren.checkrow(_id)) {
                    keren.layerForm({
                        id: 'FormatForm',
                        title: '修改',
                        url: top.$.rootUrl + '/KR_SystemModule/CodeRule/FormatForm',
                        width: 450,
                        height: 310,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                $.extend(currentColRow, data);
                                $('#gridtable').jfGridSet('updateRow');
                            });
                        }
                    });
                }
                
            });
            $('#kr_delete_format').on('click', function () {
                currentColRow = null;
                var row = $('#gridtable').jfGridGet('rowdata');
                var _id = row ? row.itemTypeName : '';
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
                    { label: "前缀", name: "itemTypeName", width: 140, align: "left" },
                    { label: "格式", name: "formatStr", width: 140, align: "left" },
                    { label: "步长", name: "stepValue", width: 80, align: "center" },
                    { label: "初始值", name: "initValue", width: 80, align: "center" },
                    { label: "说明", name: "description", width: 100, align: "left" }
                ]
            });

            /*检测重复项*/
            $('#F_EnCode').on('blur', function () {
                $.krExistField(keyValue, 'F_EnCode', top.$.rootUrl + '/KR_SystemModule/CodeRule/ExistEnCode');
            });
            $('#F_FullName').on('blur', function () {
                $.krExistField(keyValue, 'F_FullName', top.$.rootUrl + '/KR_SystemModule/CodeRule/ExistFullName');
            });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_RuleId;
                $('#form1').krSetFormData(selectedRow);
                var formatdata = JSON.parse(selectedRow.F_RuleFormatJson);
                $('#gridtable').jfGridSet('refreshdata', formatdata);
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
            keren.alert.error('请设置规则！');
            return false;
        }
        postData.F_RuleFormatJson = JSON.stringify(formatdata);
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/CodeRule/SaveForm?keyValue=' + keyValue, postData, function (res) {
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}