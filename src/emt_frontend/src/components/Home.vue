<template>
  <div>
    <header>
      <h3>{{ content }}</h3>
    </header>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="difficulty in difficulties" :key="difficulty.id">
            {{ difficulty.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <td v-for="difficulty in difficulties" :key="difficulty.id">
          <table v-for="competence in competences" :key="competence.id">
            <div v-if="competence.difficulty.name == difficulty.name">
              <thead>
                <th>{{ competence.name }}</th>
              </thead>
              <tbody>
                <tr>
                  <td>{{ competence.description }}</td>
                </tr>
                <tr>
                  <td>{{ competence.user_competences.user.email }}</td>
                </tr>
                <tr>
                  <td>{{ competence.user_competences.status.name }}</td>
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

export default {
  name: "Home",
  data() {
    return {
      content: "",
      competences: [],
      difficulties: [],
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
    CompetenceService.getAllCompetences().then(
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
  },
};
</script>
