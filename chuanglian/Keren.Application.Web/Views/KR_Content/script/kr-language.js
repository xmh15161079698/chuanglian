/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.10
 * 描 述：客户端语言包加载（菜单，tab条）
 */
(function ($, keren) {
    "use strict";

    var type = 'no';
    var lgTypeList = {};
    var mainType = null;

    var isRead = {};

    var lgData = {};

    var storage = {
        get: function (name) {
            if (localStorage) {
                return JSON.parse(localStorage.getItem('krlg_' + name)) || {};
            }
            else {
                return lgData[name] || {};
            }
        },
        set: function (name, data) {
            if (localStorage) {
                localStorage.setItem('krlg_' + name, JSON.stringify(data));
            }
            else {
                lgData[name] = data;
            }
        }
    };
    keren.language = {
        getMainCode: function () {
            return mainType;
        },
        get: function (text, callback) {
            // 判断当前客户端的语言版本
            if (type != mainType) {
                // 判断当前语言包是否加载完成
                if (isRead[type] && isRead[mainType]) {
                    var mdata = storage.get(mainType);
                    var cdata = storage.get(type);

                    callback(cdata.data[mdata.data[text]] || text);
                }
                else {
                    setTimeout(function () {
                        keren.language.get(text, callback);
                    }, 200);
                }
            }
            else {
                callback(text);
            }
        },
        getSyn: function (text) {
            // 判断当前客户端的语言版本
            if (type != mainType) {
                var mdata = storage.get(mainType);
                var cdata = storage.get(type);
                return cdata.data[mdata.data[text]] || text;
            }
            else {
                return text;
            }
        }
    };
    $(function () {
        type = top.$.cookie('Learn_ADMS_V7_Language') || 'no';

        var $setting = $('#kr_lg_setting');
        if (type == 'no') {
            $setting.find('span').text('简体中文');
        }

        $setting.on('click', 'li>a', function () {
            var code = $(this).attr('data-value');
            top.$.cookie('Learn_ADMS_V7_Language', code, { path: "/" });
            location.reload();
        });

        // 获取当前语言类型
        keren.httpAsyncGet(top.$.rootUrl + '/KR_LGManager/LGType/GetList', function (res) {
            if (res.code == 200) {
                var $ul = $setting.find('ul');

                $.each(res.data, function (_index, _item) {
                    lgTypeList[_item.F_Code] = _item.F_Name;
                    if (_item.F_IsMain == 1) {
                        mainType = _item.F_Code;
                        if (type == 'no') {
                            type = mainType;
                            top.$.cookie('Learn_ADMS_V7_Language', type, { path: "/" });
                        }
                    }
                    isRead[_item.F_Code] = false;

                    var html = '<li><a href="javascript:void(0);" data-value="' + _item.F_Code + '" >' + _item.F_Name + '</a></li>';
                    $ul.append(html);
                });
                $setting.find('span').text(lgTypeList[type]);


                // 开始加载语言包,如果当前设置的语言不是主语言的话

                if (type != mainType) {
                    // 加载主语言包和当前设置的语言包
                    var mlgdata = storage.get(mainType);
                    var lgdata = storage.get(type);

                    keren.httpAsyncGet(top.$.rootUrl + '/KR_LGManager/LGMap/GetLanguageByCode?typeCode=' + mainType + '&ver=' + mlgdata.ver + '&isMain=true', function (res) {
                        if (res.code == 200) {
                            if (res.info != 'no update') {
                                storage.set(mainType, res.data);
                            }
                        }
                        isRead[mainType] = true;
                    });

                    keren.httpAsyncGet(top.$.rootUrl + '/KR_LGManager/LGMap/GetLanguageByCode?typeCode=' + type + '&ver=' + lgdata.ver + '&isMain=false', function (res) {
                        if (res.code == 200) {
                            if (res.info != 'no update') {
                                storage.set(type, res.data);
                            }
                        }
                        isRead[type] = true;
                    });

                }
            }
        });
    });

    

})(window.jQuery, top.keren);
