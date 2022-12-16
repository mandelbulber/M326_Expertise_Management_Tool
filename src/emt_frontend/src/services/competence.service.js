import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/competence/";

class CompetenceService {
  getAllCompetences() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getAllCompetencesByUserId(userId) {
    return axios.get(API_URL + "user", {
      headers: authHeader(),
      params: { id: userId },
    });
  }

  getCompetenceById(competenceId) {
    console.log(competenceId);
    return axios.get(API_URL + "edit", {
      headers: authHeader(),
      params: { id: competenceId },
    });
  }
}

export default new CompetenceService();
