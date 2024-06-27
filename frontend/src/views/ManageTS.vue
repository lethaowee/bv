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
            data-bs-target="#fixedItem"
            aria-controls="fixedItem"
          >
            <i class="fa-solid fa-gears fa-fw me-3"></i>
            <span>Phiếu sửa </span>
          </a>

          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#feedback-tab"
            aria-controls="feedback-tab"
          >
            <i class="fa-solid fa-hospital me-3"></i>
            <span>Phòng ban</span>
          </a>

          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#taisan-tab"
            aria-controls="taisan-tab"
          >
            <i class="fa-solid fa-desktop me-3"></i>
            <span>Tài sản</span>
          </a>

          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#loaitaisan-tab"
            aria-controls="loaitaisan-tab"
          >
            <i class="fa-solid fa-sitemap me-3"></i>
            <span>Loại tài sản</span>
          </a>

          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="false"
            data-bs-toggle="tab"
            data-bs-target="#tbtt-tab"
            aria-controls="tbtt-tab"
          >
            <i class="fa-solid fa-microchip me-3"></i>
            <span>Thiết bị thay thế</span>
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
                  v-if="pnVisibles < pns.length && searchPhieuNhap == ''"
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
        id="fixedItem"
        role="tabpanel"
        aria-labelledby="fixedItem-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <h5>Các phiếu sửa</h5>
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
              <th scope="col">Ngày tạo</th>
              <th scope="col">ID</th>
              <th scope="col">ID tài sản</th>
              <th scope="col">ID phòng ban</th>

              <th scope="col">Tình trạng</th>
              <th scope="col">Đã sửa</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pb, index) in pss" :key="pb.id">
              <th scope="row">{{ pb.ngayTao.slice(0, 10) }}</th>
              <td>{{ pb.id }}</td>
              <td>{{ pb.idTaiSan }}</td>
              <td>{{ pb.idPhongBan }}</td>
              <td>{{ pb.tinhTrang }}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    @change="updatePs(index)"
                    v-model="pb.daSua"
                    :true-value="1"
                    :false-value="0"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </td>
              <td>
                <button
                  class="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#updatePSModal"
                  style="margin-right: 5px"
                  @click="
                    getAllCurrentTbtt(pb.id);
                    choosenPSTBTT = pb.id;
                  "
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
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

      <div
        class="tab-pane fade"
        id="taisan-tab"
        role="tabpanel"
        aria-labelledby="taisan-tab-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <h5>Các tài sản trong hệ thống</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ngày nhập</th>
              <th scope="col">Tên</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Đơn giá</th>
              <th scope="col">ID loại tài sản</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ts, index) in tss" :key="ts.id">
              <th scope="row">{{ ts.id }}</th>
              <td>{{ ts.ngayNhap.slice(0, 10) }}</td>
              <td>{{ ts.ten }}</td>
              <td>{{ ts.soluong }}</td>
              <td>
                {{
                  ts.donGia.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                }}
              </td>
              <td>{{ ts.idLoaiTaiSan }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="tab-pane fade"
        id="loaitaisan-tab"
        role="tabpanel"
        aria-labelledby="loaitaisan-tab-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <h5>Các loại tài sản trong hệ thống</h5>
        <button
          class="btn btn-light w-100"
          data-bs-toggle="modal"
          data-bs-target="#addLTSModal"
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
            <tr v-for="(ts, index) in lts" :key="ts.id">
              <th scope="row">{{ ts.id }}</th>
              <td>{{ ts.ten }}</td>
              <td>
                <button
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteLTS"
                  @click="
                    choosenLTS = ts.id;
                    choosenIndexLTS = index;
                  "
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="tab-pane fade"
        id="tbtt-tab"
        role="tabpanel"
        aria-labelledby="tbtt-tab-tab"
        style="width: 80vw; margin-top: 30px"
      >
        <h5>Các thiết bị thay thế trong hệ thống</h5>
        <button
          class="btn btn-light w-100"
          data-bs-toggle="modal"
          data-bs-target="#addTBTTModal"
        >
          Thêm
        </button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" class="w-75">Tên</th>
              <th scope="col">Số lượng</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tbtt, index) in tbtts" :key="tbtt.id">
              <th scope="row">{{ tbtt.id }}</th>
              <td>{{ tbtt.ten }}</td>
              <td>{{ tbtt.soLuong }}</td>
              <td>
                <button
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteTBTT"
                  @click="
                    choosenTBTT = tbtt.id;
                    choosenIndexTBTT = index;
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
      id="updatePSModal"
      class="modal fade"
      tabindex="-8"
      aria-labelledby="updatePSModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div id="d-flex flex-column">
              <h5>
                Thêm thiết bị thay thế
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
            <div class="form-check" v-for="tbtt in tbtts">
              <input
                v-model="checkedTBTTId"
                class="form-check-input"
                type="checkbox"
                :value="tbtt.id"
                :id="'flexCheckDefault' + tbtt.id"
              />
              <label
                class="form-check-label"
                :for="'flexCheckDefault' + tbtt.id"
              >
                {{ tbtt.ten }}
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="addPSTbtt()">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

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
    id="confirmDeleteTBTT"
    tabindex="-1"
    aria-labelledby="confirmDeleteTBTTModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteTBTTModelLabal">
            Bạn có chắc chắn muốn xóa thiết bị thay thế này?
          </h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteTBTT()"
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

  <div
    class="modal fade"
    id="confirmDeleteLTS"
    tabindex="-1"
    aria-labelledby="confirmDeleteLTSModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmDeleteLTSModelLabal">
            Bạn có chắc chắn muốn xóa loại tài sản này?
          </h5>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteLTS()"
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
    id="addTBTTModal"
    tabindex="-1"
    aria-labelledby="addTBTTModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm thiết bị thay thế</h5>
        </div>
        <div class="modal-body">
          <label for="inputAddTBTT">Tên thiết bị thay thế</label>
          <input
            id="inputAddTBTT"
            type="text"
            class="form-control"
            v-model="tenTBTT"
            required
          />

          <label for="inputAddTBTTSL">Số lượng</label>
          <input
            id="inputAddTBTTSL"
            type="number"
            class="form-control"
            v-model="soLuongTBTT"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="addTBTT"
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
    id="addLTSModal"
    tabindex="-1"
    aria-labelledby="addLTSModelLabal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">Thêm loại tài sản</h5>
        </div>
        <div class="modal-body">
          <label for="inputAddPb">Tên loại tài sản</label>
          <input
            id="inputAddPb"
            type="text"
            class="form-control"
            v-model="tenLTS"
            required
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="addLTS"
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
import psServices from "@/services/ps.services";
import pstbttServices from "@/services/pstbtt.services";

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
    idTaiSan: 0,
    idPhongBan: 0,
    soLuong: 0,
    ngayTao: "",
  },
]);
const checkedInput = ref([]);
const pss = ref([
  {
    id: 0,
    ngayTao: "",
    idTaiSan: 0,
    idPhongBan: 0,
    tinhTrang: "",
    daSua: 0,
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
    ngayNhap: "",
    hsd: "",
    soluong: 0,
    soLo: "",
    donGia: 0,
    donViTinh: "",
    hinhAnh: "",
    idLoaiTaiSan: 0,
  },
]);
const choosenDVBH = ref(0);
const choosenIndexDVBH = ref(0);

const choosenTBTT = ref(0);
const choosenIndexTBTT = ref(0);
const tenTBTT = ref("");
const soLuongTBTT = ref(0);

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
const tbtts = ref([
  {
    id: 0,
    ten: "",
    soLuong: 0,
  },
]);
const psTbtt = ref([
  {
    id: 0,
    idPhieuSua: 0,
    idThietBiThayThe: 0,
  },
]);
var dvbhVisibles = ref(3);
var steps = ref(3);

var userVisibles = ref(10);
var stepsUser = ref(10);

var pnVisibles = ref(10);
var stepsPn = ref(10);

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

const checkedTBTTId = ref([] as number[]);
const search = ref("");
const searchUser = ref("");
const searchPhieuNhap = ref("");

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

async function deleteTBTT() {
  try {
    await tbttServices.delete(choosenTBTT.value);
    tbtts.value.splice(choosenIndexTBTT.value, 1);

    Swal.fire({
      title: "Thành công!",
      text: "Xóa thiết bị thay thế thành công!",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.log(error);
  }
}
const choosenPSTBTT = ref(0);
const choosenLTS = ref(0);
const choosenIndexLTS = ref(0);
async function deleteLTS() {
  try {
    await ltsServices.delete(choosenLTS.value);
    lts.value.splice(choosenIndexLTS.value, 1);

    Swal.fire({
      title: "Thành công!",
      text: "Xóa loại tài sản thành công!",
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

async function addTBTT() {
  try {
    await tbttServices.create({
      ten: tenTBTT.value,
      soLuong: soLuongTBTT.value,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function addPB() {
  try {
    await pbServices.create(tenPB.value);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

const tenLTS = ref("");

async function addLTS() {
  try {
    await ltsServices.create(tenLTS.value);
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

async function updatePs(index: number) {
  try {
    await psServices.update(pss.value[index]);

    Swal.fire({
      title: "Thành công!",
      text: "Cập nhật phiếu sửa thành công!",
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
}

async function addPSTbtt() {
  try {
    await pstbttServices.delete(0);
    for (let i = 0; i < checkedTBTTId.value.length; i++) {
      await pstbttServices.create({
        idPhieuSua: choosenPSTBTT.value,
        idThietBiThayThe: checkedTBTTId.value[i],
      });
    }
    Swal.fire({
      title: "Thành công!",
      text: "Cập nhật phiếu sửa thành công!",
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
}
async function getAllCurrentTbtt(id: number) {
  try {
    let respPsTbtt = await pstbttServices.getOne(id);
    psTbtt.value = respPsTbtt.data.ps_tbtt;
    checkedTBTTId.value = [];

    if (psTbtt.value != undefined)
      for (let i = 0; i < psTbtt.value.length; i++) {
        checkedTBTTId.value[i] = psTbtt.value[i].idThietBiThayThe;
      }
  } catch (err: any) {
    Swal.fire({
      title: "Lỗi!",
      text: err,
      icon: "error",
      confirmButtonText: "OK",
    });
    console.log(err);
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
    tbtts.value = respTbtt.data.tbtt;

    let respPn = await pnServices.getAll();
    pns.value = respPn.data.pn;

    let respPs = await psServices.getAll();
    pss.value = respPs.data.ps;

    let respLTS = await ltsServices.getAll();
    lts.value = respLTS.data.lts;
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
