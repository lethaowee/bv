import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class TBTTService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const tbtt = await this.api.get("/thietbithaythe");
      return tbtt.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const tbtt = await this.api.get("/thietbithaythe/" + id);
      return tbtt.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/thietbithaythe",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/thietbithaythe/" + id);
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new TBTTService();
