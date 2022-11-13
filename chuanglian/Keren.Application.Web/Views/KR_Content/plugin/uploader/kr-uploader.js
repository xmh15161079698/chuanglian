/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.24
 * 描 述：kr-uploader 表单附件选择插件
 */
(function ($, keren) {
    "use strict";

    $.krUploader = {
        init: function ($self) {
            var dfop = $self[0]._krUploader.dfop;
            $.krUploader.initRender($self, dfop);
        },
        initRender: function ($self, dfop) {
            $self.attr('type', 'kr-Uploader').addClass('krUploader-wrap');
            var $wrap = $('<div class="krUploader-input" ></div>');

            var $btnGroup = $('<div class="krUploader-btn-group"></div>');
            var $uploadBtn = $('<a id="krUploader_uploadBtn_' + dfop.id + '" class="btn btn-success krUploader-input-btn">上传</a>');
            var $downBtn = $('<a id="krUploader_downBtn_' + dfop.id + '" class="btn btn-danger krUploader-input-btn">下载</a>');
            var $viewBtn = $('<a id="krUploader_viewBtn_' + dfop.id + '" class="btn btn-primary krUploader-input-btn">预览</a>');

            $self.append($wrap);
            var w = 0;
            if (dfop.isUpload) {
                $btnGroup.append($uploadBtn);
                w += 57;
            }
            if (dfop.isDown) {
                $btnGroup.append($downBtn);
                w += 57;
            }
            if (dfop.isView) {
                $btnGroup.append($viewBtn);
                w += 57;
            }
            $uploadBtn.on('click', $.krUploader.openUploadForm);
            $downBtn.on('click', $.krUploader.openDownForm);
            $viewBtn.on('click', $.krUploader.openViewForm);

            $self.append($btnGroup);
            $self.css({ 'padding-right': w});

        },
        openUploadForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.krUploader-wrap');
            var dfop = $self[0]._krUploader.dfop;
            keren.layerForm({
                id: dfop.id,
                title: dfop.placeholder,
                url: top.$.rootUrl + '/KR_SystemModule/Annexes/UploadForm?keyVaule=' + dfop.value + "&extensions=" + dfop.extensions + "&filePath=" + dfop.filePath,
                width: 600,
                height: 400,
                maxmin: true,
                btn: null,
                end: function () {
                    keren.httpAsyncGet(top.$.rootUrl + '/KR_SystemModule/Annexes/GetFileNames?folderId=' + dfop.value, function (res) {
                        if (res.code == keren.httpCode.success) {
                            $('#' + dfop.id).find('.krUploader-input').text(res.info);
                        }
                    });
                }
            });
        },
        openDownForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.krUploader-wrap');
            var dfop = $self[0]._krUploader.dfop;
            keren.layerForm({
                id: dfop.id,
                title: dfop.placeholder,
                url: top.$.rootUrl + '/KR_SystemModule/Annexes/DownForm?keyVaule=' + dfop.value,
                width: 600,
                height: 400,
                maxmin: true,
                btn: null
            });
        },
        openViewForm: function () {
            var $btn = $(this);
            var $self = $btn.parents('.krUploader-wrap');
            var dfop = $self[0]._krUploader.dfop;
            keren.layerForm({
                id: 'PreviewForm',
                title: '文件预览',
                url: top.$.rootUrl + '/KR_SystemModule/Annexes/PreviewFile?fileId=' + dfop.value,
                width: 1080,
                height: 850,
                btn: null
            });
        }
    };

    $.fn.krUploader = function (op) {
        var $this = $(this);
        if (!!$this[0]._krUploader) {
            return $this;
        }
        var dfop = {
            placeholder: '上传附件',
            isUpload: true,
            isDown: false,
            isView: true,
            extensions: '',
            filePath: ''//上传路径（配置文件）
        }

        $.extend(dfop, op || {});
        dfop.id = $this.attr('id');
        dfop.value = keren.newGuid();

        $this[0]._krUploader = { dfop: dfop };
        $.krUploader.init($this);
    };

    $.fn.krUploaderSet = function (value) {
        if (value == null || value == 'null' || value == undefined || value == 'undefined' || value == '') {
            return;
        }

        var $self = $(this);
        var dfop = $self[0]._krUploader.dfop;
        dfop.value = value;
        keren.httpAsyncGet(top.$.rootUrl + '/KR_SystemModule/Annexes/GetFileNames?folderId=' + dfop.value, function (res) {
            if (res.code == keren.httpCode.success) {
                $('#' + dfop.id).find('.krUploader-input').text(res.info);
            }
        });
    }

    $.fn.krUploaderGet = function () {
        var $this = $(this);
        var dfop = $this[0]._krUploader.dfop;
        return dfop.value;
    }
})(jQuery, top.keren);
