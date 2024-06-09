exports.getAllPTS = async (req, res) => {
    try {
        connection.query('SELECT * FROM phieutaisan', (err, rows) => {
            if (err) throw err;

            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: rows.length,
                data: {
                    pts: rows,
                },
            });
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};
exports.getOnePTS = async (req, res) => {
    try {
        connection.query('SELECT * FROM phieutaisan WHERE id = ?', req.params.id, (err, row) => {
            if (err) throw err;

            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: row.length,
                data: {
                    pts: row,
                },
            });
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.create = async (req, res) => {
    try {
        if (req.body && req.body.loaiPhieu && req.body.idTaiSan && req.body.idPhongBan && req.body.idPhongBanXuat) {

            const newPTS = {
                'loaiPhieu': req.body.ten,
                'idTaiSan': req.body.loai,
                'idPhongBan': req.body.ngayNhap,
                'idPhongBanXuat': req.body.soluong,
            }

            connection.query('INSERT INTO phieutaisan SET ?', newPTS, (err, row) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({
                        errorMessage: err,
                        status: false
                    });
                } else
                    res.status(200).json({
                        status: true,
                        title: 'Created Successfully.'
                    });
            })
        } else {
            res.status(400).json({
                errorMessage: 'Add proper parameter first!',
                status: false
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};