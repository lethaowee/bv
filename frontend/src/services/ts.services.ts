import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class TSService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const ts = await this.api.get("/taisan");
      return ts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const ts = await this.api.get("/taisan/" + id);
      return ts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/taisan",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async update(data: any) {
    try {
      const resp = await this.api.patch(
        "http://localhost:3000/api/taisan",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
}

export default new TSService();
