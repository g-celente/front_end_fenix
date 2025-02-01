import { defineStore } from "pinia";
import api from "@/api"
import { ref } from "vue"


export const userStore = defineStore("auth", () => {
    const user = ref();

    async function userLogin(payload) {

        try {
            const response = await api.auth.userLogin(payload) 

            return response.data
        } catch (e) {
            console.log(e)
        }

    }

    return {
        user,
        userLogin
    }
})