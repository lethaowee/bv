import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class DVBHService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const lts = await this.api.get("/loaitaisan");
      return lts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const lts = await this.api.get("/loaitaisan/" + id);
      return lts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/loaitaisan",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/loaitaisan/" + id);
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new DVBHService();
