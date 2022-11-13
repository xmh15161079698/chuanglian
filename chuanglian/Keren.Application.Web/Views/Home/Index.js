/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：手风琴风格皮肤	
 */
var bootstrap = function ($, keren) {
    "use strict";

    // 菜单操作
    var meuns = {
        init: function () {
            this.load();
            this.bind();
        },
        load: function () {
            var modulesTree = keren.clientdata.get(['modulesTree']);
            // 第一级菜单
            var parentId = '0';
            var modules = modulesTree[parentId] || [];
            var $firstmenus = $('<ul class="kr-first-menu-list"></ul>');
            for (var i = 0, l = modules.length; i < l; i++) {
                var item = modules[i];
                if (item.F_IsMenu == 1) {
                    var $firstMenuItem = $('<li></li>');
                    if (!!item.F_Description) {
                        $firstMenuItem.attr('title', item.F_Description);
                    }
                    var menuItemHtml = '<a id="' + item.F_ModuleId + '" href="javascript:void(0);" class="kr-menu-item">';
                    menuItemHtml += '<i class="' + item.F_Icon + ' kr-menu-item-icon"></i>';
                    menuItemHtml += '<span class="kr-menu-item-text">' + item.F_FullName + '</span>';
                    menuItemHtml += '<span class="kr-menu-item-arrow"><i class="fa fa-angle-left"></i></span></a>';
                    $firstMenuItem.append(menuItemHtml);
                    // 第二级菜单
                    var secondModules = modulesTree[item.F_ModuleId] || [];
                    var $secondMenus = $('<ul class="kr-second-menu-list"></ul>');
                    var secondMenuHad = false;
                    for (var j = 0, sl = secondModules.length ; j < sl; j++) {
                        var secondItem = secondModules[j];
                        if (secondItem.F_IsMenu == 1) {
                            secondMenuHad = true;
                            var $secondMenuItem = $('<li></li>');
                            if (!!secondItem.F_Description) {
                                $secondMenuItem.attr('title', secondItem.F_Description);
                            }
                            var secondItemHtml = '<a id="' + secondItem.F_ModuleId + '" href="javascript:void(0);" class="kr-menu-item" >';
                            secondItemHtml += '<i class="' + secondItem.F_Icon + ' kr-menu-item-icon"></i>';
                            secondItemHtml += '<span class="kr-menu-item-text">' + secondItem.F_FullName + '</span>';
                            secondItemHtml += '</a>';

                            $secondMenuItem.append(secondItemHtml);
                            // 第三级菜单
                            var threeModules = modulesTree[secondItem.F_ModuleId] || [];
                            var $threeMenus = $('<ul class="kr-three-menu-list"></ul>');
                            var threeMenuHad = false;
                            for (var m = 0, tl = threeModules.length ; m < tl; m++) {
                                var threeItem = threeModules[m];
                                if (threeItem.F_IsMenu == 1) {
                                    threeMenuHad = true;
                                    var $threeMenuItem = $('<li></li>');
                                    $threeMenuItem.attr('title', threeItem.F_FullName);
                                    var threeItemHtml = '<a id="' + threeItem.F_ModuleId + '" href="javascript:void(0);" class="kr-menu-item" >';
                                    threeItemHtml += '<i class="' + threeItem.F_Icon + ' kr-menu-item-icon"></i>';
                                    threeItemHtml += '<span class="kr-menu-item-text">' + threeItem.F_FullName + '</span>';
                                    threeItemHtml += '</a>';
                                    $threeMenuItem.append(threeItemHtml);
                                    $threeMenus.append($threeMenuItem);

                                    // 第四级菜单
                                    var fourModules = modulesTree[threeItem.F_ModuleId] || [];
                                    var $fourMenus = $('<ul class="kr-four-menu-list"></ul>');
                                    var fourMenuHad = false;
                                    for (var fi = 0, fl = fourModules.length; fi < fl; fi++) {
                                        var fourItem = fourModules[fi];
                                        if (fourItem.F_IsMenu == 1) {
                                            fourMenuHad = true;
                                            var $fourMenuItem = $('<li></li>');
                                            $fourMenuItem.attr('title', fourItem.F_FullName);
                                            var fourItemHtml = '<a id="' + fourItem.F_ModuleId + '" href="javascript:void(0);" class="kr-menu-item" >';
                                            fourItemHtml += '<i class="' + fourItem.F_Icon + ' kr-menu-item-icon"></i>';
                                            fourItemHtml += '<span class="kr-menu-item-text">' + fourItem.F_FullName + '</span>';
                                            fourItemHtml += '</a>';
                                            $fourMenuItem.append(fourItemHtml);
                                            $fourMenus.append($fourMenuItem);
                                        }
                                    }
                                    if (fourMenuHad) {
                                        $threeMenuItem.addClass('kr-meun-had');
                                        $threeMenuItem.find('a').append('<span class="kr-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                        $threeMenuItem.append($fourMenus);
                                    }

                                }
                            }
                            if (threeMenuHad) {
                                $secondMenuItem.addClass('kr-meun-had');
                                $secondMenuItem.find('a').append('<span class="kr-menu-item-arrow"><i class="fa fa-angle-left"></i></span>');
                                $secondMenuItem.append($threeMenus);
                            }
                            $secondMenus.append($secondMenuItem);
                        }
                    }
                    if (secondMenuHad) {
                        $firstMenuItem.append($secondMenus);
                    }
                    $firstmenus.append($firstMenuItem);
                }
            }
            $('#kr_frame_menu').html($firstmenus);


            // 语言包翻译
            $('.kr-menu-item-text').each(function () {
                var $this = $(this);
                var text = $this.text();
                keren.language.get(text, function (text) {
                    $this.text(text);
                    $this.parent().parent().attr('title', text);
                });
            });
        },
        bind: function () {
            $("#kr_frame_menu").krscroll();

            $('#kr_frame_menu_btn').on('click', function () {
                var $body = $('body');
                if ($body.hasClass('kr-menu-closed')) {
                    $body.removeClass('kr-menu-closed');
                }
                else {
                    $body.addClass('kr-menu-closed');
                }
            });

            $('#kr_frame_menu a').hover(function () {
                if ($('body').hasClass('kr-menu-closed')) {
                    var id = $(this).attr('id');
                    var text = $('#' + id + '>span').text();
                    layer.tips(text, $(this));
                }
            }, function () {
                if ($('body').hasClass('kr-menu-closed')) {
                    layer.closeAll('tips');
                }
            });

            $('.kr-frame-personCenter .dropdown-toggle').hover(function () {
                if ($('body').hasClass('kr-menu-closed')) {
                    var text = $(this).text();
                    layer.tips(text, $(this));
                }
            }, function () {
                if ($('body').hasClass('kr-menu-closed')) {
                    layer.closeAll('tips');
                }
            });


            // 添加点击事件
            $('#kr_frame_menu a').on('click', function () {
                var $obj = $(this);
                var id = $obj.attr('id');
                var _module = keren.clientdata.get(['modulesMap', id]);
                switch (_module.F_Target) {
                    case 'iframe':// 窗口
                        if (keren.validator.isNotNull(_module.F_UrlAddress).code) {
                            keren.frameTab.open(_module);
                        }
                        else {

                        }
                        break;
                    case 'expand':// 打开子菜单
                        var $ul = $obj.next();
                        if ($ul.is(':visible')) {
                            $ul.slideUp(500, function () {
                                $obj.removeClass('open');
                            });
                        }
                        else {
                            if ($ul.hasClass('kr-second-menu-list')) {
                                $('#kr_frame_menu .kr-second-menu-list').slideUp(300, function () {
                                    $(this).prev().removeClass('open');
                                });
                            }
                            else if ($ul.hasClass('kr-three-menu-list')) {
                                $ul.parents('.kr-second-menu-list').find('.kr-three-menu-list').slideUp(300, function () {
                                    $(this).prev().removeClass('open');
                                });
                            }
                            else {
                                $ul.parents('.kr-three-menu-list').find('.kr-four-menu-list').slideUp(300, function () {
                                    $(this).prev().removeClass('open');
                                });
                            }
                            $ul.slideDown(300, function () {
                                $obj.addClass('open');
                            });
                        }
                        break;
                }
            });
        }
    };
    meuns.init();


    var companyMap = {};
    var departmentMap = {};
    var userMap = {};

    var sysUserMap = {};

    var imUserId = '';

    var getHeadImg = function (user) {
        var url = top.$.rootUrl;
        switch (user.img) {
            case '0':
                url += '/Content/images/head/on-girl.jpg';
                break;
            case '1':
                url += '/Content/images/head/on-boy.jpg';
                break;
            default:
                url += '/KR_OrganizationModule/User/GetImg?userId=' + user.id;
                break;
        }
        return url;
    };
   
    var getTime = function (time) {
        var d = new Date();
        var c = d.DateDiff('d', time);
        if (c <= 1) {
            return keren.formatDate(time, 'hh:mm:ss');
        }
        else {
            return keren.formatDate(time, 'yyyy/MM/dd');
        }
    }
};