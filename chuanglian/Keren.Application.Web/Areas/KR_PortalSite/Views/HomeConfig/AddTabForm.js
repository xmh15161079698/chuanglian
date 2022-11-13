/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.01.02
 * 描 述：添加模块3标签项	
 */
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var tabName = top.layer_ModuleForm3.tabName;

    var page = {
        init: function () {
            page.initData();
        },
        initData: function () {
            $('#text').val(tabName);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        callBack && callBack(postData.text);
        keren.layerClose(window.name);
    };
    page.init();
}