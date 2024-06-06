exports.getAllTBTT = async (req, res) => {
    try {
        connection.query('SELECT * FROM thietbithaythe', (err,rows) => {
            if(err) throw err;
            
            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: rows.length,
                data: {
                    tbtt: rows,
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
exports.getOneTBTT = async (req, res) => {
    try {
        connection.query('SELECT * FROM thietbithaythe WHERE id = ?', req.params.id, (err,row) => {
            if(err) throw err;
            
            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: row.length,
                data: {
                    tbtt: row,
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