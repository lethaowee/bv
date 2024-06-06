USE bv;

CREATE TABLE IF NOT EXISTS PhongBan (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tenPhongBan varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS NguoiDung (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    taiKhoan varchar(255) NOT NULL,
    matKhau TEXT NOT NULL,
    hoTen varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    sdt varchar(255),
    ngaySinh date,
    avatar LONGTEXT,
    vaiTro varchar(255) NOT NULL,
    idPhongBan int,
    FOREIGN KEY (idPhongBan) 
      REFERENCES PhongBan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    maNhanVien varchar(45),
    chucVu varchar(255)
);

CREATE TABLE IF NOT EXISTS TaiSan (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ten varchar(255) NOT NULL,
    loai varchar(255) NOT NULL,
    ngayNhap date NOT NULL,
    soluong int NOT NULL,
    idNguoiDung int NOT NULL,
    idPhongBan int NOT NULL,
    tinhTrang varchar(255) NOT NULL,
    hinhAnh LONGTEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS PhanHoi (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    noiDung varchar(255) NOT NULL,
    idNguoiTao int NOT NULL,
    FOREIGN KEY (idNguoiTao) 
      REFERENCES NguoiDung (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS PhieuTaiSan (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    loaiPhieu varchar(255) NOT NULL,
    idTaiSan int NOT NULL,
    idPhongBan int NOT NULL,
    idPhongBanXuat int NOT NULL,
    FOREIGN KEY (idTaiSan) 
      REFERENCES TaiSan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (idPhongBan) 
      REFERENCES PhongBan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (idPhongBanXuat) 
      REFERENCES PhongBan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS CauHinhThongSo (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cpu varchar(255),
    ram varchar(255),
    hdd int,
    ssd int,
    cardDoHoa varchar(255),
    manHinh varchar(255),
    idTaiSan int NOT NULL,
    FOREIGN KEY (idTaiSan) 
      REFERENCES TaiSan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS ThietBiThayThe (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ten varchar(255) NOT NULL,
    soLuong int NOT NULL,
    idPhongBan int NOT NULL,
    daMua boolean NOT NULL,
    FOREIGN KEY (idPhongBan) 
      REFERENCES PhongBan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    hinhAnh LONGTEXT
);
CREATE TABLE IF NOT EXISTS ThongBao (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    noiDung varchar(255) NOT NULL,
    idNguoiTao int NOT NULL,
    idNguoiNhan int NOT NULL,
    FOREIGN KEY (idNguoiTao) 
      REFERENCES NguoiDung (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (idNguoiNhan) 
      REFERENCES NguoiDung (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS HoatDong (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    hanhdong varchar(255),
    idNguoiTao int NOT NULL,
    idTaiSan int NOT NULL,
    FOREIGN KEY (idNguoiTao) 
      REFERENCES NguoiDung (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (idTaiSan) 
      REFERENCES TaiSan (id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

INSERT INTO phongban (tenPhongBan) VALUES ('Hành chánh quản trị');
INSERT INTO phongban (tenPhongBan) VALUES ('Tài chính kế toán');
INSERT INTO phongban (tenPhongBan) VALUES ('Tổ chức cán bộ');
INSERT INTO phongban (tenPhongBan) VALUES ('Công nghệ thông tin');
INSERT INTO phongban (tenPhongBan) VALUES ('Kế hoạch tổng hợp');
INSERT INTO phongban (tenPhongBan) VALUES ('Điều dưỡng');
INSERT INTO phongban (tenPhongBan) VALUES ('Quản lý chất lượng - chỉ đạo tuyến');
INSERT INTO phongban (tenPhongBan) VALUES ('Vật tư thiết bị y tế');