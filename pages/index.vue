<script setup>
  import Header from "~/components/Header.vue";
  import Footer from "~/components/Footer.vue";
  import axios from "axios";

  let width = ref(0);

  const IP = ref("play.phermentland.ru")

  const data = reactive( { value: { online: false } });

  const link = (link) => {
    window.open(link, "_blank");
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  }

  onMounted(async () => {
    width.value = window.innerWidth;
    localStorage.setItem("pay", false);
  });

  onBeforeMount(async () => {
    const req = await axios.get(`https://api.mcstatus.io/v2/status/java/${IP.value}`);

    data.value = req.data;
  })

  useHead({
    title: "PHERMENTLAND - Ванильный Майнкрафт",
    meta: {name: "description", content: "Ванильный Майнкрафт Сервер"}
  })
</script>

<template>
  <Header />
  <div class="main">
    <h1>PHERMENTLAND</h1>
    <h2>Ванильный Майнкрафт Сервер</h2>

    <img v-if="width > 1440" class="first" src="~/public/img/1.png" alt="first" />

    <div class="section_one">
      <p class="sec_text">Тот самый проект,<br>который ты так<br>долго искал</p>
      <NuxtLink to="/shop"><button class="start_but">Начать Играть</button></NuxtLink>
    </div>

    <div class="info">
      <h3>Сервер</h3>
<!--      <div class="info__info" v-if="!data.online">-->
<!--       <p>Сервер выключен!</p>-->
<!--      </div>-->
      <div class="info__info">
        <p @click="copy(IP)" class="ip">{{ IP }} 
          <svg xmlns="http://www.w3.org/2000/svg" height="36" width="31" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>
        </p>
        <p v-if="data.value.online === true">Версия: 1.20 - 1.20.4</p>
        <p v-else>Сервер выключен!</p>
        <p v-if="data.value.online === true">Онлайн: {{ data.value.players.online }}/{{ data.value.players.max }}</p>
      </div>
    </div>

    <div class="section_two">
      <div class="sec_left">
        <img class="sec_img" src="https://images.ctfassets.net/b9htocfkzvt0/3f7hg9ObdnjhUcq1xWAxk8/184e0ebcf6f18a8c9c98d907dd6fbc8d/about4.webp" alt="">
        <div class="sec_info">
          <div class="sec_title">
            <img src="https://images.ctfassets.net/b9htocfkzvt0/2hd2wbhFiJiBncSb9nLbuJ/114fb0bfead3d3a7cab0c0bf1d13413e/emoji4.png" alt="">
            <p>Долгосрочные проекты</p>
          </div>
          <p class="sec_desc">Часто бывает так, когда месяцами строишь огромный проект, а потом из-за закрытия всё пропадает. Это не про наш сервер, у нас вы смело можете реализовывать свои самые крупные постройки, не боясь что они пропадут через несколько месяцев. Заходи на сервер и начинай свой мегапроект прямо сейчас.</p>
          <NuxtLink to="/shop"><button class="start_but" style="font-size: 32px; padding: 14px 70px;">Начать Играть</button></NuxtLink>
          </div>
      </div>
      <div class="sec_left">
        <div class="sec_info_r">
          <div class="sec_title">
            <img src="https://images.ctfassets.net/b9htocfkzvt0/6eqp7qijgAhLus1foalm3f/34e02daed3196f85764313b00eb6118b/emoji1.png" alt="">
            <p>Что такое PhermentLand?</p>
          </div>
          <p class="sec_desc">Наш сервер ориентирован на любителей и ценителей ванильного Minecraft. Мы прислушиваемся к пожеланиям игроков и постоянно совершенствуем геймплей, создавая необходимые условия для комфортного выживания и не ломая баланс его основного геймплея. Мы всегда поддерживаем уютную и дружескую атмосферу.</p>
          <NuxtLink to="/shop"><button class="start_but" style="font-size: 32px; padding: 14px 70px;">Начать Играть</button>
          </NuxtLink></div>
        <img class="sec_img" src="https://images.ctfassets.net/b9htocfkzvt0/1wdsxnRz6RVBgVyRv4BJHk/2c037394ec819a6a83f6e7af12eff3d9/about1.webp" alt="">
      </div>
      <div class="sec_left">
        <img class="sec_img" src="https://images.ctfassets.net/b9htocfkzvt0/6TLg8YLsK76XXVswqRaaM6/6d7868d2f994833a976abe684b42f6e4/about3.webp" alt="">
        <div class="sec_info">
          <div class="sec_title">
            <img src="https://images.ctfassets.net/b9htocfkzvt0/58NgtGq0krjrhtSGjh7sdc/cce55ec63704931d5d0ec2d079e27d55/emoji3.png" alt="">
            <p>Частые ивенты</p>
          </div>
          <p class="sec_desc">На нашем сервере регулярно проходят ивенты, на которых вы легко можете поднять своё настроение и найти новых друзей. Каждый игрок может сам организовать ивент, а администрация, в свою очередь, поможет найти участников. Заходи к нам и побывай на ивенте лично!</p>
          <NuxtLink to="/shop"><button class="start_but" style="font-size: 32px; padding: 14px 70px;">Начать Играть</button></NuxtLink>
        </div>
      </div>
    </div>

    <img v-if="width > 1440" class="second" src="~/public/img/2.png" alt="second" />

    <div class="social">
      <p class="social__title">Социальные Сети</p>
      <div class="social__social">
        <div @click="link('https://vk.com/phermentland')" class="social_soc">
          <svg class="soc__img" xmlns="http://www.w3.org/2000/svg" width="150" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M31.5 63.5C0 95 0 145.7 0 247V265C0 366.3 0 417 31.5 448.5C63 480 113.7 480 215 480H233C334.3 480 385 480 416.5 448.5C448 417 448 366.3 448 265V247C448 145.7 448 95 416.5 63.5C385 32 334.3 32 233 32H215C113.7 32 63 32 31.5 63.5zM75.6 168.3H126.7C128.4 253.8 166.1 290 196 297.4V168.3H244.2V242C273.7 238.8 304.6 205.2 315.1 168.3H363.3C359.3 187.4 351.5 205.6 340.2 221.6C328.9 237.6 314.5 251.1 297.7 261.2C316.4 270.5 332.9 283.6 346.1 299.8C359.4 315.9 369 334.6 374.5 354.7H321.4C316.6 337.3 306.6 321.6 292.9 309.8C279.1 297.9 262.2 290.4 244.2 288.1V354.7H238.4C136.3 354.7 78 284.7 75.6 168.3z"/></svg>
          <p v-if="width > 445" class="soc__link">phermentland</p>
        </div>
        <!-- <div @click="link('https://www.twitch.tv/pherment_')" class="social_soc">
          <svg class="soc__img" xmlns="http://www.w3.org/2000/svg" width="150" viewBox="0 0 512 512"><path fill="#FFFFFF" d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z"/></svg>
          <p v-if="width > 445" class="soc__link">pherment_</p>
        </div> -->
        <div @click="link('https://discord.gg/ZfkeGXhH9U')" class="social_soc">
          <svg class="soc__img" xmlns="http://www.w3.org/2000/svg" width="190" viewBox="0 0 640 512"><path fill="#FFFFFF" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg>
          <p v-if="width > 445" class="soc__link">Дискорд</p>
        </div>
        <div @click="link('https://t.me/phermentland')" class="social_soc">
          <svg class="soc__img" xmlns="http://www.w3.org/2000/svg" width="150" viewBox="0 0 496 512"><path fill="#FFFFFF" d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/></svg>
          <p v-if="width > 445" class="soc__link">@phermentland</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
  .main {
    background: rgb(0, 0, 0, 0.5) url("~/public/img/Background.png") fixed 50%/ cover no-repeat;
    backdrop-filter: blur(10px);
    width: 100%;
    font-family: "Game";
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

  .first {
    transform: rotate(-46.992deg);
    position: absolute;
    right: -7%;
    top: 7%;
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

  button:hover {
    background: #b72259;
  }

  button:active {
    background: gray;
  }

  button.inactive {
    background: gray;
    cursor: no-drop;
  }

  .second {
    transform: scale(1, -1) rotate(158.82deg);
    position: absolute;
    left: -15%;
    bottom: 8%;
  }

  .social {
    margin-top: 150px;
    padding-bottom: 150px;
  }

  .social__title {
    color: #FFF;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .social__social {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 120px;
  }

  .social_soc {
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
  }

  .soc__link {
    color: #FFF;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .soc__img {
    margin-bottom: 22px;
  }

  .info {
    margin-top: 150px;
  }

  .info h3 {
    color: #FFF;
    text-align: center;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .info__info {
    width: 40%;
    margin: 50px auto 0 auto;
    border-radius: 10px;
    background: #0DABE7;
    text-align: center;
    padding: 40px;
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

  .section_one {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sec_text {
    color: #FFF;
    text-align: center;
    font-family: Gilroy;
    font-size: 85px;
    font-style: normal;
    font-weight: 400;
    line-height: 90px;
    letter-spacing: 0.425px;
    font-family: "Gilroy";
    margin-top: 77px;
  }

  .start_but {
    margin-top: 90px;
    color: white;
    text-align: center;
    font-family: "Game";
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 10px;
    background: #0DABE7;
    text-decoration: none;
    padding: 20px 120px;
    cursor: pointer;
  }

  .start_but:hover {
      background: #097caa;
  }

  .section_two {
    margin-top: 120px;
    background: #111111;
    padding: 40px 70px;
    color: white;
  }

  .sec_left {
    display: flex;
    margin-bottom: 80px;
  }

  .sec_img {
    border-radius: 25px;
    width: 100%;
  }

  .sec_info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .sec_info_r {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  .sec_title {
    display: flex;
    align-items: center;
  }

  .sec_title p {
    font-size: 48px;
    margin-left: 17px;
  }

  .sec_title img {
    width: 58px;
  }

  .sec_desc {
    font-family: "Gilroy";
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 30px;
    flex: 1;
  }

  @media(max-width: 1440px) {
    h1 {
      font-size: 72px;
    }

    h2 {
      font-size: 40px;
    }

    .first {
      right: -20%;
    }

    .discount {
      font-size: 25px;
    }

    .info__info p {
      font-size: 24px;
    }

    .soc__link {
      font-size: 45px;
    }
  }
  
  @media (max-width: 1024px) {
    .info__info {
      width: 60%;
    }

    .soc__link {
      font-size: 25px;
    }

    .soc__img {
      width: 40%;
    }
    
    .sec_title p {
      font-size: 32px;
    }

    .sec_desc {
      font-size: 24px;
    }
  }

  

  @media (max-width: 768px) {
    h2 {
      font-size: 30px;
    }

    .info__info p {
      font-size: 25px;
    }

    .sec_desc {
      font-size: 18px;
    }

    .section_two {
      margin-top: 40px;
      padding: 0;
    }

    .start_but {
      font-size: 24px;
      padding: 15px 50px;
    }

    .section_one {
      text-align: center;
    }
  }

  @media (max-width: 425px) {
    * {
      display: block;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 16px;
    }

    .info__info {
      width: 100%;
    }

    .info__info {
      padding: 10px 0;
    }

    .info__info p {
      font-size: 20px;
      padding-bottom: 10px;
    }

    .social__title {
      font-size: 25px;
    }

    .social__social {
      margin-top: 30px;
    }

    .sec_left {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .sec_info {
      text-align: center;
      width: 100%;
      margin: 0 auto;
      margin-left: 0;
    }

    .sec_info_r {
      margin-right: 0;
    }

    .sec_title p {
      font-size: 18px;
    }

    .sec_title img {
      width: 30px;
    }
  }
</style>