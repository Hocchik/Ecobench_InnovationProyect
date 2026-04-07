import axios from "./axios";

class UserDataService {

    async getSupervisors(): Promise<any> {
        const response = await axios.get("/data/supervisors");
        return response.data;
    }

}

export default new UserDataService();