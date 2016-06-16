var Router = require('Router');

function validate(cfg) {
    return function (req, res, next) {
        var legal = false;

        legal ? next() : res.status(200).json({});
    }
}

module.exports = function (pattern, cfg, callback) {

    if(arguments.length > 3) {

    }
    var router = new Router();

    return router(pattern, validate(cfg), callback);

};
