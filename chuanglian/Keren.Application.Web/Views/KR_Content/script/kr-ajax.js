/*
 * 版 本 keren-ADMS V7.0.6 可人敏捷开发框架
 * Copyright (c) 2015-2020 成都可人软件有限公司
 * 创建人：可人-前端开发组
 * 日 期：2019.03.16
 * 描 述：ajax操作方法
 */
(function ($, keren) {
    "use strict";
    var httpCode = {
        success: 200,
        fail: 400,
        exception: 500,
        nologin: 410 // 没有登录者信息
    };
    var exres = { code: httpCode.exception, info: '通信异常，请联系管理员！' }
    $.extend(keren, {
        // http 通信异常的时候调用此方法
        httpErrorLog: function (msg) {
            keren.log(msg);
        },
        // http请求返回数据码
        httpCode: httpCode,
        // get请求方法（异步）:url地址,callback回调函数
        httpAsyncGet: function (url, callback) {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var account = '';
            if (loginInfo) {
                account = loginInfo.account;
            }

            $.ajax({
                url: url,
                headers: { account: account },
                type: "GET",
                dataType: "json",
                async: true,
                cache: false,
                success: function (res) {
                    if (res.code == keren.httpCode.nologin) {
                        var _topUrl = top.$.rootUrl + '/Login/Index';
                        switch (res.info) {
                            case 'nologin':
                                break;
                            case 'noip':
                                _topUrl += '?error=ip';
                                break;
                            case 'notime':
                                _topUrl += '?error=time';
                                break;
                            case 'other':
                                _topUrl += '?error=other';
                                break;
                        }
                        top.window.location.href = _topUrl;
                        callback(res);
                        return;
                    }

                    if (res.code == keren.httpCode.exception) {
                        keren.httpErrorLog(res.info);
                        res.info = '系统异常，请联系管理员！';
                    }
                    callback(res);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    keren.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // get请求方法（同步）:url地址,param参数
        httpGet: function (url, param) {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var account = '';
            if (loginInfo) {
                account = loginInfo.account;
            }

            var _res = {};
            $.ajax({
                url: url,
                headers: { account: account },
                data: param,
                type: "GET",
                dataType: "json",
                async: false,
                cache: false,
                success: function (res) {
                    if (res.code == keren.httpCode.nologin) {
                        var _topUrl = top.$.rootUrl + '/Login/Index';
                        switch (res.info) {
                            case 'nologin':
                                break;
                            case 'noip':
                                _topUrl += '?error=ip';
                                break;
                            case 'notime':
                                _topUrl += '?error=time';
                                break;
                            case 'other':
                                _topUrl += '?error=other';
                                break;
                        }
                        top.window.location.href = _topUrl;
                        return {};
                    }

                    if (res.code == keren.httpCode.exception) {
                        keren.httpErrorLog(res.info);
                        res.info = '系统异常，请联系管理员！';
                    }
                    _res = res;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    keren.httpErrorLog(textStatus);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
            return _res;
        },
        // post请求方法（异步）:url地址,param参数,callback回调函数
        httpAsyncPost: function (url, param, callback) {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var account = '';
            if (loginInfo) {
                account = loginInfo.account;
            }

            $.ajax({
                url: url,
                headers: { account: account },
                data: param,
                type: "POST",
                dataType: "json",
                async: true,
                cache: false,
                success: function (res) {
                    if (res.code == keren.httpCode.nologin) {
                        var _topUrl = top.$.rootUrl + '/Login/Index';
                        switch (res.info) {
                            case 'nologin':
                                break;
                            case 'noip':
                                _topUrl += '?error=ip';
                                break;
                            case 'notime':
                                _topUrl += '?error=time';
                                break;
                            case 'other':
                                _topUrl += '?error=other';
                                break;
                        }
                        top.window.location.href = _topUrl;
                        callback(res);
                        return;
                    }

                    if (res.code == keren.httpCode.exception) {
                        keren.httpErrorLog(res.info);
                        res.info = '系统异常，请联系管理员！';
                    }
                    callback(res);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    keren.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // post请求方法（同步步）:url地址,param参数,callback回调函数
        httpPost: function (url, param, callback) {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var account = '';
            if (loginInfo) {
                account = loginInfo.account;
            }

            $.ajax({
                url: url,
                headers: { account: account },
                data: param,
                type: "POST",
                dataType: "json",
                async: false,
                cache: false,
                success: function (res) {
                    if (res.code == keren.httpCode.nologin) {
                        var _topUrl = top.$.rootUrl + '/Login/Index';
                        switch (res.info) {
                            case 'nologin':
                                break;
                            case 'noip':
                                _topUrl += '?error=ip';
                                break;
                            case 'notime':
                                _topUrl += '?error=time';
                                break;
                            case 'other':
                                _topUrl += '?error=other';
                                break;
                        }
                        top.window.location.href = _topUrl;
                        callback(res);
                        return;
                    }


                    if (res.code == keren.httpCode.exception) {
                        keren.httpErrorLog(res.info);
                        res.info = '系统异常，请联系管理员！';
                    }
                    callback(res);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    keren.httpErrorLog(textStatus);
                    callback(exres);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // ajax 异步封装
        httpAsync: function (type, url, param, callback) {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var account = '';
            if (loginInfo) {
                account = loginInfo.account;
            }
            $.ajax({
                url: url,
                headers: { account: account },
                data: param,
                type: type,
                dataType: "json",
                async: true,
                cache: false,
                success: function (res) {
                    if (res.code == keren.httpCode.nologin) {
                        var _topUrl = top.$.rootUrl + '/Login/Index';
                        switch (res.info) {
                            case 'nologin':
                                break;
                            case 'noip':
                                _topUrl += '?error=ip';
                                break;
                            case 'notime':
                                _topUrl += '?error=time';
                                break;
                            case 'other':
                                _topUrl += '?error=other';
                                break;
                        }
                        top.window.location.href = _topUrl;
                        callback(null);
                        return;
                    }

                    if (res.code == keren.httpCode.success) {
                        callback(res.data);
                    }
                    else {
                        keren.httpErrorLog(res.info);
                        if (res.code == keren.httpCode.fail) {
                            keren.alert.error(res.info);  
                        }
                        callback(null);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    keren.httpErrorLog(textStatus);
                    callback(null);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },
        // ajax 同步封装
        httpSync: function (type, url, param, callback) {
            var loginInfo = keren.clientdata.get(['userinfo']);
            var account = '';
            if (loginInfo) {
                account = loginInfo.account;
            }
            $.ajax({
                url: url,
                headers: { account: account },
                data: param,
                type: type,
                dataType: "json",
                async: false,
                cache: false,
                success: function (res) {
                    if (res.code == keren.httpCode.nologin) {
                        var _topUrl = top.$.rootUrl + '/Login/Index';
                        switch (res.info) {
                            case 'nologin':
                                break;
                            case 'noip':
                                _topUrl += '?error=ip';
                                break;
                            case 'notime':
                                _topUrl += '?error=time';
                                break;
                            case 'other':
                                _topUrl += '?error=other';
                                break;
                        }
                        top.window.location.href = _topUrl;
                        callback(null);
                        return;
                    }

                    if (res.code == keren.httpCode.success) {
                        callback(res.data);
                    }
                    else {
                        keren.httpErrorLog(res.info);
                        callback(null);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    keren.httpErrorLog(textStatus);
                    callback(null);
                },
                beforeSend: function () {
                },
                complete: function () {
                }
            });
        },

        deleteForm: function (url, param, callback) {
            keren.loading(true, '正在删除数据');
            keren.httpAsyncPost(url, param, function (res) {
                keren.loading(false);
                if (res.code == keren.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    keren.alert.success(res.info);
                }
                else {
                    keren.alert.error(res.info);
                    keren.httpErrorLog(res.info);
                }
                layer.close(layer.index);
            });
        },
        postForm: function (url, param, callback) {
            keren.loading(true, '正在提交数据');
            keren.httpAsyncPost(url, param, function (res) {
                keren.loading(false);
                if (res.code == keren.httpCode.success) {
                    if (!!callback) {
                        callback(res);
                    }
                    keren.alert.success(res.info);
                    layer.close(layer.index);
                }
                else {
                    keren.alert.error(res.info);
                    keren.httpErrorLog(res.info);
                }
                
            });
        }
    });

})(window.jQuery, top.keren);
