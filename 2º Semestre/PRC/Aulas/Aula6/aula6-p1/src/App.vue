<template>
  <div class="w3-container"> 
    <h1 class="w3-header w3-teal">Olá turma de PRC2021!</h1>
    <h2>{{new Date().toISOString().substring(0,10)}}</h2>
    <h3>{{autor}}</h3>
    <p>Lorem ipsilum ...</p>
    <table>
      <tr>
        <th>Produto</th><th>Quantidade</th><th>Operações</th>
      </tr>
      <tr v-for="(p,i) in listaCompras" :key="p.nome">
        <td>{{p.nome}}</td>
        <td>{{p.quant}}</td>
        <td><button class="w3-button w3-red" @click="removeProd(i)">Apagar</button></td>
      </tr>
      
    </table>
  </div>
</template>

<script>

export default {
  name: "Primeiro Exemplo",

  data() {
    return {
      listaCompras: [
        {nome: "Cenouras", quant: 7},
        {nome: "Laranjas", quant: 8},
        {nome: "Bróculos", quant: 2},
        {nome: "Pêras", quant: 5}
      ],
      autor: "fliper6"
    };
  },

  methods: {
    removeProd: function(ind) {
      this.listaCompras.splice(ind,1)
      //this.autor = prod.nome
    }
  }
};
</script>
