<script setup>
import { ref } from 'vue'

const nombre = ref('')
const email = ref('')
const numero = ref('')
const errors = ref({})
const enviado = ref(false)

const validacionFormulario = () => {
    errors.value = {}
    enviado.value = false

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
        enviado.value = true
        nombre.value = ""
        email.value = ""
        numero.value = ""
    }
}

</script>

<template>
    <div id="div-form">
        <h1>Formulario</h1>
        <p v-if="enviado" class="enviado">Formulario enviado</p>
    
        <form id="formulario" class="row g-3 needs-validation" novalidate @submit.prevent="validacionFormulario">
            <div class="col-md-6">
                <label class="form-label">Nombre</label>
                <div class="input-group-custom">
                    <span class="icono">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </span>
                    <input v-model="nombre" placeholder="Nombre" type="text" class="form-control" :class="{ 'is-invalid': errors.nombre }" required>
                </div>
                <div class="invalid-feedback">
                    {{ errors.nombre }}
                </div>
            </div>
            <div class="col-md-6">
                <label class="form-label">Correo</label>
                <div class="input-group-custom">
                    <span class="icono">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                        </svg>
                    </span>
                    <input v-model="email" placeholder="Email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" required>
                </div>
                <div class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>
            <div>
                <label class="form-label">Numero</label>
                <div class="input-group-custom">
                    <span class="icono">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg>
                    </span>
                    <input v-model="numero" placeholder="Teléfono" type="text" class="form-control" :class="{ 'is-invalid': errors.numero }" required>
                </div>
                <div class="invalid-feedback">
                    {{ errors.numero }}
                </div>
            </div>
            <div class="col-12">
                <button id="btn-submit" type="submit">
                    Enviar
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>

</template>

<style scoped>
#formulario {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #EFF1F4;
    border-radius: 10px;
    border: #000000 2px solid;
}

#btn-submit {
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #BBBDF6;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    transition: all 500ms ease-in-out 200ms;
}

#btn-submit:hover {
    background-color: #9893DA;
    color: #FFFFFF;
    box-shadow: 0 0 10px rgba(0,0,0,0.7);
}

#div-form {
    margin: 2rem;
    
}

.enviado {
    font-size: 24px;
    color: #3AB734;
    font-weight: bold;
}

.form-label {
    display: none;
}

.input-group-custom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.input-group-custom .icono {
    display: flex;
    align-items: center;
}
</style>