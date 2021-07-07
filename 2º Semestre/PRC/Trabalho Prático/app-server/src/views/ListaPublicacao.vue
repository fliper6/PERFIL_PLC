<template>
    <div id="listapublicacao" class="home">

     <v-container>
      
      <v-row no-gutters>
        <v-col cols="12" class="publicacoes">
          <v-row>
              <v-col cols="6">
                  <h1>Posts</h1>                  
              </v-col>
          </v-row>
          <NovaPublicacao></NovaPublicacao>
          <v-container class="pubs">
            <v-row v-for="n in list" :key="n.id" no-gutters>
              <v-col cols="12">
                <router-link style="text-decoration:none" :to="'/posts/' + n.id">
                    <v-card class="pa-6 post" outlined  >
                    <v-row align="center">
                        <v-col sm="3" style="display: flex; flex-direction: row; justify-content: flex-end;">
                            <v-avatar style="margin-left: auto; margin-bottom: 20px;" size="200">
                                <v-img style=" border: 4px solid #114e8a;" v-bind:src="getIconPath(n.fotografia)"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col style="padding-left:50px" cols="9">
                            <v-card-title style="font-size:30px; color:#e88b00;">{{n.titulo}}</v-card-title>
                            <v-card-text style="font-size:18px;">posted by <router-link style="text-decoration:none;" :to="'/user/'+n.user"><b>{{n.user}}</b></router-link></v-card-text>
                            <v-card-text>{{n.data.split("T")[0].slice(5, 10) + '  ' + n.data.split("T")[1].split('.')[0].slice(0, -3)}}</v-card-text>
                        </v-col>
                    </v-row>
                </v-card> 
                </router-link>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols=12>
                    <v-pagination
                    v-model="page"
                    class="my-4"
                    :length="this.pages"
                    :total-visible="7"
                    @input="buscarPagina"
                ></v-pagination>
                </v-col>
            </v-row>
          </v-container>
          
        </v-col>
        
    
      </v-row>
    </v-container>
    
    </div>

</template>



<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'
import NovaPublicacao from '../views/NovaPublicação.vue'

export default {
    name: 'ListaPublicacao',
    data() {
        return { 
            image: "",
            all: false,
            bigger: false,
            limite: 8,
            pages:1,
            page:1,
            data: [], 
            list: [],
            recs: [], 
            token:'',
            seguidos:[],
            user:'',
        }
    },
    components: {
        NovaPublicacao
    },
    created() {
        this.token = localStorage.getItem('jwt')
        if(this.$route.query.page) {
            this.page = this.$route.query.page
        }
        axios({
            method: "get",
            url: `http://localhost:13000/publicacao?page=${this.page}`,
            headers: { "Authorization" : this.token},
        })
        .then(data => { 
            this.list = data.data
        })
        .catch(err => {
            console.log(err)
        })
        axios({
            method: "get",
            url: "http://localhost:13000/publicacao/count",
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            this.pages = parseInt(parseInt(data.data.total)/5) + 1
        })
        .catch(err => {
            console.log(err)
        })
        this.user = jwt.decode(this.token).username
    },
    updated(){
        if(this.$route.query.page) {
            this.page = this.$route.query.page
        }
        
    },
    methods: {
        getIconPath (iconName) {
            return iconName ? require(`../assets/${iconName}`) : ''
        },
        buscarPagina(pag){
            axios({
                method: "get",
                url: `http://localhost:13000/publicacao?page=${pag}`,
                headers: { "Authorization" : this.token},
            })
            .then(data => { 
            this.list = data.data
            })
            .catch(err => {
                console.log(err)
            })
            window.scrollTo(0,0);
        },
        
    },
    
}

</script>




<style>

.home {
    text-align: center;
    height: 100vh;
}

.home h1{
    font-size: 30px;
    text-decoration: underline;
    text-align: left;
    margin-top: 10px;
    text-underline-offset: 7px;
    text-decoration-thickness: 6px;
    text-decoration-color: #e88b00;
}

.home a{
    margin-top: 20px;
}

.publicacoes {
    padding-right: 30px !important;
}

.pubs {
    background-color: #a9a9a94a;
    border-radius: 5px;
    margin-top: 50px;
}

.post {
    text-align: left;
    border-radius: 5px;
    margin: 10px;
}

.post:hover {
    background-color:#c9c9c9
}

.recursos {
    max-height: 840px;
    border-left: 2px solid #969090;
    background-color: white;
    padding-left: 30px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    right: 0;
    position: fixed;
}

.recursos h1 {
    text-align: center !important;
    text-decoration: none !important;
    background-color: #e88b00bd;
    width: fit-content;
    padding: 0px 5px;
}

.recs {
    margin-top: 20px;
}

.rec {
    text-align: left;
    border-radius: 5px;
    margin: 10px;
    margin-bottom: 30px;
}

.img {
    margin: auto;
    text-align: right;
    max-height: 80px;
    max-width: 80px;
}

</style>