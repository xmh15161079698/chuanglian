/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-04-10 15:08
 * 描  述：语言类型
 */
var acceptClick;
var keyValue = request('keyValue');
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.initData();
        },
        bind: function () {
        },
        initData: function () {
            if (!!selectedRow) {
                $('#form').krSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        postData.F_Code = postData.F_Code.toLowerCase();
        postData.F_IsMain = 0;
        postData['__RequestVerificationToken'] = $.krToken;
        keren.httpAsyncGet(top.$.rootUrl + '/KR_LGManager/LGType/GetEntityByCode?keyValue=' + postData.F_Code, function (res) {
            //判断编辑是否更改编码
            if (res.data) {
                keren.alert.warning("编码已存在");
                return false;
            }
            else {
                if (!(selectedRow && selectedRow.F_Code === postData.F_Code) && keyValue) {
                    selectedRow.F_Code = postData.F_Code;
                    selectedRow.F_Name = postData.F_Name;
                    $.krSaveForm(top.$.rootUrl + '/KR_LGManager/LGType/SaveForm?keyValue=' + keyValue, selectedRow, function (res) {
                        // 保存成功后才回调
                        if (!!callBack) {
                            callBack();
                        }
                    });
                }
                else if (!keyValue) {
                    $.krSaveForm(top.$.rootUrl + '/KR_LGManager/LGType/SaveForm?keyValue=' + keyValue, postData, function (res) {
                        // 保存成功后才回调
                        if (!!callBack) {
                            callBack();
                        }
                    });
                }
            }
        });
    };
    page.init();
}
