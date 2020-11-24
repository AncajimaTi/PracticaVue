<template>
  
  <div class="navbar navbar-dark bg-dark p-3">
      <router-link to="/" class="navbar-brand">
        Formulario
      </router-link>
      <div class="d-flex">
            <router-link 
              v-if="usuarioAutenticado"
              class="btn btn-dark" to="/">
            Tareas
            </router-link>
             <router-link 
              v-if="!usuarioAutenticado"
              class="btn btn-dark" to="/ingreso">
            Ingresar
            </router-link>
             <router-link 
              v-if="!usuarioAutenticado"
              class="btn btn-dark" to="/registro">
            Registrar
            </router-link>
            <button class="btn btn-dark" @click="LogoutSession"  v-if="usuarioAutenticado">
              Cerrar Session
            </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters(['usuarioAutenticado'])
  },
  methods:{
    ...mapActions(['LogoutSession'])
  }
}
</script>

