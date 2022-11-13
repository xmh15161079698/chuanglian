/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：人员选择	
 */
var acceptClick;
var dfopid = request('dfopid');
var userName = '';
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#userId').krselect({
                value: 'F_UserId',
                text: 'F_RealName',
                title: 'F_RealName',
                // 展开最大高度
                maxHeight: 110,
                // 是否允许搜索
                allowSearch: true,
                select: function (item) {
                    if (!!item) {
                        userName = item.F_RealName;
                    }
                    else {
                        userName = '';
                    }
                }
            });
            $('#department').krDepartmentSelect({
                maxHeight: 150
            }).on('change', function () {
                var value = $(this).krselectGet();
                $('#userId').krselectRefresh({
                    url: top.$.rootUrl + '/KR_OrganizationModule/User/GetList',
                    param: { departmentId: value }
                });
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var formData = $('#form').krGetFormData();
        var postitem = { value: formData.userId, text: userName };
        callBack(postitem, dfopid);
        return true;
    };
    page.init();
}