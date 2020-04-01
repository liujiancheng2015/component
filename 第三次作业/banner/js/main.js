var contain = document.querySelector('.box');//获取需要改变left的元素
var slide = document.querySelector('.slider');//获取需要改变left的元素

var leftBtn = document.querySelector('#left');//获取左边按钮
var rightBtn = document.querySelector('#right');//获取右边按钮

var indicator = document.querySelector('.nav');//指示灯父元素
var indicatorChild = indicator.children;//指示灯的个数
var slideLength = indicatorChild.length+2;//轮播图个数
var timer = null;//定时器初始为null
var currentIndex = 1;//当前索引
var width = 1200;//屏幕宽度
window.onload = function () {
    var everyTime = 10000;//轮播的间隔时间
    var firstDom = slide.firstElementChild.cloneNode(true);
    var lastDom = slide.lastElementChild.cloneNode(true);
    slide.appendChild(firstDom);
    slide.insertBefore(lastDom,slide.firstElementChild);
    slide.style.left = -width+'px';
    // autoPlay(everyTime);//页面打开后自动开启播放
    //当有鼠标划过时停止定时器
    contain.onmouseenter = function () {
        clearInterval(timer);
    };
    //鼠标摞开时启动定时器
    // contain.onmouseleave = function () {
    //     // autoPlay(everyTime);
    // };
    //点击左边按钮
    leftBtn.onclick = function () {
        currentIndex--;
        if (currentIndex == 0) {
            criticality(indicatorChild.length,'left');
        } else {
            play(-(width * currentIndex),currentIndex);
        }
    };
    //点击右边按钮
    rightBtn.onclick = function () {
        currentIndex++;
        if (currentIndex == slideLength - 1) {
            criticality(1,'right');
        } else {
            play(-(width * currentIndex),currentIndex);
        }
    };
    //指示灯点击时
    for (let i = 0; i < indicatorChild.length; i++) {
        indicatorChild[i].onmouseenter = function () {
            //先将同级class移除；
            for (var j = 0; j < indicatorChild.length; j++) {
                if (indicatorChild[j].className == 'li-active') {
                    indicatorChild[j].className = '';
                }
            }
            //点击时到达临界值
            if (i == 0 && currentIndex == indicatorChild.length) {
                currentIndex++;
                criticality(1);
            }else if(i == (indicatorChild.length -1) && currentIndex == 1) {
                currentIndex--;
                criticality(indicatorChild.length);
            }else {
                //设置所点击的元素class,并移动到指示灯所在图片
                play(-(width * (i+1)),(i+1));
                currentIndex = i+1;
            }
        }
    }
};
//自动播放
// function autoPlay(period) {
//     timer = setInterval(function () {
//         currentIndex++;
//         //当移动到最后一张，也就是模拟的第一张
//         if (currentIndex == slideLength - 1) {
//             //首先清除原先的定时器
//             clearInterval(timer);
//             //处理临界情况
//             criticality(1);
//             //通次继续下一次轮播
//             return autoPlay(period);
//         } else {
//             if(currentIndex < slideLength-1){
//                 play(-(width * currentIndex),currentIndex);
//             }
//         }
//     }, period)
// }
//轮播公共方法
function play(left,activeIndex) {
    //1、图片移动left px；
    slide.style.left = left + 'px';
    slide.style.transition = 'left 1.5s';
    //2、改变指示灯颜色
    for(var i = 0;i<indicatorChild.length;i++){
        if(i == activeIndex-1){
            indicatorChild[i].className = 'li-active';
        }else {
            indicatorChild[i].className = '';
        }
    }
    console.log(slide.style.left)
}
function criticality(boundary,flag) {
    //继续走临界的轮播
    play(-(width * currentIndex),boundary);
    //将鼠标禁止轮播的时间
    var now=(new Date()).getTime()+1500;
    //在轮播的同时将距离重置
    setTimeout(function () {
        slide.style.left = -width*boundary + 'px';
        slide.style.transition = 'left 0s';
        currentIndex = boundary;
    }, 1500);
    //点击边距的时候要将下一步操作的按钮取消1500ms的时间
    if((new Date()).getTime()<=now){
        if(flag == 'left'){
            leftBtn.disabled=true;
            setTimeout(function () {
                leftBtn.disabled=false;
            },now-(new Date()).getTime())
        }else {
            rightBtn.disabled=true;
            setTimeout(function () {
                rightBtn.disabled=false;
            },now-(new Date()).getTime())
        }
    }
}