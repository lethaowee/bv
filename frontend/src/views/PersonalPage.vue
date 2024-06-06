<template>
    <HeaderComponent></HeaderComponent>

    <div>
        <div class="container">
            <div class="row gutters">
                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="account-settings">
                                <div class="user-profile">
                                    <div class="user-avatar">
                                        <img v-if="currentUser.avatar != null && currentUser.avatar != ''" :src="currentUser.avatar"
                                            :alt="currentUser.hoTen">
                                        <div v-else>
                                            <i  class="fa-solid fa-user"></i>
                                        </div>
                                    </div>
                                    <div>
                                    <div class="form-group">
                                        <div class="mb-3">
                                            <input @change="uploadAvatar($event)" type="file" class="form-control" id="formFile">
                                        </div>
                                    </div>
                                </div>
                                    <h5 class="user-name">{{ currentUser.hoTen }}</h5>
                                    <h6 class="user-email">Vai trò: {{ currentUser.vaiTro }}</h6>
                                    <h6 class="user-email">{{ currentUser.email }}</h6>
                                </div>
                                <div class="about">
                                    <h5>Giới thiệu</h5>
                                    <p>Tôi là {{ currentUser.hoTen }}, đang giữ vai trò {{ currentUser.chucVu }} ở phòng ban {{ currentPb }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div class="card h-100">
                        <div class="card-body">
                            <form @submit="onUpdateUser" class=" w-100">

                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mb-2 text-primary">Thông tin cá nhân</h6>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="manv">Mã nhân viên</label>
                                            <input v-model="currentUser.maNhanVien" type="text" class="form-control" id="manv"
                                            placeholder="Nhập mã nhân viên" required>
                                        </div>
                                    </div>
                                        
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="fullName">Họ và tên</label>
                                            <input v-model="currentUser.hoTen" type="text" class="form-control" id="fullName"
                                            placeholder="Nhập họ và tên" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="eMail">Email</label>
                                            <input v-model="currentUser.email" type="email" class="form-control" id="eMail"
                                            placeholder="Nhập email" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="phone">Số điện thoại</label>
                                            <input v-model="currentUser.sdt" type="text" class="form-control" id="phone"
                                            placeholder="Nhập số điện thoại" required>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="phone">Ngày sinh</label>
                                            <input v-model="currentUser.ngaySinh" type="date" class="form-control" id="date"
                                            placeholder="Enter phone number">
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            
                                            <label for="pb">Phòng ban</label>
                                            <select id="pb" v-model="currentUser.idPhongBan" class="form-select" aria-label="Default select example">
                                                <option v-for="room in pb" :value="room.id">{{ room.tenPhongBan }}</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="cv">Chức vụ</label>
                                            <input v-model="currentUser.chucVu" type="text" class="form-control" id="cv"
                                            placeholder="Nhập chức vụ" required>
                                        </div>
                                    </div>
                                                                    
                                    <div >
                                        <button type="submit" id="submit" name="submit" class="btn btn-primary" style="width: 10%;">Cập nhật</button>
                                    </div>
                                </div>
                            </form>

                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 class="mt-3 mb-2 text-primary">Mật khẩu</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="Street">Mật khẩu hiện tại</label>
                                        <input type="name" class="form-control" id="Street" placeholder="Nhập mật khẩu">
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="ciTy">Mật khẩu mới</label>
                                        <input type="name" class="form-control" id="ciTy" placeholder="Nhập mật khẩu mới">
                                    </div>
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                   
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label for="ciTy1">Nhập lại mật khẩu mới</label>
                                        <input type="name" class="form-control" id="ciTy1" placeholder="Nhập lại mật khẩu mới">
                                    </div>
                                </div>
                            </div>
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right">
            
                                        <button type="button" id="submit" name="submit"
                                            class="btn btn-primary">Cập nhật mật khẩu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import authServices from '@/services/auth.services';
import pbServices from '@/services/pb.services';
import ndServices from '@/services/nd.services';
import { useCookies } from "vue3-cookies";
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const cookies = useCookies();
const token = cookies.cookies.get('Token')

const pb = ref([
    {
        id: 0,
        tenPhongBan: ''
    }
])

const currentPb = ref('')

const currentUser = ref({
    id: 0,
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    sdt: null,
    ngaySinh: null,
    avatar: '',
    vaiTro: "",
    idPhongBan: null,
    maNhanVien: null,
    chucVu: ''
})

var onUpdateUser = async (e: any) => {
  e.preventDefault()
  try {
    await ndServices.update(currentUser.value.id, currentUser.value)
    Swal.fire({
        title: 'Thành công!',
        text: 'Cập nhật thông tin thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
    })
  } catch (err: any) {
    Swal.fire({
        title: 'Lỗi!',
        text: err,
        icon: 'error',
        confirmButtonText: 'OK'
    })
    console.log(err)
  }
}

const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

async function uploadAvatar(event: any){
  try {
    let resp = await authServices.getMe(token);
    currentUser.value = resp.data.nd[0]

    let code = await toBase64(event.target.files[0])
    currentUser.value.avatar = String(code)

    await ndServices.update(currentUser.value.id, currentUser.value)
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}



onMounted(async () => {
    try {
        let respPb = await pbServices.getAll();
        pb.value = respPb.data.pb

        let resp = await authServices.getMe(token);
        currentUser.value = resp.data.nd[0]

        pb.value.forEach(p => {
            if (p.id == currentUser.value.idPhongBan) {
                currentPb.value = p.tenPhongBan
            }
        });

    } catch (error) {
        console.log(error);
    }
})
</script>

<style>
.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}

.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}

.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}

.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}

.account-settings .user-profile h6.user-email {
    margin: 0;
    font-weight: 600;
    color: #9fa8b9;
}

.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}

.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}

.form-control {
    margin-bottom: 20px;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}
</style>