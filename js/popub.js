$(function () {

    let obj = new Object()
    $(".buttonsend").click(async function () {
        if (!$("#sr").val()) return alert('至少写点什么吧！')
        obj.q = $("#sr").val()
        var bg = chrome.extension.getBackgroundPage()
        $('.value').text(await bg.send(obj))
        // consolelog()
        // send()
    });

})