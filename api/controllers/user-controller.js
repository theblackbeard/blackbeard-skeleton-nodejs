const jwt = require('jwt-simple')
const User = require('../models/user')
const wrap = require('co-express')
const assign = require('object-assign');
const only = require('only');
const config = require('../../system/config')

module.exports.load = wrap(function * (req, res, next, id){
    req.user = yield User.load(id)
    if(!req.user)return next(res.json({sucess: false, message: 'User Not Exists!'}));
    next();
})

module.exports.index = wrap(function * (req, res){
    options = {query: {} }
    const users = yield User.lists(options)
    res.json(users)
})

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

module.exports.auth = (req, res) => {
   User.findOne({
    email: req.body.email
   }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                // if user is found and password is right create a token
                var token = jwt.encode(user, config.SECRET);
                // return the information including token as JSON
                res.json({success: true, token: 'JWT ' + token});
            } else {
                res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}