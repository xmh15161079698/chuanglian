﻿/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：岗位选择
 */
var dfopid = request('dfopid');
var selectValue = request('selectValue');

var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var postitem = { value: '', text: '' };

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#form_company_list').krtree({
                url: top.$.rootUrl + '/KR_OrganizationModule/Company/GetTree',
                param: { parentId: '0' },
                nodeClick: function (item) {
                    $('#form_post_list').krtreeSet('refresh', {
                        url: top.$.rootUrl + '/KR_OrganizationModule/Post/GetTree',
                        param: { companyId: item.id }
                    });
                }
            });

            $('#form_post_list').krtree({
                nodeClick: function (item) {
                    postitem.value = item.id;
                    postitem.text = item.text;
                }
            });


            $('.form-post-search>input').on("keypress", function (e) {
                if (event.keyCode == "13") {
                    var keyword = $(this).val();
                    $('#form_post_list').krtreeSet('search', { keyword: keyword });

                }
            });
        },
        initData: function () {
            if (!!selectValue && selectValue != "0") {
                keren.httpAsync('GET', top.$.rootUrl + '/KR_OrganizationModule/Post/GetEntity', { keyValue: selectValue }, function (data) {
                    if (!!data) {
                        $('#form_company_list').krtreeSet('setValue', data.F_CompanyId);
                        $('#form_post_list').krtreeSet('setValue', data.F_PostId);
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        callBack(postitem, dfopid);
        return true;
    };
    page.init();
}