module.exports = {
    devServer: {
     proxy: {
       '/apiTPC5': {
         target: 'http://localhost:3000',
         secure: true,
         changeOrigin: true,
         pathRewrite: {
           '^/apiTPC5': ''
         }
       },
     }
   } 
   };