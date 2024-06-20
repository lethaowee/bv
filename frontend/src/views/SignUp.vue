<template>
  <div>
    <section class="vh-100 vw-100 gradient-custom">
      <div class="container py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div class="">
                  <h2 class="fw-bold text-uppercase">Đăng ký</h2>
                  <p class="text-white-50">Nhập thông tin để tạo tài khoản</p>
                  <form @submit="onRegister">
                    <input
                      v-model="inputFormRegister.username"
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-lg input-login"
                      placeholder="Tài khoản"
                      required
                    />

                    <input
                      v-model="inputFormRegister.password"
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg input-login"
                      placeholder="Mật khẩu"
                      required
                    />

                    <input
                      v-model="inputFormRegister.repeatPassword"
                      type="password"
                      class="form-control form-control-lg input-login"
                      placeholder="Lặp lại mật khẩu"
                      required
                    />

                    <input
                      v-model="inputFormRegister.fullName"
                      type="text"
                      class="form-control form-control-lg input-login"
                      placeholder="Họ tên"
                      required
                    />

                    <input
                      v-model="inputFormRegister.email"
                      type="email"
                      class="form-control form-control-lg input-login"
                      placeholder="Email"
                      required
                    />

                    <h6 class="text-start">
                      <label for="pb" class="input-login">Phòng ban</label>
                    </h6>

                    <select
                      id="pb"
                      v-model="inputFormRegister.idRoom"
                      class="form-select form-control"
                      aria-label="Default select example"
                      aria-placeholder=""
                    >
                      <option v-for="room in pb" :value="room.id">
                        {{ room.tenPhongBan }}
                      </option>
                    </select>

                    <button
                      class="btn btn-outline-light btn-lg input-login"
                      type="submit"
                    >
                      Đăng ký
                    </button>
                  </form>
                </div>

                <div>
                  <p class="mb-0">
                    Đã có tài khoản?
                    <a
                      href="http://localhost:5173"
                      class="text-white-50 fw-bold"
                      >Đăng nhập</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import authServices from "@/services/auth.services";
import pbServices from "@/services/pb.services";

const router = useRouter();

const pb = ref([
  {
    id: 0,
    tenPhongBan: "",
  },
]);

const inputFormRegister = ref({
  username: "",
  password: "",
  fullName: "",
  repeatPassword: "",
  email: "",
  role: "Thành viên",
  idRoom: 0,
});

var onRegister = async (e: any) => {
  e.preventDefault();
  try {
    if (
      inputFormRegister.value.password != inputFormRegister.value.repeatPassword
    ) {
      Swal.fire({
        title: "Error!",
        text: "Password and repeat password not match.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      await authServices.register({
        username: inputFormRegister.value.username,
        password: inputFormRegister.value.password,
        email: inputFormRegister.value.email,
        role: inputFormRegister.value.role,
        idRoom: inputFormRegister.value.idRoom,
        fullName: inputFormRegister.value.fullName,
      });
      Swal.fire({
        title: "Success!",
        text: "Đăng ký thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push({ name: "login" });
    }
  } catch (err: any) {
    Swal.fire({
      title: "Error!",
      text: "Username already exist.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(err);
  }
};
onMounted(async () => {
  try {
    let resp = await pbServices.getAll();
    pb.value = resp.data.pb;

    console.log(resp);
  } catch (err) {
    console.log(err);
  }
});
</script>

<style>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(106, 17, 203, 1),
    rgba(37, 117, 252, 1)
  );
}
.input-login {
  margin-top: 10px;
}
</style>
