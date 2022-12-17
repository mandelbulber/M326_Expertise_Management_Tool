<template>
  <header>
    <h1>All categories</h1>
  </header>
  <div v-for="category in categories" :key="category.id">
    <div class="card" style="width: 20vw; margin-top: 2vh; margin-bottom: 2vh; width: auto;"> <!-- category card -->
      <div class="card-body">
        <h1 class="text-center">{{ category.name }}</h1>
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
                  <div style="display: flex; justify-content: space-between;">
                    <h5>{{ competence.name }}</h5>
                    <div v-if="competence.user_competences.status.name == 'ToDo'" style="color: orange;">
                      {{ competence.user_competences.status.name }}
                      <img src="../assets/ToDo.png" width="20" height="20">
                    </div>
                    <div v-if="competence.user_competences.status.name == 'In Progress'" style="color: blue;">
                      {{ competence.user_competences.status.name }}
                      <img src="../assets/In_Progress.png" width="20" height="20">
                    </div>
                    <div v-if="competence.user_competences.status.name == 'Done'" style="color: green;">
                      {{ competence.user_competences.status.name }}
                      <img src="../assets/Done.png" width="20" height="20">
                    </div>
                  </div>
                  <p>{{ competence.description }}</p>
                  <button type="button" class="btn btn-outline-dark">Go to competence</button>
                </div>
              </div>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import CompetenceService from "../services/competence.service";
import DifficultyService from "../services/difficulty.service";
import CategoryService from "@/services/category.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
      competences: [],
      difficulties: [],
      categories: [],
    };
  },
  mounted() {
    UserService.getHomeContent().then(
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

        if (error.response.status == 403) {
          this.$router.push("/login");
        }
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
};
</script>
