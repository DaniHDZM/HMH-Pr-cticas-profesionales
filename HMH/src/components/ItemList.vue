<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';

const usuarios = ref([])
const filtro = ref("")
const cargando = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    usuarios.value = data
  } catch (err) {
    error.value = "Fallo de conexión"
  } finally {
    cargando.value = false
  }
})

const usuariosFiltrados = computed(() => {
    if (!filtro.value.trim()) return usuarios.value 

    return usuarios.value.filter(user => {
        const texto = filtro.value.toLowerCase()

        return (
            user.name.toLowerCase().includes(texto) ||
            user.username.toLowerCase().includes(texto) ||
            user.website.toLowerCase().includes(texto) ||
            user.company.name.toLowerCase().includes(texto)
        )
    })
})

</script>

<template> 
    <section id="item-list">

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
                <th scope="col">Nombre de usuario</th>
                <th scope="col">Website</th>
                <th scope="col">Compañia</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="user in usuariosFiltrados" :key="user.id">
                
                <th scope="row">
                    {{ user.name }}
                </th>
                <td>
                    {{ user.username }}
                </td>
                <td>
                    {{ user.website }}
                </td>
                <td>
                    {{ user.company.name }}
                </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.error {
    color: #F00B00;
    font-weight: bold;
}

.cargando {
    color: #6CED58;
    font-weight: bold;
}

.encontrado {
    font-weight: bold;
}
</style>
