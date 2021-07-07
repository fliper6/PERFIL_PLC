<template>
    <div id="modalidades" class="modalidades">

     <v-container>
      
      <v-row no-gutters>
        <v-col cols="12" class="publicacoes">
          <v-row>
                <v-col style="float: left; display: flex; flex-direction: row;" cols="8">
                    <h1>{{eve}}</h1> 
                    <v-col style="padding-top: 20px;">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn style="float:left;" color="primary" dark v-bind="attrs" v-on="on"> Change sport </v-btn>
                            </template>
                            <v-list style="max-height:500px;">
                                <v-list-item style="background-color:white" v-for="(item, index) in items" :key="index">
                                    <v-list-item-title><v-btn plain @click="mod(item.modalidade)">{{ item.modalidade }}</v-btn></v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>                 
                </v-col>
                <v-col cols=2 offset=2>
                    <v-btn plain to="/">by Date</v-btn>
                </v-col>
          </v-row>
          <v-container class="pubs">
            <v-row v-for="n in list" :key="n.id" cols="12" sm="6" no-gutters>
              <v-col cols=12>
                <v-card class="pa-6 pub" outlined  >
                    <v-row align="center">
                        <v-col cols="9">
                            <v-card-title style="color:#e88b00;">{{n.titulo}}</v-card-title>
                            <v-card-text style="font-size:15px; font-weight:600">{{n.data.split("T")[0].slice(5, 10) + '  ' + n.data.split("T")[1].split('.')[0].slice(0, -3)}} at {{n.local}}</v-card-text>
                        </v-col>
                        <v-col style="display: flex; flex-direction: row; justify-content: flex-end;">
                            <div v-if="token">
                                <v-btn style="color: #1671ca;font-weight: 900;" v-if="ifSegue(n.id)" plain @click="unfollow(n.id)">Unfollow</v-btn>
                                <v-btn style="font-weight: 900;" v-else plain @click="follow(n.id)">Follow</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card> 
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

export default {
    name: 'recursos',
    data() {
        return { 
            all: false,
            bigger: false,
            limite: 8,
            page:1,
            eve: '', 
            list: [],
            recs: [], 
            token:'',
            seguidos:[],
            user:'',
            items:[]
        }
    },
    components: {
    },
    created() {
        this.token = localStorage.getItem('jwt')
        if(this.$route.query.page) {
            this.page = this.$route.query.page
        }
        axios({
            method: "get",
            url: `http://localhost:13000/eventos/modalidades?page=${this.page}`,
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            this.eve = data.data.titulo
            this.list = data.data.list
        })
        .catch(err => {
            console.log(err)
        })
        if(this.token) {
            this.user = jwt.decode(this.token).username
            axios({
                method: "get",
                url: `http://localhost:13000/users/eventos/${this.user}`,
                headers: { "Authorization" : this.token},
            })
            .then(data => {
                this.seguidos = data.data
            })
            .catch(err => {
                console.log(err)
            })
        }
        axios({
            method: "get",
            url: `http://localhost:13000/modalidades`,
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            this.items = data.data
        })
        .catch(err => {
            console.log(err)
        })
        

    },
    updated(){
        if(this.$route.query.page) {
            this.page = this.$route.query.page
        }
    },
    methods: {
        buscarPagina(pag){
            axios({
                method: "get",
                url: `http://localhost:13000/eventos/modalidades?page=${pag}`,
                headers: { "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
            })
            .then(data => {
                this.eve = data.data.titulo
                this.list = data.data.list
            })
            .catch(err => {
                console.log(err)
            })
            window.scrollTo(0,0);
        },
        handleDate(data){
            return new Date(data)
        },ifSegue(id){
            for(const elem of this.seguidos){
                if(elem.id == id) return true
            }
            return false
        },
        follow(id){
            var json = {}
            json['evento'] = id
            axios({
                method: "put",
                url: `http://localhost:13000/users/follow/${this.user}`,
                data:json,
                headers: { "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
            })
            .then( data => {
                this.seguidos = data.data
            })
        },
        unfollow(id){
            var json = {}
            json['evento'] = id
            axios({
                method: "delete",
                url: `http://localhost:13000/users/unfollow/${this.user}`,
                data:json,
                headers: { "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
            })
            .then( data => {
                this.seguidos = data.data
            })
        },
        mod(id){
            this.eve = id
            var json = {}
            json['modalidade'] = id
            axios({
                method: "post",
                url: `http://localhost:13000/eventos/modalidades`,
                data : json,
                headers: { "Authorization" : this.token},
            })
            .then(data => {
                this.list = data.data
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    },
    
}

</script>




<style>

.modalidades {
    text-align: center;
    height: 100vh;
}

.modalidades h1{
    font-size: 30px;
    text-decoration: underline;
    text-align: left;
    margin-top: 10px;
    text-underline-offset: 7px;
    text-decoration-thickness: 6px;
    text-decoration-color: #e88b00;
}

.modalidades a{
    margin-top: 20px;
}

.publicacoes {
    padding-right: 30px !important;
}

.pubs {
    background-color: #a9a9a94a;
    border-radius: 5px;
    margin-top: 30px;
}

.pub {
    text-align: left;
    border-radius: 5px;
    margin: 10px;
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