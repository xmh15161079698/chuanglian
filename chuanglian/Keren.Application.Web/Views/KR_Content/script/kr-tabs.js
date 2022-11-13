/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：tab窗口操作方法
 */
(function ($, keren) {
    "use strict";
    //初始化菜单和tab页的属性Id
    var iframeIdList = {};

    keren.frameTab = {
        iframeId: '',
        init: function () {
            keren.frameTab.bind();
        },
        bind: function () {
            $(".kr-frame-tabs-wrap").krscroll();
        },
        setCurrentIframeId: function (iframeId) {
            keren.iframeId = iframeId;
        },
        open: function (module, notAllowClosed) {
            var $tabsUl = $('#kr_frame_tabs_ul');
            var $frameMain = $('#kr_frame_main');

            if (iframeIdList[module.F_ModuleId] == undefined || iframeIdList[module.F_ModuleId] == null) {
                // 隐藏之前的tab和窗口
                if (keren.frameTab.iframeId != '') {
                    $tabsUl.find('#kr_tab_' + keren.frameTab.iframeId).removeClass('active');
                    $frameMain.find('#kr_iframe_' + keren.frameTab.iframeId).removeClass('active');
                    iframeIdList[keren.frameTab.iframeId] = 0;
                }
                var parentId = keren.frameTab.iframeId;
                keren.frameTab.iframeId = module.F_ModuleId;
                iframeIdList[keren.frameTab.iframeId] = 1;

                // 打开一个功能模块tab_iframe页面
                var $tabItem = $('<li class="kr-frame-tabItem active" id="kr_tab_' + module.F_ModuleId + '" parent-id="' + parentId + '"  ><span>' + module.F_FullName + '</span></li>');
                // 翻译
                keren.language.get(module.F_FullName, function (text) {
                    $tabItem.find('span').text(text);
                    if (!notAllowClosed) {
                        $tabItem.append('<span class="reomve" title="关闭窗口"></span>');
                    }
                });


                var _url = module.F_UrlAddress;
                if (_url.indexOf('http://') == -1 && _url.indexOf('https://') == -1) {
                    _url = $.rootUrl + module.F_UrlAddress;
                }


                
                var $iframe = $('<iframe class="kr-frame-iframe active" id="kr_iframe_' + module.F_ModuleId + '" frameborder="0" src="' + _url + '"></iframe>');
                $tabsUl.append($tabItem);
                $frameMain.append($iframe);

                var w = 0;
                var width = $tabsUl.children().each(function () {
                    w += $(this).outerWidth();
                });
                $tabsUl.css({ 'width': w });
                $tabsUl.parent().css({ 'width': w });


                $(".kr-frame-tabs-wrap").krscrollSet('moveRight');

             

                //绑定一个点击事件
                $tabItem.on('click', function () {
                    var id = $(this).attr('id').replace('kr_tab_', '');
                    keren.frameTab.focus(id);
                });
                $tabItem.find('.reomve').on('click', function () {
                    var id = $(this).parent().attr('id').replace('kr_tab_', '');
                    keren.frameTab.close(id);
                    return false;
                });

                if (!!keren.frameTab.opencallback) {
                    keren.frameTab.opencallback();
                }
                if (!notAllowClosed) {
                    var loginInfo = keren.clientdata.get(['userinfo']);
                    var account = '';
                    if (loginInfo) {
                        account = loginInfo.account;
                    }

                    $.ajax({
                        url: top.$.rootUrl + "/Home/VisitModule",
                        headers: { account: account },
                        data: { moduleName: module.F_FullName, moduleUrl: module.F_UrlAddress },
                        type: "post",
                        dataType: "json",
                        success: function (res) {
                            if (res.code == keren.httpCode.nologin) {
                                var _topUrl = top.$.rootUrl + '/Login/Index';
                                switch (res.info) {
                                    case 'nologin':
                                        break;
                                    case 'noip':
                                        _topUrl += '?error=ip';
                                        break;
                                    case 'notime':
                                        _topUrl += '?error=time';
                                        break;
                                    case 'other':
                                        _topUrl += '?error=other';
                                        break;
                                }
                                top.window.location.href = _topUrl;
                                return;
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            top.window.location.href = top.$.rootUrl + '/Login/Index';
                        },
                        beforeSend: function () {
                        },
                        complete: function () {
                        }
                    });
                }
            }
            else {
                keren.frameTab.focus(module.F_ModuleId);
            }
        },
        focus: function (moduleId) {
            if (iframeIdList[moduleId] == 0) {
                // 定位焦点tab页
                $('#kr_tab_' + keren.frameTab.iframeId).removeClass('active');
                $('#kr_iframe_' + keren.frameTab.iframeId).removeClass('active');
                iframeIdList[keren.frameTab.iframeId] = 0;

                $('#kr_tab_' + moduleId).addClass('active');
                $('#kr_iframe_' + moduleId).addClass('active');
                keren.frameTab.iframeId = moduleId;
                iframeIdList[moduleId] = 1;

                if (!!keren.frameTab.opencallback) {
                    keren.frameTab.opencallback();
                }
            }
        },
        leaveFocus: function () {
            $('#kr_tab_' + keren.frameTab.iframeId).removeClass('active');
            $('#kr_iframe_' + keren.frameTab.iframeId).removeClass('active');
            iframeIdList[keren.frameTab.iframeId] = 0;
            keren.frameTab.iframeId = '';
        },
        close: function (moduleId) {
            delete iframeIdList[moduleId];

            var $this = $('#kr_tab_' + moduleId);
            var $prev = $this.prev();// 获取它的上一个节点数据;
            if ($prev.length < 1) {
                $prev = $this.next();
            }
            $this.remove();
            $('#kr_iframe_' + moduleId).remove();
            if (moduleId == keren.frameTab.iframeId && $prev.length > 0) {
                var prevId = $prev.attr('id').replace('kr_tab_', '');

                $prev.addClass('active');
                $('#kr_iframe_' + prevId).addClass('active');
                keren.frameTab.iframeId = prevId;
                iframeIdList[prevId] = 1;
            }
            else {
                if ($prev.length < 1) {
                    keren.frameTab.iframeId = "";
                }
            }

            var $tabsUl = $('#kr_frame_tabs_ul');
            var w = 0;
            var width = $tabsUl.children().each(function () {
                w += $(this).outerWidth();
            });
            $tabsUl.css({ 'width': w });
            $tabsUl.parent().css({ 'width': w });

            if (!!keren.frameTab.closecallback) {
                keren.frameTab.closecallback();
            }
        }
        // 获取当前窗口
        ,currentIframe: function () {
            var ifameId = 'kr_iframe_' + keren.frameTab.iframeId;
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        ,parentIframe: function () {
            var ifameId = 'kr_iframe_' + top.$('#kr_tab_'+keren.frameTab.iframeId).attr('parent-id');
            if (top.frames[ifameId].contentWindow != undefined) {
                return top.frames[ifameId].contentWindow;
            }
            else {
                return top.frames[ifameId];
            }
        }
        , wfFormIframe: function () { 
            var currentIframe = keren.frameTab.currentIframe();
            var iframeId = currentIframe.$('#form_list_iframes .form-list-iframe.active').attr('id');
            return keren.iframe(iframeId, currentIframe.frames);
        }
        , closeByParam: function (name, value) {
            $('#kr_frame_tabs_ul li').each(function () {
                var id = $(this).attr('id').replace('kr_tab_', '');
                
                var frameObj = top.frames[ 'kr_iframe_' + id];
                if (frameObj.contentWindow != undefined) {
                    frameObj = frameObj.contentWindow;
                }
                if (frameObj[name] == value) {
                    keren.frameTab.close(id);
                    return false;
                }
            });
        }
        , opencallback: false
        , closecallback: false
    };

    keren.frameTab.init();
})(window.jQuery, top.keren);
