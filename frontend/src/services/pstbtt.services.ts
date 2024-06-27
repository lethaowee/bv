import createApiClient from "./api.service";
import handlingError from "./api.service";

class PSTbttService {
  api: any;

  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      const ps = await this.api.get("/phieusua_tbtt");
      return ps.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const ps = await this.api.get("/phieusua_tbtt/" + id);
      return ps.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/phieusua_tbtt",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/phieusua_tbtt/" + id);
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new PSTbttService();
