const login = (req, res) => {
    res.oidc.login();
}

const logout = (req, res) => {
    res.oidc.logout();
}

const profile = (req, res) => {
    res.send(req.oidc.user);
}

const status = (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}

module.exports = {
    login,
    logout,
    profile,
    status
}