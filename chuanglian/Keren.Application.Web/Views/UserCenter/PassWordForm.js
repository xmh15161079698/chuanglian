/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：个人中心-修改密码	
 */

var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 点击切换验证码
            $("#Verifycode_img").click(function () {
                $("#Verifycode").val('');
                $("#Verifycode_img").attr("src", top.$.rootUrl + "/UserCenter/VerifyCode?time=" + Math.random());
            });
            // 旧密码验证
            $("#OldPassword").blur(function () {
                var $this = $(this);
                $this.parent().find('.tip').html('');
                if ($this.val() == "") {

                    return false;
                }
                var password = $.md5($this.val());
                keren.httpAsyncPost(top.$.rootUrl + "/UserCenter/ValidationOldPassword", { OldPassword: password }, function (res) {
                    if (res.code != 200) {
                        $this.parent().find('.tip').html('<div class="tip-error"><i class="fa  fa-exclamation-circle"></i>密码错误!</div>');
                    }
                    else {
                        $this.parent().find('.tip').html('<div class="tip-success"><i class="fa fa-check-circle"></i></div>');
                    }
                });
            });
            // 新密码
            $("#NewPassword").blur(function () {
                var $this = $(this);
                $this.parent().find('.tip').html('');
                if ($this.val() == "") {
                    return false;
                }
                $this.parent().find('.tip').html('<div class="tip-success"><i class="fa fa-check-circle"></i></div>');
            });
            $("#RedoNewPassword").blur(function () {
                var $this = $(this);
                $this.parent().find('.tip').html('');
                if ($this.val() == "") {
                    return false;
                }
                if ($this.val() == $('#NewPassword').val()) {

                    $this.parent().find('.tip').html('<div class="tip-success"><i class="fa fa-check-circle"></i></div>');
                }
                else {
                    $this.parent().find('.tip').html('<div class="tip-error"><i class="fa  fa-exclamation-circle"></i>两次密码输入不一样!</div>');
                }
                
            });

            $('#kr_save_btn').on('click', function () {
                if (!$('#form').krValidform()) {
                    return false;
                }
                if ($('#OldPassword').parent().find('.tip-success').length > 0 && $('#NewPassword').parent().find('.tip-success').length > 0 && $('#RedoNewPassword').parent().find('.tip-success').length > 0)
                {
                    var formData = $('#form').krGetFormData();
                    var postData = {
                        password: $.md5(formData.NewPassword),
                        oldPassword: $.md5(formData.OldPassword),
                        verifyCode: formData.Verifycode
                    };

                    keren.layerConfirm('注：请牢记当前设置密码，您确认要修改密码？', function (res, index) {
                        if (res) {
                            $.krSaveForm(top.$.rootUrl + '/UserCenter/SubmitResetPassword', postData, function (res) {
                                if (res.code == 200) {
                                    top.location.href = top.$.rootUrl + "/Login/Index";
                                }
                            });
                            top.layer.close(index); //再执行关闭  
                        }
                    });

                   
                }
                return false;
            });
        }
    };
    page.init();
}