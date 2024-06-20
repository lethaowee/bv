import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class PBService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const pb = await this.api.get("/phongban");
      return pb.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const pb = await this.api.get("/phongban/" + id);
      return pb.data;
    } catch (err) {
      handlingError(err);
    }
  }
  async create(ten: string) {
    try {
      const resp = await this.api.post("http://localhost:3000/api/phongban", {
        tenPhongBan: ten,
      });
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
  async delete(id: number) {
    try {
      return await this.api.delete("/phongban/" + id);
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new PBService();
