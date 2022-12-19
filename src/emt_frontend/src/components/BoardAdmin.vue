<template>
  <header>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>Admin Board</h1>
      <router-link :to="{ name: 'addCategory' }" class="btn btn-outline-success">Create new category</router-link>
    </div>
  </header>
  <div v-for="category in categories" :key="category.id">
    <div class="card" style="width: 20vw; margin-top: 2vh; margin-bottom: 2vh; width: auto;"> <!-- category card -->
      <div class="card-body">
        <div style="display: flex; justify-content: space-between;">
          <div style="width: 20vw;"></div>
          <h1 class="text-center">{{ category.name }}</h1>
          <div style="display: flex; width: 20vw; justify-content: flex-end;">
            <router-link :to="{ name: 'editCategory', params: { id: category.id } }" class="btn btn-outline-dark" style="margin: 5px; ">Edit category</router-link>
            <button @click="deleteCategory(category)" class="btn btn-outline-danger" style="margin: 5px;">
              Delete category</button>
          </div>
        </div>
        <hr />
        <table style="width: 100%">
          <thead>
            <tr>
              <th v-for="difficulty in difficulties" :key="difficulty.id">
                <h3>{{ difficulty.name }}</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <td v-for="difficulty in difficulties" :key="difficulty.id" style="width: 33%; vertical-align: top;">
              <div v-for="competence in competences" :key="competence.id">
                <div v-if="competence.difficulty.name == difficulty.name && competence.category.name == category.name"
                  class="card m-1 p-1" style="vertical-align: top;"> <!-- competence card -->
                  <h5>{{ competence.name }}</h5>
                  <p>{{ competence.description }}</p>
                  <div style="display: flex;">
                    <router-link :to="{ name: 'editCompetence', params: { id: competence.id } }"
                      class="btn btn-outline-dark" style="width: 50%; margin: 1%;">Edit competence</router-link>
                    <button @click="deleteCompetence(competence)" class="btn btn-outline-danger"
                      style="width: 50%; margin: 1%;">Delete competence</button>
                  </div>
                </div>
              </div>
            </td>
          </tbody>
        </table>
        <router-link :to="{ name: 'addCompetence' }" class="btn btn-outline-success"
          style="width: 90%; margin: 1% 5% 1% 5%;">
          Add new competence</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import CompetenceService from "@/services/competence.service";
import DifficultyService from "@/services/difficulty.service";
import CategoryService from "@/services/category.service";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  name: "Admin",
  data() {
    return {
      content: "",
      competences: [],
      difficulties: [],
      categories: [],
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    CompetenceService.getAll().then(
      (response) => {
        this.competences = response.data;
      },
      (error) => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );
      }
    );
    DifficultyService.getAll().then(
      (response) => {
        this.difficulties = response.data;
      },
      (error) => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );
      }
    );
    CategoryService.getAll().then(
      (response) => {
        this.categories = response.data;
      },
      (error) => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        );
      }
    );
  },
  watch: {
    selectResult(newResult, oldResult) {
      if (newResult != "" && newResult != null) {
        CompetenceService.getAllCompetencesByUserId(this.selectResult.id).then(
          (response) => {
            this.competences = response.data;
          },
          (error) => {
            console.log(
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            );
          }
        );
      }
    },
  },
  methods: {
    deleteCompetence(competence) {
      var result = confirm("Are you sure to delete the Competence with the name " + competence.name + "?");
      if (result) {
        CompetenceService.deleteCompetence(competence.id).then((res) => {
          if (res.status == 200) {
            CompetenceService.getAll().then((response) => {
              this.competences = response.data;
            });
          }
        });
      }
    },
    deleteCategory(category) {
      var result = confirm("Are you sure to delete the Competence with the name " + category.name + " and all its competences?");
      if (result) {
        CategoryService.deleteCategory(category.id).then((res) => {
          if (res.status == 200) {
            CategoryService.getAll().then((response) => {
              this.categories = response.data;
            });
          }
        });
      }
    }
  },
};
</script>
