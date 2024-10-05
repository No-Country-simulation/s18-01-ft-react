const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { auth, requiresAuth } = require('express-openid-connect');
const authConfig = require('./src/config/authConfig');
const router = express.Router();
// const myMiddleware = require('./src/middlewares/middleware');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./src/docs/swaggerOptions');
const swaggerDocs = swaggerJsdoc(swaggerOptions);
const authRoutes = require ('./src/router/auth.routes');

const app = express();

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

// Midleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(myMiddleware);
app.use(auth(authConfig)); 

// Ruta principal (índice)
app.get('/', (req, res) => {
  res.render('index'); // Renderiza el archivo index.ejs
});


// Routers
app.use('/auth', authRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Captura de 404 y redirección al manejador de errores
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { errorMessage: err.message }); // Asegúrate de que "error" coincide con tu archivo de vista
});

module.exports = app;