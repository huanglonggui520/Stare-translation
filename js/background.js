//  import md5 from './md5'
var flag = false//是否需要弹窗
var content = ''//选中的文字
var Html = ''

async function send(obj) {
    
    // $('.value').text('result.trans_result[0].dst')
    // let data
    var res=''//翻译结果
    await $.ajax({
        async: false,
        type: "get",
        data: {q:obj.q,from:'Auto','to':'Auto'},
        url: `https://aidemo.youdao.com/trans`,/*url写异域的请求地址*/
        // dataType: "jsonp",/*加上datatype*/
        jsonpCallback: "callback",/*设置一个回调函数，名字随便取，和下面的函数里的名字相同就行*/
        success: function (result) {
            res=JSON.parse(result)
        //    console.log(res.translation[0]);
           res=res.translation[0]
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