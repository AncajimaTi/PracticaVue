<template>
<h1>Ingresar Usuario</h1>
  <form @submit.prevent="IngresarUser">
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


            
        <button 
                type="submit"
                class="btn btn-primary"
                :disabled="bloquear">Ingresar</button>
    </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            email: '',
            pass1:''
        }
    },
    methods:{
        ...mapActions(['IngresarUsuario']),
        IngresarUser(){
            this.IngresarUsuario({email:this.email,password:this.pass1});
            this.email= '';
            this.pass1='';
        }
    },
    computed:{
        bloquear(){
            if(this.email.includes('@')){
                if(this.pass1.length>5){
                    return false;
                }
            }
            return true;
        }
    }
}
</script>

<style>

</style>