/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：kerenISearch 输入搜索框，支持input输入框，数据异步加载，本地查询
 */
(function ($, keren) {
    "use strict";
    $.krcustmerquery = {
        init: function ($self) {
            var dfop = $self[0]._lrcustmerquery.dfop;
            $self.parent().append('<div class="keren-isearch-panel"  style="max-height:' + dfop.maxHeight + 'px;" ><ul id="kerenisearch_' + dfop.id + '" ></ul></div>');
        },
        bind: function ($self) {
            $self.on('input propertychange', function () {
                var $this = $(this);
                $.kerenisearch.triggerSearch($self);
            });
        },
        triggerSearch: function ($self) {
            var dfop = $self[0]._lrcustmerquery.dfop;
            var $showPanel = $('#kerenisearch_' + dfop.id);
            $showPanel.parent().hide();
            var _value = $self.val();
            if (_value) {
                if (!dfop._isload) {
                    dfop._isSearchneed = true;
                }
                else {
                    dfop._first = true;
                    dfop._value = _value;
                    dfop._begin = 0;
                    dfop._end = 100 > dfop.data.length ? dfop.data.length : 100;
                    if (dfop._isSearched) {
                        dfop._isSearched = false;
                        setTimeout(function () {
                            $.kerenisearch.search($self);
                        });
                    }
                }
            }
            else {
                dfop._isSearchneed = false;
                $showPanel.html("");
            }
        },

        search: function ($self) {// 每次搜索100条
            var dfop = $self[0]._lrcustmerquery.dfop;
            var value = dfop._value;
            var begin = dfop._begin;
            var end = dfop._end;
            var data = dfop.data;

            for (var i = begin; i < end; i++) {
                var _item = data[i];
                if (item[dfop.text].indexOf(value) != -1) {
                    $.kerenisearch.renderNone($self, item[dfop.text]);
                }
            }

            if (end < data.length) {
                dfop._begin = end;
                dfop._end = end + 100;
                if (dfop._end > data.length) {
                    dfop._end = data.length;
                }
                setTimeout(function () {
                    $.kerenisearch.search($self);
                });
            }
            else {
                dfop._isSearched = true;
            }
        },
        renderNone: function ($self, text) {// 刷新一条数据
            var dfop = $self[0]._lrcustmerquery.dfop;
            var $showPanel = $('#kerenisearch_' + dfop.id);
            if (dfop._first) {
                dfop._first = false;
                $showPanel.html("");
                $showPanel.parent().show();
            }
            $showPanel.append('<li>' + text + '</li>');
        }
    };

    $.fn.krcustmerquery = function (op) {
        var dfop = {
            // 默认查询条件项;[{fields:[{name:'',value:'',condition:''}],Formula:'',name:''}]
            dfData: [],
            // 字段列表[{name:'',value:''}]
            Fields: [],
            // 所属功能地址url
            moduleUrl: '',
            // 加载自定义查询地址
            url: top.$.rootUrl + '/KR_SystemModule/CustmerQuery/GetList',
            // 自定义查询数据
            data: [],


            // 标记性参数
            _isload:false
        };
        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        $self[0]._lrcustmerquery = { "dfop": dfop };

        $.krcustmerquery.init($self);
        //加载数据
        if (!!dfop.url) {
            keren.httpAsync('GET', dfop.url, dfop.param, function (data) {
                $self[0]._lrcustmerquery.dfop.data = data || [];
                dfop._isload = true;
            });
        }
        return $self;
    };
})(jQuery, top.keren);
