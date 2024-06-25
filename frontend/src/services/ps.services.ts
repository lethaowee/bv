import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class PSService {
  api: any;

  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      const ps = await this.api.get("/phieusua");
      return ps.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const ps = await this.api.get("/phieusua/" + id);
      return ps.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/phieusua",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/phieusua/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async update(data: any) {
    try {
      const resp = await this.api.patch(
        "http://localhost:3000/api/phieusua",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
}

export default new PSService();
