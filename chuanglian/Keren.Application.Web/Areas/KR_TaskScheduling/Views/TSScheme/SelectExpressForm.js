﻿var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            ///设置配置信息的滚动条
            $('.expression').krscroll();
            $('.express-list li').click(function () {
                $(this).addClass("active").siblings().removeClass("active");

                var cron = $('.express-list li.active').attr("data-value");
                top.layer_form.setCorn(cron);

                keren.layerClose(window.name);

            });
        }
    };
    page.init();

}