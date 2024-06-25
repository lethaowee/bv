<template>
  <HeaderComponent></HeaderComponent>
  <div class="w-100 container">
    <div class="text-center">
      <h2>Điền thông tin tài sản cần sửa</h2>
    </div>
    <form @submit="onAddingPS">
      <div class="mb-3 w-100">
        <label for="ts" class="form-label">Tên tài sản</label>

        <select
          v-model="inputPSForm.idTaiSan"
          id="ts"
          class="form-select form-control"
          aria-label="Default select example"
          aria-placeholder=""
          required
        >
          <option v-for="l in tss" :value="l.id">
            {{ l.ten }}
          </option>
        </select>
      </div>

      <div class="d-flex">
        <div class="mb-3 w-75">
          <label for="pb" class="form-label">Phòng ban trữ tài sản</label>

          <select
            v-model="inputPSForm.idPhongBan"
            id="pb"
            class="form-select form-control"
            aria-label="Default select example"
            aria-placeholder=""
          >
            <option v-for="room in pbs" :value="room.id">
              {{ room.tenPhongBan }}
            </option>
          </select>
        </div>

        <div class="mb-3 w-25">
          <label for="exampleInputDate" class="form-label">Ngày tạo</label>
          <input
            v-model="inputPSForm.ngayTao"
            type="date"
            class="form-control"
            id="exampleInputDate"
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="exampleInputStatus" class="form-label">Tình trạng</label>
        <textarea
          v-model="inputPSForm.tinhTrang"
          class="form-control"
          id="exampleInputStatus"
        >
        </textarea>
      </div>

      <button type="submit" class="btn btn-primary">Tạo phiếu sửa</button>
    </form>
  </div>
  <FooterComponent></FooterComponent>
  <div></div>
</template>

<script setup lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import ltsServices from "@/services/lts.services";
import pbServices from "@/services/pb.services";
import tsServices from "@/services/ts.services";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import psServices from "@/services/ps.services";
const pbs = ref([
  {
    id: 0,
    tenPhongBan: "",
  },
]);
const lts = ref([
  {
    id: 0,
    ten: "",
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

const inputPSForm = ref({
  ngayTao: "",
  idTaiSan: 0,
  idPhongBan: 0,
  tinhTrang: "",
});

var onAddingPS = async (e: any) => {
  e.preventDefault();
  try {
    await psServices.create(inputPSForm.value);

    Swal.fire({
      title: "Thành công!",
      text: "Tạo phiếu sửa thành công!",
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

  let respLts = await ltsServices.getAll();
  lts.value = respLts.data.lts;
});
</script>

<style></style>
