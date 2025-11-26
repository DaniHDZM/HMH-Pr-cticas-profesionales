import { createRouter, createWebHistory } from 'vue-router'
import ItemList from '../components/ItemList.vue'
import ItemForm from '../components/ItemForm.vue'

const routes = [
  { path: '/', component: ItemList },
  { path: '/formulario', component: ItemForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
