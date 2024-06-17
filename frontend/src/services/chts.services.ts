import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class CHTSService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const chts = await this.api.get("/cauhinhthongso");
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const chts = await this.api.get("/cauhinhthongso/" + id);
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }
  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/cauhinhthongso",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
}

export default new CHTSService();
