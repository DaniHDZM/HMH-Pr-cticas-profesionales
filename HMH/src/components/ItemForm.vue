<script setup>
import { ref } from 'vue'

const nombre = ref('')
const email = ref('')
const numero = ref('')
const errors = ref({})

const validacionFormulario = () => {
    errors.value = {}

    if (!nombre.value.trim()) {
        errors.value.nombre = "El nombre es obligatorio"
    }

    if (!email.value.trim()) {
        errors.value.email = "El email es obligatorio"
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        errors.value.email = "El email no es valido"
    }

    if (!numero.value.trim()) {
        errors.value.numero = "El número es obligatorio"
    } else if (numero.value.length !== 10) {
        errors.value.numero = "El número debe tener 10 caracteres"
    }

    if (Object.keys(errors.value).length === 0) {
        let listaUsuarios = JSON.parse(sessionStorage.getItem("usuarios")) || []

        listaUsuarios.push({
            id: Date.now(),
            nombre: nombre.value,
            email: email.value,
            numero: numero.value
        })
        sessionStorage.setItem("usuarios", JSON.stringify(listaUsuarios))
        alert("Formulario enviado correctamente")
        nombre.value = ""
        email.value = ""
        numero.value = ""
    }
}

</script>

<template>
    <form class="row g-3 needs-validation" novalidate @submit.prevent="validacionFormulario">
        <div class="col-md-4">
            <label for="validationCustom01" class="form-label">Nombre</label>
            <input v-model="nombre" type="text" class="form-control" :class="{ 'is-invalid': errors.nombre }" required>
            <div class="invalid-feedback">
                {{ errors.nombre }}
            </div>
        </div>
        <div class="col-md-4">
            <label for="validationCustom02" class="form-label">Correo</label>
            <input v-model="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" required>
            <div class="invalid-feedback">
                {{ errors.email }}
            </div>
        </div>
        <div class="col-md-4">
            <label for="validationCustomUsername" class="form-label">Numero</label>
            <input v-model="numero" type="text" class="form-control" :class="{ 'is-invalid': errors.numero }" required>
            <div class="invalid-feedback">
                {{ errors.numero }}
            </div>
        </div>
        <div class="col-12">
            <button class="btn btn-primary " type="submit">Submit form</button>
        </div>
    </form>

</template>

<style scoped>

</style>