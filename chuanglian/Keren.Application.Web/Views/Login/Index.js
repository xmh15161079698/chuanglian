/*!
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.08
 * 描 述：登录页面前端脚本
 */
(function ($) {
    "use strict";

    var lrPage = {
        init: function () {
            $('.kr-login-body').css('background', 'url(' + $.rootUrl + '/Content/images/Login/bgmask1.png) no-repeat left top, url(' + $.rootUrl + '/Content/images/Login/bgmask2.png) no-repeat right bottom, url(' + $.rootUrl + '/Content/images/Login/bgmask3.png) no-repeat right top');
            $('#psw_change').css({
                'background': 'url(' + $.rootUrl + '/Content/images/Login/psw0.png) no-repeat center center'
            });

            var error = request('error');
            if (error == "ip") {
                lrPage.tip("登录IP限制");
                if (history && history.pushState) {
                    history.pushState({}, '敏捷开发框架 - 登录页面', top.$.rootUrl + '/Login/Index');
                }
            }
            else if (error == "time") {
                lrPage.tip("登录时间限制");
                if (history && history.pushState) {
                    history.pushState({}, '敏捷开发框架 - 登录页面', top.$.rootUrl + '/Login/Index');
                }
            }
            else if (error == "other") {
                lrPage.tip('当前浏览器有其他账号登录了，请重新登录！');
                if (history && history.pushState) {
                    history.pushState({}, '敏捷开发框架 - 登录页面', top.$.rootUrl + '/Login/Index');
                }
            }

            if (window.location.href != top.window.location.href) {
                top.window.location.href = window.location.href;
            }
            var isIE = !!window.ActiveXObject;
            var isIE6 = isIE && !window.XMLHttpRequest;
            if (isIE6) {
                window.location.href = $.rootUrl + "/Error/ErrorBrowser";
            }
            lrPage.bind();
        },
        bind: function () {
            // 回车键
            document.onkeydown = function (e) {
                e = e || window.event;
                if ((e.keyCode || e.which) == 13) {
                    $('#kr_login_btn').trigger('click');
                }
            }

            // 点击切换验证码
            $("#kr_verifycode_img").click(function () {
                $("#kr_verifycode_input").val('');
                $("#kr_verifycode_img").attr("src", $.rootUrl + "/Login/VerifyCode?time=" + Math.random());
            });
            var errornum = $('#errornum').val();
            if (errornum >= 3) {

                $('.kr-login-bypsw').removeClass('noreg');
                $("#kr_verifycode_img").trigger('click');
            }

            //点击密码icon  显示／隐藏
            $('#psw_change').click(function (event) {
                var event = event || window.event;
                event.stopPropagation();
                var $this = $(this);
                $this.toggleClass('psw_show');
                //如果当前隐藏  变显示
                if ($this.hasClass('psw_show')) {
                    $this.css({
                        'background': 'url(' + $.rootUrl + '/Content/images/Login/psw1.png) no-repeat center center'
                    });
                    $this.prev().attr('type', 'text');
                } else {
                    $this.css(
                        'background', 'url(' + $.rootUrl + '/Content/images/Login/psw0.png) no-repeat center center'
                    );
                    $this.prev().attr('type', 'password');
                }
            });

            //登录方式点击
            $('.kr-login-toCode').click(function () {
                var _this = $(this);
                if (_this.attr('login-access') == 'psw') {
                    $('.kr-login-bycode').show();
                    $('.kr-login-bypsw').hide();

                } else {
                    $('.kr-login-bypsw').show();
                    $('.kr-login-bycode').hide();

                }
            })

            // 登录按钮事件
            $("#kr_login_btn").on('click', function () {
                lrPage.login();
            });
        },
        login: function () {
            lrPage.tip();

            var $username = $("#kr_username"), $password = $("#kr_password"), $verifycode = $("#kr_verifycode_input");
            var username = $.trim($username.val()), password = $.trim($password.val()), verifycode = $.trim($verifycode.val());

            if (username == "") {
                lrPage.tip('请输入账户。');
                $username.focus();
                return false;
            }
            if (password == "") {
                lrPage.tip('请输入密码。');
                $password.focus();
                return false;
            }

            if ($("#kr_verifycode_input").is(":visible") && verifycode == "") {
                lrPage.tip('请输入验证码。');
                $verifycode.focus();
                return false;
            }
            password = $.md5(password);
            lrPage.logining(true);
            $.ajax({
                url: $.rootUrl + "/Login/CheckLogin",
                headers: { __RequestVerificationToken: $.krToken },
                data: { username: username, password: password, verifycode: verifycode },
                type: "post",
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        window.location.href = $.rootUrl + '/Home/Index';
                    }
                    else if (res.code == 400) {
                        lrPage.logining(false);
                        lrPage.tip(res.info, true);
                        $('#errornum').val(res.data);
                        if (res.data >= 3) {
                            $('#kr_verifycode_input').parent().show();
                            $("#kr_verifycode_img").trigger('click');
                        }
                    }
                    else if (res.code == 500) {
                        console.error(res.info);
                        lrPage.logining(false);
                        lrPage.tip('服务端异常，请联系管理员', true);
                    }
                }
            });
        },
        logining: function (isShow) {
            if (isShow) {
                $('input').attr('disabled', 'disabled');
                $("#kr_login_btn").addClass('active').attr('disabled', 'disabled').find('span').hide();
                $("#kr_login_btn").css('background', '#eeecec url(/Content/images/Login/loading.gif) no-repeat center 10px');

            }
            else {
                $('input').removeAttr('disabled');
                $("#kr_login_btn").removeClass('active').removeAttr('disabled').find('span').show();
                $("#kr_login_btn").css('background', '#156EDB');

            }
        },
        tip: function (msg) {
            var $tip = $('.kr-login-warning');
            $tip.hide();
            if (!!msg) {
                $tip.find('span').html(msg);
                $('.kr-login-head-sub').hide();
                $tip.show();
            }
        }
    };
    $(function () {
        lrPage.init();
    });
})(window.jQuery)