/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.28
 * 描 述：PC端桌面配置
 */
var refreshGirdData;
var selectedRow = null;
var switchbtn = 1;

var bootstrap = function ($, keren) {
    "use strict";

    var targetMap = {};
    var listMap = {};
    var chartMap = {};
    var chartMap2 = {};

    var page = {
        init: function () {
            // 加载数据
            $('#kr_target_content').krscroll();
            $('#kr_desktop_list').krscroll();
            page.bind();


            keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTTarget/GetPageList', {}, function (data) {
                page.target(data || []);
            });

            

            keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetPageList', {}, function (data) {
                page.list(data || []);
            });

            

            keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetPageList', {}, function (data) {
                page.chart(data || []);
            });

            return;

        },
        target: function (data) {
            targetMap = {};
            // 滚动条优化
            var itemW = 250;
            var allw = 0;

            var w = $('#kr_target_content').width();
            var itemW = w / data.length;
            if (itemW < 250) {
                itemW = 250;
            }
            allw = itemW * data.length;
            var $target = $('#kr_target_content .kr-scroll-box');
            $target.css('width', allw);
            $.each(data, function (_index, _item) {
                targetMap[_item.F_Id] = _item;
                var _html = '\
                    <div class="kr-item-20 targetItem" data-Id="'+ _item.F_Id + '">\
                        <div class="task-stat">\
                            <div class="visual">\
                                <i class="'+ _item.F_Icon + '"></i>\
                            </div>\
                            <div class="number" data-value="'+ _item.F_Id + '"></div>\
                            <div class="desc">'+ _item.F_Name + '</div>\
                            <div class="tool" data-Id="' + _item.F_Id + '">\
                                <div>编辑</div>\
                                <div>删除</div>\
                            </div>\
                        </div>\
                    </div>';

                $target.append(_html);
                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTTarget/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        $target.find('[data-value="' + data.Id + '"]').text(data.value);
                    }
                });
            });

            $target.find('.kr-item-20').css('width', itemW);
            $('#kr_target_content').resize(function () {
                var w = $('#kr_target_content').width();
                var itemW = w / data.length;
                if (itemW < 250) {
                    itemW = 250;
                }
                allw = itemW * data.length;
                $target.css('width', allw);
                $target.find('.kr-item-20').css('width', itemW);
            });
        },
        list: function (data) {
            var $btn = $('#kr-add-list');
            listMap = {};

            $.each(data, function (_index, _item) {
                listMap[_item.F_Id] = _item;
                var _html = '\
                <div class="kr-desktop-list listItem"  data-Id="'+ _item.F_Id + '">\
                    <div class="title">\
                        '+ _item.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div>\
                    </div>\
                    <div class="content" data-value="'+ _item.F_Id + '">\
                    </div>\
                </div>';
                $btn.before(_html);
                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        var $content = $('[data-value="' + data.Id + '"]');
                        $.each(data.value, function (_index, _item) {
                            var _html = '\
                            <div class="kr-list-line">\
                                <div class="point"></div>\
                                <div class="text">'+ _item.f_title + '</div>\
                                <div class="date">'+ _item.f_time + '</div>\
                            </div>';

                            var _$html = $(_html);
                            _$html[0].item = _item;
                            $content.append(_$html);
                        });
                    }
                });
            });
        },
        chart: function (data) {
            chartMap = {};
            chartMap2 = {};
            var $chartTitle = $('.kr-desktop-chat-panel-title');
            var $chartCotent = $('.kr-desktop-chat-panel-content');

            $.each(data, function (_index, _item) {
                chartMap2[_item.F_Id] = _item;
                var _titleHtml = '<div class="title-item chartItem' + (_index == 0 ? ' active' : '') + '" data-value="' + _item.F_Id + '_keren_" >' + _item.F_Name + '</div>';
                $chartTitle.append(_titleHtml);
                var _contentHtml = '<div class="content-item chartItem' + (_index == 0 ? ' active' : '') + '" id="' + _item.F_Id + '_keren_"  data-type="' + _item.F_Type + '"><div  id="' + _item.F_Id + '" class="chartc" ></div><div class="tool" data-Id="' + _item.F_Id + '">\
                                <div>编辑</div>\
                                <div>删除</div>\
                            </div></div >';
                $chartCotent.append(_contentHtml);

                chartMap[_item.F_Id] = echarts.init(document.getElementById(_item.F_Id));

                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        var type = $('#' + data.Id +"_keren_").attr('data-type');
                        var legendData = [];
                        var valueData = [];
                        $.each(data.value, function (_index, _item) {
                            legendData.push(_item.name);
                            valueData.push(_item.value);
                        });

                        var option = {};
                        switch (type) {
                            case '0'://饼图
                                option.tooltip = {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                };

                                option.legend = {
                                    bottom: 'bottom',
                                    data: legendData
                                };
                                option.series = [{
                                    name: '占比',
                                    type: 'pie',
                                    radius: '75%',
                                    center: ['50%', '50%'],
                                    label: {
                                        normal: {
                                            formatter: '{b}:{c}: ({d}%)',
                                            textStyle: {
                                                fontWeight: 'normal',
                                                fontSize: 12,
                                                color: '#333'
                                            }
                                        }
                                    },
                                    data: data.value,
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }];
                                option.color = ['#df4d4b', '#304552', '#52bbc8', 'rgb(224,134,105)', '#8dd5b4', '#5eb57d', '#d78d2f'];
                                break;
                            case '1'://折线图
                                option.tooltip = {
                                    trigger: 'axis'
                                };
                                option.grid = {
                                    bottom: '8%',
                                    containLabel: true
                                };
                                option.xAxis = {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: legendData
                                };
                                option.yAxis = {
                                    type: 'value'
                                }
                                option.series = [{
                                    type: 'line',
                                    data: valueData
                                }];


                                break;
                            case '2'://柱状图
                                option.tooltip = {
                                    trigger: 'axis'
                                };
                                option.grid = {
                                    bottom: '8%',
                                    containLabel: true
                                };
                                option.xAxis = {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: legendData
                                };
                                option.yAxis = {
                                    type: 'value'
                                }
                                option.series = [{
                                    type: 'bar',
                                    data: valueData
                                }];
                                break;
                        }
                        chartMap[data.Id].setOption(option);
                    }
                });
            });

            window.onresize = function (e) {
                $.each(chartMap, function (id, obj) {
                    obj.resize(e);
                });
            }
        },
        bind: function () {
            // 统计
            $('#kr_target_content').on('click', '.tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var id = $this.parent().attr('data-Id');
                var item = targetMap[id];
                selectedRow = item;
                switchbtn = 1;
                if (text === '编辑') {
                    keren.layerForm({
                        id: 'Form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_Desktop/DTTarget/Form',
                        width: 600,
                        height: 500,
                        btn: null
                    });
                }
                else {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_Desktop/DTTarget/DeleteForm', { keyValue: item.F_Id }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }

                return false;
            });
            $('#kr-add-target').on('click', function () {
                selectedRow = null;
                switchbtn = 1;
                keren.layerForm({
                    id: 'Form',
                    title: '添加',
                    url: top.$.rootUrl + '/KR_Desktop/DTTarget/Form',
                    width: 600,
                    height: 500,
                    btn: null
                });
            });

            // 列表
            $('#kr_desktop_list').on('click', '.listItem .tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var id = $this.parents('.listItem').attr('data-Id');
                var item = listMap[id];
                selectedRow = item;
                switchbtn = 2;
                if (text === '编辑') {
                    keren.layerForm({
                        id: 'Form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_Desktop/DTList/Form',
                        width: 600,
                        height: 500,
                        btn: null
                    });
                }
                else {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_Desktop/DTList/DeleteForm', { keyValue: item.F_Id }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }

            });
            $('#kr-add-list').on('click', function () {
                selectedRow = null;
                switchbtn = 2;
                keren.layerForm({
                    id: 'Form',
                    title: '添加',
                    url: top.$.rootUrl + '/KR_Desktop/DTList/Form',
                    width: 600,
                    height: 500,
                    btn: null
                });
            });

            // 图表
            $('.kr-desktop-chat-panel-title').on('click','.title-item', function (e) {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    var $p = $this.parent();
                    $p.find('.active').removeClass('active');
                    $this.addClass('active');
                    var v = $this.attr('data-value');
                    $('.kr-desktop-chat-panel-content .active').removeClass('active');
                    $('#' + v).addClass('active');

                    chartMap[v.replace('_keren_','')].resize(e);
                }
            });


            $('.kr-desktop-chat').on('click', '.chartItem .tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var id = $this.parent().attr('data-Id');
                var item = chartMap2[id];
                selectedRow = item;
                switchbtn = 3;
                if (text === '编辑') {
                    keren.layerForm({
                        id: 'Form',
                        title: '编辑',
                        url: top.$.rootUrl + '/KR_Desktop/DTChart/Form',
                        width: 600,
                        height: 500,
                        btn: null
                    });
                }
                else {
                    keren.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            keren.deleteForm(top.$.rootUrl + '/KR_Desktop/DTChart/DeleteForm', { keyValue: item.F_Id }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }

            });
            $('#kr-add-chart').on('click', function () {
                selectedRow = null;
                switchbtn = 3;
                keren.layerForm({
                    id: 'Form',
                    title: '添加',
                    url: top.$.rootUrl + '/KR_Desktop/DTChart/Form',
                    width: 600,
                    height: 500,
                    btn: null
                });
            });
        }
    };

    refreshGirdData = function () {
        switch (switchbtn) {
            case 1:
                keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTTarget/GetPageList', {}, function (data) {
                    $('.targetItem').remove();
                    page.target(data || []);
                });
                break;
            case 2:
                keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetPageList', {}, function (data) {
                    $('.listItem').remove();
                    page.list(data || []);
                });
                break;
            case 3:
                keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetPageList', {}, function (data) {
                    $('.chartItem').remove();
                    page.chart(data || []);
                });
                break;
        }
    }

    page.init();
}