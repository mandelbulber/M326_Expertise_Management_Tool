<template>
  <router-link :to="{ name: 'add' }">Add Competence</router-link>
  <div v-for="category in categories" :key="category.id">
    <table>
      <thead>
        <tr>
          <th colspan="3">{{ category.name }}</th>
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
            <div
              v-if="competence.difficulty.name == difficulty.name && competence.category.name == category.name">
              <thead>
                <th>{{ competence.name }}</th>
                <th>
                  <router-link :to="{ name: 'edit', params: { id: competence.id } }">Edit</router-link>
                </th>
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
import CompetenceService from "@/services/competence.service";
import DifficultyService from "../services/difficulty.service";
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
};
</script>
