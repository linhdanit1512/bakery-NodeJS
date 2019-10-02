module.exports = {
    authenticated: function (req, res, next) {
        next();
    },
    deauthenticated: function (req, res, next) {
        next();
    },
    admin_authenticated: function (req, res, next) {
        next();
    },
    admin_deauthenticated: function (req, res, next) {
        next();
    }
}