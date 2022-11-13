/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.18
 * 描 述：单据编号规则	
 */
var acceptClick;
var currentColRow = top.layer_Form.currentColRow;
var bootstrap = function ($, keren) {
    "use strict";

    var itemTypeName;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 前缀
            $('#itemType').krselect({
                select: function (item) {
                    if (!!item && item.id == "2") {
                        $('#stepValue').removeAttr('readonly');
                        $('#stepValue').attr('isvalid', 'yes');

                        $('#initValue').removeAttr('readonly');
                        $('#initValue').attr('isvalid', 'yes');
                    }
                    else {
                        $('#stepValue').attr('readonly', 'readonly');
                        $('#stepValue').attr('isvalid', 'no');
                        $('#stepValue').val('');
                        $('#stepValue').krRemoveValidMessage();

                        $('#initValue').attr('readonly', 'readonly');
                        $('#initValue').attr('isvalid', 'no');
                        $('#initValue').val('');
                        $('#initValue').krRemoveValidMessage();
                    }

                    var $formatStr = $('#formatStr');
                    $formatStr.krRemoveValidMessage();
                    var $parent = $formatStr.parent();
                    if (!!item) {
                        $formatStr.remove();
                        itemTypeName = item.text;
                        switch (item.id) {
                            case '0':
                                $parent.append('<input id="formatStr" type="text" class="form-control" isvalid="yes" checkexpession="NotNull" />');
                                break;
                            case '1':
                                $parent.append('<div id="formatStr" isvalid="yes" checkexpession="NotNull"><ul>'
                                + '<li data-value="mmdd">mmdd</li>'
                                + '<li data-value="ddmm">ddmm</li>'
                                + '<li data-value="mmyy">mmyy</li>'
                                + '<li data-value="yymm">yymm</li>'
                                + '<li data-value="yyyy">yyyy</li>'
                                + '<li data-value="yy">yy</li>'
                                + '<li data-value="yyyymm">yyyymm</li>'
                                + '<li data-value="yymmdd">yymmdd</li>'
                                + '<li data-value="yyyymmdd">yyyymmdd</li>'
                                + '</ul></div>');
                                $('#formatStr').krselect({ maxHeight: 145 });
                                break;
                            case '2':
                                $parent.append('<div id="formatStr" isvalid="yes" checkexpession="NotNull"><ul>'
                                + '<li data-value="000">000</li>'
                                + '<li data-value="0000">0000</li>'
                                + '<li data-value="00000">00000</li>'
                                + '<li data-value="000000">000000</li>'
                                + '</ul></div>');
                                $('#formatStr').krselect();
                                break;
                            case '3':
                                $parent.append('<div id="formatStr" isvalid="yes" checkexpession="NotNull"><ul>'
                                + '<li data-value="code">公司编号</li>'
                                + '<li data-value="name">公司名称</li>'
                                + '</ul></div>');
                                $('#formatStr').krselect();
                                break;
                            case '4':
                                $parent.append('<div id="formatStr" isvalid="yes" checkexpession="NotNull"><ul>'
                                + '<li data-value="code">部门编号</li>'
                                + '<li data-value="name">部门名称</li>'
                                + '</ul></div>');
                                $('#formatStr').krselect();
                                break;
                            case '5':
                                $parent.append('<div id="formatStr" isvalid="yes" checkexpession="NotNull"><ul>'
                                + '<li data-value="code">用户编号</li>'
                                + '<li data-value="name">用户名称</li>'
                                + '</ul></div>');
                                $('#formatStr').krselect();
                                break;
                        }
                    }
                }
            });
        },
        initData: function () {
            if (!!currentColRow) {
                $('#form').krSetFormData(currentColRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var data = $('#form').krGetFormData();
        data.itemTypeName = itemTypeName;
        if (!!callBack) { callBack(data); }
        return true;
    };
    page.init();
}