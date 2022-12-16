<template>
  <div>
    <header>
      <h3>{{ content }}</h3>
    </header>
  </div>
  <div v-for="category in categories" :key="category.id">
    <table>
      <thead>
        <tr>
          <th colspan="3">{{category.name}}</th>
        </tr>
        <tr>
          <th v-for="difficulty in difficulties" :key="difficulty.id">
            {{ difficulty.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <td v-for="difficulty in difficulties" :key="difficulty.id">
          <table v-for="competence in competences" :key="competence.id">
            <div v-if="competence.difficulty.name == difficulty.name && competence.category.name == category.name">
              <thead>
                <th>{{ competence.name }}</th>
              </thead>
              <tbody>
                <tr>
                  <td>{{ competence.description }}</td>
                </tr>
                <tr>
                  <td>{{ competence.category.name }}</td>
                </tr>
              </tbody>
            </div>
          </table>
        </td>
      </tbody>
    </table>
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
