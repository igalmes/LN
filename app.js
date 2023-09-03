require('dotenv').config();

const { response } = require('express');
const express = require('express');
const app = express();
const expressLayaout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const sequelize = require('./db2');

app.set('view engine', 'ejs');
app.use(expressLayaout);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.use(cors());

app.use(methodOverride('_method'));
const session = require('express-session');


app.use(session({
    secret: 'hcd*u9#{SJdWxFus',
    resave: false,
    saveUninitialized: false


}));


// cuando vaya a la ruta del admin pasa por esta capa
const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }


    //falta relacionar roles de admin y usuario
    next();
}

const isJWTLogin = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.sendStatus(401);

            } else {
                console.log(decoded);
                next();
            }
        });
    }

    next();
}

app.use(require('./routes/index'));
app.use(require('./routes/productos'));
app.use(require('./routes/contacto'));
app.use(require('./routes/chofer'))


//desp del middlework la capa se muestra asi
app.use('/admin', isLogin, require('./routes/admin/productos'));
app.use('/admin', isLogin, require('./routes/admin/categorias'));

app.use('/api',require('./routes/api/auth'));
app.use('/api', isJWTLogin, require('./routes/api/categorias'));

app.use(require('./routes/auth'));

app.use((req, res, next) => {
    res.status(404).send('Not fine');
});

const port = process.env.PORT || 80;

// app.use(require('./router'));

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.listen(port, async () => {
    console.log(`http://localhost:${port}`);

    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch(error) {
        console.error('Unable to connect to the database', error);
    }
});