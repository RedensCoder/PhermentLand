<template>
  <div class="main">
      <h1>PHERMENTLAND</h1>

      <p class="succes__title">Успешная Оплата!</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

const router = useRouter()

onMounted(async () => {
  if (localStorage.getItem("pay") == undefined || localStorage.getItem("pay") === "false") {
    router.push("/");
  }

  await axios.get("https://phermentland.online/notice");
  router.push("/");
})

useHead({
  title: "Успешная Оплата"
});
</script>

<style scoped>
.main {
    background: rgb(0, 0, 0, 0.5) url("~/public/img/Background.png") fixed 50%/ cover no-repeat;
    backdrop-filter: blur(10px);
    width: 100%;
    font-family: "Game";
    height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  h1 {
    padding-top: 50px;
    text-align: center;
    font-family: "Minecraft";
    font-size: 196px;
    color: white;
    text-shadow:
    -0   -15px 0   #0DABE7,
		 0   -15px 0   #0DABE7,
		-0    15px 0   #0DABE7,
		 0    15px 0   #0DABE7,
		-15px -0   0   #0DABE7,
		 15px -0   0   #0DABE7,
		-15px  0   0   #0DABE7,
		 15px  0   0   #0DABE7,
		-1px -15px 0   #0DABE7,
		 1px -15px 0   #0DABE7,
		-1px  15px 0   #0DABE7,
		 1px  15px 0   #0DABE7,
		-15px -1px 0   #0DABE7,
		 15px -1px 0   #0DABE7,
		-15px  1px 0   #0DABE7,
		 15px  1px 0   #0DABE7,
		-2px -15px 0   #0DABE7,
		 2px -15px 0   #0DABE7,
		-2px  15px 0   #0DABE7,
		 2px  15px 0   #0DABE7,
		-15px -2px 0   #0DABE7,
		 15px -2px 0   #0DABE7,
		-15px  2px 0   #0DABE7,
		 15px  2px 0   #0DABE7,
		-3px -15px 0   #0DABE7,
		 3px -15px 0   #0DABE7,
		-3px  15px 0   #0DABE7,
		 3px  15px 0   #0DABE7,
		-15px -3px 0   #0DABE7,
		 15px -3px 0   #0DABE7,
		-15px  3px 0   #0DABE7,
		 15px  3px 0   #0DABE7,
		-4px -15px 0   #0DABE7,
		 4px -15px 0   #0DABE7,
		-4px  15px 0   #0DABE7,
		 4px  15px 0   #0DABE7,
		-15px -4px 0   #0DABE7,
		 15px -4px 0   #0DABE7,
		-15px  4px 0   #0DABE7,
		 15px  4px 0   #0DABE7,
		-5px -15px 0   #0DABE7,
		 5px -15px 0   #0DABE7,
		-5px  15px 0   #0DABE7,
		 5px  15px 0   #0DABE7,
		-15px -5px 0   #0DABE7,
		 15px -5px 0   #0DABE7,
		-15px  5px 0   #0DABE7,
		 15px  5px 0   #0DABE7,
		-6px -15px 0   #0DABE7,
		 6px -15px 0   #0DABE7,
		-6px  15px 0   #0DABE7,
		 6px  15px 0   #0DABE7,
		-15px -6px 0   #0DABE7,
		 15px -6px 0   #0DABE7,
		-15px  6px 0   #0DABE7,
		 15px  6px 0   #0DABE7,
		-7px -15px 0   #0DABE7,
		 7px -15px 0   #0DABE7,
		-7px  15px 0   #0DABE7,
		 7px  15px 0   #0DABE7,
		-15px -7px 0   #0DABE7,
		 15px -7px 0   #0DABE7,
		-15px  7px 0   #0DABE7,
		 15px  7px 0   #0DABE7,
		-8px -15px 0   #0DABE7,
		 8px -15px 0   #0DABE7,
		-8px  15px 0   #0DABE7,
		 8px  15px 0   #0DABE7,
		-15px -8px 0   #0DABE7,
		 15px -8px 0   #0DABE7,
		-15px  8px 0   #0DABE7,
		 15px  8px 0   #0DABE7,
		-9px -15px 0   #0DABE7,
		 9px -15px 0   #0DABE7,
		-9px  15px 0   #0DABE7,
		 9px  15px 0   #0DABE7,
		-15px -9px 0   #0DABE7,
		 15px -9px 0   #0DABE7,
		-15px  9px 0   #0DABE7,
		 15px  9px 0   #0DABE7,
		-10px -15px 0   #0DABE7,
		 10px -15px 0   #0DABE7,
		-10px  15px 0   #0DABE7,
		 10px  15px 0   #0DABE7,
		-15px -10px 0   #0DABE7,
		 15px -10px 0   #0DABE7,
		-15px  10px 0   #0DABE7,
		 15px  10px 0   #0DABE7,
		-11px -15px 0   #0DABE7,
		 11px -15px 0   #0DABE7,
		-11px  15px 0   #0DABE7,
		 11px  15px 0   #0DABE7,
		-15px -11px 0   #0DABE7,
		 15px -11px 0   #0DABE7,
		-15px  11px 0   #0DABE7,
		 15px  11px 0   #0DABE7,
		-12px -15px 0   #0DABE7,
		 12px -15px 0   #0DABE7,
		-12px  15px 0   #0DABE7,
		 12px  15px 0   #0DABE7,
		-15px -12px 0   #0DABE7,
		 15px -12px 0   #0DABE7,
		-15px  12px 0   #0DABE7,
		 15px  12px 0   #0DABE7,
		-13px -15px 0   #0DABE7,
		 13px -15px 0   #0DABE7,
		-13px  15px 0   #0DABE7,
		 13px  15px 0   #0DABE7,
		-15px -13px 0   #0DABE7,
		 15px -13px 0   #0DABE7,
		-15px  13px 0   #0DABE7,
		 15px  13px 0   #0DABE7,
		-14px -15px 0   #0DABE7,
		 14px -15px 0   #0DABE7,
		-14px  15px 0   #0DABE7,
		 14px  15px 0   #0DABE7,
		-15px -14px 0   #0DABE7,
		 15px -14px 0   #0DABE7,
		-15px  14px 0   #0DABE7,
		 15px  14px 0   #0DABE7,
		-15px -15px 0   #0DABE7,
		 15px -15px 0   #0DABE7,
		-15px  15px 0   #0DABE7,
		 15px  15px 0   #0DABE7,
		-15px -15px 0   #0DABE7,
		 15px -15px 0   #0DABE7,
		-15px  15px 0   #0DABE7,
		 15px  15px 0   #0DABE7;
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

  .succes__title {
    font-size: 72px;
    color: white;
    margin-top: 40px;
    text-align: center;
  }
</style>