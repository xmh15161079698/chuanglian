/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.22
 * 描 述：插件演示页面	
 */
var bootstrap = function ($, keren) {
    "use strict";
   
    var page = {
        init: function () {
            page.bind();
            page.initLeftTree();

            //$('#test').on('click', function () {
            //    $('#select4').krselectSet('');
            //});
        },
        bind: function () {
            $(".kr-tab-scroll-content").krscroll();
        },
        initLeftTree: function () {
            $('#plugin_list').krtree({
                data: pluginList,
                nodeClick: function (item) {
                    switch (item.value)
                    {
                        case 'kerentree':
                            $('#title_info').text(item.text);
                            $('#keren_tree_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#keren_tree_area').addClass('active');
                            pluginlist.treeinit();
                            break;
                        case 'kerenselect':
                            $('#title_info').text(item.text);
                            $('#keren_select_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#keren_select_area').addClass('active');
                            pluginlist.selectinit();
                            break;
                        case 'kerenuserselect':
                            $('#title_info').text(item.text);
                            $('#keren_selectuser_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#keren_selectuser_area').addClass('active');
                            pluginlist.selectUserinit();
                            break;
                        case 'jfGrid':
                            $('#title_info').text(item.text);
                            $('#jfgrid_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#jfgrid_area').addClass('active');
                            pluginlist.jfgridinit();
                            break;
                        case 'webUploader':
                            $('#title_info').text(item.text);
                            $('#uploader_area').parent().find('.showarea-list-item.active').removeClass('active');
                            $('#uploader_area').addClass('active');
                            pluginlist.uploaderInit();
                            break;
                    }
                }
            });
        }
    };

    //树插件
    var treeCode = {
        base:
            function () {
                $('#tree_show_base').krtree({
                    data: [{
                        id: '0',
                        text: '父节点',
                        value: 'no',
                        hasChildren: true,
                        isexpand: true,
                        complete: true,
                        ChildNodes: [
                            {
                                id: '1',
                                text: '子节点一',
                                value: 'kerentree',
                                hasChildren: true,
                                isexpand: true,
                                complete: true,
                                ChildNodes: [
                                    {
                                        id: '2',
                                        text: '子节点二',
                                        value: 'kerentree',
                                        complete: true
                                    }
                                ]
                            }
                        ]
                    }]
                });
            },
        ajax:
            function () {
                $('#tree_show_ajax').krtree({
                    url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetClassifyTree'
                });
            },
        checkbox:
            function () {
                $('#tree_show_checkbox').krtree({
                    data: [{
                        id: '0',
                        text: '父节点',
                        value: 'no',
                        showcheck: true,
                        hasChildren: true,
                        isexpand: true,
                        complete: true,
                        ChildNodes: [
                            {
                                id: '1',
                                text: '子节点一',
                                value: 'kerentree',
                                hasChildren: true,
                                isexpand: true,
                                complete: true,
                                ChildNodes: [
                                    {
                                        id: '2',
                                        text: '子节点二',
                                        value: 'kerentree',
                                        showcheck: true,
                                        complete: true
                                    },
                                    {
                                        id: '3',
                                        text: '子节点三',
                                        value: 'kerentree',
                                        showcheck: true,
                                        complete: true
                                    }, {
                                        id: '4',
                                        text: '子节点四',
                                        value: 'kerentree',
                                        showcheck: true,
                                        complete: true
                                    }
                                ]
                            },
                            {
                                id: '11',
                                text: '子节点一一',
                                value: 'kerentree',
                                showcheck: true,
                                hasChildren: true,
                                isexpand: true,
                                complete: true,
                                ChildNodes: [
                                    {
                                        id: '12',
                                        text: '子节点一二',
                                        value: 'kerentree',
                                        showcheck: true,
                                        complete: true
                                    }
                                ]
                            }
                        ]
                    }]
                });
            }
    };

    // jfgrid
    var initGrid = function () {
        $('#keren_jfgrid').jfGrid({
            isPage:true,

            isMultiselect: true,

            isSubGrid: true,    // 是否有子表单
            subGridRowExpanded: function () {

            },
            rowdatas: [
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 },
                { A: 'ra1', B1: 'rb11', B21: 'rb211', B22: 'rb221', C: 'rc1', D1: 'rd11', D2: 'rd21', E: 1 }
            ],
            headData: [
                { label: 'A', name: 'A', width: 80, align: 'left', frozen: true },
                {
                    label: 'B', name: 'B', width: 80, align: 'center', frozen: true,
                    children: [
                         { label: 'B1', name: 'B1', width: 80, align: 'center' },
                         {
                             label: 'B2', name: 'B2', width: 80, align: 'center',
                             children: [
                                  { label: 'B21', name: 'B21', width: 80, align: 'center' },
                                  {
                                      label: 'B21', name: 'B22', width: 80, align: 'center'
                                  }
                             ]
                         }
                    ]
                },
                { label: 'C', name: 'C', width: 80, align: 'right' },
                {
                    label: 'D', name: 'D', width: 80, align: 'center',
                    children: [
                        { label: 'D1', name: 'D1', width: 80, align: 'center' },
                        { label: 'D2', name: 'D2', width: 80, align: 'center' }
                    ]
                },
                {
                    label: "E", name: "E", width: 300, align: "left",
                    formatter: function (cellvalue, row,op, $cell) {
                        $cell.hover(function () {
                            layer.tips("wwww.cdkeren.com", $(this));
                        }, function () {
                            layer.closeAll('tips');
                        });

                        return cellvalue == 1 ? '<i class=\"fa fa-toggle-on\"></i>' : '<i class=\"fa fa-toggle-off\"></i>';
                    }
                }
            ]
        });
    };


    var pluginlist = {
        treeinit: function () {
            treeCode.base();

            treeCode.ajax();

            treeCode.checkbox();
        },
        selectinit: function () {
            var dfop = {
                type: 'tree',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/KR_OrganizationModule/Company/GetTree',
                // 访问数据接口参数
                param: { parentId: '0' }
            };
            $('#select1').krselect(dfop);


            var dfop2 = {
                // 字段
                value: "F_AreaCode",
                text: "F_AreaName",
                title: "F_AreaName",
                // 展开最大高度
                maxHeight: 10,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/KR_SystemModule/Area/Getlist',
                // 访问数据接口参数
                param: { parentId: '' },
            }

            $('#select2').krselect(dfop2);

            $('#select4').krselect({
                // 字段
                value: "F_AreaCode",
                text: "F_AreaName",
                title: "F_AreaName",
                type: 'multiple',
                // 展开最大高度
                maxHeight: 200,
                // 是否允许搜索
                allowSearch: true,
                // 访问数据接口地址
                url: top.$.rootUrl + '/KR_SystemModule/Area/Getlist',
                // 访问数据接口参数
                param: { parentId: '' },
            });

            $('#select5').krGirdSelect({
                // 字段
                url: top.$.rootUrl + '/KR_SystemModule/DataItem/GetDetailList',
                param: { itemCode: 'Client_ProductInfo' },
                selectWord: 'F_ItemName',
                value: 'F_ItemValue',
                text: 'F_ItemName',
                headData: [{ label: "商品编号", name: "F_ItemValue", width: 100, align: "left" },
                    { label: "商品名称", name: "F_ItemName", width: 450, align: "left" }],
                select: function (item) {
                    
                }

            });

            $('#select3').krselect({
                type: 'treemultiple',
                allowSearch: true,
                //type: 'tree',
                select: function (items) {
                    $('#select4').krselectSet('');
                },
                data: [{
                    id: '0',
                    text: '父节点',
                    value: 'no',
                    showcheck: true,
                    hasChildren: true,
                    isexpand: true,
                    complete: true,
                    ChildNodes: [
                        {
                            id: '1',
                            text: '子节点一',
                            value: 'kerentree',
                            hasChildren: true,
                            isexpand: true,
                            complete: true,
                            ChildNodes: [
                                {
                                    id: '2',
                                    text: '子节点二',
                                    value: 'kerentree',
                                    showcheck: true,
                                    complete: true
                                },
                                {
                                    id: '3',
                                    text: '子节点三',
                                    value: 'kerentree',
                                    showcheck: true,
                                    complete: true
                                }, {
                                    id: '4',
                                    text: '子节点四',
                                    value: 'kerentree',
                                    showcheck: true,
                                    complete: true
                                }
                            ]
                        },
                        {
                            id: '11',
                            text: '子节点一一',
                            value: 'kerentree',
                            showcheck: true,
                            hasChildren: true,
                            isexpand: true,
                            complete: true,
                            ChildNodes: [
                                {
                                    id: '12',
                                    text: '子节点一二',
                                    value: 'kerentree',
                                    showcheck: true,
                                    complete: true
                                }
                            ]
                        }
                    ]
                }],
                height: 300
            });

            $('#select6').krlayerselect({
                treeCode: 'dataitemc',
                treeParentId: 'f_parentid',
                treeValueId: 'f_itemid',
                treeTextId: 'f_itemname',
                
                dataCode: 'dataitem',
                dataTreeId: 'f_itemid',
                dataValueId: 'f_itemdetailid',
                dataTextId: 'f_itemname',

                grid: [
                    { label: '项目名', name: 'f_itemname', width: 175, align: 'left' },
                    { label: '项目值', name: 'f_itemvalue', width: 175, align: 'left' },
                    { label: "备注", name: "f_description", width: 200, align: "left" }
                ],
                select: function (values, texts) {
                }

            });
            $('#select7').krlayerselect({
                treeCode: 'dataitemc',
                treeParentId: 'f_parentid',
                treeValueId: 'f_itemid',
                treeTextId: 'f_itemname',

                dataCode: 'dataitem',
                dataTreeId: 'f_itemid',
                dataValueId: 'f_itemdetailid',
                dataTextId: 'f_itemname',

                grid: [
                    { label: '项目名', name: 'f_itemname', width: 175, align: 'left' },
                    { label: '项目值', name: 'f_itemvalue', width: 175, align: 'left' },
                    { label: "备注", name: "f_description", width: 200, align: "left" }
                ],
                select: function (values, texts) {
                },
                isMultiple: false

            });
        },
        selectUserinit: function () {
            $('#selectuser1').krformselect({
                layerUrl: top.$.rootUrl + '/KR_OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl:''
            });
        },
        jfgridinit:function(){
            initGrid();
        },
        uploaderInit: function () {
            $('#keren_uploader').krUploader();
        }
    }

    page.init();
}