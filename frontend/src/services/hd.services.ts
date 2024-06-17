import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class NDService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const hd = await this.api.get("/hoatdong");
      return hd.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: string) {
    try {
      const hd = await this.api.get("/hoatdong/" + id);
      return hd.data;
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new NDService();
