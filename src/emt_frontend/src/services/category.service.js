import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/category/";

class CategoryService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }
  
  getById(id){
    return axios.get(API_URL + "byId", { headers: authHeader(), params: { id: id }, });
  }

  editCategory(category){
    return axios.post(API_URL + "edit", category, { headers: authHeader() });
  }

  addCategory(name){
    return axios.post(API_URL + "add", {name: name}, { headers: authHeader() });
  }

  deleteCategory(id){
    return axios.post(API_URL + "delete", {id: id}, { headers: authHeader() });
  }
}

export default new CategoryService();
