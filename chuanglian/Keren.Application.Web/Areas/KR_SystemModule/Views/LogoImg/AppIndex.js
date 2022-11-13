/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.07.30
 * 描 述：移动端logo设置
 */
var loaddfimg;
var baseinfo;
var bootstrap = function ($, keren) {
    "use strict";
   
    var page = {
        init: function () {
            page.initData();
            page.bind();
        },
        bind: function () {
            function uploadImg() {
                var f = document.getElementById('uploadFile').files[0]
                var src = window.URL.createObjectURL(f);
                document.getElementById('uploadPreview').src = src;
            };

            $('#uploadFile').on('change', uploadImg);

            $('#kr_save_btn').on('click', function () {
                var f = document.getElementById('uploadFile').files[0];
                if (!!f) {
                    keren.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: top.$.rootUrl + "/KR_SystemModule/LogoImg/UploadFile?code=applogo",
                        secureuri: false,
                        fileElementId: 'uploadFile',
                        dataType: 'json',
                        success: function (data) {
                            keren.loading(false);
                            $('#uploadFile').on('change', uploadImg);
                            if (data.code == 200) {
                                keren.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
        },
        initData: function () {
            $('.file').prepend('<img id="uploadPreview"  src="' + top.$.rootUrl + '/KR_SystemModule/LogoImg/GetImg?code=applogo" >');
        }
    };
    page.init();
}