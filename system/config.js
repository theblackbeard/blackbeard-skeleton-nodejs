const path = require('path');
module.exports = {
    'IPSERVER':  process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    'PORTSERVER': process.env.OPENSHIFT_NODEJS_PORT || 8000,
    'MONGO': process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/',
    'MONGODB': 'blackbeard',
    'ROOT' : path.join(__dirname, '..'),
    'CLOUDNAME' : 'djaysgwfa',
    'APIKEY' : '998675877334278',
    'APISECRETE': 'ObZXbU4RSFaEwTQ_8FYPNQd22IQ',
    'SECRET': 'blackbeardecarvcomdemogimservercomodev'
}
