<template>
  <div class="w3-container">
    <h3>Authors:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Authors's Ids</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in authors" 
            v-bind:key="r.a.value"
            @click="goAut(r.a.value)"> 
          <td>{{r.a.value.split("#")[1]}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'Authors',

    data() {
      return {
            authors: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/apiTPC5/authors')
        .then(res => {
          this.authors = res.data.results.bindings;
        })
    },
    
    methods: {
        goAut: function(id){
            this.$router.push('/authors/' + id.split("#")[1]);
        }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>