<template>
    <div id="newPub">
        <v-dialog max-width="900px" v-model="show">
            <template v-slot:activator="{ on }">
                <v-btn style="float: right;" v-on="on">+ Post</v-btn>
            </template>
            <v-card >
                <v-card-text >
                    <v-container>
                        
                        <v-col id="titulo">
                            <h1 >Create new post:</h1>
                        </v-col>

                        <v-col class="pa-2">
                            <v-text-field 
                            dense
                            :rules="[rules.required,rules.length]"
                            type="text" 
                            v-model="titulo" 
                            label="Title"
                            outlined
                            ></v-text-field>
                        </v-col>

                        <v-col class="pa-2">
                            <v-textarea
                            type="text" 
                            :rules="[rules.required,rules.length]"
                            v-model="publicacao" 
                            label="Content"
                            outlined
                            ></v-textarea>
                        </v-col>

                        <v-col align="right">
                          <v-btn :disabled="dis()" :loading="loading" v-ripple="{ class: 'primary--text' }" width="150" style="height:40px" class="white--text" elevation="1" v-on:click="submeter()" color="#00ace6">Post</v-btn>
                          <v-btn v-ripple="{ class: 'primary--text' }" width="150" style="margin-left:10px;height:40px" class="white--text" elevation="1" v-on:click="cancelar()" color="#d2d0d0">Cancel</v-btn>
                        </v-col>

                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog> 
    </div>
</template>


<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {
    name: "newPub",
    data() {
        return{
          show:false,
          titulo:'',
          publicacao:'',
          loading:false,
          user:'',
          token:'',
          rules: {
                    required: value => !!value || "This camp is required.",
                    length: v => (v || '' ).length >= 5 || 'Field should be 5 characters or more'
            },
        }
    },
    created(){
        this.token = localStorage.getItem('jwt')
        this.user = jwt.decode(this.token).username
    },
    props: {
        value: Number
    },
    methods: {
        dis(){
            if(this.titulo.length >= 5 && this.publicacao.length >= 5) return false
            else return true
        },
        cancelar() {
            this.show=false
            this.titulo=''
            this.publicacao=''
            this.loading=false
        },
        submeter() {
            var json = {};
            json['user']= this.user
            json['publicacao'] = this.publicacao
            json['titulo'] = this.titulo
            axios({
                method: "post",
                url: "http://localhost:13000/publicacao/",
                data: json,
                headers: { "Authorization" : this.token},
            })
            .then(data => {
                    this.cancelar();
                    this.$router.push('/posts/' + data.data.id)
                    this.$router.go()
                })
            .catch(err => {
                    console.log(err)
                    alert('Não foi possível adicionar nova publicação')
                    this.cancelar();
                })
        }
    }
}

</script>

<style> 

#titulo h1{
    color: #00ace6;
}

</style>