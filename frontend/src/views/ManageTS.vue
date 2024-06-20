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
            <i class="fa-solid fa-building fa-fw me-3"></i>
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
            <i class="fa-solid fa-indent fa-fw me-3"></i>
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
            <i class="fa-solid fa-outdent fa-fw me-3"></i>
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
                placeholder="Tìm kiếm bằng tên đơn vị"
              />
            </div>
            <button
              class="btn btn-light w-100"
              data-bs-toggle="modal"
              data-bs-target="#addDVBH"
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
                  <tr v-for="(dvbh, index) in VisibleDVBH()" :key="dvbh.id">
                    <td>{{ dvbh.id }}</td>
                    <td>{{ dvbh.ten }}</td>
                    <td>{{ dvbh.maSoThue }}</td>
                    <td>{{ dvbh.diaChi }}</td>
                    <td>{{ dvbh.sdt }}</td>
                    <td>{{ dvbh.email }}</td>
                    <td>{{ dvbh.taiKhoan }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteDVBH"
                        @click="
                          choosenDVBH = dvbh.id;
                          choosenIndexDVBH = index;
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
                  @click="dvbhVisibles += steps"
                  v-if="dvbhVisibles < dvbhs.length && search == ''"
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
                  v-if="userVisibles < nds.length && searchUser == ''"
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
            <div class="table-responsive">
              <table class="table table-responsive">
                <thead>
                  <tr class="bg-light">
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">ID</th>
                    <th scope="col">ID tài sản</th>
                    <th scope="col">ID đơn vị bán</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Thuế</th>
                    <th scope="col">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pn in pns">
                    <td>{{ pn.ngayTao.slice(0, 10) }}</td>
                    <td>{{ pn.id }}</td>
                    <td>{{ pn.idTaiSan }}</td>
                    <td>{{ pn.idDonViBanHang }}</td>
                    <td>{{ pn.soLuong }}</td>
                    <td>
                      {{
                        pn.donGia.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      }}
                    </td>
                    <td>
                      {{
                        pn.tienThue.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      }}
                    </td>
                    <td>
                      {{
                        pn.tienThanhToan.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      }}
                    </td>

                    <!-- <td class="text-end d-flex">
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
                    </td> -->
                  </tr>
                </tbody>
              </table>

              <div class="text-center">
                <button
                  @click="pnVisibles += stepsPn"
                  v-if="
                    pnVisibles < contentSources.length && searchPhieuNhap == ''
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
      ></div>

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
          data-bs-target="#addPBModal"
        >
          Thêm
        </button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" class="w-75">Tên</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pb, index) in pbs" :key="pb.id">
              <th scope="row">{{ pb.id }}</th>
              <td>{{ pb.tenPhongBan }}</td>
              <td>
                <button
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeletePB"
                  @click="
                    choosenPB = pb.id;
                    choosenIndexPB = index;
                  "
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
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
    id="confirmDeleteDVBH"
    tabindex="-1"
    aria-labelledby="confirmDeleteDVBHModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteDVBHModelLabal">
            Bạn có chắc chắn muốn xóa đơn vị này?
          </h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteDVBH()"
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
    id="confirmDeletePB"
    tabindex="-1"
    aria-labelledby="confirmDeletePBModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeletePBModelLabal">
            Bạn có chắc chắn muốn xóa phòng ban này?
          </h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deletePB()"
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
            @click="addDVBH"
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

  <div
    class="modal fade"
    id="addPBModal"
    tabindex="-1"
    aria-labelledby="addPBModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm phòng ban</h5>
        </div>
        <div class="modal-body">
          <label for="inputAddPb">Tên phòng ban</label>
          <input
            id="inputAddPb"
            type="text"
            class="form-control"
            v-model="tenPB"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="addPB"
          >
            > Thêm
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
    id="addDVBH"
    tabindex="-1"
    aria-labelledby="addDVBHModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm đơn vị bán hàng</h5>
        </div>
        <div class="modal-body">
          <label for="inputNameDVBH">Tên đơn vị bán hàng</label>
          <input
            v-model="dvbhForm.ten"
            id="inputNameDVBH"
            type="text"
            class="form-control"
            required
          />

          <label for="inputNameMST">Mã số thuế</label>
          <input
            v-model="dvbhForm.maSoThue"
            id="inputNameMST"
            type="text"
            class="form-control"
            required
          />

          <label for="inputNameDiaChiDonVi">Địa chỉ</label>
          <input
            v-model="dvbhForm.diaChi"
            id="inputNameDiaChiDonVi"
            type="text"
            class="form-control"
            required
          />

          <label for="inputNameSDTDonVi">SDT</label>
          <input
            v-model="dvbhForm.sdt"
            id="inputNameSDTDonVi"
            type="text"
            class="form-control"
            required
          />

          <label for="inputNameEmailDonVi">Email</label>
          <input
            v-model="dvbhForm.email"
            id="inputNameEmailDonVi"
            type="text"
            class="form-control"
            required
          />

          <label for="inputNameSTKDonVi">Số tài khoản</label>
          <input
            v-model="dvbhForm.taiKhoan"
            id="inputNameSTKDonVi"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="addDVBH"
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
import tbttServices from "@/services/tbtt.services";
import dvbhServices from "@/services/dvbh.services";
import pnServices from "@/services/pn.services";
import Swal from "sweetalert2";
import ltsServices from "@/services/lts.services";

const router = useRouter();

const pns = ref([
  {
    id: 0,
    idTaiSan: 0,
    idDonViBanHang: 0,
    donViMua: "",
    maSoThue: "",
    diaChi: "",
    soLuong: 0,
    donGia: 0,
    thanhTien: 0,
    tienThue: 0,
    tienThanhToan: 0,
    hinhThucThanhToan: "",
    donViTienTe: "",
    ngayTao: "",
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

const tenPB = ref("");
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
const newLTS = ref("");
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
const choosenDVBH = ref(0);
const choosenIndexDVBH = ref(0);

const choosenPB = ref(0);
const choosenIndexPB = ref(0);
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
const dvbhForm = ref({
  ten: "",
  maSoThue: "",
  diaChi: "",
  sdt: "",
  email: "",
  taiKhoan: "",
});
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

var dvbhVisibles = ref(3);
var steps = ref(3);

var userVisibles = ref(10);
var stepsUser = ref(10);

var pnVisibles = ref(10);
var stepsPn = ref(10);

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

// function VisiblePhieuNhap() {
//   if (searchPhieuNhap.value != "") {
//     return pns.value.filter((cs) => {
//       return (
//         cs.name.toLowerCase().indexOf(searchPhieuNhap.value.toLowerCase()) != -1
//       );
//     });
//   } else {
//     return pns.value.slice(0, pnVisibles.value);
//   }
// }

const search = ref("");
const searchUser = ref("");
const searchPhieuNhap = ref("");

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

const fragment = ref(null as HTMLElement | null);
// const printFragment = computed(() =>frame.value.print(fragment.value))
const choosenContentSourceIndex = ref(0);

async function deletePB() {
  try {
    await pbServices.delete(choosenPB.value);
    pbs.value.splice(choosenIndexPB.value, 1);

    Swal.fire({
      title: "Thành công!",
      text: "Xóa phòng ban thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteDVBH() {
  try {
    await dvbhServices.delete(choosenDVBH.value);
    dvbhs.value.splice(choosenIndexDVBH.value, 1);

    Swal.fire({
      title: "Thành công!",
      text: "Xóa đơn vị thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });
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

async function addPB() {
  try {
    await pbServices.create(tenPB.value);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function addDVBH() {
  try {
    await dvbhServices.create(dvbhForm.value);
    window.location.reload();
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

    let respTbtt = await tbttServices.getAll();
    tbtt.value = respTbtt.data.tbtt;

    let respPn = await pnServices.getAll();
    pns.value = respPn.data.pn;

    let respLTS = await ltsServices.getAll();
    lts.value = respLTS.data.lts;
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
