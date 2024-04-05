<template>
    <div v-if="timer > 0" class="timer">
        <p>{{ date }}</p>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import { usePayStore } from "~/stores/payStore";

    const PAY = usePayStore();

    const endtime = ref('11 Jan 2024 00:00:00 GMT+03:00');
    const date = ref("00:00:00");

    const timer = ref(Date.parse(endtime.value) - Date.now());

    watchEffect(() => {
        let seconds = Math.floor( (timer.value/1000) % 60 );
        let minutes = Math.floor( (timer.value/1000/60) % 60 );
        let hours = Math.floor( (timer.value/(1000*60*60)));

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        date.value = hours + ':' + minutes + ':' + seconds;

        setTimeout(() => {
            timer.value  -= 1000;
        }, 1000);

        if (timer.value <= 0) {
            PAY.discount = 90;
        }
    }, timer.value)
</script>

<style scoped>
    .timer {
        color: white;
        font-size: 52px;
        transform: rotate(-14.35deg);
        text-align: start;
        position: relative;
        right: 20%;
        bottom: 70px;
    }
</style>