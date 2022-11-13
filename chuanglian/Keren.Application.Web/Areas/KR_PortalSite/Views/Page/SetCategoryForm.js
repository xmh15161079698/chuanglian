/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.01.02
 * 描 述：设置分类项	
 */
var type = request('type');
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var categoryData = keren.frameTab.currentIframe().categoryData;

    var page = {
        init: function () {
            $('#F_Category').krDataItemSelect({ code: 'PortalSiteType' });
            if (type == '3') {
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
            }
            else {
                $('#F_Article').parent().remove();
            }
            page.initData();
        },
        initData: function () {
            if (categoryData) {
                $('#F_Name').val(categoryData.name);
                // 分类信息设置
                $('#F_Category').krselectSet(categoryData.category);
                if (type == '3') {
                    $('#F_Article').krselectSet(categoryData.articleId);
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        callBack(postData);
        keren.layerClose(window.name);
    };
    page.init();
}