/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.11.11
 * 描 述：报表管理
 */
var keyValue = '';
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 加载导向
            $('#wizard').wizard().on('change', function (e, data) {
                var $finish = $("#btn_finish");
                var $next = $("#btn_next");
                if (data.direction == "next") {
                    if (data.step == 1) {
                        if (!$('#step-1').krValidform()) {
                            return false;
                        }
                        $finish.removeAttr('disabled');
                        $next.attr('disabled', 'disabled');
                    }
                } else {
                    $finish.attr('disabled', 'disabled');
                    $next.removeAttr('disabled');
                }
            });
            // 选择图标
            $('#selectIcon').on('click', function () {
                keren.layerForm({
                    id: 'iconForm',
                    title: '选择图标',
                    url: top.$.rootUrl + '/Utility/Icon',
                    height: 700,
                    width: 1000,
                    btn: null,
                    maxmin: true,
                    end: function () {
                        if (top._kerenSelectIcon != '') {
                            $('#F_Icon').val(top._kerenSelectIcon);
                        }
                    }
                });
            });
            //数据库
            $('#F_DataSourceId').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/DatabaseLink/GetTreeList',
                type: 'tree',
                placeholder: '请选择数据库',
            });

            //完成事件
            $("#btn_finish").click(function () {
                if (!$('#wizard-steps').krValidform()) {
                    return false;
                }
                var postData = $('#wizard-steps').krGetFormData(keyValue);

                $.krSaveForm(top.$.rootUrl + '/KR_Desktop/DTList/SaveForm?keyValue=' + keyValue, postData, function (res) {
                    keren.frameTab.currentIframe().refreshGirdData();
                });
            })
        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_Id;
                $('#wizard-steps').krSetFormData(selectedRow);
            }
        }
    };
    page.init();
}


