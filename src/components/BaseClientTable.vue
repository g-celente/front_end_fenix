<script setup>
import { ref, onMounted, computed } from "vue";
import BaseTable from '@/components/table/BaseTable.vue';
import { useClientStore } from "@/stores/clients";
import { useRouter } from "vue-router";
import BaseLoading from "@/components/BaseLoading.vue";

const clientStore = useClientStore()
const router = useRouter()
const loading = ref(false)


const getClient = async () => {
    try {
        const clients = await clientStore.getClients()
        
        return clients
    } catch (error) {
        console.log(error)
    }
}

const fields = [
  {key: 'name', label: 'Nome'},
  {key: 'email', label: 'E-mail'},
  {key: 'phone', label: 'Telefone'},
]

const search = ref("");
const clientsData = ref([]);

// Filtered client data based on search input
const filteredData = computed(() => {
  if (!search.value) return clientsData.value;
  return clientsData.value.filter((client) =>
    client.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const initFunction = async () => {
    loading.value = true
    clientsData.value = await getClient();
    loading.value = false
}

// Fetch the clients data on component mount
onMounted(async () => {
  await initFunction()
});

// Function to handle "Ver mais" button click
const handleViewMore = (client) => {
  router.push({ name: 'Cliente', params: { id: client.id } });
};
</script>

<template>
  <div class="page-background">
    <!-- Search Bar -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="search" 
        placeholder="Pesquisar por nome de cliente" 
        class="search-input"
      />
    </div>
    <!-- Table -->
    <div class="table-container" style="margin-top: 40px" v-if="!loading">
      <BaseTable :fields="fields" :rows="filteredData" :has-options="true">
        <template v-slot:body>
          <tr v-for="(row, index) in filteredData" :key="index">
            <td v-for="field in fields" :key="field.key">{{ row[field.key] }}</td>
            <td>
              <button @click="handleViewMore(row)" class="btn-view-more">Ver mais</button>
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
    <div v-else class="loading">
        <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped>
.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  color: black;
  @media (max-width: 630px) {
    padding: 1rem;
  }
}

.search-bar {
  margin-bottom: -20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 96%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.search-input:focus {
  border-color: #1a43c0;
}

.table-container {
  width: 100%;
  padding: 20px;
  color: black;
}

.btn-view-more {
  background-color: #1a43c0;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn-view-more:hover {
  background-color: #1a43c0e6;
}
</style>
