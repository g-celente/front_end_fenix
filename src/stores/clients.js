import { defineStore } from "pinia";
import api from "@/api"

export const useClientStore = defineStore('clients', () => {

    async function getClients() {

        try {
            const clients = await api.client.getClients();
            
            console.log(clients)
            return clients.data
        } catch (error) {
            console.log(error)
        }
    }

    async function getClientById(payload) {

        try {
            const client = await api.client.getClientById(payload)

            return client.data
        } catch (error) {
            console.log(error)
        }
        
    }

    async function getClientStatus() {
        try {
            const client_status = await api.client.getClientStatus()

            return client_status.data
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getClients,
        getClientById,
        getClientStatus
    }

})