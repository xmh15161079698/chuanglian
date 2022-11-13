/* * 版 本 Keren-ADMSs V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2022-10-27 10:16
 * 描  述：商品管理
 */
var acceptClick;
var keyValue = request('keyValue');
var bootstrap = function ($, Keren) {
    "use strict";
    var page = {
        init: function () {
            $('.kr-form-wrap').krscroll();
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#F_Goods_NameId').krDataSourceSelect({ code: 'Type',value: 'f_id',text: 'f_type' });
            $('#F_Goods_ColorId').krDataSourceSelect({ code: 'ColorType',value: 'f_id',text: 'f_goodsclass_name' });
            $('#F_Goods_StyleId').krDataSourceSelect({ code: 'StyleType',value: 'f_id',text: 'f_goodsclass_name' });
            $('#F_Goods_SpaceId').krDataSourceSelect({ code: 'SpaceType', value: 'f_id', text: 'f_goodsclass_name' });
        },
        initData: function () {
            if (!!keyValue) {
                $.krSetForm(top.$.rootUrl + '/KR_CodeModule/WD_Goods/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                            $('#' + id ).jfGridSet('refreshdata', data[id]);
                        }
                        else {
                            $('[data-table="' + id + '"]').krSetFormData(data[id]);
                        }
                    }
                });
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('body').krValidform()) {
            return false;
        }
        var postData = {
            strEntity: JSON.stringify($('body').krGetFormData())
        };
        console.log("postData=", postData);
        $.krSaveForm(top.$.rootUrl + '/KR_CodeModule/WD_Goods/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}
