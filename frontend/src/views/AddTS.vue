<template>
  <HeaderComponent></HeaderComponent>
  <div class="container d-flex flex-row">
    <div class="w-25" style="margin-right: 50px">
      <div v-for="(ts, index) in tss" class="w-100" style="margin-bottom: 5px">
        <input
          :value="index"
          v-model="choosenTS"
          type="radio"
          @change="changeChoosen(index)"
          class="btn-check"
          :name="'btnradio'"
          :id="'btnradio' + ts.id"
          autocomplete="off"
        />
        <label
          class="btn btn-outline-primary w-100"
          :for="'btnradio' + ts.id"
          >{{ ts.ten }}</label
        >
        <input
          checked
          v-if="index == tss.length - 1"
          :value="-1"
          v-model="choosenTS"
          type="radio"
          @change="changeChoosen(index)"
          class="btn-check"
          :name="'btnradio'"
          :id="'btnradio-1'"
          autocomplete="off"
        />
        <label
          v-if="index == tss.length - 1"
          style="margin-top: 5px"
          class="btn btn-outline-danger w-100"
          :for="'btnradio-1'"
          >+</label
        >
      </div>
      <div class="text-danger">
        Lưu ý: Hệ thống tự động tạo phiếu nhập khi thêm tài sản
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

          <img
            class="img-thumbnail"
            height="300px"
            width="auto"
            v-if="inputTSForm.hinhAnh != null && inputTSForm.hinhAnh != ''"
            :src="inputTSForm.hinhAnh"
            alt=""
          />
        </div>

        <!-- <div class="mb-3 form-check">
          <input Date="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div> -->
        <button v-if="choosenTS == -1" type="submit" class="btn btn-primary">
          Thêm tài sản
        </button>
        <button v-else type="submit" class="btn btn-primary">
          Cập nhật tài sản
        </button>
      </form>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import pbServices from "@/services/pb.services";
import tsServices from "@/services/ts.services";
import checkLogin from "@/utilities/utilities";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

const router = useRouter();
const cookies = useCookies();
const currentUserId = Number(cookies.cookies.get("UserId"));
const choosenTS = ref(0);

const pb = ref([
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

function changeChoosen(index: number) {
  if (choosenTS.value == -1) {
    inputTSForm.value.ten = "";
    inputTSForm.value.loai = "";
    inputTSForm.value.ngayNhap = "";
    inputTSForm.value.soluong = 0;
    inputTSForm.value.idNguoiDung = 0;
    inputTSForm.value.idPhongBan = 0;
    inputTSForm.value.tinhTrang = "";
    inputTSForm.value.hinhAnh = "";
  } else {
    inputTSForm.value.ten = tss.value[index].ten;
    inputTSForm.value.loai = tss.value[index].loai;
    inputTSForm.value.ngayNhap = tss.value[index].ngayNhap;
    inputTSForm.value.soluong = tss.value[index].soluong;
    inputTSForm.value.idNguoiDung = tss.value[index].idNguoiDung;
    inputTSForm.value.idPhongBan = tss.value[index].idPhongBan;
    inputTSForm.value.tinhTrang = tss.value[index].tinhTrang;
    inputTSForm.value.hinhAnh = tss.value[index].hinhAnh;
  }
}

var onAddingTS = async (e: any) => {
  e.preventDefault();
  try {
    if (choosenTS.value == -1) {
      inputTSForm.value.idNguoiDung = currentUserId;
      await tsServices.create(inputTSForm.value);
    } else
      await tsServices.update({
        id: tss.value[choosenTS.value].id,
        ten: inputTSForm.value.ten,
        loai: inputTSForm.value.loai,
        ngayNhap: inputTSForm.value.ngayNhap.slice(0, 10),
        soluong: inputTSForm.value.soluong,
        idNguoiDung: inputTSForm.value.idNguoiDung,
        idPhongBan: inputTSForm.value.idPhongBan,
        tinhTrang: inputTSForm.value.tinhTrang,
        hinhAnh: inputTSForm.value.hinhAnh,
      });

    if (choosenTS.value == -1) {
      Swal.fire({
        title: "Thành công!",
        text: "Tạo tài sản thành công!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Thành công!",
        text: "Cập nhật tài sản thành công!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }

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
  try {
    if (!checkLogin()) router.push({ name: "login" });

    let resp = await pbServices.getAll();
    pb.value = resp.data.pb;

    let resp1 = await tsServices.getAll();
    tss.value = resp1.data.ts;
    
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
