<template>
    <header class="w-full bg-blue-300 py-3 shadow-md flex justify-center">
        <div class="w-5/6 flex justify-between items-center">
            <h1 class="text-xl font-bold">Страница авторизованного пользователя</h1>
            <ButtonComponent @click="SignOut" class="ml-3 cursor-pointer ButtonHover">Выйти</ButtonComponent>
        </div>
    </header>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";

function SignOut(){
    window.location.href = '/';
    localStorage.removeItem('userData');
    localStorage.removeItem('userImage');
}
</script>
