/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.11
 * 描 述：添加扩展按钮	
 */
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var formData = $('#form').krGetFormData();
        if (!!callBack) {
            callBack(formData);
        }

        return true;
    };
}