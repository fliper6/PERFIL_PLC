<template>
  <div class="w3-container">
    <h3 class="w3-header w3-blue">Publication {{idr}}</h3>
    <table class="w3-table-all">
        <tr>
            <th>Predicado</th><th>Objeto</th>
        </tr>
        <tr v-for="(triplo, i) in dados" :key="i">
            <td>{{triplo.p.value.split("#")[1]}}</td><td>{{(triplo.o.type == 'literal') ? triplo.o.value : triplo.o.value.split('#')[1]}}</td>
        </tr>
    </table>
  </div> 
</template>
<script>

import axios from 'axios';

  export default {
    name: 'Pub',

    props: ["idr"],

    data() {
      return {
            dados: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/apiTPC5/pubs/' + this.idr )
        .then(res => {
          console.log(res.data.results.bindings)
          this.dados = res.data.results.bindings
        })
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>