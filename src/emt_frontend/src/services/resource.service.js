import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/resource/";

class ResourceService {
  deleteById(id) {
    return axios.post(API_URL + "delete", {id: id},{ headers: authHeader() });
  }
}

export default new ResourceService();
