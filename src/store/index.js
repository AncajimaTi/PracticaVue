
import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    tareas:[],
    tarea:{
      id:'',
      nombre:'',
      categorias:[],
      estado:'',
      numero:0
    },
    user:null
  },
  mutations: {
    setUser(state,payload){
       // console.log(payload);
        state.user=payload;
    },
    SessionUser(state,payload){
      
      state.user=payload;
      //console.log(state.user);
    },
    Logout(state){
      state.user=null;
      router.push('/ingreso');
      localStorage.removeItem('usuario');
    },
    cargar(state,payload){
      state.tareas = payload;
    },
    set(state,payload){

      state.tareas.push(payload);
      //console.log(state.tareas);
      // localStorage.setItem('tareas',JSON.stringify( state.tareas));
    },
    eliminar(state,payload){
      state.tareas= state.tareas.filter(item=>item.id !==payload);
      // localStorage.setItem('tareas',JSON.stringify(state.tareas));
    },
    tarea(state,payload){
      if(!state.tareas.find(item=>item.id == payload)){
        router.push('/');
        return ;
      }
      state.tarea= state.tareas.find(item=>item.id == payload);aaa
    },
    update(state,payload){
      state.tareas= state.tareas.map(item=> item.id == payload.id ? payload : item);
      // localStorage.setItem('tareas',JSON.stringify( state.tareas));
      router.push('/');
    }

  },
  actions: {
    // cargarLocalStorage({commit}){
    //   if(localStorage.getItem('tareas')){
    //     commit('cargar',JSON.parse(localStorage.getItem('tareas')));
    //     return;
    //   }
    //   localStorage.setItem('tareas',JSON.stringify([]));
    // },

    //REGISTRAR  USUARIO
    async RegistarUsuario({commit},user){
        try {
          const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK__XAHjH75GX8zDRcYdl8M1Nf6p5ubXw`,
                                 {
                                   method:'POST',
                                   body:JSON.stringify({
                                     email:user.email,
                                     password:user.password,
                                     returnSecureToken:true
                                   })
                                 }     
                            );
          
          const result = await resp.json();
          console.log(result)
          
          if(result?.error){
            console.log(result.error.message)
            return ;
          }else{
            commit('setUser',result);
            router.push('/')
            localStorage.setItem('usuario',JSON.stringify(result));
          }
        

              
        } catch (error) {
          console.log(error)
        }

        
    },

    //INGRESAR USUARIO
    async IngresarUsuario({commit},user){
        
      try {
          const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK__XAHjH75GX8zDRcYdl8M1Nf6p5ubXw`,
                              {
                                method:'POST',
                                body:JSON.stringify({
                                  email:user.email,
                                  password:user.password,
                                  returnSecureToken:true
                                })
                              });
          const result = await resp.json();                      
       
          // console.log(result)

          if(result?.error){
              console.log(result.error.message);
              return ;
          }else{
            commit('SessionUser',result);
            router.push('/')
            localStorage.setItem('usuario',JSON.stringify(result));
          }
          
      
        
      } catch (error) {
        console.log(error)
      }

    },

    //logout 
    LogoutSession({commit}){
      commit('Logout');
    },

    async CargarDatos({commit,state}){
      if(localStorage.getItem('usuario')){
        commit('SessionUser',JSON.parse(localStorage.getItem('usuario')));
      }else{
        return commit('SessionUser',null);
      }
        try {
          console.log("entre a esta function")
            console.log(state.user.idToken);
            const resp= await fetch(`https://udemy-api-1282d.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`);
            const body= await resp.json();
            // console.log(body);
            const ArrayLisTarea=[];
           for (const item in body) {
               // console.log(item)
                ArrayLisTarea.push(body[item]);

           }  
         //  console.log(ArrayLisTarea);


            commit('cargar',ArrayLisTarea);
        } catch (error) {
            
            console.log(error)
        }

    },

    async setTareas({commit,state},tarea){
      try{
        const res = await fetch(`https://udemy-api-1282d.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
                    {
                      method:'PUT',
                      headers:{
                        'Content-Type':'application/json'
                      },
                      body:JSON.stringify(tarea)
                    });
        const body = await res.json();

       

        commit('set',tarea);
      }catch(error){
          console.log(error);
      }
      
    },
    async deletTarea({commit,state},id){
        try {
          const resp = await fetch(`https://udemy-api-1282d.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,
                                {
                                method:'DELETE',
                                headers:{
                                  'Content-Type':'application/json'
                                },
                                
                                })
          const body = await resp.json();
          
          console.log(body)

          commit('eliminar',id);
        } catch (error) {
          console.log(error)
        }



     
    },
    setarea({commit},id){
      commit('tarea',id)
    },
    async updateTarea({commit,state},tarea){
      try {
        const resp = await fetch(`https://udemy-api-1282d.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
                                  {
                                    method:'PATCH',
                                    headers:{
                                      'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify(tarea)
                                  })
        const body = await resp.json();

        console.log(body)
        
        //router.push('/');
        commit('update',tarea)
      } catch (error) {
        console.log(error)
      }

     
    }
  },
  getters:{
      usuarioAutenticado(state){
        return !!state.user
      }
  },
  modules: {
  }
})
