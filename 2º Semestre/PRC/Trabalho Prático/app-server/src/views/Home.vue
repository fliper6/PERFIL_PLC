<template>
    <div id="home" class="home">

     <v-container>
      
      <v-row no-gutters>
        <v-col cols="12" class="publicacoes">
          <v-row>
              <v-col cols="6">
                  <h1>{{data}}</h1>                  
              </v-col>
              <v-col cols=2 offset=4>
                  <v-btn plain to="/eventos_modalidades">by Sport</v-btn>
              </v-col>
          </v-row>
          <v-container class="pubs">
            <v-row v-for="n in list" :key="n.id" no-gutters>
              <v-col cols="12" sm="2" >
                <v-card class="pa-6 pub">
                    <v-card-text style="font-size:40px; display: flex; flex-direction: row; justify-content: flex-end;font-family: Arial Black, Arial Bold, Gadget, sans-serif; color:#b9b9b9;">{{n.modalidade.substring(0,3).toUpperCase()}}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="10" >
                <v-card class="pa-6 pub" outlined  >
                    <v-row align="center">
                        <v-col cols="9">
                            <v-card-title style="color:#e88b00;">{{n.titulo}}</v-card-title>
                            <v-card-text style="font-size:15px; font-weight:600">{{n.modalidade}}</v-card-text>
                            <v-card-text>{{n.hora.slice(0, -3)}} at {{n.local}}</v-card-text>
                        </v-col>
                        <v-col style="display: flex; flex-direction: row; justify-content: flex-end;" >
                            <div v-if="token"> 
                                <v-btn style="color: #1671ca;font-weight: 900;" v-if="ifSegue(n.id)" plain @click="unfollow(n.id)">Unfollow</v-btn>
                                <v-btn style="font-weight: 900;" v-else plain @click="follow(n.id)">Follow</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card> 
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

export default {
    name: 'recursos',
    data() {
        return { 
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
    },
    created() {
        this.token = localStorage.getItem('jwt')
        if(this.$route.query.page) {
            this.page = this.$route.query.page
        }
        axios({
            method: "get",
            url: `http://localhost:13000/eventos/data?page=${this.page}`,
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            var splited = data.data.data.split("-")
            var date = new Date(splited[0], parseInt(splited[1])-1, splited[2])
            var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday" ,"Saturday"]
            var dayOfMonth = "th"
            if(splited[2]=='01' || splited[2] == '21' || splited[2] == '31') dayOfMonth = "st"
            else if(splited[2]=='02' || splited[2] == '22') dayOfMonth = "nd"
            else if(splited[2]=='03' || splited[2] == '23') dayOfMonth = "rd"
            var month = ""
            splited[1] == "07" ? month = "July" : month = "August"
            this.data = daysOfWeek[date.getDay()] + ", " + month + " " + splited[2] + dayOfMonth 
            this.list = data.data.list
        })
        .catch(err => {
            console.log(err)
        })
        axios({
            method: "get",
            url: "http://localhost:13000/eventos/data/count",
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            this.pages = parseInt(data.data.total)
        })
        .catch(err => {
            console.log(err)
        })
        if(this.token) this.user = jwt.decode(this.token).username
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
                url: `http://localhost:13000/eventos/data?page=${pag}`,
                headers: { "Authorization" : this.token},
            })
            .then(data => {
            var splited = data.data.data.split("-")
            var date = new Date(splited[0], parseInt(splited[1])-1, splited[2])
            var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday" ,"Saturday"]
            var dayOfMonth = "th"
            if(splited[2]=='01' || splited[2] == '21' || splited[2] == '31') dayOfMonth = "st"
            else if(splited[2]=='02' || splited[2] == '22') dayOfMonth = "nd"
            else if(splited[2]=='03' || splited[2] == '23') dayOfMonth = "rd"
            var month = ""
            splited[1] == "07" ? month = "July" : month = "August"
            this.data = daysOfWeek[date.getDay()] + ", " + month + " " + splited[2] + dayOfMonth 
            this.list = data.data.list
            })
            .catch(err => {
                console.log(err)
            })
            window.scrollTo(0,0);
        },
        ifSegue(id){
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
                headers: { "Authorization" : this.token},
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
                headers: { "Authorization" : this.token},
            })
            .then( data => {
                this.seguidos = data.data
            })
        }
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