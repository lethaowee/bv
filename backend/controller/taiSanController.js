exports.getAllTS = async (req, res) => {
    try {
        connection.query('SELECT * FROM taisan', (err, rows) => {
            if (err) throw err;

            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: rows.length,
                data: {
                    ts: rows,
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
exports.getOneTS = async (req, res) => {
    try {
        connection.query('SELECT * FROM taisan WHERE id = ?', req.params.id, (err, row) => {
            if (err) throw err;

            console.log('Data received from Db:');
            res.status(200).json({
                status: 'success',
                total: row.length,
                data: {
                    ts: row,
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
        if (req.body && req.body.ten && req.body.loai && req.body.ngayNhap && req.body.soluong && req.body.idNguoiDung && req.body.idPhongBan && req.body.tinhTrang) {

            const newTS = {
                'ten': req.body.ten,
                'loai': req.body.loai,
                'ngayNhap': req.body.ngayNhap,
                'soluong': req.body.soluong,
                'idNguoiDung': req.body.idNguoiDung,
                'idPhongBan': req.body.idPhongBan,
                'tinhTrang': req.body.tinhTrang,
                'hinhAnh': req.body.hinhAnh,
            }

            connection.query('INSERT INTO taisan SET ?', newTS, (err, row) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({
                        errorMessage: err,
                        status: false
                    });
                } else
                    var newPTS = {
                        'loaiPhieu': 'nhap',
                        'idTaiSan': row.insertId,
                        'idPhongBan': req.body.idPhongBan,
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
            }
            )
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

exports.update = async (req, res) => {
    try {
        if (req.body && req.body.id && req.body.ten && req.body.loai && req.body.ngayNhap && req.body.soluong && req.body.idNguoiDung && req.body.idPhongBan && req.body.tinhTrang) {

            const newTS = {
                'id': req.body.id,
                'ten': req.body.ten,
                'loai': req.body.loai,
                'ngayNhap': req.body.ngayNhap,
                'soluong': req.body.soluong,
                'idNguoiDung': req.body.idNguoiDung,
                'idPhongBan': req.body.idPhongBan,
                'tinhTrang': req.body.tinhTrang,
                'hinhAnh': req.body.hinhAnh,
            }

            let sql = `UPDATE taisan SET 
                ten = '${newTS.ten}', 
                loai = '${newTS.loai}', 
                ngayNhap = '${newTS.ngayNhap}', 
                soluong = '${newTS.soluong}', 
                idNguoiDung = '${newTS.idNguoiDung}', 
                idPhongBan = '${newTS.idPhongBan}', 
                tinhTrang = '${newTS.tinhTrang}', 
                hinhAnh = '${newTS.hinhAnh}' 
            WHERE id = '${newTS.id}'`

            connection.query(sql, (err, row) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({
                        errorMessage: err,
                        status: false
                    });
                } else
                    res.status(200).json({
                        status: true,
                        title: 'Update Successfully.'
                    });
            }
            )
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