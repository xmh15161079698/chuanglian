/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.17
 * 描 述：自定义查询
 */
var moduleId = request('moduleId');
var rowid = request('rowid');
var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    var fieldname = "";
    var conditionname = "";

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            $('#field').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/Module/GetColumnList',
                value: 'F_EnCode',
                text: 'F_FullName',
                title: 'F_FullName',
                param: { moduleId: moduleId },
                maxHeight: 140,
                allowSearch: true,
                select: function (item) {
                    fieldname = item.F_FullName;
                }
            });
            $('#condition').krselect({
                data: [{ value: 1, text: '等于' }, { value: 2, text: '不等于' }, { value: 3, text: '包含' }, { value: 4, text: '不包含' }],
                value: 'value',
                text: 'text',
                title: 'text',
                maxHeight: 130,
                select: function (item) {
                    conditionname = item.text;
                }
            }).krselectSet(1);


            $('#type').krselect({
                data: [{ value: 1, text: '文本' }, { value: 2, text: '当前账号' }, { value: 3, text: '当前公司' }, { value: 4, text: '当前部门' }, { value: 5, text: '当前岗位' }],
                value: 'value',
                text: 'text',
                title: 'text',
                maxHeight: 100,
                select: function (item) {
                    if (!!item) {
                        if (item.value == 1) {
                            $('#value').removeAttr('disabled');
                            $('#value').val('');
                        }
                        else {
                            $('#value').attr('disabled', 'disabled');
                            $('#value').val(item.text);
                        }
                    }
                    else {
                        $('#value').attr('disabled', 'disabled');
                        $('#value').val('');
                    }
                }
            }).krselectSet(1);
        },
        initData: function () {
            if (rowid != "") {
                var _data = top.layer_Form.queryDataList[rowid];
                $('#form').krSetFormData(_data);
            }
        }
    };

    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var data = $('#form').krGetFormData();
        data.fieldname = fieldname;
        data.conditionname = conditionname;
        if (!!callBack) {
            callBack("【" + fieldname + "】 " + conditionname + " " + data.value, data, rowid);
        }
        return true;
    }

    page.init();



}


