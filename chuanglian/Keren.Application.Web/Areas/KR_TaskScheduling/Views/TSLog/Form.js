var acceptClick;
var bootstrap = function ($, keren) {
    "use strict";

    var page = {
        init: function () {
            $('#keepTime').krselect({ maxHeight: 75, placeholder: false }).krselectSet(7);
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').krValidform()) {
            return false;
        }
        var postData = $('#form').krGetFormData();
        $.krSaveForm(top.$.rootUrl + '/KR_TaskScheduling/KR_TS_TaskLog/RemoveData', postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}