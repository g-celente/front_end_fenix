export default (httpClient) => ({
    getClients: () => {
        return httpClient.get('/getClients')
    },
    getClientById: (data) => {
        return httpClient.post('/getClient', data)
    },
    getClientStatus: () => {
        return httpClient.get('/getClientStatus')
    }
})