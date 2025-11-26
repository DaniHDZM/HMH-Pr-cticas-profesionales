<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const irLista = () => {
  router.push("/");
};

const irFormulario = () => {
  router.push("/formulario");
};

const esRuta = (ruta) => route.path === ruta;
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <p class="navbar-brand">HMH</p>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" :class="{ activo: esRuta('/') }" @click="irLista"
            >Lista</a
          >
          <a
            class="nav-link"
            :class="{ activo: esRuta('/formulario') }"
            @click="irFormulario"
            >Formulario</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-family: "Times New Roman", Times, serif;
  font-size: 24px;
  margin: 0;
  padding-right: 1rem;
}

nav {
  background-color: #d3d4d9 !important;
  border-bottom: 2px solid #9893da;
  padding: 0.5rem 1rem;
}

.nav-link {
  padding: 8px 14px;
  margin-right: 0.5rem;
  border-radius: 10px;
  transition: 0.3s;
}

.nav-link:hover {
  background-color: #bbbdf6;
}

.nav-link.activo {
  background-color: #9893da;
  color: #fff !important;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 500ms ease-in-out 100ms;
}
</style>
