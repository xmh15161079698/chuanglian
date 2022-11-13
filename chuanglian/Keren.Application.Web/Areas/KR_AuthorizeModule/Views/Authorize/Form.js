
/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.05
 * 描 述：功能模块	
 */
var objectId = request('objectId');
var objectType = request('objectType');

var bootstrap = function ($, keren) {
    "use strict";

    var selectData;

    var treeData;
    var checkModuleIds = [];

    function setTreeData1() {
        if (!!selectData) {
            setTimeout(function () {
                $('#step-1').krtreeSet('setCheck', selectData.modules);
            });
        }
        else {
            setTimeout(setTreeData1,100);
        }
    }
    function setTreeData2() {
        if (!!selectData) {
            setTimeout(function () {
                $('#step-2').krtreeSet('setCheck', selectData.buttons);
            });
        }
        else {
            setTimeout(setTreeData2, 100);
        }
    }
    function setTreeData3() {
        if (!!selectData) {
            setTimeout(function () {
                $('#step-3').krtreeSet('setCheck', selectData.columns);
            });
        }
        else {
            setTimeout(setTreeData3, 100);
        }
    }
    function setTreeData4() {
        if (!!selectData) {
            setTimeout(function () {
                $('#step-4').krtreeSet('setCheck', selectData.forms);
            });
            
        }
        else {
            setTimeout(setTreeData4, 100);
        }
    }

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            keren.loading(true, '正在获取数据');
            keren.httpAsyncGet(top.$.rootUrl + '/KR_SystemModule/Module/GetCheckTree', function (res) {
                if (res.code == 200) {
                    treeData = res.data;
                    $('#step-1').krtree({
                        data: treeData.moduleList
                    });
                    $('#step-2').krtree({
                        data: treeData.buttonList
                    });
                    $('#step-3').krtree({
                        data: treeData.columnList
                    });
                    $('#step-4').krtree({
                        data: treeData.formList
                    });
                    if (!!objectId) {
                        setTreeData1();
                        setTreeData2();
                        setTreeData3();
                        setTreeData4();
                    }
                }
                setTimeout(function () {
                    keren.loading(false);
                });
            });
            // 加载导向
            $('#wizard').wizard().on('change', function (e, data) {
                var $finish = $("#btn_finish");
                var $next = $("#btn_next");
                if (data.direction == "next") {
                    if (data.step == 1) {
                        checkModuleIds = $('#step-1').krtreeSet('getCheckNodeIds');
                        $('#step-2 .kr-tree-root [id$="_keren_moduleId"]').parent().hide();
                        $('#step-3 .kr-tree-root [id$="_keren_moduleId"]').parent().hide();
                        $('#step-4 .kr-tree-root [id$="_keren_moduleId"]').parent().hide();
                        $.each(checkModuleIds, function (id, item) {
                            $('#step-2_' + item.replace(/-/g, '_') + '_keren_moduleId').parent().show();
                            $('#step-3_' + item.replace(/-/g, '_') + '_keren_moduleId').parent().show();
                            $('#step-4_' + item.replace(/-/g, '_') + '_keren_moduleId').parent().show();
                        });
                    } else if (data.step == 3) {
                       
                        $finish.removeAttr('disabled');
                        $next.attr('disabled', 'disabled');
                    } else {
                        $finish.attr('disabled', 'disabled');
                    }
                } else {
                    $finish.attr('disabled', 'disabled');
                    $next.removeAttr('disabled');
                }
            });
            // 保存数据按钮
            $("#btn_finish").on('click', page.save);
        },
        /*初始化数据*/
        initData: function () {
            if (!!objectId) {
                keren.httpAsyncGet(top.$.rootUrl + '/KR_AuthorizeModule/Authorize/GetFormData?objectId=' + objectId, function (res) {//
                    if (res.code == 200) {
                        selectData = res.data;
                    }
                    else {
                        selectData = [];
                    }
                });
            }
        },
        /*保存数据*/
        save: function () {
            var buttonList = [], columnList = [],formList = [];
            var checkButtonIds = $('#step-2').krtreeSet('getCheckNodeIds');
            var checkColumnIds = $('#step-3').krtreeSet('getCheckNodeIds');
            var checkFormIds = $('#step-4').krtreeSet('getCheckNodeIds');


            $.each(checkButtonIds, function (id, item) {
                if (item.indexOf('_keren_moduleId') == -1) {
                    buttonList.push(item);
                }
            });
            $.each(checkColumnIds, function (id, item) {
                if (item.indexOf('_keren_moduleId') == -1) {
                    columnList.push(item);
                }
            });
            $.each(checkFormIds, function (id, item) {
                if (item.indexOf('_keren_moduleId') == -1) {
                    formList.push(item);
                }
            });


            var postData = {
                objectId: objectId,
                objectType: objectType,
                strModuleId: String(checkModuleIds),
                strModuleButtonId: String(buttonList),
                strModuleColumnId: String(columnList),
                strModuleFormId: String(formList)
            };

            $.krSaveForm(top.$.rootUrl + '/KR_AuthorizeModule/Authorize/SaveForm', postData, function (res) {});
        }
    };

    page.init();
}