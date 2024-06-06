import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class PHService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const ph = (await this.api.get("/ph"));
            return ph.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const ph = (await this.api.get("/ph/" + id));
            return ph.data;
        } catch (err) {
            handlingError(err);
        }
    }
}

export default new PHService();