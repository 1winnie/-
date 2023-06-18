<!--  -->
<template>
 <div class="img-verify">
    <canvas ref="verify" :width="state.width" :height="state.height" @click="changeImg"> </canvas>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref, onMounted} from 'vue'
const verify = ref(null)
const state = reactive({
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', // 字符串
    imgCode:'',
    width:120,
    height:40
})
const emits = defineEmits(
    ['imgCode']
)
onMounted(()=> {
    state.imgCode = draw()
})
const changeImg = () => {
    state.imgCode = draw()
}
// 随机数
const randomNum = (min,max) => {
    return parseInt(Math.random() * (max - min) + min)
}
// 随机颜色
const randomColor = (min,max) => {
    const r = randomNum(min,max)
    const g = randomNum(min,max)
    const b = randomNum(min,max)
    return `rgb(${r},${g},${b})`
}
// 绘制图片
const draw = () => {
    // 填充背景颜色
    const ctx = verify.value.getContext('2d')
    // 填充颜色
    ctx.fillStyle = randomColor(190,240)
    // 填充的位置
    ctx.fillRect(0,0,state.width,state.height)
    // 定义paramText
    let imgCode = ''
    // 随机生成字符串
    for(let i =0;i< 4;i++){
        // 随机生成四个字
        const text = state.pool[randomNum(0,state.pool.length)]
        imgCode += text
        // 随机的字体大小
        const fontSize = randomNum(18,40)
        // 随机生成旋转角度
        const deg = randomNum(-30,30)
        // 绘制文字并让四个字在不同的位置显示
        // 1.定义字体
        ctx.font = fontSize + 'px Simhei';
        // 2.定义对齐方式
        ctx.textBaseline = 'top';
        // 3.填充不同颜色
        ctx.fillStyle = randomColor(80,150)
         /*
      * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
      * 这就允许您临时地改变图像状态，
      * 然后，通过调用 restore() 来恢复以前的值。
      * save是入栈，restore是出栈。
      * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
      *
      * */
         ctx.save()
        //  5.平移
        ctx.translate(30 * i + 15,15)
        // 6.旋转
        ctx.rotate((deg * Math.PI) / 180)
        // 7.填充文字
        // context.fillText(text,x,y,maxWidth);
        ctx.fillText(text, -15 + 5 ,-15)
        // 出栈
        ctx.restore()
    }
    // 随机生成5条干扰线
    for(let i=0;i<5;i++){
        ctx.beginPath()
        ctx.moveTo(randomNum(0,state.width),randomNum(0,state.height))
        ctx.lineTo(randomNum(0,state.width),randomNum(0,state.height))
        ctx.strokeStyle = randomColor(180,230)
        ctx.closePath()
        ctx.stroke()
    }
    // 随机生成40个干扰点
    for(let i =0;i< 40;i++){
        ctx.beginPath()
        ctx.arc(randomNum(0,state.width),randomNum(0,state.height), 1, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = randomColor(150,200)
        ctx.fill()
    }
    emits("imgCode",imgCode)
    return imgCode
}
</script>
<style lang='less' scoped>
    .img-verify{
        canvas{
            cursor: pointer;
        }
    }
</style>