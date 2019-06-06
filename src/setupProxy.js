const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/mock', {
            target: 'https://www.easy-mock.com/mock/5cb59194287cdb257212374f',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                '^/mock': '/'
            }
        })
    );
    app.use(
        proxy('/v1', {
            // target: 'http://127.0.0.1:8977',
            target: 'http://123.56.15.36:8977',
            secure: false,
            changeOrigin: true
        })
    );
    app.use(
        proxy('/blog', {
            target: 'http://127.0.0.1:8999',
            secure: false,
            changeOrigin: true
        })
    );
};
