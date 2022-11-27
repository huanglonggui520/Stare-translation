document.addEventListener('DOMContentLoaded', function () {
    let txt=''
    // el为选中文字的dom
    let el=null
    let box_x=0
    let box_y=0
    chrome.runtime.onMessage.addListener((req, sender, call) => {
        
        // var reg=new RegExp(txt,'g')
        // el.target.innerHTML=el.target.innerText.replace(/^\s|\s$/g,'')
        // el.target.innerHTML=el.target.innerHTML.replace(reg,`<span class="huanglongguitxt" style="color: #1089E5;">${req.data}</span>`)
        var str=`<div class='huanglonggui'>
                    <div class='htop'>
                        <p class='hlogo'>盯盯翻译</p>
                        <a href='javascript:return false'>
                        <span class='hclose'>+</span>
                        </a>
                    </div>
                    <div class='hcontent'>
                     ${req.data}
                    </div>
                    
                </div>`
            // 开启弹窗
        if(!$('.huanglonggui').html()){
            $('body').append(str)
            console.log(box_x,box_y);
            if(box_y>=400){
                $('.huanglonggui').css({'top':box_y-250+'px'})
            }else{
                $('.huanglonggui').css({'top':box_y+30+'px'})
            }
            if(box_x>=900){
                $('.huanglonggui').css({'left':box_x-250+'px'})
            }else if(box_x<=250){
                $('.huanglonggui').css({'left':box_x+200+'px'})
            }else{
                $('.huanglonggui').css({'left':box_x+30+'px'})
            }
            
            // let huanglonggui=document
            document.onclick=function(e){
                // console.log(e.target.className);
                className=e.target.className
                if(className!='huanglonggui' && className!='htop' && className!='hcontent' && !className!='hlogo' ){
                    console.log(true)
                    $('.huanglonggui').remove()
                    
                }
            }
            // $('.huanglonggui').css({'top':box_x+'px','left':box_y+'px'})
        }
        // 关闭弹窗
        $('.hclose').click(function(){
            
            // var height = $(window).scrollTop();//前一行的滚动条位置
            $('.huanglonggui').remove()
        // $("html,body").animate({ scrollTop: height }, 300);//设置滚动条位置

        })
        $('.htop').mousedown(function(e){
             //获取box1
         let box1 = document.querySelector(".huanglonggui");
         //绑定鼠标移动事件
         document.onmousemove = function(event){
             //获取到鼠标的坐标
             //解决ie兼容性问题
             event = event|| window.event;

             //获取到鼠标的坐标

             let left = event.clientX;
             let top = event.clientY;

             /**
              * 获取滚动条的距离
              *chrome认为滚动条是body的，可以通过body.scrollTop来获取
              * 火狐等浏览器认为浏览器的滚动条是html的
              *
              * @type {string}
              */

             // let st = document.body.scrollTop;
                 //现在最新的谷歌浏览器也支持该相关属性（观看2016年相关视频时，老师使用的google版本只支持使用document.body.scrollTop）
             
              
             //设置div偏移量
             box1.style.left=left-e.offsetX+"px";
             box1.style.top = top-e.offsetY+"px";
             
            document.onmouseup=function(){
                document.onmousemove=null
            }
         }
        })
        
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
    // 鼠标右键事件
    container.oncontextmenu = function (e) {
        box_x=e.clientX
        box_y=e.clientY
        
        txt = funcGetSelectText();
        el=e
        
        if (txt) {
            chrome.runtime.sendMessage({ info: txt, Html:e.target })
              
        }
    }

})