import axios from 'axios';

const API_URL = 'http://localhost:8080/api/competence/';

class CompetenceService {
  getAllCompetences() {
    return axios.get(API_URL);
  }
}

export default new CompetenceService();
