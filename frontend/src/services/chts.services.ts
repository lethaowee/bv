import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class CHTSService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const chts = (await this.api.get("/chts"));
            return chts.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const chts = (await this.api.get("/chts/" + id));
            return chts.data;
        } catch (err) {
            handlingError(err);
        }
    }
}

export default new CHTSService();