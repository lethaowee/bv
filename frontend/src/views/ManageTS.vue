<template>
  <HeaderComponent></HeaderComponent>
  <div
    class="d-flex"
    style="margin: 0; background-color: white; min-height: 60vh"
  >
    <nav id="sidebarMenu" style="z-index: 0" class="bg-white sticky-top">
      <div class="position-sticky">
        <div ref="fragment" class="list-group list-group-flush mx-3 mt-4">
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple active"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#post"
            aria-controls="post"
          >
            <i class="fa-solid fa-newspaper fa-fw me-3"></i>
            <span>Đơn vị bán hàng</span>
          </a>

          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#users"
            aria-controls="users"
          >
            <i class="fa-solid fa-users fa-fw me-3"></i>
            <span>Người dùng</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#contentSource"
            aria-controls="contentSource"
          >
            <i class="fa-solid fa-people-group fa-fw me-3"></i>
            <span>Phiếu nhập</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#eventLog"
            aria-controls="eventLog"
          >
            <i class="fa-solid fa-calendar-days fa-fw me-3"></i>
            <span>Phiếu xuất</span>
          </a>
          <!-- @click="printFragment()" -->
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#generatePost"
            aria-controls="generatePost"
          >
            <i class="fa-solid fa-gears fa-fw me-3"></i>
            <span>Phiếu sửa </span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#-tab"
            aria-controls="-tab"
          >
            <i class="fa-solid fa-comments me-3"></i>
            <span>Thiết bị thay thế</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#feedback-tab"
            aria-controls="feedback-tab"
          >
            <i class="fa-solid fa-comments me-3"></i>
            <span>Phòng ban</span>
          </a>
        </div>
      </div>
    </nav>

    <div class="tab-content" id="v-pills-tabContent">
      <div
        class="tab-pane fade show active mt-4"
        id="post"
        role="tabpanel"
        aria-labelledby="post-tab"
        style="width: 80vw"
      >
        <div>
          <div class="container mt-4 px-2">
            <h5 class="mb-2 d-flex justify-content-between align-items-center">
              Thông tin các đơn vị
            </h5>
            <hr />
            <div class="position-relative">
              <span class="position-absolute search"
                ><i class="fa fa-search"></i
              ></span>
              <input
                v-model="search"
                class="form-control form-control-special w-100"
                placeholder="Tìm kiếm bằng tên bài viết"
              />
            </div>
            <button
              class="btn btn-light w-100"
              data-bs-toggle="modal"
              data-bs-target="#addContentSourceModal"
            >
              Thêm
            </button>
            <div class="table-responsive">
              <table class="table table-responsive">
                <thead>
                  <tr class="bg-light">
                    <th scope="col">ID</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Mã số thuế</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số tài khoản</th>
                    <th scope="col" class="text-end" width="10%">
                      <span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dvbh in VisibleDVBH()" :key="dvbh.id">
                    <td>{{ dvbh.id }}</td>
                    <td>{{ dvbh.ten }}</td>
                    <td>{{ dvbh.maSoThue }}</td>
                    <td>{{ dvbh.diaChi }}</td>
                    <td>{{ dvbh.sdt }}</td>
                    <td>{{ dvbh.email }}</td>
                    <td>{{ dvbh.taiKhoan }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center">
                <button
                  @click="dvbhVisibles += steps"
                  v-if="dvbhVisibles < posts.length && search == ''"
                  class="btn moreUser"
                  style="
                    border-radius: 50px;
                    border: 2px solid black;
                    margin-left: 10px;
                  "
                >
                  Xem thêm >>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="users"
        role="tabpanel"
        aria-labelledby="users-tab"
        style="width: 80vw"
      >
        <div>
          <div class="container mt-4 px-2">
            <h5 class="mb-2 d-flex justify-content-between align-items-center">
              Thông tin tất cả người dùng của hệ thống
            </h5>
            <hr />
            <div class="position-relative">
              <span class="position-absolute search"
                ><i class="fa fa-search"></i
              ></span>
              <input
                v-model="searchUser"
                class="form-control form-control-special w-100"
                placeholder="Tìm kiếm bằng tên người dùng"
              />
            </div>
            <div class="table-responsive">
              <table class="table table-responsive">
                <thead>
                  <tr class="bg-light">
                    <th scope="col">Mã nhân viên</th>
                    <th scope="col">Tài khoản</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Mã phòng ban</th>
                    <th scope="col">Chức vụ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in VisibleUser()" :key="user.id">
                    <td scope="row">{{ user.maNhanVien }}</td>
                    <td scope="row">{{ user.taiKhoan }}</td>
                    <td>{{ user.hoTen }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.sdt }}</td>
                    <td>{{ user.vaiTro }}</td>
                    <td>{{ user.idPhongBan }}</td>
                    <td>{{ user.chucVu }}</td>
                    <td class="text-end d-flex"></td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center">
                <button
                  @click="userVisibles += stepsUser"
                  v-if="userVisibles < users.length && searchUser == ''"
                  class="btn moreUser"
                  style="border-radius: 50px; border: 2px solid black"
                >
                  Xem thêm >>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="contentSource"
        role="tabpanel"
        aria-labelledby="contentSource-tab"
        style="width: 80vw"
      >
        <div>
          <div class="container mt-5 px-2">
            <h5 class="mb-2 d-flex justify-content-between align-items-center">
              Thông tin tất cả phiếu nhập
            </h5>
            <hr />
            <div class="position-relative">
              <span class="position-absolute search"
                ><i class="fa fa-search"></i
              ></span>
              <input
                v-model="searchContentSource"
                class="form-control form-control-special w-100"
                placeholder="Tìm kiếm bằng tên nguồn"
              />
            </div>
            <div class="table-responsive">
              <button
                class="btn btn-light w-100"
                data-bs-toggle="modal"
                data-bs-target="#addContentSourceModal"
              >
                Thêm
              </button>
              <table class="table table-responsive">
                <thead>
                  <tr class="bg-light">
                    <th scope="col" width="1%">ID</th>
                    <th scope="col" width="10%">Ngày tạo</th>
                    <th scope="col" width="69%">Tên</th>
                    <th scope="col" class="text-end" width="30%">
                      <span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(cs, index) in VisibleContentSource()"
                    :key="cs.id"
                  >
                    <td>{{ cs.id }}</td>
                    <td>{{ cs.createdAt.slice(0, 10) }}</td>
                    <td class="align-items-center">
                      <img
                        style="border-radius: 50%; margin-right: 10px"
                        v-if="cs.avatar != null"
                        :src="
                          'http://localhost:8080' +
                          cs.avatar.replace('files', '')
                        "
                        width="25px"
                        height="25px"
                      />{{ cs.name }}
                    </td>
                    <td class="text-end d-flex">
                      <button
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#updateContentSourceModal"
                        style="margin-right: 5px"
                        @click="
                          choosenContentSourceId = cs.id;
                          choosenContentSourceIndex = index;
                          newContentSourceName = cs.name;
                        "
                      >
                        Cập nhật
                      </button>

                      <button
                        class="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteContentSourceModal"
                        @click="
                          choosenContentSourceId = cs.id;
                          choosenContentSourceIndex = index;
                        "
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center">
                <button
                  @click="contentSourceVisibles += stepsContentSource"
                  v-if="
                    contentSourceVisibles < contentSources.length &&
                    searchContentSource == ''
                  "
                  class="btn moreUser"
                  style="border-radius: 50px; border: 2px solid black"
                >
                  Xem thêm >>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="eventLog"
        role="tabpanel"
        aria-labelledby="eventLog-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <div v-if="eventLogs[0].id != 0">
          <div>
            <h5>Danh sách hoạt động của toàn hệ thống</h5>
            <table class="table table-borderless">
              <thead>
                <tr class="bg-light">
                  <th scope="col">Ngày</th>
                  <th scope="col">Người thực hiện</th>
                  <th scope="col">Hành động</th>
                  <th scope="col">Tên bài viết</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="el in VisibleEL()" :key="el.id">
                  <td>{{ el.createdAt.slice(0, 10) }}</td>
                  <td>
                    <img
                      style="border-radius: 50%; margin-right: 10px"
                      v-if="el.actor.avatar != null"
                      :src="
                        'http://localhost:8080' +
                        el.actor.avatar.replace('files', '')
                      "
                      width="30px"
                      height="30px"
                      alt=""
                    />
                    {{ el.actor.fullName }}
                  </td>
                  <td v-if="el.action == 'create'">Tạo</td>
                  <td v-if="el.action == 'comment'">Bình luận</td>
                  <td v-if="el.action == 'share'">Chia sẻ</td>
                  <td>
                    <a
                      v-if="el.post != null"
                      :href="'http://localhost:5173/post/' + el.post.id"
                      >{{ el.post.title }}</a
                    >
                    <a v-else>Bài viết không tồn tại</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center">
              <button
                @click="elVisibles += stepEl"
                v-if="elVisibles < eventLogs.length"
                class="btn moreUser"
                style="border-radius: 50px; border: 2px solid black"
              >
                Xem thêm >>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="generatePost"
        role="tabpanel"
        aria-labelledby="generatePost-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <GenerateFormComponent></GenerateFormComponent>
      </div>

      <div
        class="tab-pane fade"
        id="feedback-tab"
        role="tabpanel"
        aria-labelledby="feedback-tab-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <h5>Các phòng ban trong hệ thống</h5>
        <button
          class="btn btn-light w-100"
          data-bs-toggle="modal"
          data-bs-target="#addContentSourceModal"
        >
          Thêm
        </button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pb in pbs" :key="pb.id">
              <th scope="row">{{ pb.id }}</th>
              <td>{{ pb.tenPhongBan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      id="modalUpdateUser"
      class="modal fade"
      tabindex="-8"
      aria-labelledby="editUserModelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div id="d-flex flex-column">
              <h5>
                Cập nhật vai trò của tài khoản
                {{ users[chooseUserIndex].username }}
              </h5>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-check">
              <input
                value="admin"
                v-model="chooseRole"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioAdmin"
              />
              <label class="form-check-label" for="flexRadioAdmin">
                Quản trị viên
              </label>
            </div>
            <div class="form-check">
              <input
                value="member"
                v-model="chooseRole"
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioMember"
                checked
              />
              <label class="form-check-label" for="flexRadioMember">
                Thành viên
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="updateUser()">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="confirmDeleteCategoryModal"
    tabindex="-1"
    aria-labelledby="confirmDeleteCategoryModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteCategoryModelLabal">
            Bạn có chắc chắn muốn xóa thể loại này (tất cả bài viết thuộc thể
            loại sẽ bị xóa)
          </h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteCategory()"
          >
            Xóa
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="updateCategoryModal"
    tabindex="-1"
    aria-labelledby="udpateCategoryModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Chỉnh sửa thể loại</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="newCategoryName"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="updateCategory"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal add tag -->
  <div
    class="modal fade"
    id="addTag"
    tabindex="-1"
    aria-labelledby="addTagLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm nhãn dán</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="newTagName"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="addTag"
          >
            Thêm
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal add category -->
  <div
    class="modal fade"
    id="addCategory"
    tabindex="-1"
    aria-labelledby="addCategoryLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm thể loại</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="addCategoryName"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="addCategory"
          >
            Thêm
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm delete category -->
  <div
    class="modal fade"
    id="confirmDeleteContentSourceModal"
    tabindex="-1"
    aria-labelledby="confirmDeleteContentSourceModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteContentSourceModelLabal">
            Bạn có chắc chắn muốn xóa nguồn này (tất cả bài viết thuộc người
            dùng này sẽ bị xóa)
          </h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteContentSource()"
          >
            Xóa
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- update content source modal -->
  <div
    class="modal fade"
    id="updateContentSourceModal"
    tabindex="-1"
    aria-labelledby="udpateContentSourceModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Chỉnh sửa nguồn</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="newContentSourceName"
            required
          />
          <input
            type="file"
            @change="previewFile($event)"
            class="form-control"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="updateContentSource"
          >
            Cập nhật
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- add content source modal -->
  <div
    class="modal fade"
    id="addContentSourceModal"
    tabindex="-1"
    aria-labelledby="addContentSourceModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm nguồn</h5>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="addContentSourceName"
            required
          />
          <input
            type="file"
            @change="previewFileAdd($event)"
            class="form-control"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="addContentSource"
          >
            Thêm
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- reject post -->
  <div
    class="modal fade"
    id="rejectPostModal"
    tabindex="-1"
    aria-labelledby="rejectPostModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rejectPostModalLabel">
            Bạn có chắc chắn muốn từ chối bài viết này?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label for="reason">Lý do:</label>
          <input
            name="reason"
            type="text"
            v-model="messageReject"
            class="form-control"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="rejectPost()"
          >
            Từ chối
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { ref, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
const cookies = useCookies();
import checkLogin from "@/utilities/utilities";
import { useRouter } from "vue-router";
import ndServices from "@/services/nd.services";
import pbServices from "@/services/pb.services";
import tsServices from "@/services/ts.services";
import ptsServices from "@/services/pts.services";
import tbttServices from "@/services/tbtt.services";
import dvbhServices from "@/services/dvbh.services";

const router = useRouter();

const pns = ref([
  {
    id: 0,
    loaiPhieu: "",
    idTaiSan: 0,
    idPhongBan: 0,
    idPhongBanXuat: null,
  },
]);
const pxs = ref([
  {
    id: 0,
    loaiPhieu: "",
    idTaiSan: 0,
    idPhongBan: 0,
    idPhongBanXuat: null,
  },
]);
const pss = ref([
  {
    id: 0,
    loaiPhieu: "",
    idTaiSan: 0,
    idPhongBan: 0,
    idPhongBanXuat: null,
  },
]);
const pbs = ref([
  {
    id: 0,
    tenPhongBan: "",
  },
]);
const tbtt = ref([]);
const nds = ref([
  {
    id: 0,
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: null,
    avatar: null,
    vaiTro: "",
    idPhongBan: 0,
    maNhanVien: "",
    chucVu: "",
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
const chooseUserIndex = ref(0);
const chooseRole = ref("");

const users = ref([
  {
    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    fullName: "",
    about: "",
    youtubeLink: "",
    facebookLink: "",
    linkedinLink: "",
    twitterLink: "",
    totalFollower: 0,
    totalFollowee: 0,
    refreshToken: null,
    phoneNumber: "",
    birthday: "",
    avatar: "",
    role: "",
  },
]);

const posts = ref([
  {
    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    title: "",
    content: "",
    sharePostId: null,
    originalPostURL: "",
    publishDate: "",
    imageURL: "",
    status: "",
    type: "",
    readTime: 0,
    totalLike: 0,
    totalDislike: 0,
    totalShare: 0,
    categoryId: 0,
    createdById: 0,
    contentSourceId: 0,
    createdBy: {
      id: 0,
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      fullName: "",
      about: "",
      youtubeLink: "",
      facebookLink: "",
      linkedinLink: "",
      twitterLink: "",
      totalFollower: 0,
      totalFollowee: 0,
      refreshToken: null,
      phoneNumber: "",
      birthday: "",
      avatar: "",
      role: "",
    },
  },
]);

var dvbhVisibles = ref(3);
var steps = ref(3);

var userVisibles = ref(10);
var stepsUser = ref(10);

var contentSourceVisibles = ref(10);
var stepsContentSource = ref(10);

const contentSources = ref([
  {
    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    name: "",
    avatar: "",
    posts: [{}],
  },
]);

function VisibleDVBH() {
  if (search.value != "") {
    return dvbhs.value.filter((p) => {
      return p.ten.toLowerCase().indexOf(search.value.toLowerCase()) != -1;
    });
  } else {
    return dvbhs.value.slice(0, dvbhVisibles.value);
  }
}

function VisibleUser() {
  if (searchUser.value != "") {
    return nds.value.filter((u) => {
      return (
        u.hoTen.toLowerCase().indexOf(searchUser.value.toLowerCase()) != -1
      );
    });
  } else {
    return nds.value.slice(0, userVisibles.value);
  }
}

function VisibleContentSource() {
  if (searchContentSource.value != "") {
    return contentSources.value.filter((cs) => {
      return (
        cs.name
          .toLowerCase()
          .indexOf(searchContentSource.value.toLowerCase()) != -1
      );
    });
  } else {
    return contentSources.value.slice(0, contentSourceVisibles.value);
  }
}

var elVisibles = ref(20);
var stepEl = ref(10);

function VisibleEL() {
  return eventLogs.value.slice(0, elVisibles.value);
}

const search = ref("");
const searchUser = ref("");
const searchContentSource = ref("");

const tags = ref([
  {
    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    name: "",
    categoryId: 0,
    createdById: 0,
    posts: [],
  },
]);

const categories = ref([
  {
    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    name: "",
    imageURL: "",
  },
]);

const eventLogs = ref([
  {
    id: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    action: "",
    actorId: 0,
    postId: 0,
    note: null,
    actor: {
      id: 0,
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      fullName: "",
      about: "",
      youtubeLink: "",
      facebookLink: "",
      linkedinLink: "",
      twitterLink: "",
      totalFollower: 0,
      totalFollowee: 0,
      refreshToken: null,
      phoneNumber: "",
      birthday: "",
      avatar: "",
      role: "",
    },
    post: {
      id: 0,
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      title: "",
      content: "",
      sharePostId: null,
      originalPostURL: null,
      publishDate: "",
      imageURL: "",
      status: "",
      type: "",
      readTime: 0,
      totalLike: 0,
      totalDislike: 0,
      totalShare: 0,
      categoryId: 0,
      createdById: 0,
      contentSourceId: null,
    },
  },
]);

const fragment = ref(null as HTMLElement | null);
// const printFragment = computed(() =>frame.value.print(fragment.value))
const choosenContentSourceId = ref(0);
const choosenContentSourceIndex = ref(0);

async function deleteContentSource() {
  try {
    contentSources.value.splice(choosenContentSourceIndex.value, 1);
  } catch (error) {
    console.log(error);
  }
}

const newTagName = ref("");

async function addTag() {
  try {
    tags.value.push();
  } catch (error) {
    console.log(error);
  }
}

const addCategoryName = ref("");

async function addCategory() {
  try {
    categories.value.push();
  } catch (error) {
    console.log(error);
  }
}

async function updateUser() {
  try {
    users.value[chooseUserIndex.value].role = chooseRole.value;
  } catch (error) {
    console.log(error);
  }
}

const choosenCategoryIndex = ref(0);

async function deleteCategory() {
  try {
    categories.value.splice(choosenCategoryIndex.value, 1);
  } catch (error) {
    console.log(error);
  }
}

const newCategoryName = ref("");

async function updateCategory() {
  try {
    categories.value[choosenCategoryIndex.value].name = newCategoryName.value;
  } catch (error) {
    console.log(error);
  }
}

function previewFile(e: any) {
  fileImage.value = e.target.files[0];
}
const fileImage = ref({});

const newContentSourceName = ref("");

async function updateContentSource() {
  try {
    contentSources.value[choosenContentSourceIndex.value].name =
      newContentSourceName.value;
  } catch (error) {
    console.log(error);
  }
}

function previewFileAdd(e: any) {
  fileImageAdd.value = e.target.files[0];
}
const fileImageAdd = ref({});

const addContentSourceName = ref("");

async function addContentSource() {
  try {
    contentSources.value.push();
  } catch (error) {
    console.log(error);
  }
}

const messageReject = ref("");
async function rejectPost() {
  try {
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  try {
    if (!checkLogin()) router.push({ name: "home" });

    let respNd = await ndServices.getAll();
    nds.value = respNd.data.nd;

    let respPb = await pbServices.getAll();
    pbs.value = respPb.data.pb;

    let respDvbh = await dvbhServices.getAll();
    dvbhs.value = respDvbh.data.dvbh;

    let respTs = await tsServices.getAll();
    tss.value = respTs.data.ts;

    let respPts = await ptsServices.getAll();
    pns.value = respPts.data.pts;
    pxs.value = respPts.data.pts;

    let respTbtt = await tbttServices.getAll();
    tbtt.value = respTbtt.data.tbtt;

    // eventlog
  } catch (err) {
    console.log(err);
  }
});
</script>

<style>
.text-gray-300 {
  color: #e0e0e0;
}

.moreUser:hover {
  color: white;
  background-color: black;
}

.search {
  top: 6px;
  left: 10px;
}

.form-control-special {
  border: none;
  padding-left: 32px;
}

.form-control-special:focus {
  border: none;
  box-shadow: none;
}

.green {
  color: green;
}

.userNameLink {
  text-decoration: none;
}

.userNameLink:hover {
  text-decoration: underline;
}
</style>
