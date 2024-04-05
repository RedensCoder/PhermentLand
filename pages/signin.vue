<script setup>
import Header from "~/components/Header.vue";
import {usePayStore} from "~/stores/payStore.js";

const router = useRouter();
const PAY = usePayStore();

const nick = ref("");
const pass = ref("");

const signin = async () => {
  if (nick.value.trim() === "" || pass.value.trim() === "") {
    return alert("Вы ввели не все данные!");
  }

  await PAY.Signin(nick.value.trim(), pass.value.trim());

  await router.push("/profile");
}

onBeforeMount(async () => {
  if (localStorage.getItem("token") !== null) {
    const user = await PAY.GetUser();

    sessionStorage.setItem("user", JSON.stringify(user));

    router.push("/profile")
  }
})

useHead({
  title: "Авторизация"
})
</script>

<template>
  <Header />
  <div class="main">
    <p class="title">Авторизация</p>
    <div class="form">
      <label>Ник</label>
      <input v-model="nick" type="text" placeholder="Введите ваш никнейм в игре!">
      <label>Пароль</label>
      <input v-model="pass" type="password" placeholder="Введите пароль!">
      <p>У вас нет аккаунта? <NuxtLink to="/signup">Регистрация</NuxtLink></p>
      <button @click="signin">Авторизация</button>
    </div>
  </div>
</template>

<style scoped>
.main {
  background: rgb(0, 0, 0, 0.5) url("~/public/img/Background.png") fixed 50%/ cover no-repeat;
  backdrop-filter: blur(10px);
  width: 100%;
  height: 100vh;
  font-family: "Game";
}

.title {
  padding: 60px 0;
  color: #FFF;
  text-align: center;
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.form {
  color: white;
  background: #0DABE7;
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
}

.form label {
  font-size: 32px;
  padding: 15px 0;
}

.form input {
  font-family: "Game";
  font-size: 24px;
  text-align: center;
  padding: 16px 0;
  width: 90%;
  margin: 0 auto;
  border-radius: 15px;
}

.form p {
  font-size: 20px;
  padding: 30px 0;
}

.form a {
  color: #DE2C6E;
}

.form button {
  border-radius: 15px;
  background: #DE2C6E;
  color: #FFF;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  font-family: "Game";
  padding: 13px 32px;
  cursor: pointer;
  width: 60%;
  margin: 0 auto 26px auto;
}

.form button:hover {
  background: #b72259;
}

.form button:active {
  background: gray;
}

/* ADAPTIVE */

@media (max-width: 1024px) {
  .title {
    font-size: 40px;
  }

  .form label {
    font-size: 20px;
  }

  .form input {
    font-size: 18px;
    padding: 10px 0;
  }
  .form p {
    font-size: 18px;
  }

  .form button {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .title {
    padding: 20px 0;
  }

  .form {
    width: 90%;
  }

  .form button {
    width: 90%;
  }
}

@media (max-width: 425px) {
  * {
    display: block;
  }

  .form {
    width: 100%;
  }
}
</style>