/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：自定义表单-用于工作流
 */
var id = request('id');
var keyValue = "";

var processIdName = "";
var isUpdate = false;

// 保存数据
var save;
// 设置权限
var setAuthorize;
// 设置表单数据
var setFormData;
// 验证数据是否填写完整
var validForm;
// 获取表单数据
var getFormData;


var bootstrap = function ($, keren) {
    "use strict";
    var formModule;
    var girdCompontMap;

    var authorizeData;

    var page = {
        init: function () {
            if (!!id) {
                $.krSetForm(top.$.rootUrl + '/KR_FormModule/Custmerform/GetFormData?keyValue=' + id, function (data) {//
                    formModule = JSON.parse(data.schemeEntity.F_Scheme);
                });
            }
        },
        setFormData: function (data) {
            if (!!formModule && !!girdCompontMap) {
                $.each(data, function (id, item) {
                    if (!!girdCompontMap[id]) {
                        var fieldMap = {};
                        $.each(girdCompontMap[id].fieldsData, function (id, girdFiled) {
                            if (!!girdFiled.field) {
                                fieldMap[girdFiled.field.toLowerCase()] = girdFiled.field;
                            }
                        });
                        var rowDatas = [];
                        for (var i = 0, l = item.length; i < l; i++) {
                            var _point = {};
                            for (var _field in item[i]) {
                                _point[fieldMap[_field]] = item[i][_field];
                            }
                            rowDatas.push(_point);
                        }
                        if (rowDatas.length > 0) {
                            isUpdate = true;
                        }
                        $('#' + girdCompontMap[id].id).jfGridSet('refreshdata', { rowdatas: rowDatas });
                    }
                    else {
                        if (!!item[0]) {
                            isUpdate = true;
                            $('body').krSetCustmerformData(item[0], id);
                        }
                    }

                });
                $.each(authorizeData || [], function (_field, _item) {
                    var _field = _item.fieldId;
                    if (_item.isLook == 1 && _item.isEdit != 1) {// 如果没有查看权限就直接移除
                        $('[name="' + _field + '"]').attr('disabled', 'disabled');
                    }
                });
            }
            else {
                setTimeout(function () {
                    page.setFormData(data);
                }, 100);
            }
        }
    };
    page.init();

    // 保存调用函数
    save = function (processId, callBack, i) {
        if (isUpdate) {
            keyValue = processId;
        }
        var formData = $('body').krGetCustmerformData(keyValue);

        if (!!processIdName) {
            formData[processIdName] = processId;
        }
        var postData =
            {
                formData: JSON.stringify(formData)
            };
        $.krSaveForm(top.$.rootUrl + '/KR_FormModule/Custmerform/SaveInstanceForm?keyValue=' + keyValue + "&schemeInfoId=" + id + '&processIdName=' + processIdName, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack(res, formData, i);
            }
        });
    };
    // 设置权限
    setAuthorize = function (data) {
        authorizeData = data;

        if (!!formModule) {
            var girdMap = {};
            var _flag = false;
            for (var i = 0, l = data.length; i < l; i++) {
                var field = data[i];
                var _ids = field.fieldId.split('|');
                if (_ids.length > 1) {
                    if (field.isLook != 1 || field.isEdit != 1) {
                        girdMap[_ids[0]] = girdMap[_ids[0]] || {};
                        girdMap[_ids[0]][_ids[1]] = field;
                        _flag = true;
                    }
                }
            }
            if (_flag) {
                $.each(formModule.data, function (_i, _item) {
                    $.each(_item.componts, function (_j, _jitem) {
                        if ((_jitem.type == 'girdtable' || _jitem.type == 'gridtable') && !!girdMap[_jitem.id]) {
                            var _gird = girdMap[_jitem.id];
                            var _fieldsData = [];
                            $.each(_jitem.fieldsData, function (_m, _mitem) {
                                if (!_gird[_mitem.id] || _gird[_mitem.id].isLook == 1) {
                                    _fieldsData.push(_mitem);
                                    if (!!_gird[_mitem.id] && _gird[_mitem.id].isEdit != 1) {
                                        _mitem._isEdit = 1;
                                    }
                                }
                            });
                            _jitem.fieldsData = _fieldsData;
                        }
                    });
                });
            }

            girdCompontMap = $('body').krCustmerFormRender(formModule.data);
            for (var i = 0, l = data.length; i < l; i++) {
                var field = data[i];
                var _ids = field.fieldId.split('|');
                if (_ids.length == 1) {
                    if (field.isLook != 1) {// 如果没有查看权限就直接移除
                        $('#' + _ids[0]).parent().remove();
                    }
                    else {
                        if (field.isEdit != 1) {
                            $('#' + _ids[0]).attr('disabled', 'disabled');
                            $('#' + _ids[0]).unbind('click');
                            if ($('#' + _ids[0]).hasClass('krUploader-wrap')) {
                                $('#' + _ids[0]).css({ 'padding-right': '58px' });
                                $('#' + _ids[0]).find('.btn-success').remove();
                            }
                        }
                    }
                }
            }
        }
        else {
            setTimeout(function () {
                setAuthorize(data);
            }, 100);
        }
    };

    // 设置表单数据
    setFormData = function (processId) {
        if (!!processId) {
            $.krSetForm(top.$.rootUrl + '/KR_FormModule/Custmerform/GetInstanceForm?schemeInfoId=' + id + '&keyValue=' + processId + '&processIdName=' + processIdName, function (data) {//
                page.setFormData(data);
            });
        }
    };

    // 验证数据是否填写完整
    validForm = function () {
        if (!$.krValidCustmerform()) {
            return false;
        }
        return true;
    };

    // 获取表单数据
    getFormData = function () {
        return $('body').krGetCustmerformData(keyValue);
    }
}