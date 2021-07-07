var express = require('express');
var router = express.Router();

var PostControl = require('../controllers/post')
var NotControl = require('../controllers/noticias')

function insertNoticia(res, not){
  NotControl.count()
    .then(data => {
      console.log(data)
      if(data >= 10){
        console.log('Oi')
        NotControl.oldest()
        .then(old => {
          console.log(old)

          NotControl.remove(old[0]._id)
            .then(console.log('Deleted'))
            .catch(err => res.status(500).jsonp({error:err}))
          NotControl.insert(not)
          .catch(err => res.status(500).jsonp({error:err}))
        })
      }
      else{
        NotControl.insert(not)
          .catch(err => res.status(500).jsonp({error:err}))
      }
    })
    .catch(err => res.status(500).jsonp({error:err}))

}
// Procurar user :id
router.get('/posts/byId/:id', function(req, res, next) {
  PostControl.lookUp(req.params.id)
    .then(data => {
      res.status(200).jsonp(data[0])
    })
    .catch(err => res.status(500).jsonp(err))
});

// Listar todos os "posts" da página :page
router.get('/posts', function(req,res,next) {
  if(req.query.order == "date"){
    if(req.query.level == "admin"){
      PostControl.lookUp10dateAdmin()
      .then(data =>{
        res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
      })
      .catch(err => res.status(500).jsonp(err))
    }
    else{
      PostControl.lookUp10date(req.query.user)
      .then(data =>{
        res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
      })
      .catch(err => res.status(500).jsonp(err))
    }
  }
  else if(req.query.type!=null){
    if(req.query.level == "admin"){
      PostControl.lookUp10typeAdmin(req.query.type)
      .then(data =>{
        res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
      })
      .catch(err => res.status(500).jsonp(err))
    }
    else{
      PostControl.lookUp10type(req.query.type)
      .then(data =>{
        res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
      })
      .catch(err => res.status(500).jsonp(err))
    }
  }
  else{
    if(req.query.level=="admin"){
      PostControl.lookUp10rateAdmin()
        .then(data =>{
          res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
        })
        .catch(err => res.status(500).jsonp(err))
    }
    else{
      PostControl.lookUp10rate(req.query.user)
        .then(data =>{
          res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
        })
        .catch(err => res.status(500).jsonp(err))
    }
  }
  
  
})

router.post('/posts/search', function(req,res,next){
  if(req.query.page==null) res.status(404)
  if(req.query.level=="admin"){
    PostControl.lookUp10tagsAdmin(req.body.tags)
      .then(data =>{
        res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
      })
      .catch(err => res.status(500).jsonp(err))
  }
  else{
    PostControl.lookUp10tags(req.body.tags,req.query.user)
      .then(data =>{
        res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
      })
      .catch(err => res.status(500).jsonp(err))
  }
  
})


router.get('/posts/user/:id', function(req,res,next) {
  if(req.query.page==null) res.status(404)
  if(req.query.level="admin" || req.query.user == req.params.id){
    PostControl.lookUp10userAdmin(req.params.id)
    .then(data =>{
      res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
    })
    .catch(err => res.status(500).jsonp(err))
  }
  else{
    PostControl.lookUp10user(req.params.id)
    .then(data =>{
      res.status(200).jsonp({posts : get10elements(req.query.page,data), size: data.length})
    })
    .catch(err => res.status(500).jsonp(err))
  }
  
})

router.put('/posts/comment/:id', (req,res) => {
  PostControl.insertComment(req.body,req.params.id)
  .then(data => {
    PostControl.lookUp(req.params.id)
      .then(da => {
        if(data.restrictions=="public"){
          var json = {
            type:"comentario",
            titulo:da[0].titulo,
            id_user:req.body.comment.username,
            upload_date:data.data,
            id_post:req.params.id
          }
          insertNoticia(res,json)
      }
    
    })
    .catch(err => res.status(500).jsonp({error:err}))
    
    res.status(201).jsonp(data)
  
  })
    .catch(err => res.status(500).jsonp({error:err}))
})

  
// Post user
router.post('/posts', (req,res) => {
  PostControl.insert(req.body)
    .then(data => {
      if(data.restrictions=="public"){
        var json = {
          type:"post",
          titulo:data.titulo,
          id_user:data.id_user,
          upload_date:data.upload_date,
          id_post:data._id
        }
        insertNoticia(res,json)
      }
      
      res.status(201).jsonp(data)
    
    })
    .catch(err => res.status(500).jsonp({error:err}))
})

router.get('/noticias', function(req,res){
  NotControl.list()
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp({error:err}))
})

router.delete('/posts/:id' , (req, res) => {
  PostControl.remove(req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})

router.put('/posts/:id', (req,res) => {
  PostControl.edit(req.params.id, req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
})



router.put('/posts/rating/:id', function(req, res, next) {
  PostControl.insertNewRating(req.params.id,req.body)
    .then(data => {
      if(data==null){
        PostControl.insertRating(req.params.id,req.body)
          .then(dados => res.status(200).jsonp(dados))
          .catch(err => res.status(500).jsonp({err:err}))
      }
      else{
        res.status(201).jsonp(data)
      }
    })
    .catch(err => res.status(500).jsonp(err))
});

router.get('/posts/type', function(req,res){
  if(req.query.level=="admin"){
    PostControl.getCatAdmin()
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
  }
  else{
    PostControl.getCat(req.query.user)
    .then(data => res.status(200).jsonp(data))
    .catch(err => res.status(500).jsonp(err))
  }

})



function get10elements(num,arr){
  var array = []
  var number = parseInt(num,10)
  var i = 0
  for (let index = (number-1)*10 ; index < arr.length; index++, i++) {
    array[i] = arr[index];
  }
  return array
}

module.exports = router;
