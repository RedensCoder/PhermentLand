<template>
    <div class="main">
<!--        <div class="form">-->
<!--            <div v-if="width > 445 && PAY.discount > 0" class="discount"><p>-{{ PAY.discount }}%</p></div>-->
<!--            <p class="form__label">Ник</p>-->
<!--            <input v-model="nick" type="text" placeholder="Введите ваш ник в игре!" autocomplete="off">-->
<!--            <input style="margin-top: 20px;" v-model="email" type="email" placeholder="Введите вашу почту!" autocomplete="off">-->
<!--            <p class="form__price">{{ Math.floor(PAY.price - PAY.price*(PAY.discount/100)) }} Руб <span v-if="PAY.discount > 0" class="form__offer">{{ PAY.price }} Руб</span></p>-->
<!--            <button v-if="nick === '' || !validator.isEmail(email)" class="inactive">КУПИТЬ</button>-->
<!--            <button v-else @click="show_terms = true" class="active">КУПИТЬ</button>-->
<!--            <p class="form__info">Вы автоматически получаете<br>доступ на сервер!</p>-->
<!--        </div>-->

      <AuthHeader />

<!--      <Form v-if="formIsOpen && price > 0" :title="name" :price="price" :time="time" :original="original" />-->

      <div class="content">
        <Aside />
            <div class="privilegies">
                <div class="privilegies__privilege" v-for="p in products.data.value" :key="p.id">
                    <img :src="p.img" alt="icon">
                    <p class="privilege__title">{{ p.name }} - {{ p.price }} Руб</p>
                    <div class="privilege__chars">
                        <p class="char" v-for="c in p.chars">+ {{ c }}</p>
                    </div>
                    <button @click="price = p.price; name = p.name; original = p.original; time = p.time; buy()" class="active">КУПИТЬ</button>
                  </div>
            </div>
      </div>
    </div>
</template>

<script setup>
import Form from "~/components/Form.vue";
import AuthHeader from "~/components/AuthHeader.vue";
import Aside from "~/components/Aside.vue";

import { onMounted, ref } from 'vue';
import { usePayStore } from "~/stores/payStore";

const name = ref("");
const price = ref(0);
const original = ref("");
const time = ref("");

const PAY = usePayStore();

const products = await useAsyncData(() => PAY.GetProducts());

const formIsOpen = ref(false);

let width = ref(0);

const buy = async () => {
  PAY.items.push({
    description: `${name.value} - привилегия на сервере PHERMENTLAND`,
    amount: {
      value: `${price.value}.00`,
      currency: 'RUB',
    },
    vat_code: 1,
    quantity: 1
  });

  const data = {
    product: original.value,
    time: time.value
  }

  const req = await PAY.CreatePayment(data, price.value);

  if (req.confirmation.confirmation_url !== null) {
    localStorage.setItem("pay", true);
    window.location.replace(req.confirmation.confirmation_url);
  }
}

onMounted(async () => {
  width.value = window.innerWidth;
  localStorage.setItem("pay", false);
});

useHead({
    title: "Магазин Привилегий"
})
</script>

<style scoped>
  .main {
      background: rgb(0, 0, 0, 0.5) url("~/public/img/Background.png") fixed 50%/ cover no-repeat;
      backdrop-filter: blur(10px);
      min-width: 100%;
      font-family: "Game";
      text-align: center;
      min-height: 100vh;
  }

  .content {
    margin: 60px auto;
    display: flex;
    justify-content: space-evenly;
  }

  h2 {
    margin-top: 50px;
    color: #FFF;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .title__product {
    margin-top: 50px;
    color: #FFF;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .discount {
    border-radius: 20px;
    background: #DE9E00;
    color: white;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 16%;
    position: relative;
    left: 91%;
    bottom: 40px;
    transform: rotate(14.35deg);
  }

  .discount p {
    padding: 16px 12px;
  }

  .form input {
    border-radius: 15px;
    background: #FFF;
    color: black;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: "Game";
    padding: 16px 120px;
  }

  button {
    border-radius: 15px;
    background: #DE2C6E;
    color: #FFF;
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: "Game";
    padding: 13px 132px;
    cursor: pointer;
    margin-bottom: 26px;
  }

  button.active:hover {
    background: #b72259;
  }

  button:active {
    background: gray;
  }

  button.inactive {
    background: gray;
    cursor: no-drop;
  }

  .terms_accept p {
    color: #FFF;
    font-family: "Game";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 20px;
  }

  .terms__terms button {
    margin: 30px 80px;
  }

  /* ======================== */

  .privilegies {
    width: 70%;
    margin: 20px 0 0 40px;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 40px;
  }

  .privilegies__privilege {
    border-radius: 20px;
    background: #FFF;
    width: 70%;
    margin: 0 auto 40px auto;
    color: #111;
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .privilegies__privilege img {
    margin-top: 20px;
    max-height: 150px;
  }

  .privilege__title {
    margin: 30px 0;
    color: #111;
  }

  .char {
    margin-bottom: 15px;
    color: #111;
    font-family: "Gilroy";
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: start;
    margin-left: 20px;
  }

  .privilege__chars {
    margin-bottom: 40px;
  }

  @media(max-width: 1440px) {
    h1 {
      font-size: 72px;
    }

    h2, .title__product {
      font-size: 40px;
    }

    .discount {
      font-size: 25px;
    }

    .form input {
      padding: 16px 60px;
    }

    .privilegies__privilege {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    .form {
      width: 60%;
    }

    .privilegies {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .privilegies__privilege {
        margin-top: 20px;
    }
  }

  @media (max-width: 768px) {

    h2, .title__product {
      font-size: 30px;
    }

    .discount {
      font-size: 20px;
    }

    .form input {
      font-size: 20px;
      padding: 12px 20px;
    }

    .form__price {
      font-size: 25px;
    }

    .form__offer {
      font-size: 15px;
    }

    .form button {
      font-size: 25px;
      padding: 13px 60px;
    }

    .terms__info {
      padding: 20px;
      font-size: 16px;
    }

    .terms__label {
      font-size: 20px;
    }

    .active {
        font-size: 20px;
        padding: 13px 50px;
    }

    .privilegies__privilege img {
        width: 50%;
    }

    .privilege__title {
        font-size: 24px;
    }

    .char {
        font-size: 20px;
    }
  }

  @media (max-width: 425px) {
    * {
      display: block;
    }

    .content {
      display: flex;
      flex-direction: column;
    }

    .privilegies {
      width: 100%;
      margin-left: 0;
    }

    .social__social {
      width: 100%;
      margin: 0 auto;
    }

    .main {
      width: 100%;
      display: block;
      margin: 0 auto;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 16px;
    }

    .form {
      width: 100%;
    }

    .form input {
      font-size: 18px;
      padding: 10px;
      margin: 0 auto;
    }

    .form button {
      margin: 0 auto;
    }

    .form__label {
      padding-top: 20px;
    }

    .form__info {
      font-size: 16px;
      padding-top: 10px;
    }

    .terms__terms {
      width: 100%;
      word-break: break-all;
    }

    .terms__info {
      padding: 0;
    }

    .terms {
      position: absolute;
      top: 0;
    }

    .terms_accept {
      padding-left: 0;
    }

    .terms__terms button {
      width: 100%;
      margin: 20px 0;
    }

    .privilegies__privilege {
        width: 100%;
        margin: 10px auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  }

</style>