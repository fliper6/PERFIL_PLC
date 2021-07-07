<template>
    <div id="editPerfil">
        <v-dialog max-width="900px" v-model="show">
            <template v-slot:activator="{ on }">
               <v-btn v-on="on" color='#d2d0d0'> Edit profile </v-btn>
            </template>
            <v-card >
                <v-card-text>
                    <v-container>
                        
                        <v-col id="titulo">
                            <h1 >Edit profile:</h1>
                        </v-col>

                        <v-col class="pa-2">
                            <v-text-field 
                            hide-details
                            dense
                            type="text" 
                            v-model="nome" 
                            label="Name"
                            outlined
                            ></v-text-field>
                        </v-col>

                        <v-col class="pa-2">
                            <v-text-field 
                            hide-details
                            dense
                            type="text" 
                            v-model="descricao" 
                            label="Description"
                            outlined
                            ></v-text-field>
                        </v-col>

                        <v-col align="right">
                          <v-btn  v-ripple="{ class: 'primary--text' }" width="150" style="height:40px" class="white--text" elevation="1" v-on:click="submeter()" color="#00ace6">Confirm</v-btn>
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

export default {
    name: "editPerfil",
    data() {
        return{
          show:false,
          nome:'',
          descricao:'',
        }
    },
    props: {
        user: Object
    },
    methods: {
        cancelar() {
            this.show=false;
            this.nome='',
            this.descricao=''
        },
        submeter() {
            var usr = {}
            usr = {
                name: this.nome,
                description: this.descricao
            }

            axios({
                method: "post",
                url: "http://localhost:13000/users/edit/" + this.user.username + "/",
                data: usr,
                headers: { "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
            })
            .then(() => {
                this.cancelar();
                this.$router.go()
            })
            .catch(err => {
                console.log(err)
                alert('Não foi possível editar o perfil')
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


#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.container > div.col.col-1.offset-11 > div > div.v-input__prepend-outer > div > button {
    color:green
}




</style>