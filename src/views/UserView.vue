<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useClientStore } from '@/stores/clients';
  import BaseLoading from '@/components/BaseLoading.vue';

  const clientStore = useClientStore();
  const router = useRouter();
  const loading = ref(false);

  const client = ref(null);

  const getClient = async (clientId) => {
    try {
      const clientData = await clientStore.getClientById({ id: clientId });
      return clientData;
    } catch (error) {
      console.log(error);
    }
  };

  const initFunction = async () => {
    loading.value = true;
    const clientId = parseInt(router.currentRoute.value.params.id, 10);
    client.value = await getClient(clientId);
    loading.value = false;
  };

  onMounted(async () => {
    await initFunction();
  });
</script>

<template>
  <div class="page-background">
    <div v-if="!loading && client" class="main-content">
      <div class="user-content">
        <div class="user-box shadow">
          <img
            src="@/assets/imgs/user_default_large.png"
            width="120px"
            alt="Default Image"
          />
          <div class="info-row">
            <span><strong>Nome:</strong> {{ client.name }}</span><br />
            <span><strong>E-mail:</strong> {{ client.email }}</span><br />
            <span><strong>Telefone:</strong> {{ client.phone }}</span><br />
            <span><strong>Recomendado por:</strong> {{ client.recommender }}</span>
          </div>
        </div>
      </div>

      <div class="page-container w-100">
        <div class="info-box shadow">
          <h3>Informações Adicionais</h3>
          <div class="info-row">
            <span><strong>CEP:</strong> {{ client.cep }}</span>
            <span><strong>Endereço:</strong> {{ client.street }} {{ client.house_number }}</span>
            <span><strong>Cidade:</strong> {{ client.city }}</span>
            <span><strong>CPF:</strong> {{ client.cpf }}</span>
          </div>
          <div class="info-row">
            <span><strong>Data de Criação:</strong> {{ client.createdAt }}</span>
            <span><strong>Última Atualização:</strong> {{ client.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <BaseLoading />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-background {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  height: 100%;
  background-color: #ffff;
}

.user-content {
  display: flex;
  justify-content: center;
  width: 100%;
}

.main-content {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 10px;
}

.page-container {
  width: 100%;
  display: flex;
  justify-content: center;

  .info-box {
    width: 100%;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h3 {
      text-align: center;
      margin-bottom: 20px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 20px;

      span {
        width: 45%;
        font-size: 14px;
        color: #333;
      }

      strong {
        font-weight: 600;
      }
    }
  }
}

.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
