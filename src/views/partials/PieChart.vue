<script setup>
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { onMounted, ref } from "vue";

// Registra os componentes necessários para o gráfico de pizza
Chart.register(PieController, ArcElement, Tooltip, Legend);

const props = defineProps({
  data: Object,
});

const ctx = ref(null);

onMounted(() => {
  const canvas = ctx.value.getContext("2d");

  new Chart(canvas, {
    type: "pie",
    data: props.data,
    options: {
      plugins: {
        legend: {
          display: true, // Exibe a legenda
          position: "top", // Define a posição da legenda
        },
        tooltip: {
          enabled: true, // Exibe tooltips para cada segmento
        },
      },
    },
  });
});
</script>

<template>
  <div>
    <canvas ref="ctx" id="myChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  width: 100%;
}
</style>