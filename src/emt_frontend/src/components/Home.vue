<template>
  <header>
    <h1>All categories</h1>
  </header>
  <div v-for="category in categories" :key="category.id">
    <div class="card" style="width: 20vw; margin-top: 2vh; margin-bottom: 2vh; width: auto;"> 
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
                  class="card m-1 p-1" style="vertical-align: top;"> 
                  <div style="display: flex; justify-content: space-between;">
                    <h5>{{ competence.name }}</h5>
                    <div v-for="user_competence in competence.user_competences">
                      <div v-if="user_competence.userId == this.$store.state.auth.user.id">
                        <div v-if="user_competence.status.name == 'ToDo'" style="color: orange;">
                      {{ user_competence.status.name }}
                      <img src="../assets/ToDo.png" width="20" height="20">
                    </div>
                    <div v-if="user_competence.status.name == 'In Progress'" style="color: blue;">
                      {{ user_competence.status.name }}
                      <img src="../assets/In_Progress.png" width="20" height="20">
                    </div>
                    <div v-if="user_competence.status.name == 'Done'" style="color: green;">
                      {{ user_competence.status.name }}
                      <img src="../assets/Done.png" width="20" height="20">
                    </div>
                      </div>
                    </div>
                  </div>
                  <p>{{ competence.description }}</p>
                  <router-link :to="{ name: 'competence', params: { id: competence.id } }" class="btn btn-outline-dark">Go to competence</router-link>
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
import CompetenceService from "@/services/competence.service";
import DifficultyService from "@/services/difficulty.service";
import CategoryService from "@/services/category.service";

export default {
  name: "Home",
  data() {
    return {
      competences: [],
      difficulties: [],
      categories: [],
    };
  },
  mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push("/login");
    } else {
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
    }
  },
};
</script>
