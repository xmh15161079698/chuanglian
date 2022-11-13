/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：成员添加
 */
var objectId = request('objectId');
var category = request('category');

var companyId = request('companyId');
var departmentId;

var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 部门
            $('#department_tree').krtree({
                nodeClick: function (item) {
                    departmentId = item.id;
                }
            });
            // 公司
            $('#company_select').krCompanySelect({ isLocal: true }).bind('change', function () {
                companyId = $(this).krselectGet();
                $('#department_tree').krtreeSet('refresh', {
                    url: top.$.rootUrl + '/KR_OrganizationModule/Department/GetTree',
                    // 访问数据接口参数
                    param: { companyId: companyId },
                });
            });
        },
        initData: function () {
            if (!!companyId) {
                $('#company_select').krselectSet(companyId);
            }
        }
    };
    // 保存数据
    acceptClick = function () {
        if (departmentId != null && departmentId != undefined && departmentId != '') {
            $.krSaveForm(top.$.rootUrl + '/KR_AuthorizeModule/UserRelation/SaveForms', { objectId: objectId, category: category, companyId: companyId, departmentId: departmentId }, function (res) { });
            return true;
        }
        else {
            keren.alert.warning("请选择部门！");
            return false;
        }

       
    };
    page.init();
}