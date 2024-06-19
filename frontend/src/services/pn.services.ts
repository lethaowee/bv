import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class PNService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const pts = await this.api.get("/phieunhap");
      return pts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const pts = await this.api.get("/phieunhap/" + id);
      return pts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/phieunhap",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
}

export default new PNService();
