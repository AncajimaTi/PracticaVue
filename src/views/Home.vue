<template>
  <form @submit.prevent="procesarFormulario">
     <Input :tarea="tarea"/>
      <hr>
    <!--  <h6>{{tarea}}</h6>-->
     
  </form>

    <ListaTareas />
</template>

<script>
import Input from '../components/Input';
import ListaTareas from '../components/ListaTareas';
import {mapActions} from 'vuex';
const shortid = require('shortid');


export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas
  },
  data() {
    return {
     tarea:{
       id:'',
       nombre:'',
       categorias:[],
       estado:'',
       numero:0
     }
    }
  },
  methods:{
    ...mapActions(['setTareas','CargarDatos']),
    procesarFormulario(){
     // console.log(this.tarea)
      if(this.tarea.nombre.trim() === ""){
        console.log("campo vacio")
        return ;
      }
    //generando id

    this.tarea.id=shortid.generate();
    //console.log(this.tarea.id)

   this.setTareas(this.tarea);

    //limpiar campos 
      this.tarea={
       id:'',
       nombre:'',
       categorias:[],
       estado:'',
       numero:0
     }

    },
   
  },
    created(){
     this.CargarDatos();
  }
  
}
</script>
