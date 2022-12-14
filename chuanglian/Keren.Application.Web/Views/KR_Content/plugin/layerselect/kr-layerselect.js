/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.09
 * 描 述：弹层选择控件
 */
(function ($, keren) {
    "use strict";

    $.krlayerselect = {
        init: function ($self) {
            var dfop = $self[0].dfop;
            $self.addClass('kr-layerselect');
            $self.attr('type', 'lrlayerselect');
            var $input = $('<span>' + dfop.placeholder + '</span><i class="fa ' + dfop.icon + '"></i><div class="clear-btn" >清空</div>');
            $self.on('click', $.krlayerselect.click);
            $self.html($input);
        },
        click: function (e) {
            var $self = $(this);
            var dfop = $self[0].dfop;
            var et = e.target || e.srcElement;
            var $et = $(et);
            if ($et.hasClass('clear-btn')) {
                dfop._itemValue = { value: "", text: dfop.placeholder };
                $self.removeClass('selected');
                $self.find('span').text(dfop._itemValue.text);
                if (!!dfop.select) {
                    dfop.select(dfop._itemValue);
                }
            }
            else {
                var value = dfop._itemValue ? dfop._itemValue.value : "";
                var _url = top.$.rootUrl + '/Utility/TreeSelectIndex?dfopid=' + dfop.id + '&selectValue=' + value;
                top.krlayerSelect = top.krlayerSelect || {};
                top.krlayerSelect[dfop.id] = dfop;

                keren.layerForm({
                    id: dfop.id,
                    title: dfop.placeholder,
                    url: _url,
                    width: 800,
                    height: 520,
                    maxmin: true,
                    callBack: function (id) {
                        return top[id].acceptClick($.krlayerselect.callback);
                    }
                });
            }
        },
        callback: function (data, id) {
            var $self = $('#' + id);
            var op = $self[0].dfop;
            var _value = [];
            var _text = [];
            $.each(data, function (_index, _item) {
                _value.push(_index);
                _text.push(_item);
            });
            if (op._value != String(_value)) {
                op.select && op.select(_value, _text);
            }
            op._value = String(_value);
            op._text = String(_text);

            if (op._value == '') {
                op._text = '';
                $self.removeClass('selected');
                $self.find('span').text(op.placeholder);
            }
            else {
                $self.addClass('selected');
                $self.find('span').text(op._text);
            }
        }
    };
    $.fn.krlayerselect = function (op) {
        var dfop = {
            placeholder: "请选择",
            icon: 'fa-plus',

            treeCode: '',
            treeUrl: '',
            treeParentId: '',
            treeValueId: '',
            treeTextId: '',

            dataCode: '',
            dataUrl: '',
            dataTreeId: '',
            dataValueId:'',
            dataTextId:'',

            grid: [],

            isMultiple: true,

            select: false,  // 选择事件

            _value: '',
            _text:'',
        };

        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        if (!!$self[0].dfop) {
            return $self;
        }

        $self[0].dfop = dfop

        $.krlayerselect.init($self);
        return $self;
    };

    $.fn.krlayerselectGet = function () {
        var $self = $(this);
        return $self[0].dfop._value;
    };
    $.fn.krlayerselectSet = function (value) {
        var $self = $(this);
        var op = $self[0].dfop;
        if (value == '') {
            op._value = '';
            op._text = '';
            $self.removeClass('selected');
            $self.find('span').text(dfop.placeholder);

            op.select && op.select([],[]);
            return;
        }
        if (value != undefined && value != null) {
            op._value = value;
            var values = value.split(',');
            var valueMap = {};
            $.each(values, function (_index,_item) {
                valueMap[_item] = '1';
            });

            keren.clientdata.getAllAsync('sourceData', {
                code: op.dataCode,
                callback: function (_data) {
                    var _text = [];
                    $.each(_data, function (_index, _item) {
                        if (valueMap[_item[op.dataValueId]]) {
                            _text.push(_item[op.dataTextId]);
                        }
                    });
                    op._text = String(_text);
                    op.select && op.select(values, _text);

                    $self.addClass('selected');
                    $self.find('span').text(op._text);
                }
            });
        }
    };


})(window.jQuery, top.keren);
