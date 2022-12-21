import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getHomeContent() {
    return axios.get(API_URL + 'home', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + "all", { 
      headers: authHeader(),
    });
  }
}

export default new UserService();
