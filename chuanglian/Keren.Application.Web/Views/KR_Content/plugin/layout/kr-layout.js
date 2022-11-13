/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.12
 * 描 述：lrLayout 页面布局插件
 */
(function ($, keren) {
    "use strict";

    $.fn.krLayout = function (op) {
        var dfop = {
            blocks: [
                {
                    target: '.kr-layout-left',
                    type: 'right',
                    size: 203
                }
            ]
        };
        $.extend(dfop, op || {});
        var $this = $(this);
        if ($this.length <= 0) {
            return false;
        }
        $this[0]._lrLayout = { "dfop": dfop };
        dfop.id = "krlayout" + new Date().getTime();

        for (var i = 0, l = dfop.blocks.length; i < l; i++) {
            var _block = dfop.blocks[i];
            $this.children(_block.target).append('<div class="kr-layout-move kr-layout-move-' + _block.type + ' " path="' + i + '"  ></div>');
        }

        $this.on('mousedown', function (e) {
            var et = e.target || e.srcElement;
            var $et = $(et);
            var $this = $(this);
            var dfop = $this[0]._lrLayout.dfop;
            if ($et.hasClass('kr-layout-move')) {
                var _index = $et.attr('path');
                dfop._currentBlock = dfop.blocks[_index];
                dfop._ismove = true;
                dfop._pageX = e.pageX;
            }
        });

        $this.mousemove(function (e) {
            var $this = $(this);
            var dfop = $this[0]._lrLayout.dfop;
            if (!!dfop._ismove) {
                var $block = $this.children(dfop._currentBlock.target);
                $block.css('width', dfop._currentBlock.size + (e.pageX - dfop._pageX));
                $this.css('padding-left', dfop._currentBlock.size + (e.pageX - dfop._pageX));
            }
        });

        $this.on('click', function (e) {
            var $this = $(this);
            var dfop = $this[0]._lrLayout.dfop;
            if (!!dfop._ismove) {
                dfop._currentBlock.size += (e.pageX - dfop._pageX);
                dfop._ismove = false;
            }
        });
    }
})(jQuery, top.keren);
