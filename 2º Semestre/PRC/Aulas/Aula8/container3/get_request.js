const axios = require('axios');

const fs = require('fs')


let apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODE4ODU1YTcxOGRmNGVkMTkwZjE1ZSIsImlhdCI6MTYxOTEwMTc4MSwiZXhwIjoxNjIxNjkzNzgxfQ.SlyayNaXu8PTPYAtyR9h7tIlR9ooXn72DRn6EAwcgV6rNY1rZQCoSs_d2EESIJs3kb0LwCSfU9o5lWMW9_Twigj3FxX99iAg7_gB1m6TReJ2moZ-rYIst6RTtJtWQWBezZ-37RyACH9s44WQ9qnlrXBYKgnW6LyVi18KdfwEYekgbKM6bSkvPTVYdtjkzktKwKZfIouts4nQGm0tvTfQC_AtOP22338i5N2I952gBN0lf9fn6iaj64TCAXaUA4JhMNZad6ekK0AWauGZsHcaOaLiqpbxKjGs2d69fCOcdKsbDGwoGSEL_6TUho9Yfb405yS9ZE4TjatGNtBaRmSv9g"


axios.get('http://clav-api.di.uminho.pt/v2/entidades?apikey=' + apikey)

    .then(function (resp) {

        try {

            let dados = { entidades: resp.data }

            fs.writeFileSync('entidades.json', JSON.stringify(dados))

        } catch (err) {

            console.error(err)

        }

        console.log("Dataset criado: entidades.json")

    })

    .catch(function (error) {

        console.log(error);

    });