<script setup>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { onMounted, ref, watch, defineProps } from "vue";

// Registra os componentes necessários para o gráfico de barras
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ctx = ref(null);

// Define as props para aceitar os dados dinamicamente
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

// Função para criar o gráfico
const createChart = () => {
  // Verifica se props.data contém dados antes de tentar mapear
  if (Array.isArray(props.data) && props.data.length > 0) {
    const canvas = ctx.value.getContext("2d");

    // Extrai os meses e totais do payload para o gráfico
    const labels = props.data.map(item => `Mês ${item.month}`);
    const dataset = props.data.map(item => item.total);

    new Chart(canvas, {
      type: "bar",
      data: {
        labels, // Meses
        datasets: [
          {
            label: "Quantidade de Clientes",
            data: dataset, // Totais
            backgroundColor: [
              "#1a43c0",
              "#1e57e6",
              "#3b6de6",
              "#527fe6",
              "#6992e6",
            ],
            borderColor: ["#163cac", "#1b4dd3", "#3762d3", "#4c75d3", "#6188d3"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  } else {
    console.error("Dados inválidos ou vazios fornecidos para o gráfico.");
  }
};

// Recria o gráfico quando a prop `data` mudar
onMounted(() => {
  createChart();
});

watch(() => props.data, () => {
  createChart();
});
</script>

<template>
  <div class="chart">
    <canvas ref="ctx" id="myChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
}
</style>
