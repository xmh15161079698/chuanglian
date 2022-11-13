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
            $(".kr-desktop-panel").krscroll();
            $('#kr_target').krscroll();
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


           
        },
        target: function (data) {
            var itemW = 210;
            var allw = 0;

            var w = $('#kr_target').width() - 10;
            var itemW = w / data.length;
            if (itemW < 210) {
                itemW = 210;
            }
            allw = itemW * data.length;
            var $target = $('#kr_target .kr-scroll-box');
            $target.css('width', allw);
            targetMap = {};
            $.each(data, function (_index, _item) {
                targetMap[_item.F_Id] = _item;
                var _html = '\
                <div class="kr-item-20 targetItem">\
                    <div class="task-stat" >\
                        <div class="visual">\
                            <i class="'+ _item.F_Icon + '"></i>\
                        </div>\
                        <div class="details">\
                            <div class="number" data-value="'+ _item.F_Id + '"></div>\
                            <div class="desc">'+ _item.F_Name + '</div>\
                        </div>';
                if (_item.F_Url) {
                    _html += '<a class="more" data-Id="' + _item.F_Id + '" >\
                            查看更多 <i class="fa fa-arrow-circle-right"></i>\
                        </a>';
                }
                _html += '\
                    <div class="tool" data-Id="' + _item.F_Id + '">\
                        <div>编辑</div>\
                        <div>删除</div>\
                    </div>';

                _html += '</div>\
                </div>';

                $target.append(_html);
                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTTarget/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        $target.find('[data-value="' + data.Id + '"]').text(data.value);
                    }
                });
            });
            $target.find('.kr-item-20 .more').on('click', function () {
                var Id = $(this).attr('data-Id');
                top.keren.frameTab.open({ F_ModuleId: Id, F_FullName: targetMap[Id].F_Name, F_UrlAddress: targetMap[Id].F_Url });
                return false;
            });
            $target.find('.kr-item-20').css('width', itemW);
            $('#kr_target').resize(function () {
                var w = $('#kr_target').width() - 10;
                var itemW = w / data.length;
                if (itemW < 210) {
                    itemW = 210;
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
                <div class="col-xs-6 listItem" data-Id="'+ _item.F_Id + '">\
                    <div class="portal-panel-title">\
                        <i class="'+ _item.F_Icon + '"></i>&nbsp;&nbsp;' + _item.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div>\
                    </div>\
                    <div class="portal-panel-content" style="overflow: hidden; padding-top: 20px; padding-left: 30px; padding-right: 50px;height:225px;" data-value="'+ _item.F_Id + '" >\
                    </div>\
                </div>';
                $btn.before(_html);
                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        var $content = $('[data-value="' + data.Id + '"]');
                        $.each(data.value, function (_index, _item) {
                            var _html = '\
                            <div class="kr-msg-line">\
                                <a href="#" style="text-decoration: none;" >' + _item.f_title + '</a>\
                                <label>'+ _item.f_time + '</label>\
                            </div>';

                            var _$html = $(_html);
                            _$html.find('a')[0].item = _item;
                            $content.append(_$html);
                        });
                    }
                });
            });
        },
        chart: function (data) {
            var $btn = $('#kr-add-chart');
            chartMap = {};
            chartMap2 = {};
            $.each(data, function (_index, _item) {
                chartMap2[_item.F_Id] = _item;
                var _html = '\
                <div class="col-xs-'+ (12 / parseInt(_item.F_Proportion1)) + '  chartItem" data-Id="' + _item.F_Id + '">\
                    <div class="portal-panel-title">\
                        <i class="'+ _item.F_Icon + '"></i>&nbsp;&nbsp;' + _item.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div>\
                    </div>\
                    <div class="portal-panel-content">\
                        <div id="'+ _item.F_Id + '" class="kr-chart-container" data-type="' + _item.F_Type + '"   ></div>\
                    </div>\
                </div>';

                $btn.before(_html);

                chartMap[_item.F_Id] = echarts.init(document.getElementById(_item.F_Id));

                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        var type = $('#' + data.Id).attr('data-type');
                        var legendData = [];
                        var valueData = [];
                        $.each(data.value, function (_index, _item) {
                            legendData.push(_item.name);
                            valueData.push(_item.value);
                        });

                        var option = {};
                        switch (type) {
                            case '0'://饼图
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
            $('#kr_target').on('click', '.tool>div', function () {
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
            $('.kr-desktop-panel').on('click', '.listItem .tool>div', function () {
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
            $('.kr-desktop-panel').on('click', '.chartItem .tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var id = $this.parents('.chartItem').attr('data-Id');
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