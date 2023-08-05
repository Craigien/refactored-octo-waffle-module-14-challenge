const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        alert("You must be logged in to do this");
    } else {
        next();
    }
};

module.exports = withAuth;