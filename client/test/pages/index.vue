<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="LogInContainer w-3/4 rounded-md flex justify-center items-center shadow-lg">
            <form  class="w-1/2 bg-slate-50 h-96 items-center flex justify-center">
                <div class="w-4/6">
                    <h1 class="text-center text-4xl font-normal">Sign Up</h1>
                    <div class="text-3xl w-full mt-4 rounded-md">
                        <input v-model="InputLogin" class="inputStyle" type="text">
                    </div>
                    <div class="text-3xl mt-4 bg-blue-200 rounded-md flex flex-row items-center">
                        <input v-model="InputPass" :type="showPassword ? 'text' : 'password'" class="w-1/2 inputStyle">
                        <span @click="togglePasswordVisibility"><img class="w-9 mr-3 cursor-pointer"
                                :src="showPassword ? EyeSlashImg : OpeneyeImg" alt=""></span>
                    </div>
                    <div class="text-2xl text-center pt-4">
                        <ButtonComponent class="font-light " @click="LogIn">Войти</ButtonComponent>
                    </div>
                </div>
            </form>
            <div class="Greetings w-1/2 h-96 bg-blue-100 rounded-r-md flex justify-center font-bold text-5xl items-center">
                <h1>Welcome back</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import eyeImg from '../assets/images/eye-svgrepo-com.svg';
import SlashedEye from '../assets/images/eye-slash-svgrepo-com.svg';
import ButtonComponent from "../components/ButtonComponent.vue";
import { useUserDataStorage } from '../stores/UserDataStorage';

const InputLogin = ref<string>("");
const InputPass = ref<string>("");
const showPassword = ref<boolean>(false);
const OpeneyeImg: string = eyeImg;
const EyeSlashImg: string = SlashedEye;
const userDataStorage = useUserDataStorage();
// переключение видимости пароля
const togglePasswordVisibility = (): void => {
    showPassword.value = !showPassword.value;
};
// логин
const LogIn = async () => {
    const URL = 'http://127.0.0.1:8000/api/auth/';
    const userData = {
        username: InputLogin.value,
        password: InputPass.value
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 401) {
            // Обработка ошибки авторизации
            console.error('Authorization error: Unauthorized');
            return;
        }

        const data = await response.json();

        // Сохранение данных пользователя в localStorage
        userDataStorage.setName(userData.username);
        userDataStorage.setPassword(userData.password);
        userDataStorage.setEmail(data.email);
        userDataStorage.saveToLocalStorage();

        // Перенаправление на страницу после успешной авторизации
        window.location.href = '/AuthPassPage';

        return data;
    } catch (error) {
        console.error('Error while logging in:', error);
    }
}
</script>

<style>
@media screen and (max-width: 650px) {
    .LogInContainer {
        flex-direction: column-reverse !important;
        width: 400px;
        height: 600px;
    }
    h1{
        font-size: 20px !important;
        height: 30px !important;
    }
    form{
        width: 90% !important;
    }

    .Greetings{
        width: 90% !important;
        height: 120px;
    }
}
</style>