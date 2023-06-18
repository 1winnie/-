<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import counter from '../Ul/counter.vue';
const props = defineProps(["meal","desc"])

// 这么取值会把值固定,当meal内容发生变化时，不会更新
// const meal = props.meal
const router = useRouter()
const goproductdetail = (id)=>{
    router.push(`/product/${id}`)
}

</script>
<template>
    <div class="meal" >
        <div class="img" @click="goproductdetail(props.meal.id)">
            <img :src="props.meal.img" :alt="props.meal.title">
        </div>
        <div class="info">
            <div class="desc" @click="goproductdetail(props.meal.id)">
                <h2>{{ props.meal.title }}</h2>
                <p v-show="desc">{{ props.meal.desc }}</p>
            </div>
            <!-- 价钱 与 数量 -->
            <counter :price="props.meal.price" :meal="props.meal"></counter>
        </div>
    </div>
</template>
<style scoped>
    .meal{
        display: flex;
        align-items: center;
        height: 280rem;
        border-bottom: 1px solid #ccc;
        padding: 0 20rem;
    }
    .img{
        width: 200rem;
    }
    img{
        width: 100%;
    }
    .info{
        width:450rem;
        margin-left: 20rem;
    }
    .info h2{
        color:#000;
        font-size: 30rem;
        font-weight: normal;
    }
    .info p{
        font-size: 24rem;
        color: #a19f9f;
    }
    .desc{
        margin-bottom: 30rem;
    }
</style>