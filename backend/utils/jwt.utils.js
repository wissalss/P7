// Imports
const jwt = require("jsonwebtoken");
const jwtSignSecret =
    "p0dRzyWZRpVNkWzmFzqyNVV9hfOY3O8iatgdrf4685juhyge6957jh5g324jygtfe45";
// Exported functions
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign(
            {
                userId: userData.id,
                isAdmin: userData.isAdmin,
            },
            jwtSignSecret,
            {
                expiresIn: "1h",
            }
        );
    },
    parseAuthorization: function (authorization) {
        return authorization != null ? authorization.replace("Bearer ", "") : null;
    },
    getUserId: function (authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, jwtSignSecret);
                if (jwtToken != null) userId = jwtToken.userId;
            } catch (err) { }
        }
        return userId;
    },
};