<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isDrawerOpen = ref(false);
const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("token-auth");
  router.push({ path: "/" });
};
</script>

<template>
  <v-navigation-drawer permanent class="v-navigation dark-theme">
    <v-list class="v-list">
      <v-list-subheader>Menu</v-list-subheader>
      <router-link to="/home">
        <v-list-item prepend-icon="mdi-home" class="v-list-item">Home</v-list-item>
      </router-link>
      <router-link to="/clientes">
        <v-list-item prepend-icon="mdi-account-group" class="v-list-item">Clientes</v-list-item>
      </router-link>
    </v-list>

    <!-- Botão de Logout -->
    <template v-slot:append>
      <v-btn block prepend-icon="mdi-logout" class="logout-btn" @click="handleLogout">
        Sair
      </v-btn>
    </template>
  </v-navigation-drawer>

  <!-- Navbar -->
  <v-app-bar class="nav-bar dark-theme">
    <v-btn icon @click="isDrawerOpen = !isDrawerOpen" class="nav-icon">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
/* Garante que a barra de navegação e a sidebar fiquem com fundo escuro */
.dark-theme {
  background-color: #252B5A !important;
  color: white !important;
}

.nav-bar {
  text-align: left;
}

.nav-icon {
  color: white;
}

.v-list {
  justify-content: space-between;
}

.v-list-item {
  color: white;
  padding: 5px;
}

.v-list-item:hover {
  color: #E8770B;
}

.logout-btn {
  color: rgb(214, 214, 214) !important;
  background-color: #E8770B;
}
</style>
