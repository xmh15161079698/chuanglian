/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：区域管理	
 */
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var currentData = top.layer_Form.currentData;
    var dataItemCode = '';
    var dataSourceId = '';
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 数据来源设置
            $('#F_DataItemCode').krselect({
                allowSearch: true,
                maxHeight: 130,
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetClassifyTree',
                type: 'tree',
                select: function (item) {

                    if (!!item && item.id != -1) {
                        dataItemCode = item.value;
                        dataSourceId = item.id;
                    }
                    else {
                        dataItemCode = '';
                        dataSourceId = '';
                    }

                }
            });

            $('#F_DataSourceId').krformselect({
                placeholder: '请选择数据源项',
                layerUrl: top.$.rootUrl + '/KR_SystemModule/DataSource/SelectForm',
                layerUrlH: 500,
                layerUrlW: 800,
                dataUrl: top.$.rootUrl + '/KR_SystemModule/DataSource/GetNameByCode'
            });

            $('#F_RelationType').krselect({
                data: [{ "id": 0, "text": "无关联" }, { "id": 1, "text": "GUID" }, { "id": 2, "text": "数据字典" }, { "id": 3, "text": "数据来源" }, { "id": 4, "text": "固定数据" }, { "id": 5, "text": "登录者ID" }, { "id": 6, "text": "登录者名字" }, { "id": 7, "text": "导入时间" }],
                placeholder: false,
                maxHeight: 190,
                select: function (item) {
                    $('#F_DataItemCode').parent().hide();
                    $('#F_DataSourceId').parent().hide();
                    $('#F_Value').parent().hide();
                    if (item.id == 2) {
                        $('#F_DataItemCode').parent().show();
                    }
                    else if (item.id == 3) {
                        $('#F_DataSourceId').parent().show();
                    }
                    else if (item.id == 4) {
                        $('#F_Value').parent().show();
                    }
                }
            });
        },
        initData: function () {
            if (!!currentData) {
                if (currentData.F_RelationType == 2) {
                    dataItemCode = currentData.F_DataItemCode;
                    dataSourceId = currentData.F_DataSourceId;
                    $('#F_DataItemCode').krselectSet(dataSourceId);
                    currentData.F_DataSourceId = '';
                    currentData.F_DataItemCode = '';
                    $('#form').krSetFormData(currentData);
                    currentData.F_DataItemCode = dataItemCode;
                    currentData.F_DataSourceId = dataSourceId;
                }
                else{
                    $('#form').krSetFormData(currentData);
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        var formData = $('#form').krGetFormData();
        if (!!callBack) {
            if (formData.F_RelationType == 2) {
                formData.F_DataSourceId = dataSourceId;
                formData.F_DataItemCode = dataItemCode;
            }
            callBack(formData);
        }
        return true;
    };
    page.init();
}