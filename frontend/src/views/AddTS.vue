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
      </div>
      <input
        checked
        :value="-1"
        v-model="choosenTS"
        @change="changeChoosen(-1)"
        type="radio"
        class="btn-check"
        :name="'btnradio'"
        :id="'btnradio-1'"
        autocomplete="off"
      />
      <label
        style="margin-top: 5px"
        class="btn btn-outline-danger w-100"
        :for="'btnradio-1'"
        >+</label
      >
      <div class="text-danger">
        Lưu ý: Hệ thống tự động tạo phiếu nhập khi thêm tài sản
      </div>
    </div>

    <div class="w-100">
      <div class="text-center">
        <h3>Điền các thông tin của tài sản</h3>
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
            required
          />
        </div>

        <div class="mb-3 w-100">
          <label for="lts" class="form-label">Loại tài sản</label>

          <select
            v-model="inputTSForm.idLoaiTaiSan"
            id="lts"
            class="form-select form-control"
            aria-label="Default select example"
            aria-placeholder=""
            required
          >
            <option v-for="l in lts" :value="l.id">
              {{ l.ten }}
            </option>
          </select>
        </div>

        <div class="d-flex d-flex justify-content-between">
          <div class="mb-3 w-25">
            <label for="exampleInputDate" class="form-label">Ngày nhập</label>
            <input
              v-model="inputTSForm.ngayNhap"
              type="date"
              class="form-control"
              id="exampleInputDate"
              required
            />
          </div>

          <div class="mb-3 w-25">
            <label for="exampleInputHSD" class="form-label">Hạn sử dụng</label>
            <input
              v-model="inputTSForm.hsd"
              type="date"
              class="form-control"
              id="exampleInputHSD"
              required
            />
          </div>

          <div class="mb-3 w-25">
            <label for="exampleInputCount" class="form-label">Số lượng</label>
            <input
              @change="calculatePrice()"
              v-model="inputTSForm.soluong"
              type="number"
              class="form-control"
              id="exampleInputCount"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="exampleInputNum" class="form-label">Số lô</label>
          <input
            v-model="inputTSForm.soLo"
            type="text"
            class="form-control"
            id="exampleInputNum"
            required
          />
        </div>

        <div class="mb-3">
          <label for="idPhongBan" class="form-label"
            >Phòng ban trữ tài sản</label
          >
          <select
            v-model="inputTSForm.idPhongBan"
            id="idPhongBan"
            class="form-select form-control"
            aria-label="Default select example"
            aria-placeholder=""
            required
          >
            <option v-for="p in pb" :value="p.id">
              {{ p.tenPhongBan }}
            </option>
          </select>
        </div>

        <div class="d-flex">
          <div class="mb-3 w-50">
            <label for="exampleInputPrice" class="form-label">Đơn giá</label>
            <input
              @change="calculatePrice()"
              v-model="inputTSForm.donGia"
              type="text"
              class="form-control"
              id="exampleInputPrice"
              required
            />
          </div>

          <div class="mb-3 w-50">
            <label for="exampleInputCal" class="form-label">Đơn vị tính</label>
            <input
              v-model="inputTSForm.donViTinh"
              type="text"
              class="form-control"
              id="exampleInputCal"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="exampleInputImage" class="form-label">Hình ảnh</label>
          <input
            @change="uploadImg($event)"
            type="file"
            class="form-control"
            id="exampleInputImage"
            required
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

        <div v-if="choosenTS == -1">
          <div class="text-center">
            <h3>Điền các thông tin của phiếu nhập tài sản</h3>
          </div>

          <div class="d-flex">
            <div class="mb-3 w-100">
              <label for="pb" class="form-label">Đơn vị bán hàng</label>

              <select
                v-model="inputTSForm.idDonViBanHang"
                id="pb"
                class="form-select form-control"
                aria-label="Default select example"
                aria-placeholder=""
                required
              >
                <option v-for="dvbh in dvbhs" :value="dvbh.id">
                  {{ dvbh.ten }}
                </option>
              </select>
            </div>
          </div>

          <div class="d-flex">
            <div class="mb-3 w-50">
              <label for="exampleInputPriceWay" class="form-label"
                >Đơn vị mua</label
              >
              <input
                v-model="inputTSForm.donViMua"
                type="text"
                class="form-control"
                id="exampleInputPriceWay"
                required
              />
            </div>

            <div class="mb-3 w-25">
              <label for="exampleInputTax" class="form-label">Mã số thuế</label>
              <input
                v-model="inputTSForm.maSoThue"
                type="text"
                class="form-control"
                id="exampleInputTax"
                required
              />
            </div>
            <div class="mb-3 w-25">
              <label for="exampleInputAddress" class="form-label"
                >Địa chỉ</label
              >
              <input
                v-model="inputTSForm.diaChi"
                type="text"
                class="form-control"
                id="exampleInputAddress"
                required
              />
            </div>
          </div>
          <div class="d-flex">
            <div class="mb-3 w-50">
              <label for="exampleInputWay" class="form-label"
                >Hình thức thanh toán</label
              >
              <input
                v-model="inputTSForm.hinhThucThanhToan"
                type="text"
                class="form-control"
                id="exampleInputWay"
                required
              />
            </div>

            <div class="mb-3 w-50">
              <label for="exampleInputUnit" class="form-label"
                >Đơn vị tiền tệ</label
              >
              <input
                v-model="inputTSForm.donViTienTe"
                type="text"
                class="form-control"
                id="exampleInputUnit"
                required
              />
            </div>
          </div>
          <div class="text-end">
            <div class="fw-bold">
              Thành tiền = Số lượng x Đơn giá =
              {{
                inputTSForm.thanhTien.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
            <div class="fw-bold">
              Thuế = 5% x Thành tiền =
              {{
                inputTSForm.tienThue.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              }}
            </div>
            <div class="fw-bold">
              Tổng tiền thanh toán = Thuế + Thành tiền =
              <span class="text-danger">
                {{
                  inputTSForm.tienThanhToan.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </span>
            </div>
          </div>
        </div>
        <button v-if="choosenTS == -1" type="submit" class="btn btn-primary">
          Thêm tài sản
        </button>
        <button v-else type="submit" class="btn btn-primary mt-3">
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
import dvbhServices from "@/services/dvbh.services";
import ltsServices from "@/services/lts.services";
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
const choosenTS = ref(-1);

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
    ngayNhap: "",
    hsd: "",
    soluong: 0,
    soLo: "",
    donGia: 0,
    donViTinh: "",
    hinhAnh: "",
    idLoaiTaiSan: 0,
    idPhongBan: 0,
  },
]);
const dvbhs = ref([
  {
    id: 0,
    ten: "",
    maSoThue: "",
    diaChi: "",
    sdt: "",
    email: "",
    taiKhoan: "",
  },
]);
const lts = ref([
  {
    id: 0,
    ten: "",
  },
]);
const inputTSForm = ref({
  ten: "",
  ngayNhap: "",
  hsd: "",
  soluong: 0,
  soLo: "",
  donGia: 0,
  donViTinh: "",
  hinhAnh: "",
  idDonViBanHang: 0,
  idLoaiTaiSan: 0,
  donViMua: "",
  maSoThue: "",
  diaChi: "",
  thanhTien: 0,
  tienThue: 0,
  tienThanhToan: 0,
  hinhThucThanhToan: "",
  donViTienTe: "",
  idPhongBan: 0,
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

function calculatePrice() {
  inputTSForm.value.thanhTien =
    inputTSForm.value.donGia * inputTSForm.value.soluong;
  inputTSForm.value.tienThue = inputTSForm.value.thanhTien * 0.05;
  inputTSForm.value.tienThanhToan =
    inputTSForm.value.thanhTien + inputTSForm.value.tienThue;
}

function changeChoosen(index: number) {
  if (choosenTS.value == -1) {
    inputTSForm.value.ten = "";
    inputTSForm.value.ngayNhap = "";
    inputTSForm.value.hsd = "";
    inputTSForm.value.soluong = 0;
    inputTSForm.value.soLo = "";
    inputTSForm.value.donGia = 0;
    inputTSForm.value.donViTinh = "";
    inputTSForm.value.hinhAnh = "";
    inputTSForm.value.idLoaiTaiSan = 0;
    inputTSForm.value.idPhongBan = 0;
  } else {
    inputTSForm.value.ten = tss.value[index].ten;
    inputTSForm.value.ngayNhap = tss.value[index].ngayNhap;
    inputTSForm.value.hsd = tss.value[index].hsd;
    inputTSForm.value.soluong = tss.value[index].soluong;
    inputTSForm.value.soLo = tss.value[index].soLo;
    inputTSForm.value.donGia = tss.value[index].donGia;
    inputTSForm.value.donViTinh = tss.value[index].donViTinh;
    inputTSForm.value.hinhAnh = tss.value[index].hinhAnh;
    inputTSForm.value.idLoaiTaiSan = tss.value[index].idLoaiTaiSan;
    inputTSForm.value.idPhongBan = tss.value[index].idPhongBan;
  }
}

var onAddingTS = async (e: any) => {
  e.preventDefault();
  try {
    if (choosenTS.value == -1) await tsServices.create(inputTSForm.value);
    else
      await tsServices.update({
        id: tss.value[choosenTS.value].id,
        ten: inputTSForm.value.ten,
        ngayNhap: inputTSForm.value.ngayNhap.toString().slice(0, 10),
        hsd: inputTSForm.value.hsd.toString().slice(0, 10),
        soluong: inputTSForm.value.soluong,
        soLo: inputTSForm.value.soLo,
        donGia: inputTSForm.value.donGia,
        donViTinh: inputTSForm.value.donViTinh,
        hinhAnh: inputTSForm.value.hinhAnh,
        idLoaiTaiSan: inputTSForm.value.idLoaiTaiSan,
        idPhongBan: inputTSForm.value.idPhongBan,
      });
    console.log(inputTSForm.value);
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

    let resp2 = await dvbhServices.getAll();
    dvbhs.value = resp2.data.dvbh;

    let resp3 = await ltsServices.getAll();
    lts.value = resp3.data.lts;

    inputTSForm.value.donViMua = "Bệnh Viện Đa Khoa Tỉnh Sóc Trăng";
    inputTSForm.value.maSoThue = "2200176300";
    inputTSForm.value.diaChi =
      "378 đường Lê Duẩn, Phường 9, TP. Sóc Trăng, T. Sóc Trăng";
    inputTSForm.value.hinhThucThanhToan = "TM/CK";
    inputTSForm.value.donViTienTe = "VND";
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
