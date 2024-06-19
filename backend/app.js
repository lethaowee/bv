const express = require('express');
const cors = require('cors');

const app = express();

const chtsRoutes = require('./routes/cauHinhThongSoRoutes');
const hdRoutes = require('./routes/hoatDongRoutes');
const ndRoutes = require('./routes/nguoiDungRoutes');
const phRoutes = require('./routes/phanHoiRoutes');
const pbRoutes = require('./routes/phongBanRoutes');
const tsRoutes = require('./routes/taiSanRoutes');
const tbttRoutes = require('./routes/thietBiThayTheRoutes');
const tbRoutes = require('./routes/thongBaoRoutes');
const dvbhRoutes = require('./routes/donViBanHangRoutes');
const pnRoutes = require('./routes/phieuNhapRoutes');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/cauhinhthongso', chtsRoutes);
app.use('/api/hoatdong', hdRoutes);
app.use('/api/nguoidung', ndRoutes);
app.use('/api/phanhoi', phRoutes);
app.use('/api/phongban', pbRoutes);
app.use('/api/taisan', tsRoutes);
app.use('/api/thietbithaythe', tbttRoutes);
app.use('/api/thongbao', tbRoutes);
app.use('/api/donvibanhang', dvbhRoutes);
app.use('/api/phieunhap', pnRoutes);
module.exports = app;
