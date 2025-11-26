<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';

const usuarios = ref([])
const filtro = ref("")
const cargando = ref(true)
const error = ref(null)
const datos = JSON.parse(sessionStorage.getItem("usuarios")) || []

onMounted(async () => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
        usuarios.value = data
    } catch (err) {
        error.value = "Fallo de conexión"
    } finally {
        cargando.value = false
    }

    datos.forEach(u => {
        usuarios.value.push({
            id: u.id,
            name: u.nombre,
            email: u.email,
            phone: u.numero
        })
    })

})

const usuariosFiltrados = computed(() => {
    if (!filtro.value.trim()) return usuarios.value 

    return usuarios.value.filter(user => {
        const texto = filtro.value.toLowerCase()

        return (
            user.name.toLowerCase().includes(texto) ||
            user.email.toLowerCase().includes(texto) ||
            user.phone.toLowerCase().includes(texto)
        )
    })
})

</script>

<template> 
    <section id="item-list">

        <h1>Lista de usuarios</h1>

        <input
            v-model="filtro"
            type="text"
            placeholder="Filtrar usuarios..."
            class="form-control mb-3"
        />
        <p v-if="cargando" class="cargando">Cargando...</p>

        <p v-else-if="error" class="error">{{ error }}</p>

        <p v-else-if="usuariosFiltrados.length === 0" class="encontrado">
            Usuario no encontrado
        </p>

        <table v-else class="table">
            
            <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Número</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="user in usuariosFiltrados" :key="user.id">
                
                <th scope="row">
                    {{ user.name }}
                </th>
                <td>
                    {{ user.email }}
                </td>
                <td>
                    {{ user.phone }}
                </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.error {
    color: #ED254E;
    font-weight: bold;
}

.cargando {
    color: #3AB734;
    font-weight: bold;
}

.encontrado {
    font-weight: bold;
}

#item-list {
    margin: 2rem;
}

.table tbody :hover{
    background-color: #D2D1FF;
}

.table thead th {
    background-color: #9893DA;
    color: #ffffff;
}
</style>
