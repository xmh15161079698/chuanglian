/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：自定义表单设计
 */
(function ($, keren) {
    "use strict";

    $.krCustmerFormDesigner = {
        init: function ($self, op) {
            var dfop = {
                dbId: '',      // 数据主键
                dbTable: [], // 对应的表数据
                data: [{// 选项卡数据
                    id: '1',
                    text: '主表信息',
                    componts: []
                }]
            }
            $.extend(dfop, op || {});
            dfop.id = $self.attr('id');
            $self[0]._lrCustmerFormDesigner = { dfop: dfop };
            $self.addClass('kr-custmerform-designer-layout');
            var _html = '';
            _html += '<div class="kr-custmerform-designer-layout-left"  id="kr_custmerform_compont_list_' + dfop.id + '"></div>';

            _html += '<div class="kr-custmerform-designer-layout-center">';
            _html += '<div class="kr-custmerform-designer-layout-header">';
            _html += '<div class="kr-custmerform-designer-tabs" id="kr_custmerform_designer_tabs_' + dfop.id + '">';
            _html += '</div>';
            _html += '</div>';

            _html += '<div class="kr-custmerform-designer-layout-area" id="kr_custmerform_designer_layout_area_' + dfop.id + '" ></div>';
            _html += '<div class="kr-custmerform-designer-layout-footer">';
            _html += '<div class="kr-custmerform-designer-layout-footer-item" id="kr_custmerform_tabsEdit_btn_' + dfop.id + '"><i class="fa fa-pencil-square-o"></i><span>选项卡编辑</span></div>';
            _html += '<div class="kr-custmerform-designer-layout-footer-item" id="kr_custmerform_preview_btn_' + dfop.id + '"><i class="fa fa-eye"></i><span>预览表单</span></div>';
            _html += '</div>';
            _html += '<div class="kr-custmerform-designer-layout-center-bg"><img src="' + top.$.rootUrl + '/Content/images/tableform.png" /></div>';
            _html += '<div class="kr-custmerform-designer-layout-tabedit" id="kr_custmerform_designer_layout_tabedit_' + dfop.id + '" ></div>';

            _html += '</div>';
            _html += '<div class="kr-custmerform-designer-layout-right" id="kr_custmerform_compont_property_' + dfop.id + '"></div>';

            $self.html(_html);
            $.krCustmerFormDesigner.bind($self);
            $.krCustmerFormDesigner.compontinit($self);
            $.krCustmerFormDesigner.compontbind($self);

            $.krCustmerFormDesigner.tabbind($self);
            $.krCustmerFormDesigner.renderTabs($self);
            $.krCustmerFormDesigner.renderComponts($self);
        },
        // 绑定表单设计器的全局事件
        bind: function ($self) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            // 优化滚动条
            $('#kr_custmerform_compont_list_' + dfop.id).krscroll();
            $('#kr_custmerform_designer_tabs_' + dfop.id).krscroll();
            $('#kr_custmerform_designer_layout_area_' + dfop.id).krscroll();
            $('#kr_custmerform_compont_property_' + dfop.id).krscroll();
            $('#kr_custmerform_designer_layout_area_' + dfop.id + ' .kr-scroll-box')[0].dfop = dfop;

            // 编辑选项卡
            $('#kr_custmerform_designer_layout_tabedit_' + dfop.id ).jfGrid({
                headData: [
                    {
                        label: "", name: "btn1", width: 50, align: "center",
                        formatter: function (value, row, op, $cell) {
                            $cell.on('click', function () {
                                var rowindex = parseInt($cell.attr('rowindex'));
                                var res = $('#kr_custmerform_designer_layout_tabedit_' + dfop.id).jfGridSet('moveUp', rowindex);
                                if (res) {
                                    $.krCustmerFormDesigner.renderTabs($self);
                                }
                                return false;
                            });
                            return '<span class=\"label label-info\" style=\"cursor: pointer;\">上移</span>';
                        }
                    },
                    {
                        label: "", name: "btn2", width: 50, align: "center",
                        formatter: function (value, row, op, $cell) {
                            $cell.on('click', function () {
                                var rowindex = parseInt($cell.attr('rowindex'));
                                var res = $('#kr_custmerform_designer_layout_tabedit_' + dfop.id).jfGridSet('moveDown', rowindex);
                                if (res) {
                                    $.krCustmerFormDesigner.renderTabs($self);
                                }
                                return false;
                            });
                            return '<span class=\"label label-success\" style=\"cursor: pointer;\">下移</span>';
                        }
                    },
                    {
                        label: "选项卡名称", name: "text", width: 200, align: "left",
                        edit: {
                            type: 'input',
                            change: function (row, rowIndex) {
                                $('#kr_custmerform_designer_tabs_' + dfop.id + ' .kr-scroll-box').find('div').eq(rowIndex).html(row.text || '&nbsp;');
                            }
                        }
                    }
                ],
                mainId: 'id',
                isEdit: true,
                isMultiselect: true,
                rowdatas: dfop.data,
                onAddRow: function (row, rows) {
                    row.id = keren.newGuid();
                    row.text = '新建选项卡';
                    row.componts = [];
                    $.krCustmerFormDesigner.renderTabs($self);
                },
                onMinusRow: function (row, rows) {
                    $.krCustmerFormDesigner.renderTabs($self);
                },
                beforeMinusRow: function (row) {
                    if (row.id == '1') {
                        return false;
                    }
                    return true;
                },

            });

            $self.find('#kr_custmerform_tabsEdit_btn_' + dfop.id).on('click', function () {
                var $edit = $('#kr_custmerform_designer_layout_tabedit_' + dfop.id);
                if ($edit.hasClass('open')) {
                    $edit.animate({ 'bottom': '-269px', speed: 2000 });
                    $edit.removeClass('open');
                }
                else {
                    $edit.animate({ 'bottom': '31px', speed: 2000 });
                    $edit.addClass('open');
                }
              
                $edit = null;
                return false;
            });
            $('#kr_custmerform_designer_layout_tabedit_' + dfop.id).on('click', function () {
                return false;
            });
            $self.on('click', function () {
                var $edit = $('#kr_custmerform_designer_layout_tabedit_' + dfop.id);
                $edit.animate({ 'bottom': '-269px', speed: 2000 });
                $edit.removeClass('open');
                $edit = null;
            });

            // 预览表单
            $self.find('#kr_custmerform_preview_btn_' + dfop.id).on('click', function () {
                top.custmerFormData = dfop.data;
                $.krCustmerFormDesigner.saveComponts($self);
                keren.layerForm({
                    id: 'custmerForm_PreviewForm',
                    title: '预览当前表单',
                    url: top.$.rootUrl + '/Utility/PreviewForm?keyValue=custmerFormData',
                    width: 800,
                    height: 600,
                    maxmin: true,
                    btn: null
                });
            });
        },
        // 组件初始化
        compontinit: function ($self) {// 组件初始化
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            var $compontList = $self.find('#kr_custmerform_compont_list_' + dfop.id + ' .kr-scroll-box');

            if (dfop.components && dfop.components.length > 0) {
                $.each(dfop.components, function (i, id) {
                    var $component = $.krFormComponents[id].init();
                    $compontList.append($component);
                });
            }
            else {
                $.each($.krFormComponents, function (i, component) {
                    var $component = component.init();
                    $compontList.append($component);
                });
            }

            
            $compontList.find('.kr-custmerform-component').draggable({
                connectToSortable: '#kr_custmerform_designer_layout_area_' + dfop.id + ' .kr-scroll-box',
                helper: "clone",
                revert: "invalid"
            });

            $('#kr_custmerform_designer_layout_area_' + dfop.id + ' .kr-scroll-box').sortable({
                opacity: 0.4,
                delay: 300,
                cursor: 'move',
                placeholder: "ui-state-highlight",
                stop: function (event, ui) {
                    var $compont = $(ui.item[0]);
                    var componttype = $compont.attr('data-type');

                    if (!!componttype) {//如果是第一次移入，需要对单元项进行初始化处理
                        var $designer = $compont.parents('.kr-custmerform-designer-layout');
                        $compont.addClass('kr-compont-item').css({ 'width': '100%' });
                        $compont.removeClass('kr-custmerform-component');
                        $compont.removeAttr('data-type');
                        $.krFormComponents[componttype].render($compont);
                        $compont[0].dfop.id = keren.newGuid();
                        $compont.trigger("click");
                    }
                    else {
                        $compont.trigger("click");
                    }
                },
                start: function (event, ui) {
                    $self.find(".kr-custmerform-designer-layout-center-bg").hide();
                    var $highlight = $self.find(".ui-state-highlight");
                    $highlight.html('拖放控件到这里');
                    var $compont = $(ui.item[0]);
                    var componttype = $compont.attr('data-type');
                    if (!componttype) {
                        $highlight.css({ width: ((100 / $compont[0].dfop.proportion) + "%") });
                    }
                },
                out: function (event, ui) {
                    if (ui.helper != null) {
                        var $componts = $('.kr-custmerform-designer-layout-area .kr-scroll-box .kr-compont-item');
                        if ($componts.length <= 1) {
                            if ($componts.length == 1) {
                                if ($componts.find('.kr-compont-value').length == 0) {
                                    $(".kr-custmerform-designer-layout-center-bg").show();
                                }
                            }
                            else {
                                $(".kr-custmerform-designer-layout-center-bg").show();
                            }
                        }
                    }
                }
            });
        },
        // 组件事件注册
        compontbind: function ($self) {
            $self.delegate('.kr-compont-item', 'click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $('.kr-custmerform-designer-layout-area .kr-scroll-box .kr-compont-item').removeClass('active');
                    $this.addClass('active');
                    if ($('.kr-custmerform-designer-layout').css('padding-right') == '0px') {
                        $('.kr-custmerform-designer-layout').animate({ 'padding-right': '240px', speed: 2000 });
                        $('.kr-custmerform-designer-layout-right').animate({ right: 0, speed: 2000 });
                    }
                    setTimeout(function () {
                        $.krFormComponents[$this[0].dfop.type].property($this);
                    }, 150);
                }

                return false;
            });
            $self.delegate('.kr-compont-remove i', 'click', function () {
                var $compont = $(this).parents('.kr-compont-item');
                $compont.remove();
                if ($('.kr-custmerform-designer-layout-area .kr-scroll-box .kr-compont-item').length == 0) {
                    $('.kr-custmerform-designer-layout-right').animate({ right: '-240px', speed: 2000 });
                    $('.kr-custmerform-designer-layout').animate({ 'padding-right': '0px', speed: 2000 });
                    $(".kr-custmerform-designer-layout-center-bg").show();
                }
                else {
                    $('.kr-custmerform-designer-layout-area .kr-scroll-box .kr-compont-item').eq(0).trigger('click');
                }
            });
        },
        // 选项卡事件绑定
        tabbind: function ($self) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            $self.delegate('#kr_custmerform_designer_tabs_' + dfop.id + ' .kr-scroll-box>div', 'click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    var $parent = $this.parent();
                    var $self = $this.parents('.kr-custmerform-designer-layout');
                    var _dfop = $self[0]._lrCustmerFormDesigner.dfop;

                    $parent.find('.active').removeClass('active');
                    $this.addClass('active');
                    // 保存当前选项卡组件数据
                    $.krCustmerFormDesigner.saveComponts($self);
                    // 切换到新的选项卡数据
                    _dfop._currentTabId = $this.attr('data-value');
                    for (var i = 0; i < _dfop.data.length; i++) {
                        var tabItem = _dfop.data[i];
                        if (_dfop._currentTabId == tabItem.id) {
                            _dfop._currentComponts = _dfop.data[i].componts;
                        }
                    }
                    _dfop._isRenderComponts = true;
                    $.krCustmerFormDesigner.renderComponts($self);
                }
            });
        },
        // 渲染选项卡
        renderTabs: function ($self) {// 渲染选项卡
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            var $tabs = $('#kr_custmerform_designer_tabs_' + dfop.id + ' .kr-scroll-box');
            var tabsLength = dfop.data.length;
            var index = 0;
            $tabs.html("");
            for (var i = 0; i < tabsLength; i++) {
                var tabItem = dfop.data[i];
                
                $tabs.append('<div data-value="' + tabItem.id + '">' + tabItem.text || '&nbsp;' + '</div>');
                if (dfop._currentTabId == tabItem.id) {
                    index = i;
                }
            }
            // 获取当前选项卡的组件数据并渲染
            if (dfop._currentTabId != dfop.data[index].id) {
                dfop._currentTabId = dfop.data[index].id;
                dfop._currentComponts = dfop.data[index].componts;
                dfop._isRenderComponts = true;
                $.krCustmerFormDesigner.renderComponts($self);
            }
            
            if (tabsLength <= 1) {
                $self.find('.kr-custmerform-designer-layout-center').removeClass('hasTab');
            }
            else {
                $self.find('.kr-custmerform-designer-layout-center').addClass('hasTab');
                $tabs.find('div').eq(index).addClass('active');

                var w = 0;
                var width = $tabs.children().each(function () {
                    w += $(this).outerWidth();
                });
                $tabs.css({ 'width': w });
            }
        },
        // 渲染数据
        renderData: function ($self) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            var $tabs = $('#kr_custmerform_designer_tabs_' + dfop.id + ' .kr-scroll-box');
            var tabsLength = dfop.data.length;
            $tabs.html("");
            $('#kr_custmerform_designer_layout_tabedit_' + dfop.id).jfGridSet("refreshdata", dfop.data);
            for (var i = 0; i < tabsLength; i++) {
                var tabItem = dfop.data[i];
                $tabs.append('<div data-value="' + tabItem.id + '">' + tabItem.text || '&nbsp;' + '</div>');
                if (i == 0) {
                    dfop._currentTabId = tabItem.id;
                    dfop._currentComponts = dfop.data[0].componts;
                    dfop._isRenderComponts = true;
                    $.krCustmerFormDesigner.renderComponts($self);
                }
            }
            if (tabsLength <= 1) {
                $self.find('.kr-custmerform-designer-layout-center').removeClass('hasTab');
            }
            else {
                $self.find('.kr-custmerform-designer-layout-center').addClass('hasTab');
                $tabs.find('div').eq(0).addClass('active');
                var w = 0;
                var width = $tabs.children().each(function () {
                    w += $(this).outerWidth();
                });
                $tabs.css({ 'width': w });
            }
        },
        // 保存当前选项卡的组件数据
        saveComponts: function ($self) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            var componts = [];
            var compontsLayout = $('#kr_custmerform_designer_layout_area_' + dfop.id + ' .kr-scroll-box');
            compontsLayout.find('.kr-compont-item').each(function () {
                var compont = $(this)[0].dfop;
                componts.push(compont);
            });
            for (var i = 0, l = dfop.data.length; i < l; i++) {
                if (dfop.data[i].id == dfop._currentTabId) {
                    dfop.data[i].componts = componts;
                    break;
                }
            }
        },
        // 渲染组件
        renderComponts: function ($self) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            if (dfop._isRenderComponts) {
                var compontsLayout = $('#kr_custmerform_designer_layout_area_' + dfop.id + ' .kr-scroll-box');
                compontsLayout.html('');
                if (dfop._currentComponts.length > 0) {
                    $self.find(".kr-custmerform-designer-layout-center-bg").hide();
                    for (var i = 0, l = dfop._currentComponts.length; i < l; i++) {
                        var compontItem = dfop._currentComponts[i];
                        var $compont = $('<div class="kr-compont-item" ></div>');
                        $compont[0].dfop = compontItem;
                        $compont.css({ 'width': 100 / parseInt(compontItem.proportion) + '%' });
                        $.krFormComponents[compontItem.type].render($compont);

                        compontsLayout.append($compont);

                        if (i == 0) {
                            $compont.trigger("click");
                        }
                    }
                }
                else {
                    $('.kr-custmerform-designer-layout-right').animate({ right: '-240px', speed: 2000 });
                    $('.kr-custmerform-designer-layout').animate({ 'padding-right': '0px', speed: 2000 });
                    $(".kr-custmerform-designer-layout-center-bg").show();
                }
                dfop._isRenderComponts = false;
            }
        },
        // 更新绑定的数据表字段信息
        updatedb: function ($self, op) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            if (dfop.dbId != op.dbId) {// 如果数据库改变,绑定字段数据重置
                dfop.dbId = op.dbId;
                for (var i = 0, l = dfop.data.length; i < l; i++) {
                    for (var j = 0, jl = dfop.data[i].componts.length; j < jl; j++) {
                        dfop.data[i].componts[j].table = '';
                        dfop.data[i].componts[j].field = '';
                    }
                }
            }
            else {
                for (var i = 0, l = dfop.dbTable.length; i < l; i++) {
                    var tablename = dfop.dbTable[i].name;
                    var flag = false;
                    for (var j = 0, jl = op.dbTable.length; i < jl; i++) {
                        if (op.dbTable[i].name == tablename) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        for (var i = 0, l = dfop.data.length; i < l; i++) {
                            for (var j = 0, jl = dfop.data[i].componts.length; j < jl; j++) {
                                if (dfop.data[i].componts[j].table == tablename) {
                                    dfop.data[i].componts[j].table = '';
                                    dfop.data[i].componts[j].field = '';
                                }
                            }
                        }
                    }
                }
            }
            dfop.dbTable = op.dbTable;
        },
        // 判定所有组件数据是否输入完整（主要是数据库绑定信息）
        validData: function ($self) {
            var dfop = $self[0]._lrCustmerFormDesigner.dfop;
            var _data = {};
            var res = true;
            for (var i = 0, l = dfop.data.length; i < l; i++) {
                for (var j = 0, jl = dfop.data[i].componts.length; j < jl; j++) {
                    if (dfop.data[i].componts[j].type != 'label' && dfop.data[i].componts[j].type != 'html') {
                        var table = dfop.data[i].componts[j].table;
                        var field = dfop.data[i].componts[j].field;
                        var title = dfop.data[i].componts[j].title;
                        if (table != '' && field != '') {
                            if (!!_data[table + '_' + field]) {
                                keren.alert.error('【' + title + '】绑定数据表字段与【' + _data[table + '_' + field] + '】重复！');
                                res = false;
                            }
                            else {
                                _data[table + '_' + field] = title;
                            }
                        }
                        else {
                            if (dfop.data[i].componts[j].type == 'gridtable' || dfop.data[i].componts[j].type == 'girdtable') {
                                if (table == '') {
                                    keren.alert.error('【表格项】请绑定数据表！');
                                    res = false;
                                }
                            }
                            else {
                                keren.alert.error('【' + title + '】请绑定数据表！');
                                res = false;
                            }
                        }
                    }
                }
            }
            return res;
        }
    };

    //对外暴露接口
    $.fn.krCustmerFormDesigner = function (type, op) {
        var $this = $(this);
        if (!$this.attr('id')) {
            return false;
        }
        switch (type) {
            // 初始化设计器
            case "init":
                $.krCustmerFormDesigner.init($this, op);
                break;
            // 更新数据库绑定信息
            case 'updatedb':
                $.krCustmerFormDesigner.updatedb($this, op);
                break;
            // 判定所有组件数据是否输入完整（主要是数据库绑定信息）
            case 'valid':
                $.krCustmerFormDesigner.saveComponts($this);
                return $.krCustmerFormDesigner.validData($this);
                break;
            case "get":
                $.krCustmerFormDesigner.saveComponts($this);
                var dfop = $this[0]._lrCustmerFormDesigner.dfop;
                var res = {
                    dbId: dfop.dbId,
                    dbTable: dfop.dbTable,
                    data: dfop.data
                };
                return res;
                break;
            case "set":
                var dfop = $this[0]._lrCustmerFormDesigner.dfop;
                dfop.dbId = op.dbId;
                dfop.dbTable = op.dbTable;
                dfop.data = op.data;
                $.krCustmerFormDesigner.renderData($this);
                break;
        }
    };

})(jQuery, top.keren);
