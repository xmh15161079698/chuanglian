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
            $('.kr-rblock').krscroll();
            page.initData();
            page.bind();
        },
        bind: function () {
            function uploadImg(id, previewId) {//uploadFile//uploadPreview
                var f = document.getElementById(id).files[0]
                var src = window.URL.createObjectURL(f);
                document.getElementById(previewId).src = src;
            };

            $('#uploadFile').on('change', function () {
                uploadImg('uploadFile', 'uploadPreview');
            });
            $('#uploadFile1').on('change', function () {
                uploadImg('uploadFile1', 'uploadPreview1');
            });
            $('#uploadFile2').on('change', function () {
                uploadImg('uploadFile2', 'uploadPreview2');
            });
            $('#uploadFile3').on('change', function () {
                uploadImg('uploadFile3', 'uploadPreview3');
            });

            $('#kr_save_btn').on('click', function () {
                var f = document.getElementById('uploadFile').files[0];
                if (!!f) {
                    keren.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: top.$.rootUrl + "/KR_SystemModule/LogoImg/UploadFile?code=default",
                        secureuri: false,
                        fileElementId: 'uploadFile',
                        dataType: 'json',
                        success: function (data) {
                            keren.loading(false);
                            $('#uploadFile').on('change', function () {
                                uploadImg('uploadFile', 'uploadPreview');
                            });
                            if (data.code == 200) {
                                keren.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
            $('#kr_save_btn1').on('click', function () {
                var f = document.getElementById('uploadFile1').files[0];
                if (!!f) {
                    keren.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: top.$.rootUrl + "/KR_SystemModule/LogoImg/UploadFile?code=accordion",
                        secureuri: false,
                        fileElementId: 'uploadFile1',
                        dataType: 'json',
                        success: function (data) {
                            keren.loading(false);
                            $('#uploadFile1').on('change', function () {
                                uploadImg('uploadFile1', 'uploadPreview1');
                            });
                            if (data.code == 200) {
                                keren.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
            $('#kr_save_btn2').on('click', function () {
                var f = document.getElementById('uploadFile2').files[0];
                if (!!f) {
                    keren.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: top.$.rootUrl + "/KR_SystemModule/LogoImg/UploadFile?code=windows",
                        secureuri: false,
                        fileElementId: 'uploadFile2',
                        dataType: 'json',
                        success: function (data) {
                            keren.loading(false);
                            $('#uploadFile2').on('change', function () {
                                uploadImg('uploadFile2', 'uploadPreview2');
                            });
                            if (data.code == 200) {
                                keren.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
            $('#kr_save_btn3').on('click', function () {
                var f = document.getElementById('uploadFile3').files[0];
                if (!!f) {
                    keren.loading(true, '正在保存...');
                    $.ajaxFileUpload({
                        url: top.$.rootUrl + "/KR_SystemModule/LogoImg/UploadFile?code=top",
                        secureuri: false,
                        fileElementId: 'uploadFile3',
                        dataType: 'json',
                        success: function (data) {
                            keren.loading(false);
                            $('#uploadFile3').on('change', function () {
                                uploadImg('uploadFile3', 'uploadPreview2');
                            });
                            if (data.code == 200) {
                                keren.alert.success('保存成功');
                            }
                        }
                    });
                }
            });
        },
        initData: function () {
            $('#file').prepend('<img id="uploadPreview"  src="' + top.$.rootUrl + '/KR_SystemModule/LogoImg/GetImg?code=default" >');
            $('#file1').prepend('<img id="uploadPreview1"  src="' + top.$.rootUrl + '/KR_SystemModule/LogoImg/GetImg?code=accordion" >');
            $('#file2').prepend('<img id="uploadPreview2"  src="' + top.$.rootUrl + '/KR_SystemModule/LogoImg/GetImg?code=windows" >');
            $('#file3').prepend('<img id="uploadPreview3"  src="' + top.$.rootUrl + '/KR_SystemModule/LogoImg/GetImg?code=top" >');
            
        }
    };
    page.init();
}