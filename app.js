require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const { sequelize } = require('./models');

// ============================
// CONFIGURACIÓN GENERAL
// ============================
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // si tenés un layout principal
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// ============================
// SESIONES
// ============================
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // en producción con HTTPS -> true
      maxAge: 1000 * 60 * 60 * 2 // 2 horas
    }
  })
);

// ============================
// USER DISPONIBLE EN TODAS LAS VISTAS (EJS)
// ============================
app.use((req, res, next) => {
  res.locals.user = req.session.user_id
    ? {
        id: req.session.user_id,
        email: req.session.user_email,
        rol: req.session.user_rol
      }
    : null;
  next();
});

// ============================
// MIDDLEWARES DE AUTENTICACIÓN
// ============================
const isLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
};

const isJWTLogin = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error) return res.sendStatus(401);
    req.user = decoded;
    next();
  });
};

// ============================
// RUTA DEBUG (opcional)
// ============================
app.get('/debug-session', (req, res) => {
  res.json(req.session);
});

// ============================
// RUTAS PÚBLICAS (login / register / contacto / index)
// ============================
app.use('/', require('./routes/auth')); // login, register, logout
app.use('/', require('./routes/index')); 
app.use('/productos', require('./routes/productos'));
app.use('/contacto', require('./routes/contacto'));
app.use('/chofer', require('./routes/chofer'));

// ============================
// RUTAS PROTEGIDAS (dashboard y demás)
// ============================
app.use('/', isLogin, require('./routes/dashboard'));
app.use('/repuestos', isLogin, require('./routes/repuestos'));
app.use('/empleado', isLogin, require('./routes/empleado'));
app.use('/admin/productos', isLogin, require('./routes/admin/productos'));
app.use('/admin/categorias', isLogin, require('./routes/admin/categorias'));

// ============================
// API
// ============================
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/categorias', isJWTLogin, require('./routes/api/categorias'));

// ============================
// LOGOUT
// ============================
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/login');
  });
});

// ============================
// 404 (SIEMPRE AL FINAL)
// ============================
app.use((req, res) => {
  res.status(404).send('Not found');
});

// ============================
// SERVER + DB
// ============================
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);

  try {
    await sequelize.sync({ alter: true }); // ajusta tablas si hace falta
    console.log('Database conectada correctamente');
  } catch (error) {
    console.error('Error al conectar la base de datos:', error);
  }
});
