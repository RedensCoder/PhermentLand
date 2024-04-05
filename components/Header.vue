<template>
    <header>
        <NuxtLink to="/"><img class="logo" src="~/public/img/logo.png" /></NuxtLink>
        <NuxtLink to="/">ГЛАВНАЯ</NuxtLink>
        <NuxtLink to="/rules">ПРАВИЛА</NuxtLink>
<!--        <NuxtLink to="/shop">МАГАЗИН</NuxtLink>-->
        <NuxtLink to="/signup"><button>Начать Играть</button></NuxtLink>
    </header>
</template>

<script setup>

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

.router-link-active {
    color: #0DABE7;
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