const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/bikes', //this is your api
        createProxyMiddleware({
            target:'http://localhost:8080/api/v1/bikes', //this is your whole endpoint link
            changeOrigin: true,
        })
    );


    app.use(
        '/stations', //this is your api
        createProxyMiddleware({
            target:'http://localhost:8080/api/v1/stations', //this is your whole endpoint link
            changeOrigin: true,
        })
    );

};