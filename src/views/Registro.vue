<template>
  <h1>Registro de usuarios </h1>
    <form @submit.prevent="formularioRegistrar">
        <input 
            type="email" 
            placeholder="email"
            class="form-control my-2" 
            v-model.trim="email" />
        <input  
            type="password" 
            placeholder="contraseña"
            class="form-control my-2"
              v-model.trim="pass1"/>
        <input  
            type="password" 
            placeholder="contraseña"
            class="form-control my-2" 
            v-model.trim="pass2"/>

            
        <button 
                type="submit"
                class="btn btn-primary"
                :disabled="bloquear">Registrar</button>
    </form>

</template>

<script>
import {mapActions} from 'vuex';


export default {
    data(){
        return{
            email:'',
            pass1:'',
            pass2:'',
           
        }
    },
    computed:{
        bloquear(){

            if(this.email.includes('@')){
                if(this.pass1 === this.pass2 && this.pass1.length > 5){
                            return false;
                }
            }
             return true;
        }
    },
    methods:{
        ...mapActions(['RegistarUsuario']),
        formularioRegistrar(){
            this.RegistarUsuario({email:this.email,password:this.pass1});
            
            this.email='';
            this.pass1='';
            this.pass2='';
        }
    }
}
</script>

<style>

</style>