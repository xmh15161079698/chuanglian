/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：区域管理	
 */
var keyValue = '';
var acceptClick;
var moduleId = request('moduleId');
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;
    var btnName = '';
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_ModuleBtnId').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/Module/GetButtonListNoAuthorize',
                param: {
                    moduleId: moduleId
                },
                value: 'F_EnCode',
                text: 'F_FullName',
                isAsync: false,
                select: function (item) {
                    if (!!item) {
                        btnName = item.F_FullName
                    }
                    else {
                        btnName = '';
                    }

                },
                maxHeight: 170
            });
        },
        initData: function () {
            $('#F_ModuleId').val(moduleId);
            if (!!selectedRow) {
                $('#F_ModuleBtnId').krselectRefresh({
                    param: {
                        moduleId: selectedRow.F_ModuleId
                    }
                });
                keyValue = selectedRow.F_Id;
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
        postData.F_BtnName = btnName;
        $.krSaveForm(top.$.rootUrl + '/KR_SystemModule/ExcelExport/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}