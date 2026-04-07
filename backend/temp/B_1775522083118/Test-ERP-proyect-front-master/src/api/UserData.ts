import axios from "axios";

const BASE_URL = "http://localhost:8080/api/data";

class UserDataService {

    async getSupervisors(): Promise<any> {
        try{
            const response = await axios.get(BASE_URL+"/supervisors", {withCredentials: true});
            return response.data;
        } catch (error) {
            console.error("Error al obtener supervisores:", error);
            throw error;
        }
    }


}

export default new UserDataService();