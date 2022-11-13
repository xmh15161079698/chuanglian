﻿/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：自定义查询
 */
var tableName = request('tableName');
var databaseLinkId = request('databaseLinkId');

var bootstrap = function ($, keren) {
    "use strict";
   
    var fieldData;

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            //获取字段数据
            keren.httpAsync('GET', top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetFieldList', { databaseLinkId: databaseLinkId, tableName: tableName }, function (data) {
                fieldData = data;
                $('#field').krselectRefresh({
                    data: fieldData
                });
                var headData = [];

                for (var i = 0, l = data.length; i < l; i++) {
                    var item = data[i];
                    var point = { label: item.f_remark, name: item.f_column.toLowerCase(), width: 150, align: "left" };
                    headData.push(point);
                }
                $('#gridtable').jfGrid({
                    url: top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetTableDataList',
                    headData: headData,
                    isPage: true
                });
                page.search();
            });

            // 功能选择
            $('#field').krselect({
                title: 'f_column',
                text: 'f_remark',
                value:'f_column',
                maxHeight: 300,
                allowSearch: true
            });

            $('#logic').krselect({
                maxHeight: 300
            });

            // 查询
            $('#btn_Search').on('click', function () {
                page.search();
            });
        },
        search: function () {
            var param = {};
            param.databaseLinkId = databaseLinkId;
            param.tableName = tableName;

            param.field = $('#field').krselectGet();
            param.logic = $('#logic').krselectGet();

            param.keyword = $('#keyword').val();

            $('#gridtable').jfGridSet('reload', param);
        }
    };

    page.init();
}


