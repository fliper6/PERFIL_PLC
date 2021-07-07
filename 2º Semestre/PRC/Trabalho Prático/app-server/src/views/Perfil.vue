<template>
  <div id="perfil">
    
    <v-container style="max-width: 85%" class="perfil">
        <v-card class="pa-6 user" color="grey lighten-5" outlined> 
            <v-row>
              <v-col v-if="this.visivel" sm="3" class="pa-6">

                  <v-row>
                    <v-avatar style="margin: auto; margin-bottom: 20px;" size="200">
                      <v-img style=" border: 4px solid #114e8a;" v-bind:src="getIconPath(image)"></v-img>
                    </v-avatar>
                  </v-row>

                  <v-row v-if="this.visivel" align="end">
                    <SelectFile :user="this.user"/>
                  </v-row>

              </v-col>
              <v-col v-else sm="3" class="pa-6">

                  <v-avatar size="150">
                      <v-img style=" border: 4px solid #114e8a;" v-bind:src="getIconPath(image)"></v-img>
                  </v-avatar>
                
              </v-col>
              <v-col cols="6" sm="6" align="start">
                  <span v-if="user.nome" style="font-weight: bold; font-size: 30px; color: #114e8a;"> {{user.nome}} <br/> </span>
                  <span style="font-size: 25px; color: rgb(25 118 210);"> {{user.username}} <br/> </span> 
                  <hr style="margin: 10px 0px;"/> 
                  <span v-if="user.descrição" style="font-size: 22px;"> {{user.descrição}} <br/> </span>
                  <span style="font-size: 20px;"> <i> Registered since {{user.dataRegisto.split("T")[0]}} </i></span>
              </v-col>
              
              <v-col v-if="this.visivel" align="end">
                <EditPerfil :user="this.user"/>
              </v-col>
            </v-row>

        </v-card> 
        
    </v-container>

    <v-tabs style="max-width: 85%; margin: auto;"  v-model="tab" show-arrows color="rgb(17, 78, 138)" background-color="white" icons-and-text light grow>
        <v-tabs-slider color="rgb(17, 78, 138)"></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i.name" >
            <div style="font-size: 15px;" >{{ i.name }}</div>
        </v-tab>

        <v-tab-item>
          <v-container class="pubs">
            <v-row v-for="n in eventos" :key="n.id" cols="12" sm="6" no-gutters>
              <v-col cols=12>
                <v-card class="pa-6 pub" outlined>
                    <v-row align="center">
                        <v-col cols=10>
                            <v-card-title style="color:#e88b00;">{{n.titulo}}</v-card-title>
                            <v-card-text style="font-size:15px; font-weight:600">{{n.modalidade}}</v-card-text>
                            <v-card-text>{{n.dataInicio.split("T")[0].slice(5, 10) + '  ' + n.dataInicio.split("T")[1].split('.')[0].slice(0, -3)}} at {{n.local}}</v-card-text>
                        </v-col>
                        <v-col style="display: flex; flex-direction: row; justify-content: flex-end;">
                            <div v-if="token">
                                <v-btn style="color: #1671ca;font-weight: 900;" plain @click="unfollow(n.id)">Unfollow</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card> 
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
           <v-container class="pubs">
            <v-row v-for="n in pubs" :key="n.id" cols="12" sm="6" no-gutters>
              <v-col cols=12>
                <router-link style="text-decoration:none" :to="'/posts/' + n.id">
                    <v-card class="pa-6 post" outlined  >
                    <v-row align="center">
                        <v-col cols="9">
                            <v-card-title style="color:#e88b00;">{{n.titulo}}</v-card-title>
                            <v-card-text>{{n.data.split("T")[0].slice(5, 10) + '  ' + n.data.split("T")[1].split('.')[0].slice(0, -3)}}</v-card-text>
                        </v-col>
                    </v-row>
                </v-card> 
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

    </v-tabs>   
  
    
  </div>
</template>




<script>
import axios from 'axios'
import EditPerfil from "@/views/EditarPerfil.vue"
import SelectFile from "@/views/SelectFile.vue"
import jwt from 'jsonwebtoken'

export default {
    name: 'perfil',
    data() {
        return { 
            tab: 0,
            tabs: [
              {name:"Events"},
              {name:"Posts"} ],
            eventos: [],
            pubs:[],
            user: [],
            image: "",
            visivel: false,
            token: localStorage.getItem('jwt'),
            atual: ""
        }
    },
    components: {
      EditPerfil,
      SelectFile
    },
    created() {
        // Verificar se utilizador atual é o mesmo que o loggado
        this.payload = jwt.decode(this.token)
        this.atual = this.payload.username

        if(this.$route.params.id==this.atual){this.visivel=true}
        else{this.visivel=false}

        axios({ // Ir buscar utilizador
            method: "get",
            url: "http://localhost:13000/users/"+this.$route.params.id,
            headers: { "Authorization" : localStorage.getItem('jwt')},
        })
        .then(data => {
            this.user = data.data[0];
            if(this.user.fotografia == "") {
              this.image= "user-logout.png"
            } else {
              this.image = this.user.fotografia
            }

        })
        .catch(err => {
            console.log(err)
        })   

        axios({ // Ir buscar eventos seguidos pelo user
            method: "get",
            url: "http://localhost:13000/users/eventos/"+this.$route.params.id,
            headers: { "Authorization" : localStorage.getItem('jwt')},
        })
        .then(data => {
            this.eventos = data.data;
        })
        .catch(err => {
            console.log(err)
        })
        axios({ // Ir buscar eventos seguidos pelo user
            method: "get",
            url: "http://localhost:13000/publicacao/user/"+this.$route.params.id,
            headers: { "Authorization" : localStorage.getItem('jwt')},
        })
        .then(data => {
            this.pubs = data.data;
        })
        .catch(err => {
            console.log(err)
        })      
    },
    methods: {
      getIconPath (iconName) {
        return iconName ? require(`../assets/${iconName}`) : ''
      },
      mudarFoto(){
        const fd =  new FormData();
        fd.append('image', this.imageTemp)

        axios({
          method: "post",
          url: "http://localhost:13000/users/image/"+this.$route.params.id,
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' ,
                     "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
        })
        .then( () => {
          this.image = URL.createObjectURL(this.imageTemp)
          this.imageTemp = null
        })
        .catch(err => {
          console.log(err)
          alert('Não foi possível alterar fotografia')  
        })
      },
      unfollow(id){
          var json = {}
          json['evento'] = id
          axios({
              method: "delete",
              url: `http://localhost:13000/users/unfollow/${this.user.username}`,
              data:json,
              headers: { "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
          })
          .then( data => {
              this.eventos = data.data
          })
      }
    }
}

</script>




<style>

.user {
    text-align: left;
    border-radius: 5px;
    margin: 10px;
}
.active {
  background: grey;
}
.perfil {
    background-color: #a9a9a94a;
    border-radius: 5px;
    margin-top: 20px;
}

</style>