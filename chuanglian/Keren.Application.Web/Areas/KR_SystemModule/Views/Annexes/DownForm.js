var keyVaule = request('keyVaule');
var bootstrap = function ($, keren) {
    "use strict";

    $.krSetForm(top.$.rootUrl + '/KR_SystemModule/Annexes/GetAnnexesFileList?folderId=' + keyVaule, function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            $('#kr_form_file_queue .kr-form-file-queue-bg').hide();
            var item = data[i];
            var $item = $('<div class="kr-form-file-queue-item" id="kr_filequeue_' + item.F_Id + '" ></div>');
            $item.append('<div class="kr-file-image"><img src="' + top.$.rootUrl + '/Content/images/filetype/' + item.F_FileType + '.png"></div>');
            $item.append('<span class="kr-file-name">' + item.F_FileName + '(' + keren.countFileSize(item.F_FileSize) + ')</span>');
            $item.append('<div class="kr-tool-bar"><i class="fa fa-eye" title="预览"  data-value="' + item.F_Id + '" ></i><i class="fa fa-cloud-download" title="下载"  data-value="' + item.F_Id + '" ></i></div>');
            $item.find('.kr-tool-bar .fa-cloud-download').on('click', function () {
                var fileId = $(this).attr('data-value');
                DownFile(fileId);
            });
            $item.find('.kr-tool-bar .fa-eye').on('click', function () {
                var fileId = $(this).attr('data-value');
                openViewForm(fileId);
            });
            $('#kr_form_file_queue_list').append($item);
        }
    });
    // 下载文件
    var DownFile = function (fileId) {
        keren.download({ url: top.$.rootUrl + '/KR_SystemModule/Annexes/DownAnnexesFile', param: { fileId: fileId, __RequestVerificationToken: $.krToken }, method: 'POST' });
    }
    var openViewForm = function (fileId) {
        keren.layerForm({
            id: 'PreviewForm',
            title: '文件预览',
            url: top.$.rootUrl + '/KR_SystemModule/Annexes/PreviewFile?fileId=' + fileId,
            width: 1080,
            height: 850,
            btn: null
        });
    }


    $('#kr_form_file_queue').krscroll();
}
