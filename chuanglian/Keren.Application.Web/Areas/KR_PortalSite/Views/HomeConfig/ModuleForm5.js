/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.01.02
 * 描 述：设置模块5	
 */
var sort = request('sort');
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var keyValue = '';
    var currentModule = keren.frameTab.currentIframe().currentModule;

    var page = {
        init: function () {
            // 比例选择
            $('#prop').krselect({
                data: [{ id: '0.5', text: '1/2' }, { id: '0.333333', text: '1/3' }, { id: '0.66666', text: '2/3' }, { id: '1', text: '1' }],
                placeholder: false
            }).krselectSet('1');


            $('#F_Category').krDataItemSelect({ code: 'PortalSiteType' });
            $('#F_Article').krselect({
                text: 'F_Title',
                value: 'F_Id',
                allowSearch: true
            });
            $('#F_Category').on('change', function () {
                var v = $(this).krselectGet();
                if (v != '') {
                    $('#F_Article').krselectRefresh({
                        data: [],
                        url: top.$.rootUrl + '/KR_PortalSite/Article/GetList',
                        param: { queryJson: JSON.stringify({ category: v }) }
                    });
                }
                else {
                    $('#F_Article').krselectRefresh({
                        data: [],
                        url: false
                    });
                }
            });
            page.initData();
        },
        initData: function () {
            if (currentModule) {
                var schemeObj = JSON.parse(currentModule.F_Scheme);
                currentModule.F_Category = schemeObj.category;
                currentModule.F_Article = schemeObj.article;
                currentModule.prop = schemeObj.prop;
                $('#form').krSetFormData(currentModule);

                keyValue = currentModule.F_Id;
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var formData = $('#form').krGetFormData();

        var postData = {
            F_Name: formData.F_Name,
            F_Type: 9,
            F_Scheme: JSON.stringify({ category: formData.F_Category, article: formData.F_Article, prop: formData.prop, type: "5" }),
            F_Sort: sort
        }

        $.krSaveForm(top.$.rootUrl + '/KR_PortalSite/HomeConfig/SaveForm?keyValue=' + keyValue, postData, function (res) {
            postData.F_Id = res.data;
            callBack && callBack(postData);
        });
    };
    page.init();
}