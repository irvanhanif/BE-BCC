const db = require('../models')
const tweet = db.tweets

//created tweet
function createTweet(req, res, next){
    tweet.create(req.body)
        .then( ( data ) => {
            res.send(data)
        })
        .catch( (err) => {
            res.status(500).send({
                message: "Error in create tweet"
            })
        })
}

//findAll
function findAll(req, res, next) {
    tweet.findAll()
        .then( (data) => {
            res.send(data)
        })
        .catch( (err) => {
            res.status(500).send({
                message: "Error in findAll"
            })
        })
}

//findOne
function findOne(req, res, next) {
    const id = req.params.id
    tweet.findByPk(id)
        .then( (data) => {
            res.send(data)
        })
        .catch( err =>{
            res.status(500).send({
                message: "Erorr in findOne"
            })
        })
}

//updateOne
function update(req, res, next){
    const id = req.params.id
    let condition = {
        id: id
    }
    tweet.update(req.body, { where : condition})
        .then( num => {
            if(num != 1){
                res.status(500).send({
                    message: "Affecter row not one"
                })
            }
            res.status(200).send({
                message: "Update succesfull"
            })
        })
        .catch( err => {
            res.status(500).send({
                message: "Error in update tweet"
            })
        })
}

//delete
function _delete(req, res, next) {
    const id = req.params.id
    let condition = {
        id: id
    }

    tweet.destroy({
        where: condition
    })
        .then( num => {
            if(num != 1){
                res.status(500).send({
                    message: "Affected row not one"
                })
            }
            res.status(200).send({
                message: "Delete succesful"
            })
        })
        .catch( err => {
            res.status(500).send({
                message: "Error in delete tweet"
            })
        })
}

module.exports = {
    createTweet,
    findAll,
    findOne,
    update,
    _delete
}