exports.getAllPTS = async (req, res) => {
    try {
        connection.query('SELECT * FROM phieutaisan', (err,rows) => {
            if(err) throw err;
            
            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: rows.length,
                data: {
                    pts: rows,
                },
            });
        });
    }  catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err,
    });
    }
};
exports.getOnePTS = async (req, res) => {
    try {
        connection.query('SELECT * FROM phieutaisan WHERE id = ?', req.params.id, (err,row) => {
            if(err) throw err;
            
            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: row.length,
                data: {
                    pts: row,
                },
            });
        });
    }  catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err,
    });
    }
};