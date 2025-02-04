<script setup>

import BaseNavbar from "@/components/navBar/BaseNavbar.vue"; 
</script>

<template>

  <v-app>
      <div class="page-background">
      
        <main :class="`main `">
          <!-- Navbar -->
          <BaseNavbar class="navbar" />
      
          <div class="base-padding">
            <div class="background">
              <!-- O conteúdo da página será renderizado aqui -->
              <router-view class="view" />
            </div>
          </div>
        </main>
      </div>
  </v-app>
</template>

<style scoped>
.page-background {
  display: flex;
  position: relative;
}

.view {
  z-index: 0;
}

.sidebar {
  position: fixed;
  z-index: 99;
  box-shadow: 10px 0px 105px rgba(0, 0, 0, 0.267);
}

.base-padding {
  background-color: #ffffff;
  padding: 2rem;
  z-index: 0;
}

.navbar {
  top: 0;
  right: 0;
  z-index: 9999;
}

.main {
  transition: all ease-in-out 0.4s;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  padding-top: 64px; /* Certifique-se de adicionar a altura da navbar aqui */
  width: 100%;
  height: 100vh;
}

.background {
  background-color: #ffffff;
  border-radius: 10px;
  height: 100%;
}

@media (min-width: 0px) and (max-width: 840px) {
  .main {
    margin-left: 0px;
  }
}
</style>
