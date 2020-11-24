import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{rutaProtegida:true}
  },
  {
    path: '/about',
    name: 'About',
    meta:{rutaProtegida:true},
   
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    meta:{rutaProtegida:true},
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
  {
    path:'/',
    redirect:'/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from,next)=>{
  console.log(to.meta.rutaProtegida);
  if(to.meta.rutaProtegida){
      if(store.getters.usuarioAutenticado){
        next();
      }else{
        next('/ingreso');
      }
  }else{
    next();
  }
})

export default router
