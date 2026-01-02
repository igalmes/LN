const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// MOSTRAR LOGIN
const mostrarLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.render('auth/login', { error: 'Mail o contraseña incorrectos' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('auth/login', { error: 'Mail o contraseña incorrectos' });
    }

    // Guardar sesión
    req.session.user_id = user.id;
    req.session.user_email = user.email;
    req.session.user_rol = user.rol;

    // Redirigir al dashboard o página principal
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('auth/login', { error: 'Error al iniciar sesión' });
  }
};

// MOSTRAR REGISTER
const mostrarRegister = (req, res) => {
  res.render('auth/registro', { error: null });
};

// REGISTER
const register = async (req, res) => {
  const { email, password, rol } = req.body;

  try {
    // Verificar si el email ya existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.render('auth/registro', { error: 'El email ya está registrado' });
    }

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({ email, password: hash, rol: rol || 'user' });

    // Autologin: guardar sesión
    req.session.user_id = nuevoUsuario.id;
    req.session.user_email = nuevoUsuario.email;
    req.session.user_rol = nuevoUsuario.rol;

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('auth/registro', { error: 'Error al crear el usuario' });
  }
};

// LOGOUT
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports = {
  mostrarLogin,
  login,
  mostrarRegister,
  register,
  logout
};
