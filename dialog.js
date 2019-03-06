var dialog = (function(){

    let elem, dialog, cancelBtn, confirmBtn
    // 动画函数数组
    let animationArr = new Array(['slideDown', 'slideUp'], ['scaleIn', 'scaleOut'])

    // 当前动画
    let curAnimation = ''

    //绑定所需要结点
    let getNeedElement = function () {
        elem = document.querySelector('.dialog_area');
        dialog = elem.querySelector('.dialog_pop');
        cancelBtn = elem.querySelector('.cancel-btn');
        confirmBtn = elem.querySelector('.confirm-btn');
      }
    var bindEvent = function(confirm, cancel, shadeClose, ani){

        confirmBtn && confirmBtn.addEventListener('click',function(){   
            hide(ani);
            confirm && confirm()
        })

        cancelBtn && cancelBtn.addEventListener('click',function(){   
            hide(ani);
            cancel && cancel()
        })

        // 是否开启点击遮罩关闭
        if (shadeClose) {
            elem.addEventListener('click', e => {
                let target = e.target || e.srcElement;
                if (/dialog_area/.test(target.className)) {
                    hide(ani);
                }
            })
        }
        
    }

    var hide = function(animationStyle){
        // 最外层执行显示动画(固定) 
        elem.classList.add('fadeOut');
        // 内容层执行关闭动画
        dialog.classList.add(`${animationArr[animationStyle][1]}`);
    
        // 最终移除 
        setTimeout(() => {
          elem.remove();
        }, 200);
    }
    var show = function(options={}){
       let {
           content = '兄弟，你好像忘记传content值了',
           title = '',
           btns = ['确定'],
           confirm = null,
           cancel = null,
           shadeClose = true,
           animation = 0
       } = options

       curAnimation = animationArr[animation];
 
      let btnTemp = '';
       btns.forEach((item, index) => {
           if(index == 2) return
           let btnClass = index == 0?'confirm-btn':'cancel-btn';
           let temp = `<a class="btn ${btnClass}" href="#">${item}</a>`
           btnTemp += temp;
       });

       let html = `
            <div class="dialog_area fadeIn">
                <div class="dialog_pop ${curAnimation[0]}">
                        <div class="dialog_title">${title}</div>
                        <div class="dialog_content">${content}</div>
                        <div class="dialog_buttons">
                            ${btnTemp}
                        </div>
                </div>
            </div>`

        document.body.innerHTML += html;
        getNeedElement();
        bindEvent(confirm, cancel, shadeClose, animation)
    }
     return {
         show,
         hide
     }
})()