/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：admin顶层页面操作方法
 */

var loaddfimg;
(function ($, keren) {
    "use strict";
    
    var page = {
        init: function () {
            /*判断当前浏览器是否是IE浏览器*/
            if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                $('#kr_loadbg').append('<img imgback="imgjk" src="' + top.$.rootUrl + '/Content/images/ie-loader.gif" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;vertical-align: middle;">');
                Pace.stop();
            }
            else {
                Pace.on('done', function () {
                    $('#kr_loadbg').fadeOut();
                    Pace.options.target = '#kerenpacenone';
                });
            }
            // 通知栏插件初始化设置
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            // 打开首页模板
            keren.frameTab.open({ F_ModuleId: '0', F_Icon: 'fa fa-desktop', F_FullName: '我的桌面', F_UrlAddress: '/Home/AdminDesktop' }, true);
           // keren.frameTab.open({ F_ModuleId: 'AdminDesktopTemp1', F_Icon: 'fa fa-desktop', F_FullName: '首页', F_UrlAddress: '/Home/AdminDesktopTemp' }, true);

            keren.clientdata.init(function () {
                page.userInit();
                // 初始页面特例
                bootstrap($, keren);
                if ($('body').hasClass('IE') || $('body').hasClass('InternetExplorer')) {
                    $('#kr_loadbg').fadeOut();
                }

                // 3.具体某一个页面
                var moduleCode = request("moduleCode");
                if (moduleCode) {
                    var modulesCodeMap = keren.clientdata.get(['modulesCodeMap']);
                    if (modulesCodeMap[moduleCode]) {
                        keren.frameTab.open(modulesCodeMap[moduleCode]);
                    }
                }

                // 4.具体某一个页面
                var moduleId = request("moduleId");
                if (moduleId) {
                    var modulesMap = keren.clientdata.get(['modulesMap']);
                    if (modulesMap[moduleId]) {
                        keren.frameTab.open(modulesMap[moduleId]);
                    }
                }
            });

            // 加载数据进度
            page.loadbarInit();
            // 全屏按钮
            page.fullScreenInit();

        },

        // 登录头像和个人设置
        userInit: function () {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var _html = '<div class="kr-frame-personCenter"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">';
            _html += '<img id="userhead"src="' + top.$.rootUrl + '/KR_OrganizationModule/User/GetImg?userId=' + loginInfo.userId + '" >';
            _html += '<span>' + loginInfo.realName + '</span>';
            _html += '</a>';
            _html += '<ul class="dropdown-menu pull-right">';
            _html += '<li><a href="javascript:void(0);" id="kr_userinfo_btn"><i class="fa fa-user"></i><span>个人信息</span></a></li>';
            if (loginInfo.isSystem) {
                _html += '<li><a href="javascript:void(0);" id="kr_clearredis_btn"><i class="fa fa-refresh"></i><span>清空缓存</span></a></li>';
            }
            _html += '<li><a href="javascript:void(0);" id="kr_loginout_btn"><i class="fa fa-power-off"></i><span>安全退出</span></a></li>';
            _html += '</ul></div>';
            $('body').append(_html);


            $('#kr_loginout_btn').on('click', page.loginout);
            $('#kr_userinfo_btn').on('click', page.openUserCenter);
            $('#kr_clearredis_btn').on('click', page.clearredis);
        },
        loginout: function () { // 安全退出
            keren.layerConfirm("注：您确定要安全退出本次登录吗？", function (r) {
                if (r) {
                    keren.loading(true, '退出系统中...');
                    keren.httpAsyncPost($.rootUrl + '/Login/OutLogin', {}, function (data) {
                        window.location.href = $.rootUrl + "/Login/Index";
                    });
                }
            });
        },
        clearredis: function () {
            keren.layerConfirm("注：您确定要清空全部后台缓存数据吗？", function (r) {
                if (r) {
                    keren.loading(true, '清理缓存数据中...');
                    keren.httpAsyncPost($.rootUrl + '/Home/ClearRedis', {}, function (data) {
                        window.location.href = $.rootUrl + "/Login/Index";
                    });
                }
            });
        },
        openUserCenter: function () {
            // 打开个人中心
            keren.frameTab.open({ F_ModuleId: '1', F_Icon: 'fa fa-user', F_FullName: '个人中心', F_UrlAddress: '/UserCenter/Index' });
        },

        // 全屏按钮
        fullScreenInit: function () {
            var _html = '<div class="kr_frame_fullscreen"><a href="javascript:void(0);" id="kr_fullscreen_btn" title="全屏"><i class="fa fa-arrows-alt"></i></a></div>';
            $('body').append(_html);
            $('#kr_fullscreen_btn').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    page.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen');
                    page.exitFullscreen();
                }
            });
        },
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },

        // 加载数据进度
        loadbarInit: function () {
            var _html = '<div class="kr-loading-bar" id="kr_loading_bar" >';
            _html += '<div class="kr-loading-bar-bg"></div>';
            _html += '<div class="kr-loading-bar-message" id="kr_loading_bar_message"></div>';
            _html += '</div>';
            $('body').append(_html);
        },
    };

    $(function () {
        page.init();
    });
})(window.jQuery, top.keren);
