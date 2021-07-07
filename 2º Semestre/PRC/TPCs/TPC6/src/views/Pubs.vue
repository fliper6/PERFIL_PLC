<template>
  <div class="w3-container">
    <h3>Publications:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Publication's Ids</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in pubs" 
            v-bind:key="r.p.value"
            @click="goPub(r.p.value)"> 
          <td>{{r.p.value.split("#")[1]}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>
<script>
import axios from 'axios';

  export default {
    name: 'Pubs',

    data() {
      return {
            pubs: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/apiTPC5/pubs')
        .then(res => {
          this.pubs = res.data.results.bindings;
        })
    },
    
    methods: {
        goPub: function(id){
            this.$router.push('/pubs/' + id.split("#")[1]);
        }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>