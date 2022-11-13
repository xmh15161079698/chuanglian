/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：部门管理	
 */
var companyId = request('companyId');


var acceptClick;
var keyValue = '';
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 部门性质
            $('#F_Nature').krDataItemSelect({ code: 'DepartmentNature', maxHeight: 230 });
            // 上级部门
            $('#F_ParentId').krDepartmentSelect({ companyId: companyId, maxHeight: 160 });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_DepartmentId;
                $('#form').krSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData(keyValue);
        if (postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        postData["F_CompanyId"] = companyId;
        $.krSaveForm(top.$.rootUrl + '/KR_OrganizationModule/Department/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}