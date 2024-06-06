import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class TBTTService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const tbtt = (await this.api.get("/tbtt"));
            return tbtt.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const tbtt = (await this.api.get("/tbtt/" + id));
            return tbtt.data;
        } catch (err) {
            handlingError(err);
        }
    }
}

export default new TBTTService();