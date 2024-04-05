<template>
    <header>
      <div class="logo">
        <NuxtLink to="/"><img class="logo" src="~/public/img/logo.png" /></NuxtLink>
        <p>PHERMENTLAND</p>
      </div>
      <div class="account">
                <p>{{ user.data.nickname }}</p>
        <img class="logo" :src="user.data.avatar" />
      </div>
    </header>
</template>

<script setup>
import {usePayStore} from "~/stores/payStore.js";

const router = useRouter();

const PAY = usePayStore();

const user = reactive({ data: { nickname: "Загрузка...", avatar: null } });

onBeforeMount(async () => {
  if (localStorage.getItem("token") !== null) {
    try {
      const user = await PAY.GetUser()

      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      await router.push("/signin");
    }
  } else {
    await router.push("/signin");
  }

  user.data = await JSON.parse(sessionStorage.getItem("user"));
  user.data.avatar = `https://mineskin.eu/helm/${user.data.nickname}/36.png`
})

useHead({
  title: "Профиль"
})
</script>

<style scoped>
header {
    background: rgba(20, 20, 20, 0.5);
    backdrop-filter: saturate(130%) blur(15px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 5px 0;
    z-index: 10;
}

a, button {
    color: white;
    font-family: "Game";
    cursor: pointer;
    text-decoration: none;
}

.logo, .account {
  display: flex;
  align-items: center;
}

.logo p, .account p {
  margin: 0 10px;
  font-size: 20px;
  color: white;
}

button {
    color: white;
    text-align: center;
    font-family: "Game";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 10px;
    background: #0DABE7;
    padding: 11px 60px;
    cursor: pointer;
}

button:hover {
    background: #097caa;
}

@media (max-width: 425px) {
    header {
        display: flex;
        flex-direction: column;
        position: static;
    }

    a {
        margin-top: 10px;
    }
}
</style>