const User = require('../models/user')
const wrap = require('co-express')
const assign = require('object-assign');
const only = require('only');

module.exports.load = wrap(function * (req, res, next, id){
    req.user = yield User.load(id)
    if(!req.user)return next(res.json({sucess: false, message: 'User Not Exists!'}));
    next();
})

module.exports.index = (req, res) => {
    res.json({users: 'all'})
}

module.exports.store = (req, res) => {
    const user = new User(only(req.body, 'name password email'))
    user.saveIn(function(err){
        if(err) res.json({sucess:'false', message: err});
        else res.json({sucess:'true', message: 'User Created Sucessfuly!'})
    })    
}

module.exports.update = (req, res) => {
  const user = req.user
  assign(user, only(req.body, 'name password email'));
  user.saveIn(function(err){
       if(err) res.json({sucess:'false', message: err});
       else res.json({sucess:'true', message: 'User Updated Sucessfuly!'})
  })
}

module.exports.delete = (req, res) => {
    const user = req.user
    user.remove((err) => {
        if(err) res.json({sucess:'false', message: err});
        else res.json({sucess:'true', message: 'User Deleted Sucessfuly!'})
    })
}