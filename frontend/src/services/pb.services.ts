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
  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/phongban",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
}

export default new PBService();
