<template>
  <HeaderComponent></HeaderComponent>
  <div class="container d-flex flex-row">
    <div class="w-25" style="margin-right: 50px">
      <div class="w-100" style="margin-bottom: 5px">
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          :id="'btnradio'"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary w-100" for="btnradio"
          >asdfdas</label
        >
      </div>
    </div>

    <div class="w-100">
      <div class="text-center">
        <h2>Điền các thông tin của tài sản</h2>
      </div>
      <form @submit="onAddingTS">
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Tên tài sản</label>
          <input
            v-model="inputTSForm.ten"
            type="text"
            class="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputType" class="form-label">Loại</label>
          <input
            v-model="inputTSForm.loai"
            type="text                                                                                                                                         "
            class="form-control"
            id="exampleInputType"
          />
        </div>

        <div class="d-flex">
          <div class="mb-3 w-75">
            <label for="pb" class="form-label">Phòng ban trữ tài sản</label>

            <select
              v-model="inputTSForm.idPhongBan"
              id="pb"
              class="form-select form-control"
              aria-label="Default select example"
              aria-placeholder=""
            >
              <option v-for="room in pb" :value="room.id">
                {{ room.tenPhongBan }}
              </option>
            </select>
          </div>

          <div class="mb-3 w-25">
            <label for="exampleInputDate" class="form-label">Ngày nhập</label>
            <input
              v-model="inputTSForm.ngayNhap"
              type="date"
              class="form-control"
              id="exampleInputDate"
            />
          </div>

          <div class="mb-3 w-25">
            <label for="exampleInputCount" class="form-label">Số lượng</label>
            <input
              v-model="inputTSForm.soluong"
              type="number"
              class="form-control"
              id="exampleInputCount"
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="exampleInputStatus" class="form-label">Tình trạng</label>
          <input
            v-model="inputTSForm.tinhTrang"
            type="text"
            class="form-control"
            id="exampleInputStatus"
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputStatus" class="form-label">Hình ảnh</label>
          <input
            @change="uploadImg($event)"
            type="file"
            class="form-control"
            id="exampleInputStatus"
          />
        </div>

        <!-- <div class="mb-3 form-check">
          <input Date="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div> -->
        <button type="submit" class="btn btn-primary">Tạo tài sản</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import pbServices from "@/services/pb.services";
import tsServices from "@/services/ts.services";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

const pb = ref([
  {
    id: 0,
    tenPhongBan: "",
  },
]);

const inputTSForm = ref({
  ten: "",
  loai: "",
  ngayNhap: "",
  soluong: 0,
  idNguoiDung: 0,
  idPhongBan: 0,
  tinhTrang: "",
  hinhAnh: "",
});

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

async function uploadImg(event: any) {
  try {
    let code = await toBase64(event.target.files[0]);
    inputTSForm.value.hinhAnh = String(code);
  } catch (err) {
    console.log(err);
  }
}

var onAddingTS = async (e: any) => {
  e.preventDefault();
  try {
    await tsServices.create(inputTSForm.value);
    Swal.fire({
      title: "Thành công!",
      text: "Tạo tài sản thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (err: any) {
    Swal.fire({
      title: "Lỗi!",
      text: err,
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
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: String(error),
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(error);
  }
});
</script>

<style></style>
