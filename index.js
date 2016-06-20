var express = require('express');
const METHODS = require('methods');


function FwRouter() {
    this.router = express.Router();
    this.validate = {};
    this.childRouter = [];
}

function generateValidate(cfg) {

    return function (req, res, next) {
        console.log('use cfg', cfg);
        next()
    }
}

FwRouter.prototype = {
    use: function (path, fwRouter) {
        this.router.use(path, fwRouter.router);
        this.validate[path] = fwRouter.validate;
        this.childRouter.push(fwRouter);
    }
};

METHODS.forEach(function (i) {
    FwRouter.prototype[i] = function (path, cfg) {
        var validate = generateValidate(cfg);
        this.validate[path] = cfg;
        this.router[i].apply(this.router, [path, validate].concat(Array.prototype.slice.call(arguments).slice(2)));
    };
});

module.exports = () => new FwRouter();