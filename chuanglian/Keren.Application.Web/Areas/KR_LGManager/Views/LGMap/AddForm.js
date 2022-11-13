﻿/* * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：超级管理员
 * 日  期：2018-04-10 15:00
 * 描  述：语言映照
 */
var acceptClick;
var keyValue = request('keyValue');
var bootstrap = function ($, keren) {
    "use strict";
    var selectedRow = keren.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            var data = [];
            //获取语言类型
            keren.httpAsyncGet(top.$.rootUrl + '/KR_LGManager/LGType/GetList', function (res) {
                if (res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        var html = '<div class="col-xs-12 kr-form-item"> <div class="kr-form-item-title">' + res.data[i].F_Name + '<font face="宋体">*</font></div> <input id="' + res.data[i].F_Code + '" type="text" class="form-control" isvalid="yes" checkexpession="NotNull" /> </div>';
                        data.push(html);
                    }
                    //根据类型添加表单
                    $('#form .kr-form-item:last').parent().append(data);
                    $('#form .kr-form-item:first').remove();
                }
                if (!!selectedRow) {
                    $('#form').krSetFormData(selectedRow);
                }

                $('#' + keyValue).attr('disabled', 'disabled');
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var nameList = "";
        var code = "";
        if (!!selectedRow) {
            //原始值
            code = selectedRow["F_Code"];
            delete selectedRow.F_Code;
            nameList = JSON.stringify(selectedRow);
        }
        //表单值
        var newNameList = JSON.stringify($('#form').krGetFormData());
        $.krSaveForm(top.$.rootUrl + '/KR_LGManager/LGMap/SaveForm?nameList=' + nameList + "&newNameList=" + newNameList + "&code=" + code, {}, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}
