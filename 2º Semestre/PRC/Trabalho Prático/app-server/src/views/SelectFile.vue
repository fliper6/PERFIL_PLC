<template>
    <div style="margin:auto;" id="editPfp">
        <v-dialog max-width="900px" v-model="show">
            <template v-slot:activator="{ on }">
               <v-btn v-on="on" color='#d2d0d0'> 📷 </v-btn>
            </template>
            <v-card >
                <v-card-text >
                    <v-container>
                        
                        <v-col id="titulo">
                            <h1 >Select new profile pic:</h1> <br/>
                        </v-col>
                        
                        <v-row>
                            <v-col v-for="n in 363" v-bind:key="n" cols="12" sm="2" no-gutters>
                                <img  @click="current = n" :class="{current:n == current}" style="max-width:100px;" :src="require('../' + 'assets/pfp/1 (' + n + ').png')" />
                            </v-col>
                        </v-row>

                        <v-col align="right">
                          <v-btn v-ripple="{ class: 'primary--text' }" width="150" style="height:40px" class="white--text" elevation="1" v-on:click="submeter()" color="#00ace6">Confirm</v-btn>
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
    name: "editPfp",
    data() {
        return{
          current:1,
          show:false
        }
    },
    props: {
        user: Object
    },
    methods: {
        cancelar() {
            this.show = false;
        },
        submeter() {
            var cur = {cur: this.current}
            axios({
                method: "post",
                url: "http://localhost:13000/users/image/" + this.user.username + "/",
                data: cur,
                headers: { "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOiJUcmFiYWxobyBkZSBQUkMyMDIxIiwiaWF0IjoxNjI0MjAzNTQ1fQ.BEyfO7eDNBWUU6NC10tzx6Z3gDlWMFGo_Cd4qDZbPNw"},
            })
            .then(() => {
                this.cancelar();
                this.$router.go()
            })
            .catch(err => {
                console.log(err)
                this.cancelar();
            })
        }
    }
}

</script>

<style> 

#titulo h1{
    color: #1c4d7d;
}

#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.container > div.col.col-1.offset-11 > div > div.v-input__prepend-outer > div > button {
    color:green
}

.current{
    border:solid 5px orange;
}

</style>