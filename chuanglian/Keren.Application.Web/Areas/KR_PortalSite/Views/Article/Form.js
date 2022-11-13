/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-09-05 09:35
 * 描  述：详细信息维护
 */
var acceptClick;
var keyValue = request('keyValue');
var categoryId = request('categoryId');

var bootstrap = function ($, keren) {
    var src = "";
    "use strict";
    //内容编辑器
    var ue = UE.getEditor('F_Content', { initialFrameWidth: null, autoHeightEnabled: false });

    $('#F_Content')[0].ue = ue;

    function uploadImg() {
        var f = document.getElementById('uploadFile').files[0]
        src = window.URL.createObjectURL(f);
        $("#F_ImgName1").html(f.name);
    };
    var acceptClick = function (callBack) {
        if (!$('#form1').krValidform()) {
            return false;
        }
        var formData = $('#form1').krGetFormData();
        var postData = {
            F_ImgName: formData.F_ImgName,
            F_Img: formData.F_Img,
            F_Title: formData.F_Title,
            F_Category: formData.F_Category,
            F_PushDate: formData.F_PushDate,
            F_Content: formData.F_Content,
        }


        keren.loading(true, '正在保存...');
        $.ajaxFileUpload({
            data: postData,
            url: top.$.rootUrl + "/KR_PortalSite/Article/UploadFile?keyValue=" + keyValue,
            secureuri: false,
            fileElementId: 'uploadFile',
            dataType: 'json',
            success: function (data) {
                keren.loading(false);
                if (data.code = "200") {
                    // 保存成功后才回调
                    keren.frameTab.parentIframe().refreshGirdData();//index页列表刷新
                    keren.frameTab.close('PL_ArticleInfo_List_add');//关闭新增界面
                }
            }
        });
    };

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 文章分类
            $('#F_Category').krDataItemSelect({ code: 'PortalSiteType' });
            $('#F_Category').krselectSet(categoryId);

            // 保存数据
            $('#savaAndAdd').on('click', function () {
                acceptClick();
            });
            ///取消按钮关闭采购订单界面
            $('#save').on('click', function () {
                keren.frameTab.close('PL_ArticleInfo_List_add');//关闭新增界面
            });



            // 图片上传
            $('#uploadFile').on('change', uploadImg);

            $("#closebutton").on('click', function () {
                $('#showimg').html('');


                document.getElementById("showimg").style.display = "none";
                document.getElementById("closebutton").style.display = "none";
            });
            $("#F_ImgName1").on("click", function () {

                if (src != "") {
                    var _item = '<img src=' + src + '>';
                    $('#showimg').html(_item);
                    document.getElementById("showimg").style.display = "block";//显示
                    document.getElementById("closebutton").style.display = "block";//显示
                } else if (keyValue) {
                    if ($("#F_Img").val()) {
                        $('#showimg').html('<img src="' + top.$.rootUrl + '/KR_PortalSite/Article/GetImg?keyValue=' + keyValue + '" >');
                        document.getElementById("showimg").style.display = "block";//显示
                        document.getElementById("closebutton").style.display = "block";//显示
                    }
                } 
            })

        },
        initData: function () {
            if (!!keyValue) {
                $.krSetForm(top.$.rootUrl + '/KR_PortalSite/Article/GetFormData?keyValue=' + keyValue, function (data) {
                    $('#form1').krSetFormData(data);
                    $("#F_ImgName1").html(data.F_ImgName);
                });
            }
        }
    };
    page.init();
}
