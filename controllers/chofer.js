const connection = require('../db');

module.exports.index = (req, res) => {
    connection.query('SELECT * FROM chofer', (error, results) => {
        if (error) { throw error }


        res.render('chofer/index', { chofer: results });
    });
}

module.exports.show = (req, res) => {

    connection.query('SELECT * FROM chofer WHERE nombre_id= 1',[ req.params.chofer_id ],(error, results) => {
        if (error) { throw error }

        res.render('chofer/show', { chofer: results[0] });

    })
    
}
