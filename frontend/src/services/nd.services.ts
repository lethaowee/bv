import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from 'axios';

class NDService {
    api: any
    constructor(baseUrl = "http://localhost:3000/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        try {
            const nd = (await this.api.get("/nguoidung"));
            return nd.data;
        } catch (err) {
            handlingError(err);
        }
    }

    async getOne(id: string) {
        try {
            const nd = (await this.api.get("/nguoidung/" + id));
            return nd.data;
        } catch (err) {
            handlingError(err);
        }
    }
    async update(id: number, data: any, ) {
        return await axios.patch(`http://localhost:3000/api/nguoidung/${id}`, data).then((res) => {
        return res.data;
        }).catch((err) => {
            handlingError(err);
        })
    }
}

export default new NDService();