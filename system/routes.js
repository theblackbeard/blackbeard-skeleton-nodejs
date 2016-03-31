'use strict'
const UserController = require('../api/controllers/user-controller')
const User = require('../api/models/user')
module.exports = (app, passport, jwt, multiparty, config) => {
    
    app.post('/api/auth', UserController.auth)
    
    /*MIDDLEWARE PAGE BLOCKED*/
	app.use(passport.authenticate('jwt', { session: false }), (req, res, next) => {
  		let token = getToken(req.headers);
  		if (token) {
	  		let decoded = jwt.decode(token, config.SECRET);
	  		User.findOne({
	  			 email: decoded.email
	  		}, (err, user) => {
	  			if(err) throw  err;
	  			if(!user)
	  				return res.status(403).send({success: false, msg: 'Auth Failed: User Not Found'});
	  			else{
	  				next()
	  			}
	  		})
	  	}else{
	  		return res.status(403).send({success: false, msg: 'Auth Failed: Token not Provided'});
	  	}	
	});
    
    app.param('iduser', UserController.load);
    app.get('/api/users', UserController.index)
    app.post('/api/users', UserController.store)
    app.put('/api/users/:iduser', UserController.update)
    app.delete('/api/users/:iduser', UserController.delete)
}

let getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};