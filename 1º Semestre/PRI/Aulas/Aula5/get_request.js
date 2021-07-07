const axios = require('axios');
 
// json-server --watch db.json
// npm i --save axios (para instalar o módulo)
// node get_request.js
axios.get('http://localhost:3000/alunos')
    .then(resp => {
        data = resp.data;
        data.forEach(a => {
            console.log(`${a.id},${a.nome},${a.instrumento}`)
        });
    })
    .catch(error => {
        console.log('ERROR: ' + error);
    })