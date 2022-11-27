//  import md5 from './md5'
var flag = false
var content = ''
var Html = ''

async function send(obj) {
    
    // $('.value').text('result.trans_result[0].dst')
    // let data
    var res=''
    await $.ajax({
        async: false,
        type: "get",
        // data: obj,
        url: `http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${obj.q}`,/*url写异域的请求地址*/
        // dataType: "jsonp",/*加上datatype*/
        jsonpCallback: "callback",/*设置一个回调函数，名字随便取，和下面的函数里的名字相同就行*/
        success: function (result) {
            // console.log(result.translateResult);
            result.translateResult[0].forEach(item=>{
                res=res+item.tgt
                // console.log(item);
            })
            callback(res)
            // chrome.runtime.sendMessage({ info: txt, Html:e.target })
        }
    });
    // console.log(a.trans_result[0].dst);
    function callback(res) {
        // alert(res)
        if (flag){
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
    // console.log(trans.trans_result[0].dst);
    return res
}
chrome.runtime.onMessage.addListener((req, sender, call) => {
    content = req.info
    Html = req.Html
    // call()

})

chrome.contextMenus.create({
    title: '翻译',//添加鼠标右键的文字
    onclick: function () {
        var obj = {}
        obj.q = content
        flag = true
        send(obj)
    },
    contexts: ['selection'],//指定在哪里右键显示，selection表示选中文字显示
    // documentUrlPatterns:['http://chrome.cenchy.com/contextmenus.html','https://*.baidu.com/*'],//指定在哪些网站显示
})