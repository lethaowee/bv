<template>
  <HeaderComponent></HeaderComponent>

  <div class="w-100 container">
    <div class="text-center">
      <h2>Điền thông tin tài sản cần sửa</h2>
    </div>
    <form @submit="onAddingPX">
      <div class="d-flex">
        <div class="mb-3 w-50">
          <label for="idTaiSan" class="form-label">Tài sản</label>
          <select
            v-model="inputPX.idTaiSan"
            id="idTaiSan"
            class="form-select form-control"
            aria-label="Default select example"
            aria-placeholder=""
            required
          >
            <option v-for="ts in tss" :value="ts.id">
              {{ ts.ten }}
            </option>
          </select>
        </div>

        <div class="mb-3 w-50">
          <label for="idPhongBan" class="form-label">Phòng ban xuất</label>
          <select
            v-model="inputPX.idPhongBan"
            id="idPhongBan"
            class="form-select form-control"
            aria-label="Default select example"
            aria-placeholder=""
            required
          >
            <option v-for="pb in pbs" :value="pb.id">
              {{ pb.tenPhongBan }}
            </option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <div class="mb-3 w-50">
          <label for="exampleInputName" class="form-label">Số lượng</label>
          <input
            v-model="inputPX.soLuong"
            v
            type="number"
            class="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div class="mb-3 w-25">
          <label for="exampleInputDate" class="form-label">Ngày xuất</label>
          <input
            v-model="inputPX.ngayTao"
            type="date"
            class="form-control"
            id="exampleInputDate"
            required
          />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Tạo phiếu</button>
    </form>
  </div>
  <FooterComponent></FooterComponent>
  <div></div>
</template>

<script setup lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import pbServices from "@/services/pb.services";
import tsServices from "@/services/ts.services";
import pxServices from "@/services/px.services";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
const pbs = ref([
  {
    id: 0,
    tenPhongBan: "",
  },
]);
const tss = ref([
  {
    id: 0,
    ten: "",
    loai: "",
    ngayNhap: "",
    soluong: 0,
    idNguoiDung: 0,
    idPhongBan: 0,
    tinhTrang: "",
    hinhAnh: "",
  },
]);
const inputPX = ref({
  idTaiSan: 0,
  idPhongBan: 0,
  soLuong: 0,
  ngayTao: "",
});
const pxs = ref({
  id: 0,
  idTaiSan: 0,
  idPhongBan: 0,
  soLuong: 0,
  ngayTao: "",
});

var onAddingPX = async (e: any) => {
  e.preventDefault();
  try {
    await pxServices.create(inputPX.value);

    Swal.fire({
      title: "Thành công!",
      text: "Tạo phiếu xuất thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });

    window.location.reload();
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
  let respPb = await pbServices.getAll();
  pbs.value = respPb.data.pb;

  let respTs = await tsServices.getAll();
  tss.value = respTs.data.ts;

  let respPx = await pxServices.getAll();
  pxs.value = respPx.data.px;
});
</script>

<style></style>
