/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：岗位管理	
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
            $('#F_ParentId').krformselect({
                placeholder: '请选择上级岗位',
                layerUrl: top.$.rootUrl + '/KR_OrganizationModule/Post/SelectForm',
                layerUrlH: 500,
                dataUrl: top.$.rootUrl + '/KR_OrganizationModule/Post/GetEntityName',
                select: function (item) {}
            });
            // 所属部门
            $('#F_DepartmentId').krDepartmentSelect({ companyId: companyId, maxHeight: 100 });
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_PostId;
                $('#form').krSetFormData(selectedRow);
            }
            else {
                $('#F_CompanyId').val(companyId);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData(keyValue);
        if (postData["F_ParentId"] == undefined || postData["F_ParentId"] == '' || postData["F_ParentId"] == '&nbsp;') {
            postData["F_ParentId"] = '0';
        }
        $.krSaveForm(top.$.rootUrl + '/KR_OrganizationModule/Post/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}