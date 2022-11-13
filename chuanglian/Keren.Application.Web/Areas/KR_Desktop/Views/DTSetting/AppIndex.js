/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.05.28
 * 描 述：移动端桌面统计配置
 */
var refreshGirdData;
var selectedRow = null;
var switchbtn = 1;

var bootstrap = function ($, keren) {
    "use strict";
    var page = {
        init: function () {
            // 加载数据
            $('.content').krscroll();
            keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTTarget/GetPageList', {}, function (data) {
                page.target(data || []);
            });

            keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetPageList', {}, function (data) {
                page.list(data || []);
            });

            keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetPageList', {}, function (data) {
                page.chart(data || []);
            });
            

            page.bind();
        },
        target: function (data) {
            var $btn = $('#kr-add-target');
            $.each(data, function (_index, _item) {
                var _$html = $('\
                    <div class="targetItem targetItem2">\
                        <div class="name">'+ _item.F_Name + '</div>\
                        <div class="number" data-number="'+ _item.F_Id + '"></div>\
                        <div class="tool">\
                            <div>编辑</div>\
                            <div>删除</div>\
                        </div>\
                    </div>');
                _$html[0].item = _item;
                $btn.before(_$html);
                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTTarget/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        $('[data-number="' + data.Id + '"]').text(data.value);
                    }
                });
            });
        },
        list: function (data) {
            var $btn = $('#kr-add-list');
            $.each(data, function (_index, _item) {
                var _$html = $('\
                <div class="kr-black-panel kr-black-panel-list">\
                    <div class="kr-title">'+ _item.F_Name + ' <div class="tool"><div>编辑</div><div>删除</div></div></div>\
                    <div class="kr-content" data-desktop="'+ _item.F_Id + '" ></div>\
                </div>');
                _$html[0].item = _item;
                $btn.before(_$html);
                // 向后台请求数据
                top.keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        var $list = $('[data-desktop="' + data.Id + '"]');
                        $.each(data.value, function (_j, _jitem) {
                            var _itemHtml = '\
                                <div class="kr-list-item kr-dtlist-item">\
                                    <div class="kr-ellipsis">'+ _jitem.f_title + '</div>\
                                    <div class="date">'+ keren.formatDate(_jitem.f_time, 'yyyy-MM-dd') + '</div>\
                                </div>';
                            $list.append(_itemHtml);
                        });

                        $list = null;
                    }
                });

            });
          
        },
        chart: function (data) {
            var $btn = $('#kr-add-chart');
            var chartMap = {};
            $.each(data, function (_index, _item) {
                var _$html = $('\
                <div class="kr-black-panel kr-black-panel-chart">\
                    <div class="kr-title">'+ _item.F_Name + '<div class="tool"><div>编辑</div><div>删除</div></div></div>\
                    <div class="kr-content kr-chart-content">\
                        <div class="kr-chart-container" id="'+ _item.F_Id + '"  data-desktop="' + _item.F_Type + '" ></div>\
                    </div>\
                </div>');

                _$html[0].item = _item;
                $btn.before(_$html);
                chartMap[_item.F_Id] = echarts.init(document.getElementById(_item.F_Id));

                // 获取后台数据
                keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetSqlData', { Id: _item.F_Id }, function (data) {
                    if (data) {
                        var type = $('#' + data.Id).attr('data-desktop');
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
                                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                                };

                                option.legend = {
                                    orient: 'vertical',
                                    left: 'left',
                                    data: legendData
                                };
                                option.series = [{
                                    name: '占比',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: data.value
                                }];
                                option.color = ['#df4d4b', '#304552', '#52bbc8', 'rgb(224,134,105)', '#8dd5b4', '#5eb57d', '#d78d2f'];
                                break;
                            case '1'://折线图
                            case '2'://柱状图
                                option = {
                                    grid: {
                                        top: '20px',
                                        bottom: '10px',
                                        left: '15px',
                                        right: '15px',
                                        containLabel: true
                                    },
                                    xAxis: {
                                        type: 'category',
                                        data: legendData
                                    },
                                    yAxis: {
                                        type: 'value'
                                    },
                                    series: [{
                                        data: valueData,
                                        type: type === '1' ? 'line' : 'bar'
                                    }]
                                };
                                break;
                        }
                        chartMap[data.Id].setOption(option);
                    }
                });

            });
        },
        bind: function () {
            // 统计
            $('.kr-flex-content').on('click', '.tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var item = $this.parents('.targetItem2')[0].item;
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
            $('.content').on('click', '.kr-black-panel-list .tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var item = $this.parents('.kr-black-panel-list')[0].item;
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
            $('.content').on('click', '.kr-black-panel-chart .tool>div', function () {
                var $this = $(this);
                var text = $this.text();
                var item = $this.parents('.kr-black-panel-chart')[0].item;
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
                    $('.kr-flex-content').find('.targetItem2').remove();
                    page.target(data || []);
                });
                break;
            case 2:
                keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTList/GetPageList', {}, function (data) {
                    $('.kr-black-panel-list').remove();
                    page.list(data || []);
                });
                break;
            case 3:
                keren.httpAsync('GET', top.$.rootUrl + '/KR_Desktop/DTChart/GetPageList', {}, function (data) {
                    $('.kr-black-panel-chart').remove();
                    page.chart(data || []);
                });
                break;
        }
    }

    page.init();
}