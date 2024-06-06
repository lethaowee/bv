import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class PTSService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const pts = (await this.api.get("/pts"));
            return pts.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const pts = (await this.api.get("/pts/" + id));
            return pts.data;
        } catch (err) {
            handlingError(err);
        }
    }
}

export default new PTSService();