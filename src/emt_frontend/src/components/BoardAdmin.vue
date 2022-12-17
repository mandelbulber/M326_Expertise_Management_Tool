<template>
  <header>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>Admin Board</h1>
      <router-link :to="{ name: '' }" class="btn btn-outline-success">Create new category</router-link>
    </div>
  </header>
  <div v-for="category in categories" :key="category.id">
    <div class="card" style="width: 20vw; margin-top: 2vh; margin-bottom: 2vh; width: auto;"> <!-- category card -->
      <div class="card-body">
        <div style="align-items: center;">
          <h1 class="text-center">{{ category.name }}</h1>
          <div style="position: absolute; top: 3.25%; right: 1%; display: flex;">
            <router-link :to="{ name: '' }" class="btn btn-outline-dark" style="margin-right: 0.5em">Edit
              category</router-link>
            <router-link :to="{ name: '' }" class="btn btn-outline-danger">Delete category</router-link>
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
                    <router-link :to="{ name: 'edit', params: { id: competence.id } }" class="btn btn-outline-dark"
                      style="width: 50%; margin: 1%;">Edit competence</router-link>
                    <router-link :to="{ name: '' }" class="btn btn-outline-danger"
                      style="width: 50%; margin: 1%;">Delete competence</router-link>
                  </div>
                </div>
              </div>
            </td>
          </tbody>
        </table>
        <router-link :to="{ name: 'add' }" class="btn btn-outline-success" style="width: 90%; margin: 1% 5% 1% 5%;">Add
          new competence</router-link>
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
};
</script>
