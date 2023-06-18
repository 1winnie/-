<!--  -->
<template>
 <div class="video">
   <div id="fullback" ref="fullback">
        <div id="playbox">
            <div ref="videobox" id="videobox" class="videobox"  @touchstart="toShow" @touchend="tohidden">
                <i class="ri-close-fill"  @click="close" v-if="state.isclose"></i>
                <video id="vde" loop @canplay='playtime' ref="vide" src="../../assets/3.mp4"  height="100%" width="100%"></video>
                <div @click="screenplay" class="screenpaly" v-show="state.isShow">
                    <div class="boss" v-show="!state.isplay">
                        <i class="ri-play-fill"></i>
                    </div>
                    <div class="boss" v-show="state.isplay">
                        <i >||</i>
                    </div>
                </div>
            </div>
           
            <div class="contain"  >
                <div id="progress"><div id="now"></div></div>
                <div class="controls">
                    <div class="group1">
                        <div class="play" @click="toplay" title="播放">
                            <i v-if="!state.isplay" class="ri-play-fill"></i>
                            <i v-else style="font-size: 35rem;font-weight:700;margin-right: 20rem;margin-top: -10rem;">||</i>
                        </div>
                        <div class="stop" @click="tostop" title="暂停">
                            <i class="ri-stop-fill"></i>
                        </div>
                        <div class="time" style="font-size:25rem">
                            <span class="ctime">{{ state.time.currentTime }}</span>/<span class="dtime">{{ state.time.duration }}</span></div>
                        <div class="talk">
                            
                        </div>
                    </div>
                    <div class="group2">
                        <div class="fast">
                            <div id="curspend">倍速&times1</div>
                            <div id="speed_list" v-show="state.isfast">
                                <div value="2">&times;2</div>
                                <div value="1.5">&times;1.5</div>
                                <div value="1.25">&times;1.25</div>
                                <div value="1">&times;1</div>
                                <div value="0.75">&times;0.75</div>
                                <div value="0.5">&times;0.5</div>
                            </div>
                        </div>
                        <div class="audio">
                            <div class="vioce" id="vioce">
                                <i v-show="!state.ison" class="ri-megaphone-fill"></i>
                                <i v-show="state.ison" class="ri-megaphone-line"></i>
                            </div>
                            <div id="volume" class="volume">
                                <div id="vnow" class="vnow"></div>
                                <div id="slider" class="slider"></div>
                            </div>
                        </div>
                        <div class="theatemode" @click="TheaterMode" title="剧场">
                            <i class="ri-computer-line"></i>
                        </div>
                        <div class="full" @click="fullScreen" title="全屏">
                            <i  class="ri-tv-2-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="show">
                美味蟹堡王
            </div>
        </div>
   </div>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref,watch, onMounted} from 'vue'
const props = defineProps(['box'])
const videobox = ref()
const vide = ref()
onMounted(()=>{
    const vde = document.getElementById('vde')
    vde.addEventListener('canplay',function(){
        // console.log(this.duration)
        // state.time.currentTime = formatTime(this.currentTime)
        state.time.duration = formatTime(this.duration)
    })
    vde.addEventListener('timeupdate',function(){
        const w = (this.currentTime / this.duration) * 100 +"%";
        const now = document.getElementById("now")
        now.style.width = w
        state.time.currentTime = formatTime(this.currentTime)
    })
    vde.addEventListener("ended",function(){
        state.time.currentTime = 0
    })
    const curspend = document.getElementById('curspend');
    curspend.addEventListener('click',() =>{
        state.isfast = true;
        state.isShow = false
    })
    const speedlist1 = document.getElementById("speed_list");
    console.log(speedlist1)
    const speedlist = speedlist1.getElementsByTagName("div");
    for(let i=0 ;i<speedlist.length;i++){
        speedlist[i].onclick = function(){
            let v = this.getAttribute("value")
            curspend.innerHTML = "倍速x" + v;
            vde.playbackRate = v;
            setTimeout(()=>{
                state.isfast = false
            },1000)
        }
    }
    //调整音量条位置
    const setPos = (pos)=>{
        if(pos<0){
            pos = 0
        }else if((pos > 100)){
            pos = 100
        }
        document.getElementById('vnow').style.left = pos + '%';
        document.getElementById('slider').style.width = pos + '%'
        var curPos = pos
        //音量
        vde.volume = curPos / 100
     }
    //  点击音量条变化
     document.getElementById('volume').onclick = function(e){
        if(!state.ison){
            // console.log(e.offsetX)
            setPos(e.offsetX)
        }
     }
    // 点击静音或开启声音
   const vioce = document.getElementById('vioce')
   vioce.addEventListener("click",function(){
        state.ison = !state.ison
        if(state.ison){
            // console.log(vde.muted)
            vde.muted = true
        }else{
            vde.muted = false
        }
   })
    // 拖动滑块调节音量
    //  document.getElementById("slider").ontouchstart = function(e){
    //     var x = e.clientX;
    //     this.ontouchmove = function(ev){
    //         var mx = ev.clientX;
    //         console.log(mx)
    //         // var ls = mx - x + curPos
    //         // setPos(ls)
    //     }
    //     document.onTouchend = function(){
    //         document.ontouchmove = null
    //     }
    //  }
})
const formatTime = (time) =>{
    const h = addo(Math.floor(time / 3600));
    const m = addo(Math.floor(time % 3600 / 60));
    const s = addo(Math.floor(time % 60));
    return h + ":" + m + ":" + s
}
const addo = (x)=>{
    if(x<10){
        return '0' + x
    }else{
        return x
    }
}
const state = reactive({
    closesmall:false,
    isclose:false,//关闭小屏幕
    isTheater:false,//关闭剧场模式
    isplay:false,//是否播放
    isShow:false,//鼠标经过显示播放器
    ison:false,//是否静音
    time:{
        duration:'00:00:00',
        currentTime:'00:00:00'
    },
    isfast:false
})
watch(()=>props.box,()=>{
    if(props.box >200 ){
       videobox.value.className = 'videobox smallscreen'
       state.isclose = true
    }else{
        videobox.value.className = 'videobox'
        state.isclose = false
    }
})

const close = () => {
    videobox.value.className = 'videobox'
}
const fullScreen = () => {
    if(vide.value.RequestFullscreen){
        vide.value.RequestFullscreen()
    }else if(vide.value.webkitRequestFullScreen){
        vide.value.webkitRequestFullScreen()
    }
}

const fullback = ref()
// 点击剧场模式
const TheaterMode = () => {
    if(state.isTheater){
        fullback.value.title = '剧场模式'
        fullback.value.style = ''
        fullback.value.className = "fullback"
    }else{
        fullback.value.title = '退出剧场模式'
        fullback.value.style.width = document.body.clientWidth + "px"
        fullback.value.style.height = document.body.clientHeight + 'px'
        fullback.value.className = "fullback theater"
    }
    state.isTheater = !state.isTheater
}
// 点击播放
const toplay = () => {
    vide.value.play()
    if(state.isplay == true){
        vide.value.pause()
    }
    state.isplay = !state.isplay
}
// 点击暂停
const tostop = () => {
    state.isplay = false
    vide.value.pause()
}
// 当鼠标经过
const toShow = () => {
    state.isShow = true
}
// 当鼠标移走
const tohidden = () => {
    setTimeout(() => {
        state.isShow = false
    }, 5000);
}

// 点击中间暂停或播放
const screenplay = () => {
    if(state.isplay){
        vide.value.pause()
        state.isplay = false
    }else{
        vide.value.play()
        state.isplay = true
    }
}


</script>
<style lang='less' scoped>
.screenpaly{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 300rem;
    background-color: rgba(250,250,250,.3);
    display: flex;
    align-items: center;
    text-align: center;
    .boss{
        width: 160rem;
        height: 160rem;
        background-color: rgba(250,250,250,.6);
        border-radius: 50%;
        margin: 0 auto;
        line-height: 160rem;
        font-size: 100rem;
        color: #fff;
    }
}
    #playbox{
        position: relative;
        width: 100%;
        height: 370rem;
        // background-color: pink;
        overflow: hidden;
        border-radius: 50rem;
        .videobox{
            width: 100%;
            height: 320rem;
            background: url('../../assets/loading.gif') no-repeat center;
            video{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
        .smallscreen{
            width: 50%;
            height: 200rem;
            border: 3px solid rgba(200,200,200,0.5);
            border-radius: 10rem;
            position: fixed;
            bottom: 540rem;
            right: 15rem;
            z-index: 100;
            .ri-close-fill{
                z-index: 10100;
                position: absolute;
                width: 30rem;
                line-height: 30rem;
                text-align: center;
                top: 10rem;
                right: 10rem;
                font-size: 40rem;
                color: #fff;
            }
        }
        .contain{
            position: absolute;
            left: 0;
            bottom: -15rem;
            width: 100%;
            height:100rem;
            background-color: rgba(255, 255, 255, 0.2);
            z-index: 99;
            #progress{
                position: absolute;
                bottom: 70rem;
                width: 100%;
                height: 3px;
                background-color: #555;
                border-radius: 30rem;
                overflow: hidden;
                #now{
                    width: 0%;
                    height: 100%;
                    background-color: #fff;
                }
            }
            .controls{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 60rem;
                background-color: rgb(255, 244, 246);
                margin-bottom: 10rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20rem 40rem;
                div[class^=group]{
                    display: flex;
                    align-items: center;
                    font-size: 40rem;
                    color: rgb(248,188,0);
                    font-weight: 700;
                }
                .group2{
                    .fast{
                    font-size: 26rem !important;
                    #curspend{
                        width: 120rem;
                        height: 40rem;
                    }
                    #speed_list{
                        position: absolute;
                        left: -10rem;
                        top: -260rem;
                        text-align: center;
                        width: 120rem;
                        background-color: rgba(211, 209, 209, 0.8);
                        z-index: 10000;
                        color:#000;
                        font-weight: 700;
                        border-radius: 15rem;
                        overflow: hidden;
                        & div:hover{
                            background-color: rgb(112, 110, 110);
                            color: #fff;
                        }
                    }
                }
                }
                .audio{
                    display: flex;
                    align-items: center;
                    .volume{
                        position: relative;
                        width: 100rem;
                        height: 5rem;
                        margin-left: 10rem;
                        margin-right: 10rem;
                        background-color: rgb(209, 205, 205);
                        text-align: center;
                        .vnow{
                            position: absolute;
                            top: -8rem;
                            left: 10%;
                            width: 20rem;
                            height: 20rem;
                            background-color: pink;
                            border-radius: 50%;

                        }
                        .slider{
                            height: 100%;
                            width: 10%;
                            background-color: rgb(248,188,0);
                        }
                    }
                    
                }
            }
        }
        .show{
            position: absolute;
            right: -3px;
            top: 0;
            width: 200rem;
            line-height: 80rem;
            background-color: rgb(248,188,0);
            text-align: center;
            font-size: 35rem;
            font-weight: 700;
            border-bottom-left-radius: 50rem;
            color: #fff;
        }
    }
    .fullback.theater{
        background-color: rgba(250,250,250,.8);
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        transition: all 2s;
    }
</style>