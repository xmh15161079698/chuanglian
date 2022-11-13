﻿/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-10-24 14:57
 * 描  述：任务日志
 */
var selectedRow;
var refreshGirdData;
var dateBegin = '';
var dateEnd = '';
var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            $('#datesearch').krdate({
                dfdata: [
                    { name: '今天', begin: function () { return keren.getDate('yyyy-MM-dd 00:00:00') }, end: function () { return keren.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近7天', begin: function () { return keren.getDate('yyyy-MM-dd 00:00:00', 'd', -6) }, end: function () { return keren.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近1个月', begin: function () { return keren.getDate('yyyy-MM-dd 00:00:00', 'm', -1) }, end: function () { return keren.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近3个月', begin: function () { return keren.getDate('yyyy-MM-dd 00:00:00', 'm', -3) }, end: function () { return keren.getDate('yyyy-MM-dd 23:59:59') } }
                ],
                // 月
                mShow: false,
                premShow: false,
                // 季度
                jShow: false,
                prejShow: false,
                // 年
                ysShow: false,
                yxShow: false,
                preyShow: false,
                yShow: false,
                // 默认
                dfvalue: '1',
                selectfn: function (begin, end) {
                    dateBegin = begin;
                    dateEnd = end;
                    page.search();
                }
            });
            $('#multiple_condition_query').krMultipleQuery(function (queryJson) {
                queryJson.StartTime = dateBegin;
                queryJson.EndTime = dateEnd;
                $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(queryJson) });
            }, 160);
            // 执行状态
            $('#executeResult').krselect();
            // 刷新
            $('#kr_refresh').on('click', function () {
                location.reload();
            });
        },
        initGird: function () {
            $('#gridtable').krAuthorizeJfGrid({
                url: top.$.rootUrl + '/KR_TaskScheduling/TSLog/GetPageList',
                headData: [
                        { label: '任务名称', name: 'F_Name', width: 200, align: "left" },
                        {
                            label: "执行时间", name: "F_CreateDate", width: 135, align: "left",
                            formatter: function (cellvalue) {
                                return keren.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            label: "执行结果", name: "F_ExecuteResult", width: 70, align: "center",
                            formatter: function (cellvalue) {
                                if (cellvalue == '1') {
                                    return "<span class=\"label label-success\">成功</span>";
                                } else {
                                    return "<span class=\"label label-danger\">失败</span>";
                                }
                            }
                        },
                        { label: '执行内容', name: 'F_Des', width: 400, align: "left" }
                ],
                mainId: 'F_Id',
                sidx: 'F_CreateDate desc',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.StartTime = dateBegin;
            param.EndTime = dateEnd;
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
