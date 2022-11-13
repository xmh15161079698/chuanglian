/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.04.05
 * 描 述：自定义开发模板	
 */
var postData = {};

// 加载模板用到的参数
var schemaId = request('schemaId');//模板ID
var schemaData = {};//模板数据
var isLoadTable = false;

var bootstrap = function ($, keren) {
    "use strict";
    var databaseLinkId = '';

    var rootDirectory = $('#rootDirectory').val();
    var gstrSql = '';

    var queryAllComponts = [];
    var queryAllCompontMap = {};

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        initData: function () {
            if (!!schemaId) {
                keren.httpAsync('GET', top.$.rootUrl + '/KR_CodeGeneratorModule/CodeSchema/GetFormData', { keyValue: schemaId }, function (data) {
                    var jsonStr = data.KR_Base_CodeSchema.F_CodeSchema;
                    page.renderSchema(JSON.parse(jsonStr));
                });

            }
        },
        renderSchema: function (schema) {
            schemaData = schema;
            schemaData.queryData = JSON.parse(schemaData.queryData);
            schemaData.colData = JSON.parse(schemaData.colData);
            schemaData.baseInfo = JSON.parse(schemaData.baseInfo);
            // 标志加载数据表数据
            isLoadTable = true;

            $('#dbId').krselectSet(schema.databaseLinkId);
            $('#strSql').val(schemaData.strSql);


            $('#colgrid').jfGridSet('refreshdata', schemaData.colData );

            // 加载条件配置
            if (schemaData.queryData.isDate == "1") {
                $('[name="queryDatetime"][value="1"]').trigger('click');
                $('#queryDatetime').krselectSet(schemaData.queryData.DateField);
            }
            $('#queryWidth').val(schemaData.queryData.width);
            $('#queryHeight').val(schemaData.queryData.height);

            $('#query_girdtable').jfGridSet('refreshdata', schemaData.queryData.fields);


            // 基础信息
            $('#name').val(schemaData.baseInfo.name);
            $('#describe').val(schemaData.baseInfo.describe);
            $('#outputArea').krselectSet(schemaData.baseInfo.outputArea);
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            // 加载导向
            $('#wizard').wizard().on('change', function (e, data) {
                var $finish = $("#btn_finish");
                var $next = $("#btn_next");
                if (data.direction == "next") {
                    if (data.step == 1) {
                        var strSql = $('#strSql').val();
                        if (databaseLinkId == '') {
                            keren.alert.error('请选择数据库！');
                            return false;
                        }

                        if (strSql == '') {
                            keren.alert.error('请填写SQL语句！');
                            return false;
                        }   
                        if (gstrSql != strSql) {
                            gstrSql = strSql;
                            $('#colgrid').jfGridSet('refreshdata', []);
                            keren.httpAsync('GET', top.$.rootUrl + '/KR_SystemModule/DatabaseTable/GetSqlColName', { databaseLinkId: databaseLinkId, strSql: strSql }, function (data) {
                                var fieldData = [];
                                for (var i = 0, l = data.length; i < l; i++) {
                                    var id = data[i];
                                    var selectpoint = { name: id, field: id, width: '100' };
                                    fieldData.push(selectpoint);
                                }
                                $('#colgrid').jfGridSet('refreshdata', fieldData);
                            });
                        }
                    }
                    else if (data.step == 2) {
                        var data = $('#colgrid').jfGridGet('rowdatas');
                        $('#queryDatetime').krselectRefresh({ data: data });

                        queryAllComponts = data;
                        queryAllCompontMap = {};
                        $.each(queryAllComponts, function (_index, _item) {
                            queryAllCompontMap[_item.field] = _item.name;
                        });                       

                    }
                    else if (data.step == 3) {
                    }
                    else if (data.step == 4) {
                        if (!$('#step-4').krValidform()) {
                            return false;
                        }
                        $("#btn_save").removeAttr('disabled');
                        postData.databaseLinkId = databaseLinkId;
                        postData.strSql = $('#strSql').val();

                        // 列表配置信息
                        var colData = $('#colgrid').jfGridGet('rowdatas');
                        postData.colData = JSON.stringify(colData);
                        // 条件配置信息
                        var queryDataTmp = $('#query_girdtable').jfGridGet('rowdatas');
                        var _queryList = [];
                        $.each(queryDataTmp, function (_index, _item) {
                            if (_item.field) {
                                var point = { field: _item.field, name: queryAllCompontMap[_item.field], portion: _item.portion };
                                _queryList.push(point);
                            }
                        });
                        var _querySetting = {
                            width: $('#queryWidth').val(),
                            height: $('#queryHeight').val(),
                            isDate: $('[name="queryDatetime"]:checked').val(),
                            DateField: $('#queryDatetime').krselectGet(),
                            fields: _queryList
                        };
                        postData.queryData = JSON.stringify(_querySetting);
                        // 基础配置信息
                        var baseInfo = $('#step-4').krGetFormData();
                        postData.baseInfo = JSON.stringify(baseInfo);
                        
                        keren.httpAsyncPost(top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/LookReportCode', postData, function (res) {
                            if (res.code == 200) {
                                $.each(res.data, function (id, item) {
                                    $('#' + id).html('<textarea name="SyntaxHighlighter" class="brush: c-sharp;">' + item + '</textarea>');
                                });
                                SyntaxHighlighter.highlight();
                            }
                        });
                    }
                    else if (data.step == 5) {
                        $finish.removeAttr('disabled');
                        $next.attr('disabled', 'disabled');
                    }
                    else {
                        $finish.attr('disabled', 'disabled');
                    }
                } else {
                    $finish.attr('disabled', 'disabled');
                    $next.removeAttr('disabled');
                }
            });

            // 数据表选择
            $('#dbId').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/DatabaseLink/GetTreeList',
                type: 'tree',
                placeholder: '请选择数据库',
                allowSearch: true,
                select: function (item) {
                    if (item.hasChildren) {
                        databaseLinkId = '';
                    }
                    else if (dbId != item.id) {
                        databaseLinkId = item.id;
                    }
                }
            });
            $('#colgrid').jfGrid({
                headData: [
                    {
                        label: "", name: "btn1", width: 52, align: "center",
                        formatter: function (value, row, op, $cell) {
                            $cell.on('click', function () {
                                var rowindex = parseInt($cell.attr('rowindex'));
                                var res = $('#colgrid').jfGridSet('moveUp', rowindex);
                                return false;
                            });
                            return '<span class=\"label label-info\" style=\"cursor: pointer;\">上移</span>';
                        }
                    },
                    {
                        label: "", name: "btn2", width: 52, align: "center",
                        formatter: function (value, row, op, $cell) {
                            $cell.on('click', function () {
                                var rowindex = parseInt($cell.attr('rowindex'));
                                var res = $('#colgrid').jfGridSet('moveDown', rowindex);
                                return false;
                            });
                            return '<span class=\"label label-success\" style=\"cursor: pointer;\">下移</span>';
                        }
                    },
                    {
                        label: "名称", name: "name", width: 200, align: "left",
                        edit: {
                            type: 'input'
                        }
                    },
                    {
                        label: "字段", name: "field", width: 160, align: "left",
                        edit: {
                            type: 'input'
                        }
                    },
                    {
                        label: "宽度", name: "width", width: 160, align: "left",
                        edit: {
                            type: 'input'
                        }
                    },
                    
                ],
                mainId: 'field'
            });

            // 条件信息设置
            $('#queryDatetime').krselect({
                value: 'field',
                text: 'name',
                title: 'name',
                allowSearch: true
            });
            $('#query_girdtable').jfGrid({
                headData: [
                    {
                        label: "", name: "btn1", width: 50, align: "center",
                        formatter: function (value, row, op, $cell) {
                            $cell.on('click', function () {
                                var rowindex = parseInt($cell.attr('rowindex'));
                                var res = $('#query_girdtable').jfGridSet('moveUp', rowindex);
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
                                var res = $('#query_girdtable').jfGridSet('moveDown', rowindex);
                                return false;
                            });
                            return '<span class=\"label label-success\" style=\"cursor: pointer;\">下移</span>';
                        }
                    },
                    {
                        label: "字段项名称", name: "field", width: 300, align: "left",
                        formatter: function (value, row, op, $cell) {
                            return queryAllCompontMap[row.field] || '';
                        },
                        edit: {
                            type: 'select',
                            init: function (row, $self) {// 选中单元格后执行
                                $self.krselectRefresh({
                                    data: queryAllComponts
                                });
                            },
                            op: {
                                value: 'field',
                                text: 'name',
                                title: 'name',
                                allowSearch: true
                            },
                            change: function (rowData, rowIndex, item) {
                                if (item != null) {
                                    rowData.id = item.table + item.field;
                                }
                                else {
                                    rowData.id = '';
                                }
                            }
                        }
                    },
                    {
                        label: "所占行比例", name: "portion", width: 150, align: "left",
                        edit: {
                            type: 'select',
                            op: {
                                placeholder: false,
                                data: [
                                    {
                                        id: '1', text: '1/1'
                                    },
                                    {
                                        id: '2', text: '1/2'
                                    },
                                    {
                                        id: '3', text: '1/3'
                                    },
                                    {
                                        id: '4', text: '1/4'
                                    },
                                    {
                                        id: '6', text: '1/6'
                                    }
                                ]
                            }
                        },
                        formatter: function (value, row, op, $cell) {
                            if (!!value) {
                                return '1/' + value;
                            }
                            else {
                                return '';
                            }
                        }
                    }
                ],
                onAddRow: function (row, rows) {
                    row.portion = '1';
                },
                mainId: 'id',
                isEdit: true,
                isMultiselect: true
            });

            // 基础信息配置
            var loginInfo = keren.clientdata.get(['userinfo']);
            $('#createUser').val(loginInfo.realName);
            $('#outputArea').krDataItemSelect({ code: 'outputArea' });

            $('#mappingDirectory').val(rootDirectory + $('#_mappingDirectory').val());
            $('#serviceDirectory').val(rootDirectory + $('#_serviceDirectory').val());
            $('#webDirectory').val(rootDirectory + $('#_webDirectory').val());

            // 代码查看
            $('#nav_tabs').krFormTabEx();
            $('#tab_content>div').krscroll();
            // 发布功能
            // 上级
            $('#F_ParentId').krselect({
                url: top.$.rootUrl + '/KR_SystemModule/Module/GetExpendModuleTree',
                type: 'tree',
                maxHeight: 280,
                allowSearch: true
            });
            // 选择图标
            $('#selectIcon').on('click', function () {
                keren.layerForm({
                    id: 'iconForm',
                    title: '选择图标',
                    url: top.$.rootUrl + '/Utility/Icon',
                    height: 700,
                    width: 1000,
                    btn: null,
                    maxmin: true,
                    end: function () {
                        if (top._kerenSelectIcon != '') {
                            $('#F_Icon').val(top._kerenSelectIcon);
                        }
                    }
                });
            });
            // 保存数据按钮
            $("#btn_finish").on('click', page.save);

            // 保存模板
            $("#btn_save").on('click', function () {
                keren.layerForm({
                    id: 'codeform',
                    title: '保存模板',
                    url: top.$.rootUrl + '/KR_CodeGeneratorModule/CodeSchema/Form?F_Type=5',// 1.移动模板2.自定义模板3.工作流系统表单模板4.Excel风格模板5.报表模板
                    width: 600,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick();
                    }
                });
            });
        },
        /*保存数据*/
        save: function () {
            var moduleData = $('#step-6').krGetFormData();
            moduleData.F_EnabledMark = 1;
            postData.moduleEntityJson = JSON.stringify(moduleData);
            $.krSaveForm(top.$.rootUrl + '/KR_CodeGeneratorModule/TemplatePC/CreateReportCode', postData, function (res) {

            });
        }
    };

    page.init();
}