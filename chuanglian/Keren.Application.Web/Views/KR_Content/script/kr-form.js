/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：表单处理方法
 */
(function ($, keren) {
    "use strict";

    /*获取和设置表单数据*/
    $.fn.krGetFormData = function (keyValue) {// 获取表单数据
        var resdata = {};
        $(this).find('input,select,textarea,.kr-select,.kr-formselect,.krUploader-wrap,.kr-radio,.kr-checkbox,.edui-default').each(function (r) {
            var id = $(this).attr('id');
          
            if (!!id) {
                var type = $(this).attr('type');
                switch (type) {
                    case "radio":
                        if ($("#" + id).is(":checked")) {
                            var _name = $("#" + id).attr('name');
                            resdata[_name] = $("#" + id).val();
                        }
                        break;
                    case "checkbox":
                        if ($("#" + id).is(":checked")) {
                            resdata[id] = 1;
                        } else {
                            resdata[id] = 0;
                        }
                        break;
                    case "lrselect":
                        resdata[id] = $(this).krselectGet();
                        break;
                    case "formselect":
                        resdata[id] = $(this).krformselectGet();
                        break;
                    case "lrGirdSelect":
                        resdata[id] = $(this).krGirdSelectGet();
                        break;
                    case "kr-Uploader":
                        resdata[id] = $(this).krUploaderGet();
                        break;
                    case "kr-radio":
                        resdata[id] = $(this).find('input:checked').val();
                        break;
                    case "kr-checkbox":
                        var _idlist = [];
                        $(this).find('input:checked').each(function () {
                            _idlist.push($(this).val());
                        });
                        resdata[id] = String(_idlist);
                        break;
                    default:
                        if ($("#" + id).hasClass('currentInfo')) {
                            var value = $("#" + id)[0].krvalue;
                            if (value == undefined) {
                                value = $('#' + id).val();
                            }

                            resdata[id] = $.trim(value);
                        }
                        else if ($(this).hasClass('edui-default')) {
                            if ($(this)[0].ue) {
                                resdata[id] = $(this)[0].ue.getContent(null, null, true).replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });//
                            }
                        }
                        else {
                            var value = $("#" + id).val();
                            if (value != undefined && value != 'undefined') {
                                resdata[id] = $.trim(value);
                            }
                        }

                        break;
                }
                if (resdata[id] != undefined) {
                    resdata[id] += '';
                    if (resdata[id] == '') {
                        resdata[id] = '&nbsp;';
                    }
                    if (resdata[id] == '&nbsp;' && !keyValue) {
                        resdata[id] = '';
                    }
                }
               
            }
        });
        return resdata;
    };
    $.fn.krSetFormData = function (data) {// 设置表单数据
        var $this = $(this);
        for (var id in data) {
            var value = data[id];
            var $obj = $this.find('#' + id);
            if ($obj.length == 0 && value != null) {
                $obj = $this.find('[name="' + id + '"][value="' + value + '"]');
                if ($obj.length > 0) {
                    if (!$obj.is(":checked")) {
                        $obj.trigger('click');
                    }
                }
            }
            else {
                var type = $obj.attr('type');
                if ($obj.hasClass("kr-input-wdatepicker")) {
                    type = "datepicker";
                }
                switch (type) {
                    case "checkbox":
                        var isck = 0;
                        if ($obj.is(":checked")) {
                            isck = 1;
                        } else {
                            isck = 0;
                        }
                        if (isck != parseInt(value)) {
                            $obj.trigger('click');
                        }
                        break;
                    case "lrselect":
                        $obj.krselectSet(value);
                        break;
                    case "formselect":
                        $obj.krformselectSet(value);
                        break;
                    case "lrGirdSelect":
                        $obj.krGirdSelectSet(value);
                        break;
                    case "datepicker":
                        var _dateFmt = $obj.attr('data-dateFmt') || 'yyyy-MM-dd hh:mm';
                        $obj.val(keren.formatDate(value, _dateFmt));
                        break;
                    case "kr-Uploader":
                        $obj.krUploaderSet(value);
                        break;
                    case "kr-radio":
                        if (!$obj.find('input[value="' + value + '"]').is(":checked")) {
                            $obj.find('input[value="' + value + '"]').trigger('click');
                        }
                        break;
                    case "kr-checkbox":
                        var values = value.split(",");
                        $.each(values, function (index, val) {
                            if (!$obj.find('input[value="' + val + '"]').is(":checked")) {
                                $obj.find('input[value="' + val + '"]').trigger('click');
                            }
                        });

                        break;
                        var _idlist = [];
                    default:
                        if ($obj.hasClass('currentInfo')) {
                            $obj[0].krvalue = value;
                            if ($obj.hasClass('kr-currentInfo-user')) {
                                $obj.val('');
                                keren.clientdata.getAsync('user', {
                                    key: value,
                                    callback: function (item, op) {
                                        op.obj.val(item.name);
                                    },
                                    obj: $obj
                                });
                            }
                            else if ($obj.hasClass('kr-currentInfo-company')) {
                                $obj.val('');
                                keren.clientdata.getAsync('company', {
                                    key: value,
                                    callback: function (_data, op) {
                                        op.obj.val(_data.name);
                                    },
                                    obj: $obj
                                });
                            }
                            else if ($obj.hasClass('kr-currentInfo-department')) {
                                $obj.val('');
                                keren.clientdata.getAsync('department', {
                                    key: value,
                                    callback: function (_data, op) {
                                        op.obj.val(_data.name);
                                    },
                                    obj: $obj
                                });
                            }
                            else {
                                $obj.val(value);
                            }

                        }
                        else if ($obj[0] && $obj[0].ue) {
                            if (!!value) {
                                var ue = $obj[0].ue;
                                setUe(ue, value);
                            }
                        }
                        else {
                            $obj.val(value);
                        }


                        break;
                }
            }
        }
    };

    function setUe(ue, value) {
        ue.ready(function () {
            var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            var str = value.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
            str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
            ue.setContent(str);
        });
    }

    /*
    $.fn.showEditer = function (content) {
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        var str = content.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
        $(this).html(str);
    }

    $('#id').showEditer();
    */


    /*表单数据操作*/
    $.krSetForm = function (url, callback) {
        keren.loading(true, '正在获取数据');
        keren.httpAsyncGet(url, function (res) {
            keren.loading(false);
            if (res.code == keren.httpCode.success) {
                callback(res.data);
            }
            else {
                keren.layerClose(window.name);
                keren.alert.error('表单数据获取失败,请重新获取！');
                keren.httpErrorLog(res.info);
            }
        });
    };
    $.krSaveForm = function (url, param, callback, isNotClosed) {
        param['__RequestVerificationToken'] = $.krToken;
        keren.loading(true, '正在保存数据');
        keren.httpAsyncPost(url, param, function (res) {
            keren.loading(false);
            if (res.code == keren.httpCode.success) {
                if (!!callback) {
                    callback(res);
                }
                keren.alert.success(res.info);
                if (!isNotClosed) {
                    keren.layerClose(window.name);
                }
            }
            else {
                keren.alert.error(res.info);
                keren.httpErrorLog(res.info);
            }
        });
    };
    $.krPostForm = function (url, param) {
        param['__RequestVerificationToken'] = $.krToken;
        keren.loading(true, '正在提交数据');
        keren.httpAsyncPost(url, param, function (res) {
            keren.loading(false);
            if (res.code == keren.httpCode.success) {
                keren.alert.success(res.info);
            }
            else {
                keren.alert.error(res.info);
                keren.httpErrorLog(res.info);
            }
        });
    };
    /*tab页切换*/
    $.fn.krFormTab = function (callback) {
        var $this = $(this);
        $this.parent().css({ 'padding-top': '44px' });
        $this.krscroll();

        $this.on('DOMNodeInserted', function (e) {
            var $this = $(this);
            var w = 0;
            $this.find('li').each(function () {
                w += $(this).outerWidth();
            });
            $this.find('.kr-scroll-box').css({ 'width': w });
        });

        var $this = $(this);
        var w = 0;
        $this.find('li').each(function () {
            w += $(this).outerWidth();
        });
        $this.find('.kr-scroll-box').css({ 'width': w });

        $this.delegate('li', 'click', { $ul: $this }, function (e) {
            var $li = $(this);
            if (!$li.hasClass('active')) {
                var $parent = $li.parent();
                var $content = e.data.$ul.next();

                var id = $li.find('a').attr('data-value');
                $parent.find('li.active').removeClass('active');
                $li.addClass('active');
                $content.children('.tab-pane.active').removeClass('active');
                $content.children('#' + id).addClass('active');

                callback && callback(id);
            }
        });
    }
    $.fn.krFormTabEx = function (callback) {
        var $this = $(this);
        $this.delegate('li', 'click', { $ul: $this }, function (e) {
            var $li = $(this);
            if (!$li.hasClass('active')) {
                var $parent = $li.parent();
                var $content = e.data.$ul.next();

                var id = $li.find('a').attr('data-value');
                $parent.find('li.active').removeClass('active');
                $li.addClass('active');
                $content.find('.tab-pane.active').removeClass('active');
                $content.find('#' + id).addClass('active');

                if (!!callback) {
                    callback(id);
                }
            }
        });
    }

    /*检测字段是否重复*/
    $.krExistField = function (keyValue, controlId, url, param) {
        var $control = $("#" + controlId);
        if (!$control.val()) {
            return false;
        }
        var data = {
            keyValue: keyValue
        };
        data[controlId] = $control.val();
        $.extend(data, param);
        keren.httpAsync('GET', url, data, function (data) {
            if (data == false) {
                $.krValidformMessage($control, '已存在,请重新输入');
            }
        });
    };

    /*固定下拉框的一些封装：数据字典，组织机构，省市区级联*/
    // 数据字典下拉框
    $.fn.krDataItemSelect = function (op) {
        // op:code 码,parentId 父级id,maxHeight 200,allowSearch， childId 级联下级框id
        var dfop = {
            // 是否允许搜索
            allowSearch: false,
            // 访问数据接口地址
            //url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetDetailListByParentId',
            // 访问数据接口参数
            param: { itemCode: '', parentId: '0' },
            // 级联下级框
            select: op.select,
        }
        op = op || {};
        if (!op.code) {
            return $(this);
        }
        dfop.param.itemCode = op.code;
        dfop.param.parentId = op.parentId || '0';
        dfop.allowSearch = op.allowSearch;

        var list = [];

        if (!!op.childId) {
            var list2 = [];
            $('#' + op.childId).krselect({
                // 是否允许搜索
                allowSearch: dfop.allowSearch
            });
            dfop.select = function (item) {
                if (!item) {
                    $('#' + op.childId).krselectRefresh({
                        data: []
                    });
                }
                else {
                    list2 = [];
                    keren.clientdata.getAllAsync('dataItem', {
                        code: dfop.param.itemCode,
                        callback: function (dataes) {
                            $.each(dataes, function (_index, _item) {
                                if (_item.parentId == item.k) {
                                    list2.push({ id: _item.text, text: _item.value, title: _item.text, k: _index });
                                }
                            });
                            $('#' + op.childId).krselectRefresh({
                                data: list2
                            });
                        }
                    });
                }
            };
        }
        var $select = $(this).krselect(dfop);
        keren.clientdata.getAllAsync('dataItem', {
            code: dfop.param.itemCode,
            callback: function (dataes) {
                $.each(dataes, function (_index, _item) {
                    if (_item.parentId == dfop.param.parentId) {
                        list.push({ id: _item.value, text: _item.text, title: _item.text, k: _index });
                    }
                });
                $select.krselectRefresh({
                    data: list
                });
            }
        });
        return $select;
    };
    // 数据源下拉框
    $.fn.krDataSourceSelect = function (op) {
        op = op || {};
        var dfop = {
            // 是否允许搜索
            allowSearch: true,
            select: op.select,
        }
        if (!op.code) {
            return $(this);
        }
        var $select = $(this).krselect(dfop);

        keren.clientdata.getAllAsync('sourceData', {
            code: op.code,
            callback: function (dataes) {
                $select.krselectRefresh({
                    value: op.value,
                    text: op.text,
                    title: op.text,
                    data: dataes
                });
            }
        });
        return $select;
    }

    // 公司信息下拉框
    $.fn.krCompanySelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            type: 'tree',
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/KR_OrganizationModule/Company/GetTree',
            // 访问数据接口参数
            param: { parentId: '0' },
        };
        op = op || {};
        dfop.param.parentId = op.parentId || '0';

        if (!!op.isLocal) {
            dfop.url = '';
        }
        var $select = $(this).krselect(dfop);
        if (!!op.isLocal) {
            keren.clientdata.getAllAsync('company', {
                callback: function (dataes) {
                    var mapdata = {};
                    var resdata = [];
                    $.each(dataes, function (_index, _item) {
                        mapdata[_item.parentId] = mapdata[_item.parentId] || [];
                        _item.id = _index;
                        mapdata[_item.parentId].push(_item);
                    });
                    _fn(resdata, dfop.param.parentId);
                    function _fn(_data, vparentId) {
                        var pdata = mapdata[vparentId] || [];
                        for (var j = 0, l = pdata.length; j < l; j++) {
                            var _item = pdata[j];
                            var _point = {
                                id: _item.id,
                                text: _item.name,
                                value: _item.id,
                                showcheck: false,
                                checkstate: false,
                                hasChildren: false,
                                isexpand: false,
                                complete: true,
                                ChildNodes: []
                            };
                            if (_fn(_point.ChildNodes, _item.id)) {
                                _point.hasChildren = true;
                                _point.isexpand = true;
                            }
                            _data.push(_point);
                        }
                        return _data.length > 0;
                    }
                    $select.krselectRefresh({
                        data: resdata
                    });
                }
            });
        }

        return $select;

    };
    // 部门信息下拉框
    $.fn.krDepartmentSelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            type: 'tree',
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/KR_OrganizationModule/Department/GetTree',
            // 访问数据接口参数
            param: { companyId: '', parentId: '0' },
        }
        op = op || {};
        dfop.param.companyId = op.companyId;
        dfop.param.parentId = op.parentId;

        dfop.maxHeight = op.maxHeight || 200;
        if (typeof (op.select) == 'function')
            dfop.select = op.select;

        return $(this).krselect(dfop);;
    };
    // 人员下拉框
    $.fn.krUserSelect = function (type, select) {//0单选1多选
        if (type == 0) {
            $(this).krformselect({
                layerUrl: top.$.rootUrl + '/KR_OrganizationModule/User/SelectOnlyForm',
                layerUrlW: 400,
                layerUrlH: 300,
                dataUrl: top.$.rootUrl + '/KR_OrganizationModule/User/GetListByUserIds',
                select: select
            });
        }
        else {
            $(this).krformselect({
                layerUrl: top.$.rootUrl + '/KR_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/KR_OrganizationModule/User/GetListByUserIds',
                select: select
            });
        }
    }

    // 省市区级联
    $.fn.krAreaSelect = function (op) {
        // op:parentId 父级id,maxHeight 200,
        var dfop = {
            // 字段
            value: "F_AreaCode",
            text: "F_AreaName",
            title: "F_AreaName",
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/KR_SystemModule/Area/Getlist',
            // 访问数据接口参数
            param: { parentId: '' },
        }
        op = op || {};
        if (!!op.parentId) {
            dfop.param.parentId = op.parentId;
        }
        var _obj = [], i = 0;
        var $this = $(this);
        $(this).find('div').each(function () {
            var $div = $('<div></div>');
            var $obj = $(this);
            dfop.placeholder = $obj.attr('placeholder');
            $div.addClass($obj.attr('class'));
            $obj.removeAttr('class');
            $obj.removeAttr('placeholder');
            $div.append($obj);
            $this.append($div);
            if (i == 0) {
                $obj.krselect(dfop);
            }
            else {
                dfop.url = "";
                dfop.parentId = "";
                $obj.krselect(dfop);
                _obj[i - 1].on('change', function () {
                    var _value = $(this).krselectGet();
                    if (_value == "") {
                        $obj.krselectRefresh({
                            url: '',
                            param: { parentId: _value },
                            data: []
                        });
                    }
                    else {
                        $obj.krselectRefresh({
                            url: top.$.rootUrl + '/KR_SystemModule/Area/Getlist',
                            param: { parentId: _value },
                        });
                    }

                });
            }
            i++;
            _obj.push($obj);
        });
    };
    // 数据库选择
    $.fn.krDbSelect = function (op) {
        // op:maxHeight 200,
        var dfop = {
            type: 'tree',
            // 是否允许搜索
            allowSearch: true,
            // 访问数据接口地址
            url: top.$.rootUrl + '/KR_SystemModule/DatabaseLink/GetTreeList'
        }
        op = op || {};

        return $(this).krselect(dfop);
    };

    // 动态获取和设置radio，checkbox
    $.fn.krRadioCheckbox = function (op) {
        var dfop = {
            type: 'radio',        // checkbox
            dataType: 'dataItem', // 默认是数据字典 dataSource（数据源）
            code: '',
            text: 'F_ItemName',
            value: 'F_ItemValue'
        };
        $.extend(dfop, op || {});
        var $this = $(this);
        $this.addClass(dfop.type);
        $this.addClass('kr-' + dfop.type);
        $this.attr('type', 'kr-' + dfop.type);
        var thisId = $this.attr('id');

        if (dfop.dataType == 'dataItem') {
            keren.clientdata.getAllAsync('dataItem', {
                code: dfop.code,
                callback: function (dataes) {
                    $.each(dataes, function (id, item) {
                        var $point = $('<label><input name="' + thisId + '" value="' + item.value + '"' + ' type="' + dfop.type + '">' + item.text + '</label>');
                        $this.append($point);
                    });
                   // $this.find('input').eq(0).trigger('click');
                }
            });
        }
        else if (dfop.data) {
            $.each(dfop.data, function (id, item) {
                var $point = $('<label><input name="' + thisId + '" value="' + item[dfop.value] + '"' + '" type="' + dfop.type + '">' + item[dfop.text] + '</label>');
                $this.append($point);
            });
            $this.find('input').eq(0).trigger('click');
        }
        else {
            keren.clientdata.getAllAsync('sourceData', {
                code: dfop.code,
                callback: function (dataes) {
                    $.each(dataes, function (id, item) {
                        var $point = $('<label><input name="' + thisId + '" value="' + item[dfop.value] + '"' + '" type="' + dfop.type + '">' + item[dfop.text] + '</label>');
                        $this.append($point);
                    });
                    $this.find('input').eq(0).trigger('click');
                }
            });
        }
      
    };
    // 多条件查询框
    $.fn.krMultipleQuery = function (search, height, width) {
        var $this = $(this);
        var contentHtml = $this.html();
        $this.addClass('kr-query-wrap');


        var _html = '';
        _html += '<div class="kr-query-btn"><i class="fa fa-search"></i>&nbsp;多条件查询</div>';
        _html += '<div class="kr-query-content">';
        //_html += '<div class="kr-query-formcontent">';
        _html += contentHtml;
        //_html += '</div>';
        _html += '<div class="kr-query-arrow"><div class="kr-query-inside"></div></div>';
        _html += '<div class="kr-query-content-bottom">';
        _html += '<a id="kr_btn_queryReset" class="btn btn-default">&nbsp;重&nbsp;&nbsp;置</a>';
        _html += '<a id="kr_btn_querySearch" class="btn btn-primary">&nbsp;查&nbsp;&nbsp;询</a>';
        _html += '</div>';
        _html += '</div>';
        $this.html(_html);
        $this.find('.kr-query-formcontent').show();

        $this.find('.kr-query-content').css({ 'width': width || 400, 'height': height || 300 });

        $this.find('.kr-query-btn').on('click', function () {
            var $content = $this.find('.kr-query-content');
            if ($content.hasClass('active')) {
                $content.removeClass('active');
            }
            else {
                $content.addClass('active');
            }
        });

        $this.find('#kr_btn_querySearch').on('click', function () {
            var $content = $this.find('.kr-query-content');
            var query = $content.krGetFormData();
            $content.removeClass('active');
            search(query);
        });

        $this.find('#kr_btn_queryReset').on('click', function () {
            var $content = $this.find('.kr-query-content');
            var query = $content.krGetFormData();
            for (var id in query) {
                query[id] = "";
            }
            $content.krSetFormData(query);
        });

        $(document).click(function (e) {
            var et = e.target || e.srcElement;
            var $et = $(et);
            if (!$et.hasClass('kr-query-wrap') && $et.parents('.kr-query-wrap').length <= 0) {

                $('.kr-query-content').removeClass('active');
            }
        });
    };

    // 获取表单显示数据
    $.fn.krGetFormShow = function () {
        var resdata = [];
        $(this).find('.kr-form-item').each(function () {
            var $this = $(this);
            if ($this.is(':hidden')) {
                return;
            }

            var point = {};
            point.name = ($this.find('.kr-form-item-title').text() || '').replace('*','');
            for (var i = 1; i < 13; i++) {
                if ($this.hasClass('col-xs-' + i)) {
                    point.col = i;
                }
            }
            
            if ($this.find('.kr-form-item-title').length == 0) {
                if ($this.find('.jfgrid-layout').length == 0) {
                    point.text = $this.html();
                    point.type = 'title';
                    resdata.push(point);
                }
                else {
                    point.type = 'gird';
                    point.gridHead = $this.find('.jfgrid-layout').jfGridGet('settingInfo').headData;
                    point.data = $this.find('.jfgrid-layout').jfGridGet('showData');
                    resdata.push(point);
                }
            }
            else {
                point.type = 'input';
                var list = $this.find('input,textarea,.kr-select,.edui-default');
                if (list.length > 0) {
                    resdata.push(point);
                    list.each(function () {
                        var type = $(this).attr('type');
                        switch (type) {
                            case "radio":
                                if ($(this).is(":checked")) {
                                    point.text = $(this).parent().text();
                                }
                                break;
                            case "checkbox":
                                if ($(this).is(":checked")) {
                                    point.textList = point.textList || [];
                                    point.textList.push($(this).parent().text());
                                }
                                break;
                            case "lrselect":
                                point.text = $(this).find('.kr-select-placeholder').text();
                                break;
                            default:
                                if ($(this).hasClass('edui-default')) {
                                    if ($(this)[0].ue) {
                                        point.text = $(this)[0].ue.getContent(null, null, true);
                                    }
                                }
                                else {
                                    point.text = $(this).val();
                                }
                                break;
                        }
                    });
                }
            }
        });
        return resdata;
    }

})(jQuery, top.keren);
