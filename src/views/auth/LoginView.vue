<script setup>

import { ref } from "vue"
import { userStore } from "@/stores/auth/auth.js"
import { useRouter } from "vue-router";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";

const { userLogin } = userStore();
const router = useRouter();
const error = ref(false)
const disabled = ref(true);
const loading = ref(false)


const payload = ref({
    email: "",
    password: ""
})

const handleSubmit = async () => {
    loading.value = true

    try {
        const login = await userLogin(payload.value)

        if (login) {
            localStorage.setItem("token-auth", login.token)

            router.push({ path: "/home" })
        } else {

            error.value = true

            setTimeout(() => {
                error.value = false
            }, 3000)
        }

        loading.value = false

    } catch (error) {
        console.log(error)
    }   
}

</script>

<template>
    <div class="container">
      <div class="card">
        <!-- Lado esquerdo -->
        <div class="card-left">
          <span class="title">Bem Vindo De Volta!</span>
          <span class="subtitle">Por Favor, faça seu login</span>
          <div class="input-group">
            <span class="label">Email</span>
            <input
              type="text"
              v-model="payload.email"
              class="input"
              placeholder="Entre com seu email"
              @input="(ev) => (payload.email = ev.target.value)"
              @keydown="handleKeyPress"
            />
          </div>
          <div class="input-group">
            <span class="label">Senha</span>
            <input
              type="password"
              v-model="payload.password"
              class="input"
              placeholder="Entre com sua senha"
            />
          </div>
          <div class="options">
            <div class="remember">
              <input type="checkbox" class="checkbox" />
              <span>Relembrar por 30 dias</span>
            </div>
            <span class="forgot-password">
              <router-link to="/forgotPassword">Esqueci minha senha</router-link>
            </span>
          </div>
          <button @click="handleSubmit" class="btn primary">Entrar</button>
        </div>
        <!-- Lado direito -->
        <div class="card-right">
          <img src="@/assets/imgs/Logo Fênix Tintas.jpg" alt="img" class="image" />
        </div>
      </div>
    </div>
    <BaseAlertError v-if="error" key="0" type="error" text="Email ou senha incorretos" />
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  background-color: #252B5A;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin-top: 40px;
  margin-bottom: 158px;
  padding: 50px;
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}

@media (max-width: 500px) {
    .card-left {
        padding: 0px;
        font-size: 1rem;
    }

    .card {
        padding: 0px;
    }
}

.card-left {
  padding: 70px;
  margin-right: 20px;
}

.title {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
}

.subtitle {
  padding: 10px;
  font-weight: 300;
  color: #9ca3af;
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
  padding: 5px;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.input {
  width: 97%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-weight: 300;
  color: #6b7280;
  background-color: #ebebeb;
  padding: 10px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.remember {
  display: flex;
  align-items: center;
}

.checkbox {
  margin-right: 0.5rem;
}

.forgot-password {
  font-weight: bold;
}

.btn {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.btn.primary {
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
}

.btn.primary:hover {
  background-color: white;
  color: black;
  border: 1px solid #d1d5db;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
}

.card-right {
  padding: 0px;
  display: none;
}

@media (min-width: 768px) {
  .card-right {
    display: block;
  }
}

.image {
  width: 300px;
  height: 100%;
  border-radius: 0 1rem 1rem 0;
  object-fit: cover;
}
</style>
  