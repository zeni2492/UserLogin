import { defineStore } from "pinia";

interface State {
    userName: string;
    email: string;
    password: string;
}

export const useUserDataStorage = defineStore("userData", {
    state: (): State => {
        return {
            userName: "",
            password: "",
            email: ""
        };
    },
    actions: {
        setName(name: string) {
            this.userName = name;
        },
        setPassword(password: string) {
            this.password = password;
        },
        setEmail(email: string) {
            this.email = email;
        },
        saveToLocalStorage() {
            const { userName, password, email } = this.$state;
            localStorage.setItem("userData", JSON.stringify({email, userName, password, }));
        }
    },
});