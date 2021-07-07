var mongoose = require('mongoose')
var Post = require('../models/post')

// Listar os posts
module.exports.list = ()=> {
    return Post.find().exec()
}

module.exports.lookUp10dateAdmin = () => {
    return Post.aggregate([
        {$project:{
        tags:"$tags",
        _id:"$_id",
        file:"$file",
        comment:"$comment",
        id_user:"$id_user",
        titulo:"$titulo",
        descricao:"$descricao",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}

module.exports.lookUp10date = u => {
    return Post.aggregate([
        {$match:{
            $or:[
                {id_user:u},
                {restrictions:"public"}
            ]
        }},
        {$project:{
        tags:"$tags",
        _id:"$_id",
        file:"$file",
        comment:"$comment",
        id_user:"$id_user",
        titulo:"$titulo",
        descricao:"$descricao",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}


module.exports.lookUp10tags = (t,u) => {
    return Post.aggregate([
        {$match:{
            $and:[
                {$or:[
                    {id_user:u},
                    {restrictions:"public"}
                ]},
                {tags:{$elemMatch:{$in:t}}}
            ]
        }},
        {$project:{
        tags:"$tags",
        _id:"$_id",
        file:"$file",
        comment:"$comment",
        id_user:"$id_user",
        titulo:"$titulo",
        descricao:"$descricao",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}

module.exports.lookUp10tagsAdmin = t => {
    return Post.aggregate([
        {$match:{tags:{$elemMatch:{$in:t}}}},
        {$project:{
        tags:"$tags",
        _id:"$_id",
        file:"$file",
        comment:"$comment",
        id_user:"$id_user",
        titulo:"$titulo",
        descricao:"$descricao",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}

module.exports.lookUp10rateAdmin = () => {
    return Post.aggregate([
        {$project:{
            tags:"$tags",
            _id:"$_id",
            file:"$file",
            comment:"$comment",
            id_user:"$id_user",
            titulo:"$titulo",
            descricao:"$descricao",
            upload_date:"$upload_date",
            rating:{
                total:{$sum:{$sum:"$estrelas.rating"}},
                num:{$size:"$estrelas"}, 
                stars:{ 
                    $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                    else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
                }
            }
        },
        },
        {$sort:{ "rating.stars": -1}}
    ])
}


module.exports.lookUp10rate = u => {
    return Post.aggregate([
        {$match:{
            $or:[
                {_id:u},
                {restrictions:"public"}
            ]
        }},
        {$project:{
            tags:"$tags",
            _id:"$_id",
            file:"$file",
            comment:"$comment",
            id_user:"$id_user",
            titulo:"$titulo",
            descricao:"$descricao",
            upload_date:"$upload_date",
            rating:{
                total:{$sum:{$sum:"$estrelas.rating"}},
                num:{$size:"$estrelas"}, 
                stars:{ 
                    $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                    else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
                }
            }
        },
        },
        {$sort:{ "rating.stars": -1}}
    ])
}




module.exports.lookUp10user = u => {
    return Post.aggregate([
        {$match: {
            $and:[{id_user:u}, {restrictions:"public"}]
        }},
        {$project:{
        _id:"$_id",
        file:"$file",
        id_user:"$id_user",
        titulo:"$titulo",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}

module.exports.lookUp10userAdmin = u => {
    return Post.aggregate([
        {$match: {id_user:u}},
        {$project:{
        _id:"$_id",
        file:"$file",
        id_user:"$id_user",
        titulo:"$titulo",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}



module.exports.lookUp10type = u => {
    return Post.aggregate([
        {$match:{
            $or:[
                {_id:u},
                {restrictions:"public"}
            ]
        }},
        {$project:{
        _id:"$_id",
        file:"$file",
        id_user:"$id_user",
        titulo:"$titulo",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}

module.exports.lookUp10typeAdmin = u => {
    return Post.aggregate([
        {$match: {type:u}},
        {$project:{
        _id:"$_id",
        file:"$file",
        id_user:"$id_user",
        titulo:"$titulo",
        upload_date:"$upload_date",
        rating:{
            total:{$sum:{$sum:"$estrelas.rating"}},
            num:{$size:"$estrelas"},
            stars:{ 
                $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
            }
    }
    }}]).sort({upload_date : -1})
}

module.exports.getCat = u => {
    return Post.aggregate([
        {$match:{
            $or:[
                {_id:u},
                {restrictions:"public"}
            ]
        }},
        {
            $group: {
                _id: null,
                type: { $addToSet: "$type" }
            }
        },
        {
            $unwind: "$type"
        },
        {
            $project: {
                _id: 0,
                type:1
            }
        }
    ]);
}

module.exports.getCatAdmin = () => {
    return Post.aggregate([
        {
            $group: {
                _id: null,
                type: { $addToSet: "$type" }
            }
        },
        {
            $unwind: "$type"
        },
        {
            $project: {
                _id: 0,
                type:1
            }
        }
    ]);
}
// Inserir o post u
module.exports.insert = u => {
    var newPost = new Post(u)
    return newPost.save()
}

// Remover o post id
module.exports.remove = id => {
    return Post.deleteOne({_id : id})
}

// Editar o post id para u
module.exports.edit = (id,u) => {
    return Post.findByIdAndUpdate(id, u, {new: true})
}


//Funções sobre comentários ---------------
module.exports.insertComment = (c,p) => {
    return Post.findByIdAndUpdate(p,{$push : c},{new:true})
}

module.exports.lookUp = p => {
    return Post.aggregate([
        {"$match":{"_id":new mongoose.Types.ObjectId(p)}},
        {$project:{
            tags:"$tags",
            _id:"$_id",
            file:"$file",
            comment:"$comment",
            id_user:"$id_user",
            titulo:"$titulo",
            descricao:"$descricao",
            upload_date:"$upload_date",
            rating:{
                total:{$sum:{$sum:"$estrelas.rating"}},
                num:{$size:"$estrelas"},
                stars:{ 
                    $cond:{if: {$eq: [{$size:"$estrelas"}, 0]} , then: 0, 
                    else:{$divide: [{$sum:{$sum:"$estrelas.rating"}},{$size:"$estrelas"}]}}
                }
            }
    }}])
}

module.exports.insertNewRating = (p,r) => {
    console.log(r._id)
    return Post.findOneAndUpdate({_id:p, "estrelas._id":{$ne: r._id}} ,{$push:{estrelas:r}},{new:true})
}

module.exports.insertRating = (p,r) => {
    console.log(r._id)
    return Post.findOneAndUpdate({_id:p,'estrelas._id':r._id},{$set:{'estrelas.$.rating':r.rating}},{new:true})
}