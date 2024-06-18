<template>
  <HeaderComponent></HeaderComponent>
  <div class="w-100 container">
    <div class="text-center">
      <h2>Điền thông tin tài sản cần sửa</h2>
    </div>
    <form @submit="">
      <div class="mb-3">
        <label for="exampleInputName" class="form-label">Tên tài sản</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputType" class="form-label">Loại</label>
        <input
          type="text                                                                                                                                         "
          class="form-control"
          id="exampleInputType"
        />
      </div>

      <div class="d-flex">
        <div class="mb-3 w-75">
          <label for="pb" class="form-label">Phòng ban trữ tài sản</label>

          <select
            id="pb"
            class="form-select form-control"
            aria-label="Default select example"
            aria-placeholder=""
          >
            <option></option>
          </select>
        </div>

        <div class="mb-3 w-25">
          <label for="exampleInputDate" class="form-label">Ngày nhập</label>
          <input type="date" class="form-control" id="exampleInputDate" />
        </div>

        <div class="mb-3 w-25">
          <label for="exampleInputCount" class="form-label">Số lượng</label>
          <input type="number" class="form-control" id="exampleInputCount" />
        </div>
      </div>

      <div class="mb-3">
        <label for="exampleInputStatus" class="form-label">Tình trạng</label>
        <input type="text" class="form-control" id="exampleInputStatus" />
      </div>

      <!-- <div class="mb-3 form-check">
          <input Date="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div> -->
      <button type="submit" class="btn btn-primary">Thêm tài sản</button>
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
import { onMounted, ref } from "vue";
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

onMounted(async () => {
  let respPb = await pbServices.getAll();
  pbs.value = respPb.data.pb;

  let respTs = await tsServices.getAll();
  tss.value = respTs.data.ts;
});
</script>

<style></style>
