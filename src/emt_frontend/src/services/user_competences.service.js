import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user_competences/";

class UserCompetenceService {
  updateStatus(userCompetence) {
    return axios.post(API_URL + "update", userCompetence, { headers: authHeader() });
  }
  addStatus(userCompetence) {
    return axios.post(API_URL + "add", userCompetence, { headers: authHeader() });
  }
}

export default new UserCompetenceService();
