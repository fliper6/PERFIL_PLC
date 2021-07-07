<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            >
            {{username}}
            <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
        </template>
        <v-list>
          <router-link style="text-decoration:none" :to="'/user/' + username">
            <v-container class="opcao">
              Perfil
            </v-container>
          </router-link>
          <a style="text-decoration:none" v-on:click="handleLogout()" href="/">
            <v-container class="opcao">
              Logout
            </v-container>  
          </a>
        </v-list>
    </v-menu>
</template>

<script>
import jwt from 'jsonwebtoken'
    export default {
        name: "dropdwon",
        data() {
          return {
            payload: null,
            token:localStorage.getItem('jwt'),
            username:""
          }
        },
        created() {
          this.payload = jwt.decode(this.token),
          this.username = this.payload.username
        },
        methods: {
            handleLogout() {
                localStorage.clear();
            },
        },
          
    }
</script>

<style>
.dropdown {
  overflow: hidden;
}

.opcao:hover{
    background-color: #ddd;
}
.dropdown .dropbtn {
font-size: 16px;  
border: none;
outline: none;
color: white;
background-color: inherit;
font-family: inherit;
margin: 0;
}
.dropbtn {
  padding: 10px 10px 10px 10px;
}
.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  top: 64px;
  background-color: #ffffff;
  min-width: 200px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a {
  float: none;
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-content a:hover {
  background-color: #ddd;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.username {
  top: 4px;
  position: relative;
  padding: 0px 10px 0px 15px;
  font-size:150%
}
.avatar {
  box-shadow: 0px 0px 5px 0.1px rgba(0,0,0,0.2);
}
</style>