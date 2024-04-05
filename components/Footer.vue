<template>
    <footer>
      <div class="footer__footer">
        <p class="footer__info">Почта: help@phermentland.ru<br>ИНН: 503624807203</p>
        <p class="footer__label">PHERMENTLAND 2024</p>
      </div>
    </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
    background: #0DABE7;
    text-align: start;
  }

  .footer__footer {
    width: 70%;
    margin: 0 auto;
    padding: 40px 0;
  }

  .footer__info {
    color: #FFF;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .footer__label {
    color: #FFF;
    font-family: "Minecraft";
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin-top: 50px;
  }

  @media (max-width: 1024px) {
    .footer__info {
      font-size: 24px;
    }

    .footer__label {
      font-size: 40px;
    }
  }

  @media (max-width: 425px) {
    * {
      display: block;
    }

    .footer__info {
      font-size: 16px;
    }

    .footer__label {
      font-size: 20px;
    }
  }
</style>