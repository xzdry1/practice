/*
|-------------------------------------------------------
| 表Mock API请求库
|-------------------------------------------------------
*/
; (function () {
    'use strict';

    //暴露接口，api默认为post();
    window.api = post;

    //可以使用api.get(...)来调用get方法
    api.get = get;//这里有一个很神奇的事情。就是不论什么等于get,开发者工具里都不会显示f get(),而是直接f
    // console.log(window.api);

    //在http://mock.biaoyansu.com/app/new创建的appKey[应用名]
    let appKey = '7e6bea229695a1fa61255e8dd12a6ac7132d6f5d64ed4f00ae4b9956b9dc0148';

    /**
     * 
     * @param  action 行为,如:'creat','delete','read' ...
     * @param  data   要发送的数据,如:{userId:10000,userName:'dry',userDescription:'  '}
     * @param  onSuccess 成功后的回调
     * @param  onError   失败后的回调
     */
    function post(action, data, onSuccess, onError) {
        console.log('运行了post');
        send('post', action, data, onSuccess, onError);
    }
    /**
     * 
     * @param  action 同上
     * @param  onSuccess 同上
     * @param  onError 同上
     */
    function get(action, onSuccess, onError) {
        console.log('运行了get');
        send('get', action, data, onSuccess, onError);
    }

    function send(method, action, data, onSuccess, onError) {
        let http = new XMLHttpRequest();
        let baseUrl = 'https://mock.biaoyansu.com/api/1/';
        let timestamp = (new Date).getTime();
        // console.log('timestamp:', timestamp);
        // console.log('baseUrl+action:', baseUrl + action);


        console.log(baseUrl + action);
        // action += '?limit=50'
        http.open(method, baseUrl + action);

        http.setRequestHeader('BIAO-MOCK-APP-KEY', appKey);
        http.setRequestHeader('BIAO-MOCK-TIMESTAMP', timestamp);
        http.setRequestHeader('BIAO-MOCK-SIGNATURE', sign(appKey, timestamp));//signature签名
        http.setRequestHeader('Content-Type', "application/json");

        let json = JSON.stringify(data);
        // console.log('http:', http.responseText);
        // console.log('json', json);

        http.send(json);

        http.addEventListener('load', $ => {
            onSuccess && onSuccess(JSON.parse(http.responseText));
        });
        http.addEventListener('error', $ => {
            onError && onError(JSON.parse(http.responseText));
        });

    }

    /**
     * 
     * @param  appKey 应用的键，可在应用管理中拿到: http://mock.biaoyansu.com/app
     * @param  timestamp 
     */
    function sign(appKey, timestamp) {
        // console.log('btoa(appKey+timestamp):', btoa(appKey + timestamp));
        return btoa(appKey + timestamp);
    }

})();




