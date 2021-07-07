<template>
    <div id="publicacao" class="publicacao" >

        <v-container v-if="pub" style="padding: 40px 80px 0px 80px;">

            <v-row >

                <v-col sm="3" style="justify-items: center; display: flex; flex-direction: column; justify-content: center;">
                    <v-avatar style="margin: auto; margin-bottom: 20px;" size="170">
                        <v-img style="border: 4px solid #114e8a;" v-bind:src="getIconPath(image)"></v-img>
                    </v-avatar>
                </v-col>
                
                <v-col sm="8" style="padding-left: 10px; padding-top: 30px;" v-if="idUser==pub.user">
                    <v-text-field  style="font-size: 25px; " v-if="editing" type="text" no-resize v-model="newTitle" rows="4"></v-text-field>
                    <span v-else style="font-size: 25px; color: #53a6bf;"> <b>{{ pub.titulo }}</b> <br/> </span>
                    <span style="font-size:18px;"> posted by <router-link style="text-decoration:none;" :to="'/user/' + pub.user">{{ pub.user }}</router-link> </span> <br/><br/> 
                    <span> {{ pub.data.split("T")[0].slice(5, 10) }}  </span>
                </v-col>
                <v-col sm="9" style="padding-left: 10px; padding-top: 30px;" v-else>
                    <v-text-field  style="font-size: 25px; " v-if="editing" type="text" no-resize v-model="newTitle" rows="4"></v-text-field>
                    <span v-else style="font-size: 25px; color: #53a6bf;"> <b>{{ pub.titulo }}</b> <br/> </span>
                    <span style="font-size:18px;"> posted by <router-link style="text-decoration:none;" :to="'/user/' + pub.user">{{ pub.user }}</router-link> </span> <br/><br/> 
                    <span> {{ pub.data.split("T")[0].slice(5, 10) }}  </span>
                </v-col>

                <v-col sm="1" align="right" v-if="idUser==pub.user">
                    <v-icon style="font-size:18px;margin-right:10px" @click="editing=!editing"> mdi-pencil </v-icon>
                    <v-icon color="red" @click="removePost()"> mdi-close </v-icon> <br/>
                    <v-btn  style="margin-top: 10px;" v-if="editing" small @click="editPost()">Save</v-btn>
                </v-col>
            </v-row>
            <v-row class="corpo">
                <v-textarea v-if="editing" type="text" no-resize v-model="newBody" rows="4"></v-textarea>
                <span v-else> {{ pub.publicacao }} </span>
            </v-row>
        <br/>
        <hr style="border-top: 2px solid #b1b1b1;">
        </v-container>

        <v-container style="padding: 40px 80px;">

            <v-textarea solo v-model="com" rows="4" counter maxlength="400" label="Write your comment here..."></v-textarea>
            <v-btn style="float: right;" @click="addComment">Comment</v-btn> 

            <br/>

            <v-row no-gutters style="width: 100%;">
              <v-col v-for="n in comments" :key="n.id" cols="12" sm="12">
                  <v-row style="padding-top: 60px;">
       
                    <v-col style="border-radius: 5px; background-color: white;">
                        <v-row class="pa-0"> 
                            <v-col sm="9">
                                <span style="font-size: 20px; color: #ec6200;"> {{ n.user }} </span>
                            </v-col>
                            <v-col sm="3" align="right" v-if="idUser==n.user">
                                <v-btn style="margin-right:10px" v-if="n.id==editingCom" small @click="editComentario(n.id,n.data)">Save</v-btn>
                                <v-icon style="font-size:14px;margin-right:10px" @click="editCom(n.id,n.comentario)"> mdi-pencil </v-icon>
                                <v-icon small color="red" @click="removeComentario(n.id)"> mdi-close </v-icon>
                            </v-col>
                            <br/>
                        </v-row>
                        <span > {{n.data.split("T")[0].slice(5, 10) + '  ' + n.data.split("T")[1].split('.')[0].slice(0, -3)}} <br/> </span>
                        <hr>
                        <v-text-field v-if="n.id==editingCom" type="text" v-model="newBodyComment" ></v-text-field>
                        <span v-else style="padding-top: 10px;"> {{ n.comentario }} </span>
                    </v-col>

                  </v-row>

              </v-col>
            </v-row>

        </v-container>

    </div>
</template>



<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {
    name: 'Publicacao',
    data() {
        return { 
            image:'',
            newBodyComment:'',
            editingCom: -1,
            editing: false,
            idUser: null,
            com:"",
            token: localStorage.getItem('jwt'),
            pub: '',
            newBody: '',
            newTitle: '',
            comments:[]
        }
    },
    methods: {
        getIconPath (iconName) {
            return iconName ? require(`../assets/${iconName}`) : ''
        },
        editCom(id,body){
            this.editingCom==-1 ? this.editingCom=id : this.editingCom=-1
            this.newBodyComment = body
        },
        addComment() {
            var json = {};
            json['user'] = this.idUser
            json['comentario'] = this.com
            axios({
                method: "post",
                url: "http://localhost:13000/publicacao/comentarios/" + this.$route.params.id,
                data: json,
                headers: { "Authorization" : this.token},
            })
            .then(() => {
                    axios({
                    method: "get",
                    url: "http://localhost:13000/publicacao/comentarios/"+this.$route.params.id,
                    headers: { "Authorization" : this.token},
                })
                .then(data => {
                    this.comments = data.data;
                    this.com = ""
                })
                .catch(err => {
                    console.log(err)
                })
                })
            .catch(err => {
                    console.log(err)
                    alert('Não foi possível adicionar novo comentário')
                })
        },
        removePost(){
            if(confirm("Tem a certeza que deseja remover?")){
            var id = this.$route.params.id
            axios({
                method: "delete",
                url: "http://localhost:13000/publicacao/"+id,
                headers: { "Authorization" : this.token }
            })
            .then(() => {
                this.$router.push('/')
            })
            .catch(err => {
                console.log(err)
                alert('Não foi possível remover a publicação')
            })}
        },
        editPost(){
            var id = this.$route.params.id
            var json = {}
            json['titulo'] = this.newTitle
            json['body'] = this.newBody
            axios({
                method: "put",
                url: "http://localhost:13000/publicacao/"+id,
                headers: { "Authorization" : this.token },
                data: json
            })
            .then(() => {
                this.$router.go()
            })
            .catch(err => {
                console.log(err)
                alert('Não foi possível editar a publicação')
            })
        },
        removeComentario(id){
            if(confirm("Tem a certeza que deseja remover?")){
              axios({
                method: "delete",
                url: "http://localhost:13000/publicacao/comentarios/"+ this.$route.params.id + '?id=' + id,
                headers: { "Authorization" : this.token }
               })
               .then(() => {
                   this.$router.go()
               })
               .catch(err => {
                   console.log(err)
                   alert('Não foi possível remover o comentário')
               })
           }
        },
        editComentario(id,data){
            var json = {}
            json['body'] = this.newBodyComment
            json['data'] = data
            axios({
                method: "put",
                url: "http://localhost:13000/publicacao/comentarios/"+id,
                headers: { "Authorization" : this.token },
                data: json
            })
            .then(() => {
                this.$router.go()
            })
            .catch(err => {
                console.log(err)
                alert('Não foi possível editar o comentário')
            })
        }
    },
    created() {
        this.token = localStorage.getItem('jwt')
        this.idUser = jwt.decode(this.token).username
        axios({
            method: "get",
            url: "http://localhost:13000/publicacao/"+this.$route.params.id,
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            this.pub = data.data;
            this.newBody = this.pub.publicacao
            this.newTitle = this.pub.titulo

            if(this.pub.fotografia == "") {
                this.image= "user-logout.png"
            } else {
                this.image = this.pub.fotografia
            }
        })
        .catch(err => {
            console.log(err)
        })
        axios({
            method: "get",
            url: "http://localhost:13000/publicacao/comentarios/"+this.$route.params.id,
            headers: { "Authorization" : this.token},
        })
        .then(data => {
            this.comments = data.data;
        })
        .catch(err => {
            console.log(err)
        })
    }
}

</script>




<style>

.publicacao {
    border-radius: 5px;
    background-color: #c1bfbf61;
    width: 60%;

    margin: auto;
}

.corpo {
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    margin: 20px;
}

.img_perfil {
    margin-left: 20px;
    text-align: right;
    max-height: 100px;
    max-width: 100px;
    height: auto;
    width: 100%;
    padding-right: 10px;
}



</style>