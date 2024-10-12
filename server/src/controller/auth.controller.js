const {handleUserLogin} = require('../utils/auth');

const login = async (req, res) => {
    res.oid.login();
};


const logout = (req, res) => {
    res.oidc.logout();
}

const profile = async (req, res) => {
    const userInfor = req.oidc.user; // Obtiene la información del usuario desde OIDC

    if (!userInfor) {
        return res.status(401).send('Usuario no autenticado');
    }

    try {
        const user = await handleUserLogin(userInfor); // Llama a la función para manejar el inicio de sesión
        res.send(user); // Devuelve los datos del usuario, puedes personalizar esto según sea necesario
    } catch (error) {
        console.error('Error al manejar el perfil:', error);
        return res.status(500).send('Error al guardar la información del usuario.');
    }
};

const status = (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}

module.exports = {
    login,
    logout,
    profile,
    status
}