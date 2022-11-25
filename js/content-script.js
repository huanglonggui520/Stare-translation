document.addEventListener('DOMContentLoaded', function () {
    var txt=''
    var el=null
    var count=0
    var textDatas=[]
    chrome.runtime.onMessage.addListener((req, sender, call) => {
        // alert(req.data)
        
        var reg=new RegExp(txt,'g')
        el.target.innerHTML=el.target.innerText.replace(/^\s|\s$/g,'')
        el.target.innerHTML=el.target.innerHTML.replace(reg,`<span class="huanglonggui" style="color: #1089E5;">${req.data}</span>`)
        // textDatas.push(txt)
        // $('.huanglonggui').dblclick(function(e){
        //     chrome.runtime.sendMessage({ info: txt, Html:e.target })

        // })
        
        // alert(req.data)
        
    })
    var funcGetSelectText = function () {
        var txt = '';
        if (document.selection) {
            txt = document.selection.createRange().text; //ie浏览器
        } else {
            txt = document.getSelection(); //其他浏览器
        }
        return txt.toString();
    }
    var container = container || document;
    container.oncontextmenu = function (e) {
        txt = funcGetSelectText();
        el=e
        if (txt) {
            chrome.runtime.sendMessage({ info: txt, Html:e.target })
              
        }
    }

})