import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class TSService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const ts = (await this.api.get("/ts"));
            return ts.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const ts = (await this.api.get("/ts/" + id));
            return ts.data;
        } catch (err) {
            handlingError(err);
        }
    }
}

export default new TSService();