const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//requerimos login con la db
const connection = require('../../db');

router.post('/login', (req, res) => {
    console.log(req.body.password);
    if (req.body.email && req.body.password) {
    connection.query('SELECT * FROM usuarios WHERE email = ?', [ req.body.email ], async (error, results) => {
        if (error) { throw error }
        
        if (results.length == 0 || !(await bcryptjs.compare(req.body.password, results[0].password))) {
            res.json({ error: 'El correo caco la constraseña son incorrectos'});
        } else {
            const payload = { user_id: results[0].id }
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
        
            res.json({ token });
        }
    });
    } else {
            res.json({ error: 'El correo caco la constraseña son incorrectos'});
    }
    
});

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

router.get('/perfil', isJWTLogin, (req, res) => {
    res.json({ Perfil: 'Perfil'});
});

module.exports = router;
