module.exports = (req, res, next) => {
    res.set({"Content-Security-Policy": "default-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval';"});
    next();
};
