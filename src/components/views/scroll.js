function startmarquee(lh, speed, delay, index) {

    var t;
    var p = false; //p是true还是false直接影响到下面start()函数的执行  

    //获取文档中的滚动区域对象 (DIV)  
    var o = document.getElementsByClassName("vulnList"); 
    console.log(o)   
    o.innerHTML += o.innerHTML; //对象中的实际内容被复制了一份，复制的目的在于给文字不间断向上滚动提供过渡。   
    console.log(o)
    //鼠标滑过，停止滚动；   
    o.onmouseover = function () { p = true; }

    //鼠标离开，开始滚动；   
    o.onmouseout = function () { p = false; }

    //文字内容顶端与滚动区域顶端的距离，初始值为0；   
    o.scrollTop = 0;

    function start() {
        t = setInterval(scrolling, speed); //每隔一段时间，setInterval便会执行一次   
        //滚动停止或开始，取决于p传来的布尔值；   
        if (!p) {
            o.scrollTop += 1;
        }
    }
    function scrolling() {

        //如果不被整除，即一次上移的高度达不到lh，则内容会继续往上滚动；   
        if (o.scrollTop % lh != 0) {
           // console.log(o.scrollTop)
            o.scrollTop += 1;
            //对象o中的内容之前被复制了一次，所以它的滚动高度，其实是原来内容的两倍高度；   
            //当内容向上滚动到scrollHeight/2的高度时，全部3行文字已经显示了一遍，至此整块内容   
            //scrollTop归0；再等待下一轮的滚动，从而达到文字不间断向上滚动的效果；   
            if (o.scrollTop >= o.scrollHeight / 2)
                o.scrollTop = 0;
                //console.log(o.scrollHeight)
        } else {
            //否则清除t，暂停滚动   
            clearInterval(t);
            //经过delay间隔后，启动start() 再连续滚动   
            setTimeout(start, delay);
        }
    }

    //第一次启动滚动；setTimeout会在一定的时间后执行函数start()，且只执行一次   
   setTimeout(start, delay);
}


//带停顿效果   
startmarquee(23, 50, 0, 0);
//不间断连续  
//startmarquee(25,40,0,1);   