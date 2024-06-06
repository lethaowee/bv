import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class TBService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const tb = (await this.api.get("/tb"));
            return tb.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const tb = (await this.api.get("/tb/" + id));
            return tb.data;
        } catch (err) {
            handlingError(err);
        }
    }
}

export default new TBService();