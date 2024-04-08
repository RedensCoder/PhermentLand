<script setup>
import AuthHeader from "~/components/AuthHeader.vue";
import Aside from "~/components/Aside.vue";

import {usePayStore} from "~/stores/payStore.js";

const price = ref(50);

const PAY = usePayStore();
const router = useRouter();

const user = reactive({ data: {nickname: "Загрузка...", skin: null, status: null, access: false} })

const IP = ref("play.phermentland.ru")
const { data, pending } = useFetch(`https://api.mcstatus.io/v2/status/java/${IP.value}`);

const copy = (text) => {
  navigator.clipboard.writeText(text);
}

const exit = () => {
  sessionStorage.removeItem("user");
  localStorage.removeItem("token");

  router.push("/")
}

const buy = async () => {
  PAY.items.push({
    description: `Доступ на сервер PHERMENTLAND`,
    amount: {
      value: `${price.value}.00`,
      currency: 'RUB',
    },
    vat_code: 1,
    quantity: 1
  });

  const data = {
    product: "access",
    time: null
  }

  const req = await PAY.CreatePayment(data, price.value);

  if (req.confirmation.confirmation_url !== null) {
    localStorage.setItem("pay", true);
    window.location.replace(req.confirmation.confirmation_url);
  }
}

onBeforeMount(async () => {
  if (localStorage.getItem("token") === null) {
    router.push("/signin")
  }

  user.data = await PAY.GetUser();
  user.data.skin = `https://mineskin.eu/armor/body/${user.data.nickname}`
})
</script>

<template>
  <div class="main">
    <AuthHeader />
    <div class="content">
      <Aside />
      <div class="info">
        <div class="info__info" v-if="pending">
          <p>Загрузка...</p>
        </div>
        <div v-else class="info__info">
          <p @click="copy(IP)" class="ip">{{ IP }}
            <svg class="info__icon" xmlns="http://www.w3.org/2000/svg" height="36" width="31" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>
          </p>
          <p v-if="data.online === true">Версия: 1.20 - 1.20.4</p>
          <p v-else>Сервер выключен!</p>
          <p v-if="data.online === true">Онлайн: {{ data.players.online }}/{{ data.players.max }}</p>
        </div>
        <div v-if="!user.data.access" class="info__info" style="margin-top: 20px;">
          <p>У вас нет доступа на сервер!</p>
          <p>Доступ на сервер - {{price}} Руб</p>
          <button @click="buy">Купить Доступ</button>
        </div>
      </div>
      <div class="profile">
        <div class="nickname">
          <img v-if="user.data.status !== null" :src="`/img/${user.data.status}.png`" alt="prefix">
          <p class="nickname__nickname">{{ user.data.nickname }}</p>
        </div>
        <img :src="user.data.skin" alt="skin">
        <p v-if="user.data.access" class="profile__info">Доступ на сервер: Есть</p>
        <p v-else class="profile__info">Доступ на сервер: Нет</p>
        <button @click="exit">Выйти из аккаунта</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main {
    background: rgb(0, 0, 0, 0.5) url("~/public/img/Background.png") fixed 50%/ cover no-repeat;
    backdrop-filter: blur(10px);
    width: 100%;
    font-family: "Game";
    min-height: 100vh;
  }

  .content {
    margin: 60px auto;
    display: flex;
    justify-content: space-evenly;
  }

  .info__info {
    width: 600px;
    border-radius: 10px;
    background: rgba(20, 20, 20, 0.8);
    backdrop-filter: saturate(130%) blur(15px);
    text-align: center;
    padding: 40px;
    margin: 0 55px;
    max-height: 210px;
  }

  .info__info p {
    color: #FFF;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-bottom: 30px;
  }

  .ip {
    cursor: pointer;
  }

  .ip:active {
    color: #e8e8e8;
  }

  .profile {
    background: rgba(20, 20, 20, 0.7);
    backdrop-filter: saturate(130%) blur(15px);
    border-radius: 15px;
    padding: 20px 50px;
    text-align: center;
    color: white;
  }

  .nickname {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  .nickname__nickname {
    font-size: 32px;
    margin-left: 14px;
  }

  .profile__info {
    font-size: 24px;
    margin: 30px 0;
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
    padding: 13px 40px;
    cursor: pointer;
    margin-bottom: 26px;
  }

  button:hover {
    background: #b72259;
  }

  button:active {
    background: gray;
  }

  .ip {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info__icon {
    margin-left: 10px;
  }

  /* ======= ADAPTIVE ========= */

  @media(max-width: 1440px) {
    .info__info {
      width: 400px;
    }

    .info__info p {
      font-size: 24px;
    }

    .info__icon {
      width: 20px;
    }

    .profile {
      padding: 20px;
    }

    button {
      font-size: 24px;
    }
  }
  
  @media(max-width: 1024px) {
    .content {
      display: flex;
      flex-direction: column;
    }

    .info__info {
      width: 100%;
      margin: 0 auto;
      padding: 20px 0;
    }
  }
</style>