// Definir el middleware
function myMiddleware(req, res, next) {
    console.log('Middleware ejecutado'); // Por ejemplo, registrar la petición
    next(); // Llama a la siguiente función middleware
}

module.exports = myMiddleware;
