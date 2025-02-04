<script setup>
import { ref, onMounted,computed } from "vue";

import BaseTable from "@/components/table/BaseTable.vue";
import PieChart from "./partials/PieChart.vue";
import BarChart from "./partials/BarChart.vue";
import { useRoute, useRouter } from "vue-router";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseClientTable from "@/components/BaseClientTable.vue";
import { useClientStore } from "@/stores/clients";

const clientStore = useClientStore();

const router = useRouter();
const route = useRoute();

const chartData = ref(null);
const tasksData = ref(null);
const aluno = ref(null);

const loading = ref(false);

// Mock function to get dashboard data
const getDashboardData = async () => {
  try {
    const clientStatus = await clientStore.getClientStatus()

    const totalClients = clientStatus.totalClients || 0;
    const clientsWithBudgets = clientStatus.clientsWithBudgets || 0;
    const conversionRate = totalClients > 0 ? (clientsWithBudgets / totalClients) * 100 : 0;

    // Retorna os dados com a porcentagem de conversão
    return {
      ...clientStatus,
      conversionRate,
      clientsWithoutBudgets: totalClients - clientsWithBudgets, // Para o gráfico
    };
  } catch (error) {
    console.log(error)
  }

};

const clientsData = ref([]);
const dashboardData = ref({});
const chartDataConversion = ref(null);


const initFunction = async () => {
  loading.value = true;

  // Dados fictícios do aluno
  dashboardData.value = await getDashboardData();

  // Gráfico de conversão de clientes
  if (dashboardData.value) {
    chartDataConversion.value = {
      labels: ["Fizeram Orçamento", "Não Fizeram Orçamento"],
      datasets: [
        {
          data: [
            dashboardData.value.clientsWithBudgets,
            dashboardData.value.clientsWithoutBudgets,
          ],
          backgroundColor: ["#1a43c0", "#e8c3b9"],
          hoverOffset: 4,
        },
      ],
    };
  }

  loading.value = false;
};


onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="main-content" v-if="!loading || dashboardData">
      <!-- Dashboard Cards -->
      <div class="dashboard-cards">
        <div class="card">
          <h3>Total de Clientes</h3>
          <p>{{ dashboardData.totalClients }}</p>
        </div>
        <div class="card">
          <h3>Orçamentos Feitos</h3>
          <p>{{ dashboardData.clientsWithBudgets }}</p>
        </div>
        <div class="card">
          <h3>Clientes Recomendados</h3>
          <p>{{ dashboardData.clientsWithRecommender }}</p>
        </div>
      </div>
        <div class="page-container w-100">
          <div class="charts">
            <span style="font-weight: 600">Conversão de Clientes</span>
            <div v-if="dashboardData && chartDataConversion">
              <PieChart :data="chartDataConversion" />
              <span>
                <span style="font-weight: 600">Taxa de Conversão:</span>
                {{ dashboardData.conversionRate.toFixed(2) }}%
              </span>
            </div>
          </div>
          <div class="charts">
            <span style="font-weight: 600">Quantidade de Clientes por Mês</span>
            <BarChart :data="dashboardData.clientsByMonthSerializable" />
          </div>
        </div>
        <BaseClientTable/>
      </div>
      <div class="loading" v-else="loading">
        <BaseLoading />
      </div>
    </div>
</template>

<style scoped lang="scss">
.badge {
  color: rgb(2, 124, 2);
  margin-left: 3px;
  background-color: rgb(177, 251, 177);
  padding: 3px 15px;
  border-radius: 20px;
}
.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    .loading-icon > svg {
      width: 100px;
      height: 100px;
    }
  }
}

.main-content {
  width: 100%;
  .page-header {
    width: 100%;
    padding: 20px;
    justify-content: space-between;
    .badge-mobile {
      display: none;
    }
    @media (max-width: 466px) {
      flex-direction: column;
      justify-content: flex-end;

      margin-bottom: 0 !important;
      div {
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;

        img {
          width: 140px;
          height: 140px;
        }
      }

      .badge-mobile {
        display: inline;
      }
      .badge {
        text-align: center;
        width: 100%;
      }
      .badge-desktop {
        display: none;
      }
    }
  }
  .page-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    .charts {
      width: 50%;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.162);
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }

    @media (max-width: 800px) {
      flex-direction: column;

      .charts {
        width: 100%;
      }
    }
  }
}
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

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 20px;
}

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}
</style>
