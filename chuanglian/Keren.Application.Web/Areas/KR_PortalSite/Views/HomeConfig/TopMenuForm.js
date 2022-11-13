/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.01.02
 * 描 述：设置分类项	
 */
var parentId = request('parentId');
var acceptClick;
var keyValue = "";
     
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = top.layer_TopMenuIndex.selectedRow;
    var flag = "1";
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 上级菜单
            $('#F_ParentId').krselect({
                url: top.$.rootUrl + '/KR_PortalSite/HomeConfig/GetTree',
                type: 'tree',
                maxHeight: 180,
                allowSearch: true,
                select: function (item) {
                    if (item) {
                        if (item.parentId == "0") {
                            flag = "1";
                        }
                        else {
                            flag = "2";
                        }
                    }
                }
            }).krselectSet(parentId);
            // 页面选择
            $('#F_Page').krselect({
                text: 'F_Title',
                value: 'F_Id',
                url: top.$.rootUrl + '/KR_PortalSite/Page/GetList',
                allowSearch: true
            });

            $('[name="F_UrlType"]').on('click', function () {
                var v = $(this).val();
                if (v == '1') {
                    $('#F_Url').parent().hide();
                    $('#F_Page').parent().show();
                }
                else {
                    $('#F_Page').parent().hide();
                    $('#F_Url').parent().show();
                }
            });

        },
        initData: function () {
            if (selectedRow) {
                keyValue = selectedRow.F_Id || '';
                if (selectedRow.F_UrlType == '1') {
                    selectedRow.F_Page = selectedRow.F_Url;
                }

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
        if (postData.F_ParentId && postData.F_ParentId != '&nbsp;') {
            postData.F_Img = flag;
        }
        else {
            postData.F_Img = "0";
            postData.F_ParentId = "0";

            if (!keyValue && top.layer_TopMenuIndex.topMenuList["0"] && top.layer_TopMenuIndex.topMenuList["0"].length >= 5) {
                keren.alert.warning("一级菜单最多维护5个！");
                return false;
            }

        }
        if (postData.F_UrlType == '1') {
            postData.F_Url = postData.F_Page;
        }
        postData.F_Type = 6;
        $.krSaveForm(top.$.rootUrl + '/KR_PortalSite/HomeConfig/SaveForm?keyValue=' + keyValue, postData, function (res) {
            callBack && callBack();
        });


    };
    page.init();
}