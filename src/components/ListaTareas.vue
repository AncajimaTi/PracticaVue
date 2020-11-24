<template>

  <table class="table mt-2">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categoria</th>
        <th scope="col">Estado</th>
        <th scope="col">Numero</th>
        <th scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tarea) in tareas" :key="tarea.id">
        <th scope="row">{{tarea.id}}</th>
        <td>{{tarea.nombre}}</td>
        <td>
            <span v-for="(cat,index) in tarea.categorias" :key="index">
              
                {{(tarea.categorias.length === index +1) ? cat : cat+',' }}
            </span>

        </td>
        <td>{{tarea.estado}}</td>
        <td>{{tarea.numero}}</td>
        <td><button type="button" class="btn btn-danger" @click="deletTarea(tarea.id)">Eliminar</button>
            <router-link type="button" class="btn btn-warning"
                         :to="{name:'Editar',
                                params:{
                                        id:tarea.id
                                    }
                             }">Editar</router-link></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapState} from 'vuex';
 

export default {
    computed:{

        ...mapState(['tareas']),
    },
    methods:{
        // ...mapState(['tareas']),
        ...mapActions(['deletTarea']),
    }

};
</script>

<style>



</style>
