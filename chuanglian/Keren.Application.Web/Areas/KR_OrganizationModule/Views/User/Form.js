/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：账号添加	
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
            // 部门
            $('#F_DepartmentId').krDepartmentSelect({ companyId: companyId });
            // 性别
            $('#F_Gender').krselect();
            /*检测重复项*/
            //$('#F_Account').on('blur', function () {
            //    $.krExistField(keyValue, 'F_Account', top.$.rootUrl + '/KR_OrganizationModule/User/ExistAccount');
            //});
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_UserId;
                selectedRow.F_Password = "******";
                $('#form').krSetFormData(selectedRow);
                $('#F_Password').attr('readonly', 'readonly');
                $('#F_Account').attr('readonly', 'readonly');

                $('#F_Password').attr('unselectable', 'on');
                $('#F_Account').attr('unselectable', 'on');
            }
            else {
                $('#F_CompanyId').val(companyId);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        keren.layerConfirm('是否保存', function (res, index) {
            if (res) {

                if (!$('#form').krValidform()) {
                    return false;
                }
                var postData = $('#form').krGetFormData(keyValue);
                if (!keyValue) {
                    postData.F_Password = $.md5(postData.F_Password);
                }
                $.krSaveForm(top.$.rootUrl + '/KR_OrganizationModule/User/SaveForm?keyValue=' + keyValue, postData, function (res) {
                    // 保存成功后才回调
                    if (!!callBack) {
                        callBack();
                    }
                });
                top.layer.close(index); //再执行关闭 
            }
        });



    };
    page.init();
}