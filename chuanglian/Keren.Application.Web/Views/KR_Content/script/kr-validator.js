/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：表单数据验证完整性
 */
(function ($, keren) {
    "use strict";
    
    $.krValidformMessage = function ($this, errormsg) {
        /*错误处理*/
        $this.addClass('kr-field-error');
        $this.parent().append('<div class="kr-field-error-info" title="' + errormsg + '！"><i class="fa fa-info-circle"></i></div>');
        var validatemsg = $this.parent().find('.form-item-title').text() + ' ' + errormsg;
        keren.alert.error('表单信息输入有误,请检查！</br>' + validatemsg);
        if ($this.attr('type') == 'lrselect') {
            $this.on('change', function () {
                removeErrorMessage($(this));
            });
        }
        else if ($this.attr('type') == 'formselect') {
            $this.on('change', function () {
                removeErrorMessage($(this));
            });
        }
        else if ($this.hasClass('kr-input-wdatepicker')) {
            $this.on('change', function () {
                var $input = $(this);
                if ($input.val()) {
                    removeErrorMessage($input);
                }
            });
        }
        else {
            $this.on('input propertychange', function () {
                var $input = $(this);
                if ($input.val()) {
                    removeErrorMessage($input);
                }
            });
        }
    };

    $.fn.krRemoveValidMessage = function () {
        removeErrorMessage($(this));
    }

    $.fn.krValidform = function () {
        var validateflag = true;
        var validHelper = keren.validator;
        var formdata = $(this).krGetFormData();

        $(this).find("[isvalid=yes]").each(function () {
            var $this = $(this);

            if ($this.parent().find('.kr-field-error-info').length > 0) {
                validateflag = false;
                return true;
            }

            var checkexpession = $(this).attr("checkexpession");
            var checkfn = validHelper['is' + checkexpession];
            if (!checkexpession || !checkfn) { return false; }
            var errormsg = $(this).attr("errormsg") || "";

            var id = $this.attr('id');
            var value = formdata[id];

            //var type = $this.attr('type');
            //if (type == 'lrselect') {
            //    value = $this.krselectGet();
            //}
            //else if (type == 'formselect') {
            //    value = $this.krformselectGet();
            //}
            //else {
            //    value = $this.val();
            //}
            var r = { code: true, msg: '' };
            if (checkexpession == 'LenNum' || checkexpession == 'LenNumOrNull' || checkexpession == 'LenStr' || checkexpession == 'LenStrOrNull') {
                var len = $this.attr("length");
                r = checkfn(value, len);
            } else {
                r = checkfn(value);
            }
            if (!r.code) {
                validateflag = false;
                $.krValidformMessage($this, errormsg + r.msg);
            }
        });
        return validateflag;
    }

    function removeErrorMessage($obj) {
        $obj.removeClass('kr-field-error');
        $obj.parent().find('.kr-field-error-info').remove();
    }

})(window.jQuery, top.keren);
