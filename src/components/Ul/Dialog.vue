<script setup>
import Mask from './mask.vue';
const props = defineProps(["msg","showDialog"])
const emits = defineEmits(["ok","hide"])

</script>
<template>
    <Mask>
        <div class="dialog">
            <p class=" msg" >{{ props.msg }}</p>
            <div class="btn">
                <button @click="$emit('hide')">取消</button>
                <button class="ok" @click="()=>{
                    $emit('ok')
                    $emit('hide')
                }">确认</button>
            </div>
        </div>
    </Mask>
</template>
<style scoped>
.dialog{
    position: absolute;
    width: 700rem;
    height: 400rem;
    background-color: #fff;
    border-radius: 40rem;
    top: 0;
    bottom: 300rem;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
}
.msg{
    height: 260rem;
    font-size: 40rem;
    text-align: center;
    line-height: 260rem;
}
.btn{
    display: flex;
    justify-content: space-around;
}
button{
    width: 250rem;
     height: 80rem;
     border-radius: 20rem;
     background-color: #fff;
     border: none;
     box-shadow: 0 0 5rem #ccc;
}
.ok{
    background-color: rgb(247, 247, 162);
}
</style>