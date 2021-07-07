var express = require('express');
var router = express.Router();
var axios = require('axios');
var path = require('path')
var fs = require('fs')
var jsonfile = require('jsonfile')
var child_process = require("child_process");
var archiver = require('archiver');

var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
  }
})
var upload = multer({storage:storage})


// POSTS ---------------------------------------

router.get('/', (req,res) => res.redirect('/home'))

router.get('/home', function(req,res){
  axios.get('http://localhost:7001/noticias?token=' + req.cookies.access.token)
    .then(dados => res.render('home', {noticias:dados.data, access:req.cookies.access}))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})

// Página de novo post
router.get('/posts/new' , function(req,res,next){
  res.render('novo_post', {access:req.cookies.access});
})


// Post na API com o novo post
router.post('/posts' , upload.array('myFiles') ,function(req,res,next){
  console.log('Post ' + JSON.stringify(req.file))
  
  req.body.id_user = req.cookies.access.username
  axios.post('http://localhost:7001/posts?token=' + req.cookies.access.token, req.body)
    .then(dados => {
      const output = fs.createWriteStream(__dirname + '/../public/fileStore/' + dados.data._id + '.zip');
        const archive = archiver('zip', {
          zlib: { level: 9 } // Sets the compression level.
        });
        archive.pipe(output);
        var file1;
        archive.append(null, { name: 'data/' });
      req.files.forEach(function(i){
        let quartinePath = __dirname + '/../' + i.path
        file1 =quartinePath;
        archive.append(fs.createReadStream(file1), { name: 'data/'+i.originalname });  
      })
        
        
      archive.finalize();
      fs.readdir(__dirname+'/../uploads', (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(__dirname+'/../uploads', file), err => {
            if (err) throw err;
          });
        }
      });
     

      res.redirect('/posts/'+ dados.data._id)
      
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})

router.get('/download/:filename', function(req, res){
  res.download(__dirname + '/../public/fileStore/' + req.params.filename + '.zip')
})


router.post('/posts/search' , function(req,res,next){
  req.body.tags = req.body.tags.split(" ")
  console.log(req.body)
  req.body.id_user = req.cookies.access.username
  axios.post('http://localhost:7001/posts/search?page=1&user='+ req.cookies.access.username + '&level='+ req.cookies.access.level +'&token=' + req.cookies.access.token, req.body)
    .then(dados => {
      var paginas = (dados.data.size / 10)+1
      res.render('tabela_posts', {posts:dados.data.posts, pages:paginas, current_page:1,access:req.cookies.access})
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})

// Remover o post :id
router.get('/posts/remove/:id' , function(req,res,next){
  fs.unlink(__dirname + '/../public/fileStore/' + req.params.id + '.zip', (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  
  axios.delete('http://localhost:7001/posts/'+ req.params.id +'?token=' + req.cookies.access.token)
    .then(dados => res.redirect('/posts'))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Post na api um novo comentário no post :id
router.post('/posts/comment/:id' , function(req,res,next){
  var json = {comment : {comment: req.body.comment, username: req.cookies.access.username}}
  req.body= json
  axios.put('http://localhost:7001/posts/comment/'+ req.params.id +'?token=' + req.cookies.access.token, req.body)
    .then(dados => res.redirect('/posts/'+ req.params.id))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Adicionar novo rating ao post :id
router.post('/posts/rating/:id' , function(req,res,next){
  console.log(req.body)
  req.body._id = req.cookies.access.username
  req.body.rating = parseInt(req.body.rating)
  console.log(req.body)
  axios.put('http://localhost:7001/posts/rating/'+ req.params.id +'?token=' + req.cookies.access.token, req.body)
    .then(dados => res.redirect('/posts/'+ req.params.id))
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
})


// Busca da primeira página de posts
router.get('/posts', function(req, res, next) {
  if (req.cookies.access == null)  res.redirect('/login')
  
  var t = req.cookies.access.token;
  if(req.query.order=="rating"){
    axios.get('http://localhost:7001/posts?order=rating&page=1&user='+ req.cookies.access.username + '&level='+ req.cookies.access.level +'&token=' + t)
    .then(dados => {
      var paginas = (dados.data.size / 10)+1
      res.render('tabela_posts', {posts:dados.data.posts, pages:paginas, current_page:1,access:req.cookies.access, order:"rating"})
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
  }
  else if(req.query.type!=null){
    axios.get('http://localhost:7001/posts?type='+ req.query.type+'&page=1&user='+ req.cookies.access.username + '&level='+ req.cookies.access.level +'&token=' + t)
    .then(dados => {
      var paginas = (dados.data.size / 10)+1
      res.render('tabela_posts', {posts:dados.data.posts, pages:paginas, current_page:1,access:req.cookies.access, order:"none"})
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
  }
  else{
    axios.get('http://localhost:7001/posts?order=date&page=1&user='+ req.cookies.access.username + '&level='+ req.cookies.access.level +'&token=' + t)
    .then(dados => {
      var paginas = (dados.data.size / 10)+1
      res.render('tabela_posts', {posts:dados.data.posts, pages:paginas, current_page:1,access:req.cookies.access, order:"date"})
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
  }

 });

 router.get('/posts/categorias', function(req,res){
  axios.get('http://localhost:7001/posts/type' + '?level='+ req.cookies.access.level+'&user='+ req.cookies.access.username + '&token=' + req.cookies.access.token)
  .then(dados => res.render('categorias', {types:dados.data, access:req.cookies.access}))
  .catch(e => res.render('error', {error:e,access:req.cookies.access}))
 })

// Busca do post :id
router.get('/posts/:id', function(req, res, next) {
  if (req.cookies.access == null)  res.redirect('/login')
 var t = req.cookies.access.token;
 axios.get('http://localhost:7001/posts/byId/'+ req.params.id + '?token=' + t)
   .then(dados => res.render('single_post', {post:dados.data, access:req.cookies.access}))
   .catch(e => res.render('error', {error:e,access:req.cookies.access}))
});


// Busca da página de posts :page
router.get('/posts/page/:page', function(req, res, next) {
  if (req.cookies.access == null)  res.redirect('/login')
  var t = req.cookies.access.token;
  if(req.query.order=="rating"){
    axios.get('http://localhost:7001/posts?order=rating&page='+ req.params.page + '&user='+ req.cookies.access.username + '&level='+ req.cookies.access.level+ '&token=' + t)
    .then(dados => {
      var paginas = (dados.data.size / 10) +1
      res.render('tabela_posts', {posts:dados.data.posts , pages:paginas, current_page:req.params.page,access:req.cookies.access,order:"rating"})

    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
  }
  else{
    axios.get('http://localhost:7001/posts?order=date&page='+ req.params.page + '&user='+ req.cookies.access.username + '&level='+ req.cookies.access.level+ '&token=' + t)
    .then(dados => {
      var paginas = parseInt(dados.data.size / 10, 10) +1
      res.render('tabela_posts', {posts:dados.data.posts , pages:paginas, current_page:req.params.page,access:req.cookies.access,order:"date"})

    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
  }

});



// USERS   ---------------------------------------


router.get('/user/:id', function(req, res, next) {
  if (req.cookies.access == null)  res.redirect('/login')
  if(req.query.level!=null){
    console.log('Ois')
    var json = { level: req.query.level}
    axios.put('http://localhost:7001/users/'+ req.params.id + '?token=' + req.cookies.access.token, json)
      .then(res.redirect('/user/'+req.params.id))
      .catch(e => res.render('error', {error:e,access:req.cookies.access}))
  }
  var page;
  if (req.query.page==null) {page = 1}
  else {page = req.query.page}
  axios.get('http://localhost:7001/users/' + req.params.id + '?token=' + req.cookies.access.token)
    .then(da => {
      axios.get('http://localhost:7001/posts/user/'+ req.params.id + '?page='+ page +'&token=' + req.cookies.access.token)
        .then(dados => {
          var paginas = (dados.data.size / 10)+1
          console.log(req.cookies)
          res.render('user_page', {user:da.data,posts:dados.data.posts,pages:paginas,current_page:page,access:req.cookies.access})
      })
      .catch(e => res.render('error', {error:e,access:req.cookies.access}))
    })
    .catch(e => res.render('error', {error:e,access:req.cookies.access}))
});


router.post('/user/edit/:id' , upload.single('myFile'), function(req,res){
  if(req.file!=null){
    let quartinePath = __dirname + '/../' + req.file.path
    var extension = req.file.originalname.split('.')[1]
    let newPath = __dirname + '/../public/profilePic/' + req.params.id + '.' + extension
  
    fs.rename(quartinePath, newPath,function(err){
      if(err){
        res.render('error', {error:e,access:req.cookies.access})
      }
    })
    req.body.pic = "ok"
  }
  
  axios.put('http://localhost:7001/users/'+ req.params.id + '?token=' + req.cookies.access.token, req.body)
      .then(res.redirect('/user/'+req.params.id))
      .catch(e => res.render('error', {error:e}))
})

// LOGIN   ---------------------------------------


// Página de login
router.get('/login', function(req,res){
  if(req.query.err==null){
    res.render('login-form');
  }
  else {
    res.render('login-form', {err:'true'})
  }
  
})

router.get('/logout', function(req,res){
  res.clearCookie('access');
  res.redirect('/login')
})


// Post no auth-server de login
router.post('/login', function(req,res){
  axios.post('http://localhost:7002/users/login', req.body)
    .then(dados => {
      res.cookie("access", dados.data, {expire: 300000 + Date.now()});
      res.redirect('/posts')
    })
    .catch(e => {
      console.log(e.response.status)
      if(e.response.status == 401){
        res.redirect('/login?err=true')
      }
      else{
        res.render('error', {error:e})
      }
      
    })
})


// REGISTO ---------------------------------------


// Página de registo bem sucedido
router.get('/register/success', function(req,res){
  res.render('register-success');
})


// Página de registo
router.get('/register', function(req,res){
  res.render('register-form');
})


// Post no api-server do registo novo
router.post('/register', function(req,res){
  if (req.body.password != req.body.cpassword) { 
    res.render('register-form', {cpassword:"Passwords não são iguais"});
  }
 else{
  axios.post('http://localhost:7002/users', {username:req.body.username, password:req.body.password, filiation:req.body.filiation})
    .then(dados => {
      res.redirect('/register/success')
    })
    .catch(e => {
      if(e.response.data.message){
        res.render('register-form', {username:"Username já existe"});
      }
      else {
        res.render('error', {error:e})
      }
      
    })
 }
})

/* GET home page. */
router.get('/', (req,res,next) => res.render('index', {access:req.cookies.access}))

module.exports = router;
