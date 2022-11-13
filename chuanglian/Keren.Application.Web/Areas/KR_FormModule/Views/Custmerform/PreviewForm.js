/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：自定义表单预览	
 */
var keyValue = request('keyValue');
var schemeInfoId = request('schemeInfoId');
var schemeId = request('schemeId');

var bootstrap = function ($, keren) {
    "use strict";
    var formData;
    var page = {
        init: function () {
            if (!!schemeInfoId) {
                $.krSetForm(top.$.rootUrl + '/KR_FormModule/Custmerform/GetFormData?keyValue=' + schemeInfoId, function (data) {//
                    formData = JSON.parse(data.schemeEntity.F_Scheme);
                    $('body').krCustmerFormRender(formData.data);
                });
            }
            else if (!!schemeId) {
                $.krSetForm(top.$.rootUrl + '/KR_FormModule/Custmerform/GetSchemeEntity?keyValue=' + schemeId, function (res) {//
                    formData = JSON.parse(res.F_Scheme);
                    $('body').krCustmerFormRender(formData.data);
                });
            }
            else if (!!keyValue) {
                formData = top[keyValue];
                $('body').krCustmerFormRender(formData);
            }
        }
    };
    page.init();
}