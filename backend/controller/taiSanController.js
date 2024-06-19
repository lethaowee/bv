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
        if (req.body && req.body.ten && req.body.ngayNhap && req.body.hsd && req.body.soluong && req.body.soLo && req.body.donGia && req.body.donViTinh && req.body.hinhAnh) {

            const newTS = {
                'ten': req.body.ten,
                'ngayNhap': req.body.ngayNhap,
                'hsd': req.body.hsd,
                'soluong': req.body.soluong,
                'soLo': req.body.soLo,
                'donGia': req.body.donGia,
                'donViTinh': req.body.donViTinh,
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
                    var newPN = {
                        'idTaiSan': row.insertId,
                        'idDonViBanHang': req.body.idDonViBanHang,
                        'donViMua': req.body.donViMua,
                        'maSoThue': req.body.maSoThue,
                        'diaChi': req.body.diaChi,
                        'soLuong': req.body.soluong,
                        'donGia': req.body.donGia,
                        'thanhTien': req.body.thanhTien,
                        'tienThue': req.body.tienThue,
                        'tienThanhToan': req.body.tienThanhToan,
                        'hinhThucThanhToan': req.body.hinhThucThanhToan,
                        'donViTienTe': req.body.donViTienTe,
                        'ngayTao': req.body.ngayNhap
                    }

                connection.query('INSERT INTO phieunhap SET ?', newPN, (err, row) => {
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