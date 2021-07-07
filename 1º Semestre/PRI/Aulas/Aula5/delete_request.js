const axios = require('axios');

axios.delete('http://localhost:3000/instrumentos/X2', {
    })
    .then(resp => {
        console.log(resp.data)
    })
    .catch(error => {
        console.log(error);
    })