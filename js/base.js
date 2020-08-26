// window.basePath = 'http://localhost:8001'
window.basePath = 'http://www.luckymorning.cn'
window.version = 0;
window.device = 'web';
window.Authorization = localStorage.getItem('Authorization');
window.host = "";
if (localStorage.getItem("userInfo")){
    window.userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

document.write('<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>');
document.write('<script src="' + window.host + '/js/os-version.js"></script>');

/**
 * 清除登录信息
 */
window.clearAuthorization = function () {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("Authorization.refresh");
    localStorage.removeItem("password");
    localStorage.removeItem("firstLoginTime");
    localStorage.removeItem("uuid");
    localStorage.removeItem("userInfo");
}

let OSData = null;
/**
 * 获取操作系统信息
 * @returns
 */
window.getDevice = function () {
    if (OSData == null) {
        OSData = {};
        setOsData(OSData);
    }
    return OSData;
}

/**
 * 检测返回数据是否出错
 * @param data 返回数据
 */
window.checkError = function (data) {
    if (data.errcode !== 0) {
        switch (data.errcode) {
            case 4012:
                //权鉴失败
                layer.msg('权鉴失败！', function (e) {
                    window.goToLogin(true);
                });
                return false;
            case 4013:
                //登录过期
                window.refreshLogin(true,function (success) {
                    if (!success){
                        window.goToLogin(true);
                    }
                });
                return false;
        }
        return false;
    }
    return true;
}

/**
 * 进入登录页面
 * @param isCallBack 登录成功后是否回调到当前页面
 */
window.goToLogin = function (isCallBack) {
    if (isCallBack) {
        window.top.location.href = window.host + "/page/login.html?callback=" + window.top.location.href;
    } else {
        window.top.location.href = window.host + "/page/login.html";
    }
}

/**
 * 重新登录
 * @param isRefreshHtml 是否刷新当前页面
 * @param successCallBack
 */
window.refreshLogin = function (isRefreshHtml, successCallBack) {
    const url = window.basePath + "/api/user/jwt/refreshLogin";
    let data = {};
    data.jwtRefresh = localStorage.getItem("Authorization.refresh");
    if (!data.jwtRefresh) {
        successCallBack(false);
        return;
    }
    data.device = window.getDevice().name;
    data.firstLoginTime = localStorage.getItem("firstLoginTime");
    window.post(url, data, function (data) {
        if (data.errcode === 0) {
            localStorage.setItem("Authorization", data.data.jwt);
            localStorage.setItem("Authorization.refresh", data.data.jwtRefresh);
            localStorage.setItem("firstLoginTime", window.formatDate(new Date()));
            if (isRefreshHtml) {
                window.location.reload(true);
            }
            localStorage.setItem('userInfo',JSON.stringify(data.data));
        }
        if (successCallBack) {
            successCallBack(data.errcode === 0);
        }
    }, function (e) {
        if (successCallBack) {
            successCallBack(false);
        }
    })
}

/**
 * get请求
 * @param url 请求地址
 * @param success 成功回调方法
 * @param error 出错回调方法
 * @param complete 完成回调方法
 */
window.get = function (url, success, error, complete) {
    window.getWithHeader(url,null,success,error,complete);
}

/**
 * get请求
 * @param url 请求地址
 * @param headers 请求头
 * @param success 成功回调方法
 * @param error 出错回调方法
 * @param complete 完成回调方法
 */
window.getWithHeader = function (url, headers, success, error, complete) {
    if (headers === null){
        headers = {};
    }
    headers.authorization = window.Authorization;
    $.ajax({
        url: url,
        type: 'GET',
        headers: headers,
        success: success,
        error: error,
        complete: complete
    })
}

/**
 * posy请求
 * @param url 请求地址
 * @param data 提交参数
 * @param success 成功回调方法
 * @param error 出错回调方法
 * @param complete 完成回调方法
 */
window.post = function (url, data, success, error, complete) {
    window.postWithHeaders(url,null,data,success,error,complete);
}

/**
 * posy请求
 * @param url 请求地址
 * @param headers 请求头
 * @param data 提交参数
 * @param success 成功回调方法
 * @param error 出错回调方法
 * @param complete 完成回调方法
 */
window.postWithHeaders = function (url,headers , data, success, error, complete) {
    if (headers === null){
        headers = {};
    }
    headers.authorization = window.Authorization;
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        headers: headers,
        success: success,
        error: error,
        complete: complete
    })
}

/**
 * posy请求 body传参
 * @param url 请求地址
 * @param data 提交参数
 * @param success 成功回调方法
 * @param error 出错回调方法
 * @param complete 完成回调方法
 */
window.postBody = function (url, data, success, error, complete) {
    window.postBodyWithHeaders(url,null,data,success,error,complete);
}

/**
 * posy请求 body传参
 * @param url 请求地址
 * @param headers 请求头
 * @param data 提交参数
 * @param success 成功回调方法
 * @param error 出错回调方法
 * @param complete 完成回调方法
 */
window.postBodyWithHeaders = function (url,headers , data, success, error, complete) {
    if (headers === null){
        headers = {};
    }
    headers.authorization = window.Authorization;
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: headers,
        success: success,
        error: error,
        complete: complete
    })
}

/**
 * 获取uuid
 * @returns {string}
 */
window.uuid = function () {
    let uuid = localStorage.getItem("uuid");
    if (!uuid) {
        let s = [];
        const hexDigits = "0123456789abcdef";
        for (let i = 0; i < 18; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        uuid = s.join("");
        localStorage.setItem("uuid", uuid);
    }
    return uuid;
}
/**
 * 格式化日期
 * @param date
 * @returns {string}
 */
window.formatDate = function (date) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    const dateTime = year + "-" + month + "-" + day;
    return dateTime;
}

/**
 * 获取传递参数
 * @param key
 * @returns {string|null}
 */
window.getParams = function (key) {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};