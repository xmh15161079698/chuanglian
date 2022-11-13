/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2019-03-01 11:09
 * 描  述：代码模板
 */
var acceptClick;
var keyValue = request('keyValue');
var f_type = request('F_Type');
var schemadata = top.layer_CustmerCodeIndex.postData;


var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            $('.kr-form-wrap').krscroll();
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_Catalog').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetDetailTree',
                param: { itemCode: 'CodeSchemaType' },
                type: 'tree',
                maxHeight: 180,
                allowSearch: true,
                value:'value'
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.krSetForm(top.$.rootUrl + '/KR_CodeGeneratorModule/CodeSchema/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                            $('#' + id).jfGridSet('refreshdata', data[id]);
                        }
                        else {
                            $('[data-table="' + id + '"]').krSetFormData(data[id]);
                        }
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('body').krValidform()) {
            return false;
        }
        var codeData = $('body').krGetFormData();
        codeData['F_Type'] = f_type;
        codeData['F_CodeSchema'] = JSON.stringify(schemadata);
        var postData = {
            strEntity: JSON.stringify(codeData)
        };
        $.krSaveForm(top.$.rootUrl + '/KR_CodeGeneratorModule/CodeSchema/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}
