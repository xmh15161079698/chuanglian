﻿/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.01.05
 * 描 述：配置轮播图	
 */
var bootstrap = function ($, keren) {
    "use strict";

    function uploadImg(id) {
        var $input = $(this);
        var f = $input[0].files[0]
        var src = window.URL.createObjectURL(f);
        $input.next().attr('src', src);
        var id = $input.attr('id');
        var _index = $input.attr('data-index');

        keren.loading(true, '正在保存...');
        $.ajaxFileUpload({
            url: top.$.rootUrl + '/KR_PortalSite/HomeConfig/UploadFile2?keyValue=' + id + '&sort=' + _index,
            secureuri: false,
            fileElementId: id,
            dataType: 'json',
            success: function (data) {
                keren.loading(false);
                updateImg();
            }
        });
    };

    function updateImg() {
        var imgList = [];
        $('.item').each(function () {
            var src = $(this).find('img').attr("src");
            if(src != top.$.rootUrl + '/KR_PortalSite/HomeConfig/GetImg2'){
                var item = { src: src };
                imgList.push(item);
            }
        });
        keren.frameTab.currentIframe().renderPicture(imgList);
    }

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('.body').krscroll();

            $('.body').on('click', '.edit-btn>span', function () {
                var $this = $(this);
                var $item = $this.parents('.item');
                var $next = null;
                var v = $(this).attr('data-value');
                var $input = $item.find('input');
                var _id = $input.attr('id');
                var _index = $input.attr('data-index');

                switch (v) {
                    case 'up':
                        $next = $item.prev();
                        if ($next.length > 0) {

                            var $pinput = $next.find('input');

                            var _pid = $pinput.attr('id');
                            var _pindex = $pinput.attr('data-index');

                            $input.attr('data-index', _pindex);
                            $pinput.attr('data-index', _index);


                            keren.httpAsync('post', top.$.rootUrl + '/KR_PortalSite/HomeConfig/UpdateForm', { keyValue1: _id, keyValue2: _nid }, function (data) {

                            });

                            $next.before($item);
                            updateImg();
                        }
                        break;
                    case 'down':
                        $next = $item.next();
                        if (!$next.hasClass('pictureBtn')) {
                           
                            var $ninput = $next.find('input');

                            var _nid = $ninput.attr('id');
                            var _nindex = $ninput.attr('data-index');

                            $input.attr('data-index', _nindex);
                            $ninput.attr('data-index', _index);


                            keren.httpAsync('post', top.$.rootUrl + '/KR_PortalSite/HomeConfig/UpdateForm', { keyValue1: _id, keyValue2: _nid }, function (data) {
                                
                            });

                            $next.after($item);
                            updateImg();
                        }
                        break;
                    case 'delete':
                        keren.layerConfirm('是否确认删除该图片！', function (res) {
                            if (res) {
                                keren.deleteForm(top.$.rootUrl + '/KR_PortalSite/HomeConfig/DeleteForm', { keyValue: _id }, function () {
                                    $item.remove();
                                    updateImg();
                                });
                            }
                        });
                        break;
                }
            });

            $('#addBtn').on('click', function () {
                var $btn = $(this);

                var $prev = $btn.prev();
                var index = 1;
                if ($prev.length > 0) {
                    index = parseInt($prev.find('input').attr('data-index')) + 1;
                }

                var id = keren.newGuid();
                var $item = $('<div class="item">\
                                   <div class="file">\
                                       <input type="file"  name="'+ id + '"  id="' + id + '" data-index="' + index + '"  >\
                                       <img src="' + top.$.rootUrl + '/KR_PortalSite/HomeConfig/GetImg2">\
                                   </div>\
                                   <div class="edit-btn"><span data-value="up" >上移</span><span data-value="down"  >下移</span><span data-value="delete"  >删除</span></div>\
                               </div>');
                $item.find('input').on('change', uploadImg);

                $btn.before($item);
            });
        },
        initData: function () {
            keren.httpAsync('GET', top.$.rootUrl + '/KR_PortalSite/HomeConfig/GetList?type=8', {}, function (data) {
                var $btn = $('#addBtn');
                $.each(data || [], function (_index, _item) {
                    var $item = $('<div class="item">\
                                   <div class="file">\
                                       <input type="file"  name="' + _item.F_Id + '"  id="' + _item.F_Id + '" data-index="' + _item.F_Sort + '"  >\
                                       <img src="' + top.$.rootUrl + '/KR_PortalSite/HomeConfig/GetImg2?keyValue=' + _item.F_Id + '">\
                                   </div>\
                                   <div class="edit-btn"><span data-value="up" >上移</span><span data-value="down"  >下移</span><span data-value="delete"  >删除</span></div>\
                               </div>');
                    $item.find('input').on('change', uploadImg);

                    $btn.before($item);
                });
            });
        }
    };
    page.init();
}