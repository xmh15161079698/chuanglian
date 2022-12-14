/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：自定义表单
 */
var id = request('id');
var keyValue = request('keyValue');
var acceptClick;

var bootstrap = function ($, keren) {
    "use strict";
    var formModule;
    var girdCompontMap;

    var page = {
        init: function () {
            if (!!id) {
                $.krSetForm(top.$.rootUrl + '/KR_FormModule/Custmerform/GetFormData?keyValue=' + id, function (data) {//
                    formModule = JSON.parse(data.schemeEntity.F_Scheme);
                    girdCompontMap = $('body').krCustmerFormRender(formModule.data);
                    page.bind();
                });
            }
            page.initData();

        },
        initData: function () {
            if (!!keyValue) {
                $.krSetForm(top.$.rootUrl + '/KR_FormModule/Custmerform/GetInstanceForm?schemeInfoId=' + id + '&keyValue=' + keyValue, function (data) {//
                    page.setFormData(data);
                });
            }
        },
        setFormData: function (data) {
            if (!!formModule) {
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
                        $('#' + girdCompontMap[id].id).jfGridSet('refreshdata', rowDatas);
                    }
                    else {
                        $('body').krSetCustmerformData(item[0],id);
                    }
                });
            }
            else {
                setTimeout(function () {
                    page.setFormData(data);
                }, 100);
            }
        },
        bind: function () {
            // 保存数据
            $('#savaAndAdd').on('click', function () {
                acceptClick(0);
            });
            $('#save').on('click', function () {
                acceptClick(1);
            });
        }
    };
    page.init();

    // 保存数据
    acceptClick = function (type) {// 0保存并新增 1保存
        if (!$.krValidCustmerform()) {
            return false;
        }
        var formData = $('body').krGetCustmerformData(keyValue);
        var postData =
        {
            formData: JSON.stringify(formData)
        };
        $.krSaveForm(top.$.rootUrl + '/KR_FormModule/Custmerform/SaveInstanceForm?keyValue=' + keyValue + "&schemeInfoId=" + id, postData, function (res) {
            if (res.code == 200) {
                keren.frameTab.parentIframe().refreshGirdData();
                if (type == 0) {
                    window.location.href = top.$.rootUrl + '/KR_FormModule/Custmerform/TabInstanceForm?id=' + id;
                }
                else {
                    keren.frameTab.close(keren.frameTab.iframeId);
                }
            }
        });
    };
}