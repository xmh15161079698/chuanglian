/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：lrdate 时间段选择器 @YY@-当年 @MM@-当月 @DD@-当天 @JJ@-当季度
 */
(function ($, keren) {
    $.krdate = {
        init: function ($self) {
            var dfop = $self[0]._lrdate.dfop;
            $self.html('');
            $self.addClass('kr-search-date');
            var $text = $('<div class="kr-search-date-text" id="kr_search_date_' + dfop.id + '" >请选择日期查询</div>');
            var $container = $('<div class="kr-search-date-container" id="kr_search_date_container_' + dfop.id + '"><div class="kr-search-date-arrow"><div class="kr-search-date-inside"></div></div></div>');

            var $btnlist = $('<div class="kr-search-date-content-btns" id="kr_search_date_content_btns_' + dfop.id + '"></div>');
            var $customDate = $('<div class="kr-search-date-btn-block"><a href="javascript:;" data-value="customDate">自定义</a></div>');

            var $clearDate = $('<div class="kr-search-date-btn-block"><a href="javascript:;" data-value="clearDate">清空</a></div>');
            $btnlist.append($customDate);
            $btnlist.append($clearDate);
            $container.append($btnlist);

            var $datepickerContent = $('<div class="kr-search-date-datepicker-content"></div>');

            var $datepicker1 = $('<div class="kr-search-date-datepicker-container first" id="kr_search_date_datepicker1_' + dfop.id + '"  ></div>');
            var $datepicker2 = $('<div class="kr-search-date-datepicker-container" id="kr_search_date_datepicker2_' + dfop.id + '"  ></div>');
            var $datepickerBtn = $('<div class="kr-search-date-datepicker-btn"><a class="btn btn-primary">确定</a></div>');
            $datepickerContent.append($datepicker1);
            $datepickerContent.append($datepicker2);
            $datepickerContent.append($datepickerBtn);

            $container.append($datepickerContent);

            $self.append($text);
            $self.append($container);
            // 更新为laydate
            laydate.render({
                elem: '#kr_search_date_datepicker1_' + dfop.id
                , position: 'static'
                , showBottom: false
                , theme: '#2F94EE'
                , min: dfop.minDate || '1900-1-1'
                , max: dfop.maxDate || '2099-12-31'
                , change: function (value, date) { //监听日期被切换
                    dfop._begindate = value + " 00:00:00";
                }
            });
            laydate.render({
                elem: '#kr_search_date_datepicker2_' + dfop.id
                , position: 'static'
                , showBottom: false
                , theme: '#2F94EE'
                , min: dfop.minDate || '1900-1-1'
                , max: dfop.maxDate || '2099-12-31'
                , change: function (value, date) { //监听日期被切换
                    dfop._enddate = value + " 23:59:59";
                }
            });


            //WdatePicker({ eCont: 'kr_search_date_datepicker1_' + dfop.id, onpicked: function (dp) { dfop._begindate = dp.cal.getDateStr() + " 00:00:00"; }, minDate: dfop.minDate, maxDate: dfop.maxDate });// 开始时间
            //WdatePicker({ eCont: 'kr_search_date_datepicker2_' + dfop.id, onpicked: function (dp) { dfop._enddate = dp.cal.getDateStr() + " 23:59:59"; }, minDate: dfop.minDate, maxDate: dfop.maxDate });// 结束时间




            /*事件的绑定*/
            $text.on('click', function (e) {
                var $this = $(this);
                var $self = $this.parents('.kr-search-date');
                var dfop = $self[0]._lrdate.dfop;
                var $container = $self.find('#kr_search_date_container_' + dfop.id);
                if ($container.is(':hidden')) {
                    $container.show();
                }
                else {
                    $container.hide();
                }
            });
            $(document).click(function (e) {
                var et = e.target || e.srcElement;
                var $et = $(et);
                if (!$et.hasClass('kr-search-date') && $et.parents('.kr-search-date').length <= 0) {
                    $('.kr-search-date-container').hide();
                }
            });

            $customDate.find('a').on('click', function (e) {
                var $this = $(this);
                var $self = $this.parents('.kr-search-date');
                var dfop = $self[0]._lrdate.dfop;

                $self.find('.kr-search-date-content-btns a.active').removeClass('active');
                $('#kr_search_date_container_' + dfop.id).addClass('width');
                $this.addClass('active');
                $self.find('.kr-search-date-datepicker-content').show();

            });
            $clearDate.find('a').on('click', function (e) {
                var $this = $(this);
                var $self = $this.parents('.kr-search-date');
                var dfop = $self[0]._lrdate.dfop;
                var $container = $self.find('#kr_search_date_container_' + dfop.id);
                var $text = $self.find('#kr_search_date_' + dfop.id);
                $container.hide();
                $self.find('.kr-search-date-content-btns a.active').removeClass('active');
                $text.html("");

                if (!!dfop.selectfn) {
                    dfop.selectfn("1753-01-01", "3000-01-01");
                }

            });

            // 时间确定按钮
            $datepickerBtn.find('a').on('click', function () {
                var $self = $(this).parents('.kr-search-date');
                var dfop = $self[0]._lrdate.dfop;
                var $container = $self.find('#kr_search_date_container_' + dfop.id);
                var $text = $self.find('#kr_search_date_' + dfop.id);
                $container.hide();
                var label = keren.formatDate(dfop._begindate, 'yyyy-MM-dd') + '~' + keren.formatDate(dfop._enddate, 'yyyy-MM-dd');
                $text.html(label);

                if (!!dfop.selectfn) {
                    dfop.selectfn(dfop._begindate, dfop._enddate);
                }
            });
        },
        monthinit: function ($self) {// 月：上月，本月
            var dfop = $self[0]._lrdate.dfop;
            var $btnlist = $('#kr_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="kr-search-date-btn-block"></div>');
            if (dfop.premShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="preM">上月</a>');
            }
            if (dfop.mShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="currentM">本月</a>');
            }
            $btnlist.prepend($block);
            dfop = null;
        },
        jinit: function ($self) {// 季度
            var dfop = $self[0]._lrdate.dfop;
            var $btnlist = $('#kr_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="kr-search-date-btn-block"></div>');
            if (dfop.prejShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="preJ">上季度</a>');
            }
            if (dfop.jShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="currentJ">本季度</a>');
            }
            $btnlist.prepend($block);
            dfop = null;
        },
        yinit: function ($self) {
            var dfop = $self[0]._lrdate.dfop;
            var $btnlist = $('#kr_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="kr-search-date-btn-block"></div>');
            if (dfop.ysShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="yS">上半年</a>');
            }
            if (dfop.yxShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="yX">下半年</a>');
            }
            if (dfop.preyShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="preY">去年</a>');
            }
            if (dfop.yShow) {
                $block.append('<a href="javascript:;" class="datebtn" data-value="currentY">今年</a>');
            }
            $btnlist.prepend($block);
            dfop = null;
        },
        custmerinit: function ($self) {
            var dfop = $self[0]._lrdate.dfop;
            var $btnlist = $('#kr_search_date_content_btns_' + dfop.id);
            var $block = $('<div class="kr-search-date-btn-block"></div>');

            for (var i = 0, l = dfop.dfdata.length; i < l; i++) {
                var item = dfop.dfdata[i];
                if (item) {
                    $block.append('<a href="javascript:;" class="datebtn" data-value="' + i + '">' + item.name + '</a>');
                }

            }

            $btnlist.prepend($block);
            dfop = null;
        },
        bindEvent: function ($self) {
            $self.find('.datebtn').on('click', function () {
                var $this = $(this);
                var $self = $this.parents('.kr-search-date');
                var value = $this.attr('data-value');
                $.krdate.select($self, value);
            });
        },
        select: function ($self, value) {
            var dfop = $self[0]._lrdate.dfop;
            var $container = $self.find('#kr_search_date_container_' + dfop.id);
            var $text = $self.find('#kr_search_date_' + dfop.id);
            var $btnlist = $('#kr_search_date_content_btns_' + dfop.id);
            $btnlist.find('.active').removeClass('active');
            var $this = $btnlist.find('.datebtn[data-value="' + value + '"]').addClass('active');
            switch (value) {
                case 'preM':
                    var d = keren.getPreMonth();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'currentM':
                    var d = keren.getMonth();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'preJ':
                    var d = keren.getPreQuarter();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'currentJ':
                    var d = keren.getCurrentQuarter();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'yS':
                    var d = keren.getFirstHalfYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'yX':
                    var d = keren.getSecondHalfYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'preY':
                    var d = keren.getPreYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                case 'currentY':
                    var d = keren.getYear();
                    dfop._begindate = d.begin;
                    dfop._enddate = d.end;
                    break;
                default:
                    var rowid = parseInt(value);
                    var data = dfop.dfdata[rowid];

                    dfop._begindate = data.begin();
                    dfop._enddate = data.end();
                    break;
            }
            $container.hide();
            var label = keren.formatDate(dfop._begindate, 'yyyy-MM-dd') + '~' + keren.formatDate(dfop._enddate, 'yyyy-MM-dd');
            $text.html(label);
            $('#kr_search_date_container_' + dfop.id).removeClass('width');
            $self.find('.kr-search-date-datepicker-content').hide();
            if (!!dfop.selectfn) {
                dfop.selectfn(dfop._begindate, dfop._enddate);
            }
        }
    };

    $.fn.krdate = function (op) {
        var dfop = {
            // 自定义数据
            dfdata: [],
            // 月
            mShow: true,
            premShow: true,
            // 季度
            jShow: true,
            prejShow: true,
            // 年
            ysShow: true,
            yxShow: true,
            preyShow: true,
            yShow: true,

            dfvalue: -1,//preM,currentM,preJ,currentJ,yS,yX,preY,currentY,
            selectfn: false,

            minDate: '',
            maxDate: '',


        };
        $.extend(dfop, op || {});
        var $self = $(this);
        dfop.id = $self.attr('id');
        if (!dfop.id) {
            return false;
        }
        $self[0]._lrdate = { "dfop": dfop };
        $.krdate.init($self);

        $.krdate.yinit($self);
        $.krdate.jinit($self);
        $.krdate.monthinit($self);

        $.krdate.custmerinit($self);

        $.krdate.bindEvent($self);

        if (dfop.dfvalue != -1) {
            $.krdate.select($self, dfop.dfvalue);
        }
        return $self;
    };
    // 兼容之前的写法
    window.WdatePicker = function (op) {
        var e = window.event || arguments.callee.caller.arguments[0];
        if (e) {
            var obj = e.target || e.srcElement;
            var $obj = $(obj);
            if (!$obj.hasClass('kr-laydate-init')) {
                op = op || {};
                op.dateFmt = op.dateFmt || 'yyyy-MM-dd';

                var _type = 'date';
                if (op.dateFmt == 'yyyy-MM-dd HH:mm' || op.dateFmt == 'yyyy-MM-dd HH:mm:ss') {
                    _type = 'datetime';
                }
               
               
                laydate.render({
                    elem: obj,
                    trigger: 'click',
                    theme: '#2F94EE',
                    format: op.dateFmt,
                    type: _type,
                    min: op.minDate || '1900-1-1',
                    max: op.maxDate || '2099-12-31',
                    done: function () {
                        console.log('test')
                        // 只修改了这
                        setTimeout(function () {
                            $obj.trigger('change');
                        }, 100);
                    }
                });
                $obj.addClass('kr-laydate-init');
                if (e.type == 'click') {
                    setTimeout(function () {
                        $obj.trigger('click');
                    }, 100);
                    return false;
                }
            }
        }
    }


})(jQuery, top.keren);
