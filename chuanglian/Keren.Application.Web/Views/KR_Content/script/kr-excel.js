/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：excel 导入导出
 */
(function ($, keren) {
    "use strict";
    $(function () {
        function excelInit() {
            if (!!lrModule) {
                // 导入
                keren.httpAsync('GET', top.$.rootUrl + '/KR_SystemModule/ExcelImport/GetList', { moduleId: lrModule.F_ModuleId }, function (data) {
                    if (!!data && data.length > 0) {
                        var $layouttool = $('.kr-layout-tool-right');
                        var $btnGroup = $('<div class=" btn-group btn-group-sm"></div>');
                        var hasBtn = false;
                        $.each(data, function (id, item) {
                            if (!!lrModuleButtonList[item.F_ModuleBtnId]) {
                                hasBtn = true;
                                var $btn = $('<a id="' + item.F_ModuleBtnId + '" data-value="' + item.F_Id + '"  class="btn btn-default"><i class="fa fa-sign-in"></i>&nbsp;' + item.F_BtnName + '</a>')
                                $btn.on('click', function () {
                                    var id = $(this).attr('data-value');
                                    var text = $(this).text();
                                    keren.layerForm({
                                        id: 'ImportForm',
                                        title: text,
                                        url: top.$.rootUrl + '/KR_SystemModule/ExcelImport/ImportForm?id=' + id,
                                        width: 600,
                                        height: 400,
                                        maxmin: true,
                                        btn: null
                                    });
                                });
                                $btnGroup.append($btn);
                            }
                        });
                        $layouttool.append($btnGroup);
                    }
                });
                // 导出
                keren.httpAsync('GET', top.$.rootUrl + '/KR_SystemModule/ExcelExport/GetList', { moduleId: lrModule.F_ModuleId }, function (data) {
                    if (data && data.length > 0) {
                        var $layouttool = $('.kr-layout-tool-right');
                        var $btnGroup = $('<div class=" btn-group btn-group-sm"></div>');
                        var hasBtn = false;
                        $.each(data, function (id, item) {
                            if (!!lrModuleButtonList[item.F_ModuleBtnId]) {
                                hasBtn = true;
                                var $btn = $('<a id="' + item.F_ModuleBtnId + '" class="btn btn-default"><i class="fa fa-sign-out"></i>&nbsp;' + item.F_BtnName + '</a>')
                                $btn[0].dfop = item;
                                $btn.on('click', function () {
                                    item = $btn[0].dfop;
                                    keren.layerForm({
                                        id: "ExcelExportForm",
                                        title: '导出Excel数据',
                                        url: top.$.rootUrl + '/Utility/ExcelExportForm?gridId=' + item.F_GridId + '&filename=' + encodeURI(encodeURI(item.F_Name)),
                                        width: 500,
                                        height: 380,
                                        callBack: function (id) {
                                            return top[id].acceptClick();
                                        },
                                        btn: ['导出Excel', '关闭']
                                    });
                                });
                                $btnGroup.append($btn);
                            }
                        });
                        $layouttool.append($btnGroup);
                    }
                });
            }
            else {
                if (lrModule == undefined) {
                    setTimeout(excelInit, 100);
                }
            }
        }
        excelInit();
    });

})(window.jQuery, top.keren);
