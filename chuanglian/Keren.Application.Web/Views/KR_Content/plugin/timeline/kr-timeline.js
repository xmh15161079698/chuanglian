/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：时间轴方法（降序）
 */
$.fn.krtimeline = function (nodelist) {

    // title   标题
    // people  审核人
    // content 内容
    // time    时间

    var $self = $(this);
    if ($self.length == 0) {
        return $self;
    }
    $self.addClass('kr-timeline');
    var $wrap = $('<div class="kr-timeline-allwrap"></div>');
    var $ul = $('<ul></ul>');

    if (nodelist.length > 0) {
        // 开始节点
        var $begin = $('<li class="kr-timeline-header"><div>当前</div></li>')
        $ul.append($begin);

        $.each(nodelist, function (_index, _item) {
            // 中间节点
            var $li = $('<li class="kr-timeline-item" ><div class="kr-timeline-wrap" ></div></li>');
            if (_index == 0) {
                $li.find('div').addClass('kr-timeline-current');
            }
            var $itemwrap = $li.find('.kr-timeline-wrap');
            var $itemcontent = $('<div class="kr-timeline-content"><span class="arrow"></span></div>');
            $itemcontent.append('<div class="kr-timeline-title">' + _item.title + '</div>');
            $itemcontent.append('<div class="kr-timeline-body"><span>' + _item.people + '</span>' + _item.content + '</div>')
            $itemwrap.append('<span class="kr-timeline-date">' + _item.time + '</span>');
            $itemwrap.append($itemcontent);

            var $event = $itemcontent.find('.kr-event');
            if ($event.length > 0) {
                $event[0].krdata = _item;
                $itemcontent.find('.kr-event').on('click', function () {
                    var data = $(this)[0].krdata;
                    data.callback && data.callback(data);
                });
            }
          

            $ul.append($li);



        });

        // 结束节点
        $ul.append('<li class="kr-timeline-ender"><div>开始</div></li>');
    }
    
    $wrap.html($ul);
    $self.html($wrap);

};