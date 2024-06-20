<template>
  <div>
    <section class="vh-100 vw-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
                  <p class="text-white-50 mb-5">
                    Vui lòng nhập tài khoản và mật khẩu
                  </p>
                  <form @submit="onLogin">
                    <input
                      v-model="inputFormLogin.username"
                      type="text"
                      id="typeEmailX"
                      class="form-control form-control-lg input-login"
                      placeholder="Tài khoản"
                      required
                    />

                    <input
                      v-model="inputFormLogin.password"
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg input-login"
                      placeholder="Mật khẩu"
                      required
                    />

                    <button
                      type="submit"
                      class="btn btn-outline-light btn-lg px-5 input-login"
                    >
                      Đăng nhập
                    </button>
                  </form>
                </div>

                <div>
                  <p class="mb-0">
                    Chưa có tài khoản?
                    <a
                      href="http://localhost:5173/signup"
                      class="text-white-50 fw-bold"
                      >Đăng ký</a
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
import { useCookies } from "vue3-cookies";
import authServices from "@/services/auth.services";
import checkLogin from "@/utilities/utilities";

const router = useRouter();
const cookies = useCookies();

const inputFormLogin = ref({
  username: "",
  password: "",
});

const currentToken = ref({
  token: "",
  id: "",
});

var onLogin = async (e: any) => {
  e.preventDefault();
  try {
    currentToken.value = await authServices.login({
      username: inputFormLogin.value.username,
      password: inputFormLogin.value.password,
    });

    cookies.cookies.set("Token", currentToken.value.token);
    cookies.cookies.set("UserId", currentToken.value.id);

    Swal.fire({
      title: "Success!",
      text: "Login success.",
      icon: "success",
      confirmButtonText: "OK",
    });
    router.push({ name: "home" });
  } catch (err: any) {
    Swal.fire({
      title: "Error!",
      text: "Wrong username or password.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(err);
  }
};

onMounted(() => {
  if (checkLogin()) router.push({ name: "home" });
});
</script>

<style>
.gradient-custom {
  background-image: url("../assets/wallpaper.png");
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
  margin-top: 20px;
}
</style>
