<template>
  <div class="w3-container"> 
    <h1 class="w3-header w3-teal">Utilizadores do OntoBud</h1>
    <h2>{{new Date().toISOString().substring(0,10)}}</h2>
    <table class="w3-table-all">
      <tr>
        <th>Id</th><th>Nome</th><th>Email</th>
      </tr>
      <tr v-for="(u,i) in users" :key="i">
        <td>{{u._id}}</td>
        <td>{{u.name}}</td>
        <td>{{u.email}}</td>
      </tr>
      
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Users",

  data() {
    return {
      users: null
    };
  },

  created: function() {
    axios 
      .get('http://ontobud-api.di.uminho.pt/api/users')
      .then(res => { this.users = res.data;})
      .catch(e => console.log("Erro no GET dos utilizadores: " + e))
  }

}
</script>
