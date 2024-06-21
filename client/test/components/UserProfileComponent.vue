<template>
    <div class="UserProfile w-4/5 h-auto bg-blue-200 shadow-md rounded-md  flex flex-row">
        <div class="w-28 h-auto mr-5">
            <input type="file" ref="fileInput" style="display: none" @change="onFileChange">
            <img class="w-20 m-5 rounded-full h-16" :src="imageUrl" alt="" @click="openFileInput">
        </div>

        <div class="w-2/3 h-auto mt-5 flex flex-col">
            <div class="gap-4 flex flex-row UserInfo">
                <span class="font-bold">User Email:</span>
                <p>{{ Data.email }}</p>
            </div>
            <div class="gap-4 flex flex-row UserInfo">
                <span class="font-bold">User Name:</span>
                <p>{{ Data.userName }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ProfileImage from "../assets/images/user-round-svgrepo-com.svg";
import { ref, onMounted } from "vue";

interface UserData {
    email: string;
    userName: string;
}

interface ImageData {
    url: string;
    name: string;
    type: string;
}

const Data = ref<UserData>({ email: '', userName: '' });
const imageUrl = ref<string>(ProfileImage);

const fileInput = ref<HTMLInputElement | null>(null);

const openFileInput = () : void => {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

const onFileChange = (event: Event) : void => {
    // Получение выбранного файла пользователем
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    // Обработка выбранного файла
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imageUrl.value = reader.result as string;
            
            // Сохранение изображения в localStorage
            const imageData: ImageData = {
                url: reader.result as string,
                name: file.name,
                type: file.type,
            };
            localStorage.setItem('userImage', JSON.stringify(imageData));
        };
        reader.readAsDataURL(file);
    }
}

onMounted(() => {
    // Загрузка данных из localStorage
    const data = localStorage.getItem('userData');
    if (data !== null) {
        const userData: UserData = JSON.parse(data);
        Data.value = userData;
    }

    const savedImageData = localStorage.getItem('userImage');
    if (savedImageData) {
        const imageData: ImageData = JSON.parse(savedImageData);
        imageUrl.value = imageData.url;
    }
    // Загрузка файла
    fileInput.value = document.createElement('input');
    fileInput.value.type = 'file';
});
</script>

<style scoped>
@media screen and (max-width: 480px) {
 .UserInfo {
     flex-direction: column !important;
     gap: 0;
     margin: 10px;
 }   
}

@media screen and (max-width: 300px) {
    .UserProfile {
        flex-direction: column !important;
        padding-left: 40px;
    }   
    .UserInfo {
        text-align: center;
    }   
   }
</style>