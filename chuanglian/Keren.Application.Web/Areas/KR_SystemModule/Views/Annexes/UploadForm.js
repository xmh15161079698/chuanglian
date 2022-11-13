/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：附件上传管理	
 */
var keyVaule = request('keyVaule');
var extensions = request('extensions');
var filePath = request('filePath');

var bootstrap = function ($, keren) {
    "use strict";

    $.krSetForm(top.$.rootUrl + '/KR_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            $('#kr_form_file_queue .kr-form-file-queue-bg').hide();
            var item = data[i];
            fileInfo[item.F_Id] = {
                fileGuid: item.F_Id,
                chunks: 1
            }
            var $item = $('<div class="kr-form-file-queue-item" id="kr_filequeue_' + item.F_Id + '" ></div>');
            $item.append('<div class="kr-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + item.F_FileType + '.png"></div>');
            $item.append('<span class="kr-file-name">' + item.F_FileName + '(' + keren.countFileSize(item.F_FileSize) + ')</span>');

            $item.append('<div class="kr-msg"><i class="fa fa-check-circle"></i></div>');
            $item.append('<div class="kr-tool-bar"><i class="fa fa-cloud-download" title="下载"  data-value="' + item.F_Id + '" ></i><i class="fa fa-minus-circle" title="删除"  data-value="' + item.F_Id + '" ></i></div>');

            $item.find('.kr-tool-bar .fa-minus-circle').on('click', function () {
                var fileId = $(this).attr('data-value');
                DeleteFile(fileId);
            });

            $item.find('.kr-tool-bar .fa-cloud-download').on('click', function () {
                var fileId = $(this).attr('data-value');
                DownFile(fileId);
            });

            $('#kr_form_file_queue_list').append($item);
        }
    });

    var fileInfo = {};

    // 触发合并文件碎片
    var mergeFileChunks = function (file) {
        var param = {};
        param['__RequestVerificationToken'] = $.krToken;
        param['folderId'] = keyVaule;
        param['fileGuid'] = fileInfo[file.id].fileGuid;
        param['fileName'] = fileInfo[file.id].name;
        param['chunks'] = fileInfo[file.id].chunks;
        param['filePath'] = filePath;
        keren.httpAsyncPost(top.$.rootUrl + "/KR_SystemModule/Annexes/MergeAnnexesFile", param, function (res) {
            var $fileItem = $('#kr_form_file_queue_list').find('#kr_filequeue_' + file.id);
            $fileItem.find('.kr-uploader-progress').remove();
            if (res.code == keren.httpCode.success) {
                // 文件保存成功后
                $fileItem.append('<div class="kr-msg"><i class="fa fa-check-circle"></i></div>');
                $fileItem.append('<div class="kr-tool-bar"><i class="fa fa-minus-circle" title="删除"  data-value="' + file.id + '" ></i></div>');

                $fileItem.find('.kr-tool-bar .fa-minus-circle').on('click', function () {
                    var fileId = $(this).attr('data-value');
                    DeleteFile(fileId);
                });
            }
            else {
                $fileItem.append('<div class="kr-msg"><i class="fa fa-exclamation-circle"></i></div>');
            }
        });
    }
    // 触发清楚文件碎片
    var reomveFileChunks = function (file) {
        var param = {};
        param['__RequestVerificationToken'] = $.krToken;
        param['fileGuid'] = fileInfo[file.id].fileGuid;
        param['chunks'] = fileInfo[file.id].chunks;
        param['filePath'] = filePath;
        keren.httpAsyncPost(top.$.rootUrl + "/KR_SystemModule/Annexes/MergeAnnexesFile", param, function (res) { });
        var $fileItem = $('#kr_form_file_queue_list').find('#kr_filequeue_' + file.id);
        $fileItem.find('.kr-uploader-progress').remove();
        $fileItem.append('<div class="kr-msg"><i class="fa fa-exclamation-circle"></i></div>');
    }
    // 删除文件
    var DeleteFile = function (fileId) {
        var param = {};
        param['__RequestVerificationToken'] = $.krToken;
        param['fileId'] = fileInfo[fileId].fileGuid;
        keren.httpAsyncPost(top.$.rootUrl + "/KR_SystemModule/Annexes/DeleteAnnexesFile", param, function (res) { });
        var file = page.uploader.getFile(fileId);
        if (!!file) {
            page.uploader.removeFile(file);
        }
        delete fileInfo[fileId];
        var $fileItem = $('#kr_form_file_queue_list').find('#kr_filequeue_' + fileId);
        $fileItem.remove();
        if ($('#kr_form_file_queue_list>div').length == 0) {
            $('#kr_form_file_queue .kr-form-file-queue-bg').show();
        }
    }
    // 下载文件
    var DownFile = function (fileId) {
        keren.download({ url: top.$.rootUrl + '/KR_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.krToken }, method: 'POST' });
    }

    var page = {
        uploader: null,
        init: function () {
            if (!WebUploader.Uploader.support()) {
                alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
                throw new Error('WebUploader does not support the browser you are using.');
            }

            page.uploader = WebUploader.create({
                auto: true,
                swf: top.$.rootUrl + '/Content/webuploader/Uploader.swf',
                // 文件接收服务端。
                server: top.$.rootUrl + "/KR_SystemModule/Annexes/UploadAnnexesFileChunk",
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#kr_add_file_btn',
                dnd: '#kr_form_file_queue',
                paste: 'document.body',
                disableGlobalDnd: true,

                accept: {
                    //只允许上传图片
                    extensions: extensions || "gif,jpeg,jpg,png"
                    //extensions: extensions || "gif,jpeg,jpg,png,psd,rar,zip,pdf,doc,docx,ppt,pptx,txt,xls,xlsx"
                },
                multiple: true,
                // 压缩image, 上传前会压缩一把再上传！
                resize: true,
                // 文件分片上传
                chunked: false,
                chunkRetry: 3,
                prepareNextFile: true,

                chunkSize: '48576',
                // 上传参数
                formData: {
                    __RequestVerificationToken: $.krToken
                }
            });
            page.uploader.on('fileQueued', page.fileQueued);
            page.uploader.on('uploadStart', page.uploadStart);
            page.uploader.on('uploadBeforeSend', page.uploadBeforeSend);
            page.uploader.on('uploadProgress', page.uploadProgress);
            page.uploader.on('uploadSuccess', page.uploadSuccess);
            page.uploader.on('uploadError', page.uploadError);
            page.uploader.on('uploadComplete', page.uploadComplete);
            page.uploader.on('error', page.error);


            $('#kr_form_file_queue').krscroll();

        },
        fileQueued: function (file) {// 文件加载到队列
            fileInfo[file.id] = { name: file.name };
            $('#kr_form_file_queue .kr-form-file-queue-bg').hide();
            // 添加一条文件记录
            var $item = $('<div class="kr-form-file-queue-item" id="kr_filequeue_' + file.id + '" ></div>');
            $item.append('<div class="kr-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + file.ext + '.png"></div>');
            $item.append('<span class="kr-file-name">' + file.name + '(' + keren.countFileSize(file.size) + ')</span>');

            $('#kr_form_file_queue_list').append($item);
        },
        uploadStart: function (file) {
            var $fileItem = $('#kr_form_file_queue_list').find('#kr_filequeue_' + file.id);
            $fileItem.append('<div class="kr-uploader-progress"><div class="kr-uploader-progress-bar" style="width:0%;"></div></div>');
        },
        uploadBeforeSend: function (object, data, headers) {
            data.chunk = data.chunk || 0;
            data.chunks = data.chunks || 1;
            fileInfo[data.id].fileGuid = fileInfo[data.id].fileGuid || WebUploader.Base.guid();
            data.fileGuid = fileInfo[data.id].fileGuid;
            fileInfo[data.id].chunks = data.chunks;
            console.log(fileInfo);
        },
        uploadProgress: function (file, percentage) {
            var $fileItem = $('#kr_form_file_queue_list').find('#kr_filequeue_' + file.id);
            $fileItem.find('.kr-uploader-progress-bar').css('width', (percentage * 100 + '%'));
        },
        uploadSuccess: function (file, res) {

            if (res.code == 200) {// 上传成功
                mergeFileChunks(file);
            }
            else {// 上传失败
                reomveFileChunks(file);
            }
        },
        uploadError: function (file, code) {
            reomveFileChunks(file);
        },
        uploadComplete: function (file) {
        },
        error: function (type) {
            switch (type) {
                case 'Q_TYPE_DENIED':
                    keren.alert.error('当前文件类型不允许上传');
                    break;
            };
        }
    };
    page.init();
}
