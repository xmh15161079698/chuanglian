/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：数据列表选择	
 */
var dfopid = request('dfopid');
var acceptClick;

var bootstrap = function ($, keren) {
    "use strict";
    var selectItem;

    function loadData(_dfop) {
        if (_dfop._loaded) {
            $('#gridtable').jfGridSet('refreshdata', _dfop._data);
        }
        else {
            setTimeout(function () {
                loadData(_dfop);
            }, 100);
        }
    }

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            var dfop = top.krGirdSelect[dfopid];
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                if (dfop._loaded) {
                    if (!!keyword) {
                        var _data = [];
                        $.each(dfop._data, function (id, item) {
                            if (item[dfop.selectWord].indexOf(keyword) != -1) {
                                _data.push(item);
                            }
                        });
                        $('#gridtable').jfGridSet('refreshdata', _data);
                    }
                    else {
                        $('#gridtable').jfGridSet('refreshdata', dfop._data);
                    }
                }
            });
            $('#gridtable').jfGrid({
                headData: dfop.headData,
                mainId: 'F_Id',
                onSelectRow: function (row) {
                    selectItem = row;
                }
            });
            loadData(dfop);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        callBack(selectItem, dfopid);
        return true;
    };
    page.init();
}