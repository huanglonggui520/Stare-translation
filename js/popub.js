$(function(){
    
    let obj=new Object()
        $(".buttonsend").click(async function(){
            // $('.value').text('result.trans_result[0].dst')
            if(!$("#sr").val()) return alert('至少写点什么吧！')
            obj.q=$("#sr").val()
            obj.from='auto'
            obj.to=$('.xlk option:selected').val()
            obj.appid='20221124001467488'
            obj.salt='1435660288'
            // $('.value').text('result.trans_result[0].dst')
            obj.sign=md5(obj.appid+obj.q+obj.salt+'gXT4hqOIAT0DlWDz6M7k')
            // $('.value').text('result.trans_result[0].dst')
            console.log(obj.sign)
            var bg=chrome.extension.getBackgroundPage()
        // 调用后台background.js back函数
            
            $('.value').text(await bg.send(obj))
            // consolelog()
            // send()
        });
        
})