import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/competence/";

class CompetenceService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getAllCompetencesByUserId(userId) {
    return axios.get(API_URL + "user", {
      headers: authHeader(),
      params: { id: userId },
    });
  }

  getCompetenceById(competenceId) {
    return axios.get(API_URL + "byId", {
      headers: authHeader(),
      params: { id: competenceId },
    });
  }

  editCompetence(competence){
    return axios.post(API_URL + "edit", competence, {
      headers: authHeader()
    });
  }

  addCompetence(competence){
    return axios.post(API_URL + "add", competence, {
      headers: authHeader()
    });
  }

  deleteCompetence(id){
    return axios.post(API_URL + "delete", {id: id} , {
      headers: authHeader()
    })
  }
}

export default new CompetenceService();
