//  import md5 from './md5'
var flag = false
var content = ''
var Html = ''

async function send(obj) {
    // console.log(obj)
    // $('.value').text('result.trans_result[0].dst')
    // let data
    
    const trans=await $.ajax({
        async: false,
        type: "get",
        data: obj,
        url: "https://fanyi-api.baidu.com/api/trans/vip/translate",/*url写异域的请求地址*/
        dataType: "jsonp",/*加上datatype*/
        jsonpCallback: "callback",/*设置一个回调函数，名字随便取，和下面的函数里的名字相同就行*/
        success: function (result) {
            res = result.trans_result[0].dst
            callback(res)
            // chrome.runtime.sendMessage({ info: txt, Html:e.target })
        }
    });
    // console.log(a.trans_result[0].dst);
    function callback(res) {
        // alert(res)
        if (flag) {

            // chrome.tabs.getSelected(null, function (tab) {//获取网页的对象,默认当前页面
               
            // chrome.tabs.executeScript(null, { file: "./box.js" })//点击向当前页面注入JS代码

            // })
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        { data: res },
                        function (response) {
                            // console.log(response.farewell);
                        });
                });
                flag = false
        }
        flag = false
        
    }
    console.log(trans.trans_result[0].dst);
    return trans.trans_result[0].dst
}
chrome.runtime.onMessage.addListener((req, sender, call) => {
    content = req.info
    Html = req.Html
    // call()

})
chrome.contextMenus.create({
    title: '翻译为中文',//添加鼠标右键的文字
    onclick: function () {
        var obj = {}
        obj.from = 'auto'
        obj.to = 'zh'
        obj.appid = '20221124001467488'
        obj.salt = '1435660288'
        obj.q = content
        obj.sign = md5(obj.appid + obj.q + obj.salt + 'gXT4hqOIAT0DlWDz6M7k')
        flag = true
        send(obj)
    },
    contexts: ['selection'],//指定在哪里右键显示，selection表示选中文字显示
    // documentUrlPatterns:['http://chrome.cenchy.com/contextmenus.html','https://*.baidu.com/*'],//指定在哪些网站显示
})
chrome.contextMenus.create({
    title: '翻译为英文',//添加鼠标右键的文字
    onclick: function () {
        var obj = {}
        obj.from = 'auto'
        obj.to = 'en'
        obj.appid = '20221124001467488'
        obj.salt = '1435660288'
        obj.q = content
        obj.sign = md5(obj.appid + obj.q + obj.salt + 'gXT4hqOIAT0DlWDz6M7k')
        flag = true
        send(obj)
    },
    contexts: ['selection'],//指定在哪里右键显示，selection表示选中文字显示
    // documentUrlPatterns:['http://chrome.cenchy.com/contextmenus.html','https://*.baidu.com/*'],//指定在哪些网站显示
})