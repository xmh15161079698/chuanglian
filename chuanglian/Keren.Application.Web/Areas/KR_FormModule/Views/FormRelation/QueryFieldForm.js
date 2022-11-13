/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.11
 * 描 述：查询条件字段添加	
 */
var id = request('id');

var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";
    var formscheme = top.layer_Form.formscheme;
    var formFields = top.layer_Form.formFields;
    var queryData = top.layer_Form.queryData;


    var fieldName = '';

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            var formFields2 = [];
            $.each(formFields, function (id, item) {
                if (item.type != 'label' && item.type != 'datetime' && item.type != 'upload' && item.type != 'currentInfo') {
                    formFields2.push(item);
                }
            });

            $('#fieldId').krselect({
                text: 'title',
                data: formFields2,
                allowSearch: true,
                maxHeight: 140,
                select: function (item) {
                    fieldName = item.title;
                }
            });
            // 所在行所占比
            $('#portion').krselect({
                data: [
                    {
                        id: '1', text: '1'
                    },
                    {
                        id: '2', text: '1/2'
                    },
                    {
                        id: '3', text: '1/3'
                    },
                    {
                        id: '4', text: '1/4'
                    },
                    {
                        id: '6', text: '1/6'
                    }
                ],
                placeholder: false,
                value: 'id',
                text: 'text'
            }).krselectSet('1');
        },
        initData: function () {
            if (!!id) {
                for (var i = 0, l = queryData.length; i < l; i++) {
                    if (queryData[i].id == id) {
                        $('#form').krSetFormData(queryData[i]);
                        break;
                    }
                }
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        postData.id = id || keren.newGuid();
        postData.fieldName = fieldName;
        callBack(postData);
        return true;
    };
    page.init();
}