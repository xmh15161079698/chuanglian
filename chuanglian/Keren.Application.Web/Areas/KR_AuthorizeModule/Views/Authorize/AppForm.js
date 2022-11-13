/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.06.25
 * 描 述：移动功能模块权限设置	
 */
var objectId = request('objectId');
var objectType = request('objectType');

var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    var selectData;
    var treeData;
    var checkModuleIds = [];

    function setTreeData() {
        if (!!selectData) {
            $('#tree').krtreeSet('setCheck', selectData);
        }
        else {
            setTimeout(setTreeData, 100);
        }
    }
  
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            keren.httpAsyncGet(top.$.rootUrl + '/AppManager/FunctionManager/GetCheckTree', function (res) {
                if (res.code == 200) {
                    treeData = res.data;
                    setTimeout(function () {
                        $('#tree').krtree({
                            data: treeData
                        });
                        if (!!objectId) {
                            setTreeData();
                        }
                    }, 10);
                }
            });
        },
        /*初始化数据*/
        initData: function () {
            if (!!objectId) {
                $.krSetForm(top.$.rootUrl + '/KR_AuthorizeModule/Authorize/GetAppFormData?objectId=' + objectId, function (data) {//
                    selectData = data;
                });
            }
        },
        /*保存数据*/
        save: function () {
           
        }
    };

    acceptClick = function (callBack) {
        var list = [];
        var checkFormIds = $('#tree').krtreeSet('getCheckNodeIds');
        $.each(checkFormIds, function (id, item) {
            if (item.indexOf('_KRDataItem') == -1) {
                list.push(item);
            }
        });


        var postData = {
            objectId: objectId,
            objectType: objectType,
            strFormId: String(list),
        };

        $.krSaveForm(top.$.rootUrl + '/KR_AuthorizeModule/Authorize/SaveAppForm', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };

    page.init();
}