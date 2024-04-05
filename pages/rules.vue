<template>
<Header />

<div class="main">
    <div class="rules">
        <div class="rules__nav">
            <p class="rules_title">Правила Сервера</p>
            <div class="rules__rule">
                <NuxtLink to="#general"><div class="rule">
                    <img src="https://images.ctfassets.net/b9htocfkzvt0/qpAtayGGg7ifdEAjR1Y1W/82009e1c792960d68e5709842d8f70dc/rule1.png" alt="">
                    <p class="rule_title">I. Общие правила сервера</p>
                </div></NuxtLink>
                <NuxtLink to="#chat"><div class="rule">
                    <img src="https://images.ctfassets.net/b9htocfkzvt0/pWKX0SXGIwCEoDk8OQbF1/4fd28d88256ccd692d09ef90c5fe59fd/rule3.png" alt="">
                    <p class="rule_title">II. Правила чата</p>
                </div></NuxtLink>
                <NuxtLink to="#world"><div class="rule">
                    <img src="https://images.ctfassets.net/b9htocfkzvt0/6pDSeu7RRLZEAjXx6JVCW4/16e1c0b7ed61b9c206c6458772ef3c3c/rule2.png" alt="">
                    <p class="rule_title">III. Игровой мир</p>
                </div></NuxtLink>
                <NuxtLink to="#ban"><div class="rule">
                    <img src="https://images.ctfassets.net/b9htocfkzvt0/6BXZ20WoEyQNd8K2oVCfab/b682ce7606bb83a3831ececb9745a6a0/rule5.png" alt="">
                    <p class="rule_title">IV. Запрещенные программы</p>
                </div></NuxtLink>
                <NuxtLink to="#note"><div class="rule">
                    <img src="https://images.ctfassets.net/b9htocfkzvt0/f7L0VGjs0sk9VNne0LlFA/9017400136790b70187823e5127fdda4/rule6.png" alt="">
                    <p class="rule_title">V. Примечания</p>
                </div></NuxtLink>
            </div>
        </div>
        <div class="rules__rules">
            <div v-for="r in Rules" :key="r.id" :id="r.classId">
                <p class="rules__title">{{ r.name }}</p>
                <div class="rules__content">
                    <div class="content__text" v-for="c in r.rules">
                        <p class="rules__num">{{ c.num }}</p>
                        <p class="content">{{ c.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<Footer />
</template>

<script setup>
import { onMounted } from 'vue'; 

import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import {Rules} from "~/stores/Rules";

onMounted(async () => {
    localStorage.setItem("pay", false);
});

useHead({
    title: "Правила"
})
</script>

<style scoped>
    .main {
        background: rgb(0, 0, 0, 0.5) url("~/public/img/Background.png") fixed 50%/ cover no-repeat;
        backdrop-filter: blur(10px);
        width: 100%;
    }
    .rules {
        display: flex;
        justify-content: space-evenly;
        width: 80%;
        margin: 0 auto;
        color: white;
    }

    .rules_title {
        font-size: 26px;
        margin-bottom: 20px;
    }

    .rules__nav {
        text-align: center;
        margin-top: 40px;
    }

    .rules__rule {
        padding: 14px;
        background: rgba(14,14,14,.5);
        border: 1px solid #2d2d2d;
        -webkit-backdrop-filter: saturate(130%) blur(15px);
        backdrop-filter: saturate(130%) blur(15px);
        border-radius: 20px;
        text-align: start;
    }

    .rule {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .rule img {
        width: 28px;
        margin-right: 10px;
    }

    .rule:hover {
        border-radius: 10px;
        background-color: rgba(126,135,139,.6);
    }

    .rule_title {
        font-family: "Gilroy";
        font-size: 20px;
        color: white;
    }

    /* ================================ */

    .rules__rules {
        margin-left: 20px;
        margin-top: 20px;
        width: 60%;
    }

    .rules__title {
        font-size: 26px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .rules__content {
        padding: 24px 20px;
        background: rgba(14,14,14,.5);
        border: 1px solid #2d2d2d;
        -webkit-backdrop-filter: saturate(130%) blur(15px);
        backdrop-filter: saturate(130%) blur(15px);
        border-radius: 20px;
        margin-bottom: 40px;
    }

    .content__text {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .rules__num {
        margin-right: 15px;
    }

    .content {
        font-family: "Gilroy";
        font-size: 20px;
    }

    @media (max-width: 425px) {
        .rules {
            display: block;
        }

        .rules__rules {
            margin-left: 0;
            width: 100%;
        }
    }
</style>