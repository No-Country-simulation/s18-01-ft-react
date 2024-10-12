const {handleUserLogin} = require('../utils/auth');
const User = require('../persistencia/models/userPrueba.models.js')
const login = async (req, res) => {
    res.oid.login();
};


const logout = (req, res) => {
    res.oidc.logout();
}

// const profile = async (req, res) => {
//     const userInfor = req.oidc.user; // Obtiene la información del usuario desde OIDC

//     if (!userInfor) {
//         return res.status(401).send('Usuario no autenticado');
//     }

//     try {
//         const user = await handleUserLogin(userInfor); // Llama a la función para manejar el inicio de sesión
//         res.send(user); // Devuelve los datos del usuario, puedes personalizar esto según sea necesario
//     } catch (error) {
//         console.error('Error al manejar el perfil:', error);
//         return res.status(500).send('Error al guardar la información del usuario.');
//     }
// };
const profile = async (req, res) => {
    try {
        const authId = req.oidc.user.sub;
        const email = req.oidc.user.email;

        // Buscar al usuario en la base de datos
        let user = await User.findOne({ authId });
        
        // Si no existe, crearlo
        if (!user) {
            // En este punto puedes pedir el nombre y apellido de alguna forma.
            // Por ejemplo, podrías hacer una página donde se capture esta info
            const firstName = req.body.firstName || req.oidc.user.given_name || 'DefaultFirstName';
            const lastName = req.body.lastName || req.oidc.user.family_name || 'DefaultLastName';

            user = new User({
                authId,
                firstName,
                lastName,
                email,
            });

            await user.save();
        }

        // Enviar perfil del usuario
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el perfil del usuario');
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