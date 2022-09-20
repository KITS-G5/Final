const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/bikes', //this is your api
        createProxyMiddleware({
            target:'http://projectfinaltest-env.eba-vh2mysap.ap-northeast-1.elasticbeanstalk.com/api/v1/bikes', //this is your whole endpoint link
            changeOrigin: true,
        })
    );


    app.use(
        '/stations', //this is your api
        createProxyMiddleware({
            target:'http://projectfinaltest-env.eba-vh2mysap.ap-northeast-1.elasticbeanstalk.com/api/v1/stations', //this is your whole endpoint link
            changeOrigin: true,
        })
    );

    app.use(
        "/api/auth/signin/",
        createProxyMiddleware({
            target: "http://projectfinaltest-env.eba-vh2mysap.ap-northeast-1.elasticbeanstalk.com/api/auth/signin/",
            changeOrigin: true,
        })
    );
};