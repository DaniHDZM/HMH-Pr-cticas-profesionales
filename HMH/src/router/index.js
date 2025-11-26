import { createRouter, createWebHistory } from 'vue-router'
import ItemList from '../views/ItemList.vue'
import ItemForm from '../views/ItemForm.vue'

const routes = [
  { path: '/', component: ItemList },
  { path: '/formulario', component: ItemForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
