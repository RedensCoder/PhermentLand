<template>
    <div class="dark"></div>
    <div class="form_absolute">
        <div class="form">
            <p class="form__label">Ник</p>
            <input v-model="nick" type="text" placeholder="Введите ваш ник в игре!" autocomplete="off">
            <input style="margin-top: 20px;" v-model="email" type="email" placeholder="Введите вашу почту!" autocomplete="off">
            <p class="form__price">{{ props.price }} Руб</p>
            <button v-if="nick === '' || !validator.isEmail(email)" class="inactive">КУПИТЬ {{ props.title }}</button>
            <button v-else @click="buy" class="active">КУПИТЬ {{ props.title }}</button>
        </div>
    </div>
</template>

<script setup>
import validator from 'validator';
import { usePayStore } from "~/stores/payStore";
import {ref} from "vue";

const PAY = usePayStore();

const props = defineProps(["title", "price", "time", "original"])

const nick = ref("");
const email = ref("");

const buy = async () => {
    PAY.items.push({
        description: `${props.title} - привилегия на сервере PHERMENTLAND`,
        amount: {
            value: `${props.price}.00`,
            currency: 'RUB',
        },
        vat_code: 1,
        quantity: 1
    });

    const data = {
        product: props.original,
        time: props.time
    }

    const req = await PAY.CreatePayment(data, props.price);

    if (req.confirmation.confirmation_url !== null) {
        localStorage.setItem("pay", true);
        window.location.replace(req.confirmation.confirmation_url);
    }
}
</script>

<style scoped>
.form_absolute {
    position: sticky;
    top: 20%;
    width: 100%;
    z-index: 101;
}

.dark {
    background: rgba(0, 0, 0, 0.57);
    min-height: 100%;
    max-height: 100vh;
    min-width: 100vw;
    position: absolute;
    top: 0;
    z-index: 100;
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

  .form {
    border-radius: 10px;
    background: #0DABE7;
    width: 40%;
    margin: 77px auto;
    text-align: center;
  }

  .form__label {
    color: #FFF;
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 18px;
    padding-top: 20px;
  }

  .form__price {
    color: #FFF;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 30px 0;
  }

  .form__offer {
    font-size: 20px;
    text-decoration: line-through;
    opacity: 70%;
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

  .form__info {
    color: #FFF;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-bottom: 24px;
  }

  @media (max-width: 1440px) {
    .form input {
      padding: 10px 50px;
    }
  }

  @media (max-width: 1024px) {
    .form {
      width: 90%;
    }
  }

  @media (max-width: 425px) {
    .form {
      width: 100%;
    }

    .form input {
      padding: 5px;
    }
  }
</style>