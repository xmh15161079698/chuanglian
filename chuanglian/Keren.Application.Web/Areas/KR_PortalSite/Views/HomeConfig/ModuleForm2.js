﻿/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2019-01-03 09:35
 * 描  述：设置模块2
 */
var sort = request('sort');
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var keyValue = '';
    var categoryId = '';
    var currentList = [];
    var currentMap = {};

    var currentModule = keren.frameTab.currentIframe().currentModule;

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 比例选择
            $('#prop').krselect({
                data: [{ id: '0.5', text: '1/2' }, { id: '0.333333', text: '1/3' }, { id: '0.66666', text: '2/3' }, { id: '1', text: '1' }],
                placeholder:false
            }).krselectSet('1');

            // 页面选择
            $('#F_Url').krselect({
                text: 'F_Title',
                value: 'F_Id',
                url: top.$.rootUrl + '/KR_PortalSite/Page/GetList',
                allowSearch: true
            });

            $('#F_Category').krDataItemSelect({ code: 'PortalSiteType' });
            $('#F_Category').on('change', function () {
                var v = $(this).krselectGet();
                categoryId = v;
                page.search();
            });
            $('#select_grid').jfGrid({
                url: top.$.rootUrl + '/KR_PortalSite/Article/GetPageList',
                headData: [
                    { label: '标题', name: 'F_Title', width: 330, align: "left" },
                    {
                        label: "分类", name: "F_Category", width: 100, align: "center",
                        formatterAsync: function (callback, value, row) {
                            keren.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'PortalSiteType',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    {
                        label: '发布时间', name: 'F_PushDate', width: 80, align: "center",
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    }
                ],
                mainId: 'F_Id',
                isPage: true,
                isMultiselect: true,
                multiselectfield: 'isCheck',
                sidx: 'F_PushDate desc',
                onRenderBefore: function (datas) {
                    $.each(datas, function (_index, _item) {
                        if (currentMap[_item.F_Id]) {
                            _item.isCheck = 1;
                        }
                    });
                },
                onSelectRow: function (row, isCheck) {
                    if (isCheck) {
                        var _row = { F_Id: row.F_Id, F_Title: row.F_Title, F_Category: row.F_Category, F_PushDate: row.F_PushDate };
                        $('#selected_grid').jfGridSet('addRow', _row);
                        currentMap[row.F_Id] = true;

                    } else {
                        $('#selected_grid').jfGridSet('removeRow', row.F_Id);
                        currentMap[row.F_Id] = false;
                    }
                }
            });

            $('#selected_grid').jfGrid({
                headData: [
                    {
                        label: "", name: "btn", width: 60, align: "center",
                        formatter: function (value, row, op, $cell) {
                            $cell.on('click', function () {
                                $('#selected_grid').jfGridSet('removeRow', row.F_Id);
                                $('#select_grid').jfGridSet('nocheck', row.F_Id);
                                currentMap[row.F_Id] = false;
                                return false;
                            });
                            return '<span class=\"label label-danger \" style=\"cursor: pointer;\">移除</span>';
                        }
                    },
                    { label: '标题', name: 'F_Title', width: 300, align: "left" },
                    {
                        label: "分类", name: "F_Category", width: 100, align: "center",
                        formatterAsync: function (callback, value, row) {
                            keren.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'PortalSiteType',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    {
                        label: '发布时间', name: 'F_PushDate', width: 80, align: "center",
                        formatter: function (cellvalue) {
                            return keren.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    }
                ],
                mainId: 'F_Id'
            });

            $('#left_list').on('click', '.left-list-item', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $this.parent().find('.active').removeClass('active');
                    $this.addClass('active');

                    $('#txt_Keyword').val('');

                    currentList = $this[0].data;
                    currentMap = {};
                    $.each(currentList, function (_index, _item) {
                        currentMap[_item.F_Id] = true;
                    });

                    // 加载已经选择文章数据
                    $('#selected_grid').jfGridSet('refreshdata', currentList);

                    page.search();

                }
            });

            // 查询
            $('#btn_Search').on('click', function () {
                var queryJson = {};
                var keyword = $('#txt_Keyword').val();
                queryJson.F_Category = categoryId;
                queryJson.F_Title = keyword;
                $('#select_grid').jfGridSet('reload', { queryJson: JSON.stringify(queryJson) });
            });
        },
        search: function (param) {
            param = param || {};
            param.F_Category = categoryId;
            $('#select_grid').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        },
        initData: function () {
            if (currentModule) {
                var schemeObj = JSON.parse(currentModule.F_Scheme);
                keyValue = currentModule.F_Id;
                currentModule.prop = schemeObj.prop;
                $('#form1').krSetFormData(currentModule);
               
                $('#list1')[0].data = schemeObj.list1;
                $('#list2')[0].data = schemeObj.list2;


                $('#list1').trigger('click');
            }
            else {
                $('#list1')[0].data = [];
                $('#list2')[0].data = [];

                $('#list1').trigger('click');
            }
        }
    };

    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form1').krValidform()) {
            return false;
        }
        var formData = $('#form1').krGetFormData(keyValue);

        var list1 = $('#list1')[0].data;
        var list2 = $('#list2')[0].data;

        var postData = {
            F_Name: formData.F_Name,
            F_Type: 9,
            F_UrlType: 1,
            F_Url: formData.F_Url,
            F_Scheme: JSON.stringify({ list1: list1, list2: list2, prop: formData.prop, type: "2" }),
            F_Sort: sort
        };

        $.krSaveForm(top.$.rootUrl + '/KR_PortalSite/HomeConfig/SaveForm?keyValue=' + keyValue, postData, function (res) {
            postData.F_Id = res.data;
            callBack && callBack(postData);
        });
    };
    page.init();
}
