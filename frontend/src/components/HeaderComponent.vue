<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <div class="d-flex">
          <h5>
            <a
              href="/home"
              class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
            >
              Bệnh viện đa khoa Sóc Trăng
              <font-awesome-icon
                :icon="['fas', 'hospital']"
                style="margin: 0 20px 0 10px"
              />
            </a>
          </h5>

          <ul class="nav justify-content-center mb-md-0">
            <li>
              <a
                href="http://localhost:5173/home"
                class="nav-link px-2 link-dark"
                >Trang chủ</a
              >
            </li>
            <li>
              <a
                href="http://localhost:5173/managets"
                class="nav-link px-2 link-dark"
                >Admin</a
              >
            </li>
          </ul>
        </div>
        <div class="dropdown text-end">
          <a
            style="border-radius: 50px; padding: 10px"
            href="#"
            class="d-block link-light text-decoration-none dropdown-toggle bg-secondary"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              v-if="currentUser.avatar != null && currentUser.avatar != ''"
              width="30px"
              height="30px"
              style="border-radius: 50%"
              :src="currentUser.avatar"
              :alt="currentUser.hoTen"
            />
            <div v-else>
              <font-awesome-icon class="text-white" :icon="['fas', 'user']" />
            </div>
          </a>
          <ul
            class="dropdown-menu text-small"
            aria-labelledby="dropdownUser1"
            style=""
          >
            <li>
              <a class="dropdown-item" href="http://localhost:5173/personal"
                >Thông tin cá nhân</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#" @click="signOut">Đăng xuất</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import authServices from "@/services/auth.services";
import { onMounted, ref } from "vue";
import { useCookies } from "vue3-cookies";

const cookies = useCookies();
const token = cookies.cookies.get("Token");

const currentUser = ref({
  id: 0,
  taiKhoan: "",
  matKhau: "",
  hoTen: "",
  email: "",
  sdt: null,
  ngaySinh: null,
  avatar: "",
  vaiTro: "",
  idPhongBan: null,
  maNhanVien: null,
  chucVu: "",
});

function signOut() {
  document.cookie = "Token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.reload();
}

onMounted(async () => {
  try {
    let resp = await authServices.getMe(token);
    currentUser.value = resp.data.nd[0];
  } catch (error) {
    console.log(error);
  }
});
</script>
