const UserController = require('../api/controllers/user-controller')
module.exports = (app, passport, jwt, multiparty) => {
    
    app.param('iduser', UserController.load);
    app.get('/api/users', UserController.index)
    app.post('/api/users', UserController.store)
    app.put('/api/users/:iduser', UserController.update)
    app.delete('/api/users/:iduser', UserController.delete)
    
}