<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


const irLista = () => {
    router.push('/')
}

const irFormulario = () => {
    router.push('/formulario')
}

const esRuta = (ruta) => route.path === ruta

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <p class="navbar-brand">HMH</p>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" :class="{ activo: esRuta('/') }" @click="irLista">Lista</a>
                    <a class="nav-link" :class="{ activo: esRuta('/formulario') }" @click="irFormulario">Formulario</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar-brand {
    font-family: 'Times New Roman', Times, serif;
    font-size: 24px;
    margin: 0;
}

.navbar-nav {
    cursor: pointer;
    margin: 1rem;
}

.nav-link {
    padding: 5px;
}

.activo {
    font-weight: bold;
    background-color: #BBBDF6;
    border-radius: 1rem;
    max-width: fit-content;
    transition: background-color 500ms ease-in-out 200ms;
}
</style>