<template>
  <HeaderComponent></HeaderComponent>
  <div class="container">
    <div>
      <div class="text-center">
        <h2>Điền các thông tin của tài sản</h2>
      </div>
      <form>
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
              <option v-for="room in pb" :value="room.id">
                {{ room.tenPhongBan }}
              </option>
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

        <div class="mb-3">
          <label for="exampleInputStatus" class="form-label">Hình ảnh</label>
          <input type="file" class="form-control" id="exampleInputStatus" />
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
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

const pb = ref([
  {
    id: 0,
    tenPhongBan: "",
  },
]);

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
